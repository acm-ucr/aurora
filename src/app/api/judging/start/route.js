import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/judge/judge";
import { db } from "@/utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    const snapshot = await getDoc(doc(db, "users", user.id));
    const { rounds } = snapshot.data();
    const formattedRounds = JSON.parse(rounds);

    return res.json(
      { message: "OK", items: { rounds: formattedRounds } },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
