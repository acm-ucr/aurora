import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteField,
  Timestamp,
  increment,
  limit,
  startAfter,
  getCountFromServer,
  endBefore,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH, ATTRIBUTES } from "@/data/admin/dashboard";
import send from "@/utils/email";
import data from "@/data/config";

const types = new Set([
  "admins",
  "committees",
  "judges",
  "mentors",
  "volunteers",
  "participants",
  "interests",
  "sponsors",
  "panels",
  "leads",
]);

export const POST = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const body = await req.json();

  try {
    if (types.has(params.type)) {
      const element = {};
      ATTRIBUTES[params.type].forEach((attribute) => {
        element[attribute] = body[attribute];
      });

      updateDoc(doc(db, "users", user.id), {
        ...element,
        timestamp: Timestamp.now(),
        [`roles.${params.type}`]: 0,
      });

      updateDoc(doc(db, "statistics", "shirt"), {
        [`${params.type}`]: {
          0: {
            [element.shirt]: increment(1),
          },
        },
      });

      updateDoc(doc(db, "statistics", "diet"), {
        [`${params.type}`]: {
          0: {
            [element.diet]: increment(1),
          },
        },
      });

      updateDoc(doc(db, "statistics", "gender"), {
        [`${params.type}`]: {
          0: {
            [element.gender]: increment(1),
          },
        },
      });

      updateDoc(doc(db, "statistics", "age"), {
        [`${params.type}`]: {
          0: {
            [element.age]: increment(1),
          },
        },
      });

      send({
        email: user.email,
        id: "confirmation",
        name: user.name,
        position: params.type.slice(0, -1),
        subject: `[${data.name}] Thank you for applying!`,
        preview: `Thank you for applying to ${data.name}`,
      });
    }

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const GET = async (req, { params }) => {
  const direction = req.nextUrl.searchParams.get("direction");
  const index = req.nextUrl.searchParams.get("index");
  const size = req.nextUrl.searchParams.get("size");
  const first = req.nextUrl.searchParams.get("first");
  const last = req.nextUrl.searchParams.get("last");

  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const output = [];
  try {
    let snapshot;
    if (types.has(params.type)) {
      if (direction === "next" && last !== "undefined") {
        const lastDocument = await getDoc(doc(db, "users", last));

        snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy(`roles.${params.type}`),
            where(`roles.${params.type}`, "in", [-1, 0, 1]),
            startAfter(lastDocument),
            limit(size),
          ),
        );
      } else if (direction === "prev" && first !== "undefined") {
        const firstDocument = await getDoc(doc(db, "users", first));

        snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy(`roles.${params.type}`),
            where(`roles.${params.type}`, "in", [-1, 0, 1]),
            endBefore(firstDocument),
            limitToLast(size),
          ),
        );
      } else {
        snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy(`roles.${params.type}`),
            where(`roles.${params.type}`, "in", [-1, 0, 1]),
            limit(size),
          ),
        );
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const element = {};
        ATTRIBUTES[params.type].forEach((attribute) => {
          element[attribute] = data[attribute];
        });
        output.push({
          ...element,
          uid: doc.id,
          timestamp: data.timestamp,
          status: data.roles[params.type],
          selected: false,
          hidden: false,
        });
      });
    }

    const countFromServer = await getCountFromServer(
      query(
        collection(db, "users"),
        where(`roles.${params.type}`, "in", [-1, 0, 1]),
      ),
    );

    const total = countFromServer.data().count;
    const lastDoc = output.length > 0 ? output[output.length - 1].uid : "";
    const firstDoc = output.length > 0 ? output[0].uid : "";
    return res.json(
      {
        message: "OK",
        items: output,
        total: total,
        first: firstDoc,
        last: lastDoc,
        page: parseInt(index) + 1,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const PUT = async (req, { params }) => {
  const res = NextResponse;
  const { objects, status } = await req.json();
  const { auth, message } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await Promise.all(
        objects.map(async (object) => {
          await updateDoc(doc(db, "users", object.uid), {
            [`roles.${params.type}`]: status,
          });

          const id = status === 1 ? "acceptance" : "rejection";

          const preview =
            id === "acceptance"
              ? "You have been accepted!"
              : "Thank you for applying!";

          const subject =
            id === "acceptance"
              ? "🎉 Congratulations 🎉"
              : "Application Status Update";

          await send({
            email: object.email,
            id: id,
            name: object.name,
            position: params.type.slice(0, -1),
            subject: `[${data.name}] ${subject}`,
            preview: preview,
          });

          updateDoc(doc(db, "statistics", "shirt"), {
            [`${params.type}`]: {
              [`${status}.${object.shirt}`]: increment(1),
            },
            [`${params.type}`]: {
              [`0.${object.shirt}`]: increment(1),
            },
          });

          updateDoc(doc(db, "statistics", "diet"), {
            [`${params.type}`]: {
              [`${status}.${object.diet}`]: increment(1),
            },
            [`${params.type}`]: {
              [`0.${object.diet}`]: increment(1),
            },
          });

          updateDoc(doc(db, "statistics", "gender"), {
            [`${params.type}`]: {
              [`${status}.${object.gender}`]: increment(1),
            },
            [`${params.type}`]: {
              [`0.${object.gender}`]: increment(1),
            },
          });

          updateDoc(doc(db, "statistics", "age"), {
            [`${params.type}`]: {
              [`${status}.${object.age}`]: increment(1),
            },
            [`${params.type}`]: {
              [`0.${object.age}`]: increment(1),
            },
          });
        }),
      );
    }
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const DELETE = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);
  const objects = req.nextUrl.searchParams.get("remove").split(",");

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await Promise.all(
        objects.map(async (object) => {
          const snapshot = await getDoc(doc(db, "users", object));
          const status = snapshot.data().roles[params.type];
          await updateDoc(doc(db, "users", object), {
            [`roles.${params.type}`]: deleteField(),
          });
          await updateDoc(doc(db, "statistics", "statistics"), {
            [`${params.type}.${status}`]: increment(-1),
          });
        }),
      );
    }
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
