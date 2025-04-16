import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  doc,
  updateDoc,
  setDoc,
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
  orderBy,
  deleteDoc,
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

      if (params.type === "participants" && body["resume"]) {
        setDoc(doc(db, "resumes", user.id), {
          firstName: body["firstName"],
          lastName: body["lastName"],
          email: body["email"],
          school: body["school"],
          grade: body["grade"],
          resume: body["resume"],
          status: 0,
        });
      }

      updateDoc(doc(db, "statistics", "shirt"), {
        [`${params.type}.0.${element.shirt}`]: increment(1),
      });

      updateDoc(doc(db, "statistics", "diet"), {
        [`${params.type}.0.${element.diet}`]: increment(1),
      });

      updateDoc(doc(db, "statistics", "gender"), {
        [`${params.type}.0.${element.gender}`]: increment(1),
      });

      updateDoc(doc(db, "statistics", "age"), {
        [`${params.type}.0.${element.age}`]: increment(1),
      });

      send({
        email: user.email,
        id: "confirmation",
        name: user.firstName,
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
  const size = req.nextUrl.searchParams.get("size");
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
      if (last !== "undefined") {
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

      const countFromServer = await getCountFromServer(
        query(
          collection(db, "users"),
          where(`roles.${params.type}`, "in", [-1, 0, 1]),
        ),
      );

      const total = countFromServer.data().count;
      const lastDoc = output.length > 0 ? output[output.length - 1].uid : "";

      return res.json(
        {
          message: "OK",
          items: output,
          total: total,
          last: lastDoc,
        },
        { status: 200 },
      );
    }
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
          name: object.firstName,
          position: params.type.slice(0, -1),
          subject: `[${data.name}] ${subject}`,
          preview: preview,
        });

        try {
          updateDoc(doc(db, "statistics", "shirt"), {
            [`${params.type}.${status}.${object.shirt}`]: increment(1),
            [`${params.type}.0.${object.shirt}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "diet"), {
            [`${params.type}.${status}.${object.diet}`]: increment(1),
            [`${params.type}.0.${object.diet}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "gender"), {
            [`${params.type}.${status}.${object.gender}`]: increment(1),
            [`${params.type}.0.${object.gender}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "age"), {
            [`${params.type}.${status}.${object.age}`]: increment(1),
            [`${params.type}.0.${object.age}`]: increment(-1),
          });
        } catch (error) {
          console.error(error);
        }
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

export const DELETE = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);
  const objects = await req.json();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await Promise.all(
        objects.map(async ({ uid, shirt, diet, gender, age }) => {
          const snapshot = await getDoc(doc(db, "users", uid));
          const status = snapshot.data().roles[params.type];
          await updateDoc(doc(db, "users", uid), {
            [`roles.${params.type}`]: deleteField(),
          });
          if (params.type === "participants") {
            await deleteDoc(doc(db, "resumes", uid));
          }
          updateDoc(doc(db, "statistics", "shirt"), {
            [`${params.type}.${status}.${shirt}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "diet"), {
            [`${params.type}.${status}.${diet}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "gender"), {
            [`${params.type}.${status}.${gender}`]: increment(-1),
          });

          updateDoc(doc(db, "statistics", "age"), {
            [`${params.type}.${status}.${age}`]: increment(-1),
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
