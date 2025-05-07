import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const GET = async () => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    const output = [];
    const snapshot = await getDocs(collection(db, "teams"));

    snapshot.forEach((doc) => {
      const { name, table, rounds, links } = doc.data();
      if (rounds) {
        const formattedRounds = JSON.parse(rounds);

        output.push({ name, table, links, rounds: formattedRounds });
      }
    });

    return res.json({ message: "OK", items: output }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
