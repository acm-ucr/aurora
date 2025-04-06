import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/user/participant";

export const POST = async (req: Request) => {
  const { auth, message, user } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return Response.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const { phone, major, age, country, school, grade, gender, shirt, diet } =
    await req.json();

  if (!user?.id) {
    return Response.json(
      { message: "User ID is undefined after authentication." },
      { status: 500 },
    );
  }

  try {
    await updateDoc(doc(db, "users", user.id), {
      phone: phone,
      major: major,
      age: age,
      country: country,
      school: school,
      grade: grade,
      gender: gender,
      shirt: shirt,
      diet: diet,
    });
    return Response.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
