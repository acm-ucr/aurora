import { AUTH } from "@/data/admin/dashboard";
import { authenticate } from "@/utils/auth";
import { db } from "@/utils/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

interface idea {
  title: string;
  languages: string[];
  details: string;
  contact: string;
}

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
    const output: idea[] = [];

    const snapshot = await getDocs(query(collection(db, "ideas")));

    snapshot.forEach((doc) => {
      output.push(doc.data() as idea);
    });

    return res.json(
      {
        message: "OK",
        items: output,
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

export const POST = async (req: Request) => {
  const { auth, message } = await authenticate(AUTH.POST);

  const res = NextResponse;

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { idea, languages, details, contact } = await req.json();

  try {
    await addDoc(collection(db, "ideas"), {
      title: idea,
      languages,
      details,
      contact,
    });
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
