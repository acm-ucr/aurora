import { authenticate } from "@/utils/auth";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

type contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const GET = async (req: NextRequest) => {
  const res = NextResponse;

  const { auth, message } = await authenticate({
    admins: [1],
  });

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const role = req.nextUrl.searchParams.get("role");
  const status = parseInt(req.nextUrl.searchParams.get("status")!);

  const output: contact[] = [];

  try {
    const snapshot = await getDocs(
      query(collection(db, "users"), where(`roles.${role}`, "==", status)),
    );

    snapshot.forEach((doc) => {
      output.push(doc.data().email);
    });

    return res.json({ items: output.join(",") }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
