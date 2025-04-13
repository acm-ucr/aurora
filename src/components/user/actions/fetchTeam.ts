import { Team } from "@/types/users";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function fetchTeam(id: string) {
  if (id === "") return null;

  const docSnap = await getDoc(doc(db, "teams", id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Team;
  } else {
    return null;
  }
}
