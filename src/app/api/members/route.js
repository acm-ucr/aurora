import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/user/members";

export const DELETE = async () => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.DELETE);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { members } = (await getDoc(doc(db, "teams", user.team))).data();

  try {
    if (members.length <= 1) await deleteDoc(doc(db, "teams", user.team));
    else
      await updateDoc(doc(db, "teams", user.team), {
        members: arrayRemove({
          discord: user.discord,
          name: `${user.firstName} ${user.lastName}`,
          uid: user.id,
        }),
      });
    await updateDoc(doc(db, "users", user.id), {
      team: "",
    });
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const PUT = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { team } = await req.json();

  try {
    const snapshot = await getDoc(doc(db, "teams", team));
    if (!snapshot.exists())
      return res.json({ message: "Invalid Team ID" }, { status: 500 });
    const { members } = snapshot.data();
    if (members.length < 4) {
      await updateDoc(doc(db, "teams", team), {
        members: arrayUnion({
          discord: user.discord,
          name: `${user.firstName} ${user.lastName}`,
          uid: user.id,
        }),
      });
      await updateDoc(doc(db, "users", user.id), {
        team: team,
      });
      return res.json({ message: "OK" }, { status: 200 });
    } else
      return res.json({ message: "Exceeded 4 People Limit" }, { status: 500 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
