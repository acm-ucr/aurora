import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/judge/judge";
import { db } from "@/utils/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
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

export const PUT = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const body = await req.json();

  try {
    const { teamId, round, tracks, implementation, idea, design } = body;
    const roundIndex = parseInt(round) - 1;

    const teamsSnap = await getDoc(doc(db, "teams", teamId));
    const updatedTeamRounds = JSON.parse(teamsSnap.data().rounds);

    updatedTeamRounds[roundIndex] = updatedTeamRounds[roundIndex].map(
      (judge) =>
        judge.uid === user.id
          ? {
              ...judge,
              feedback: {
                tracks,
                implementation,
                idea,
                design,
              },
            }
          : judge,
    );

    await updateDoc(doc(db, "teams", teamId), {
      rounds: JSON.stringify(updatedTeamRounds),
    });
    const judgesSnap = await getDoc(doc(db, "users", user.id));
    const updatedJudgeRounds = JSON.parse(judgesSnap.data().rounds);

    updatedJudgeRounds[roundIndex] = updatedJudgeRounds[roundIndex].map(
      (team) =>
        team.uid === teamId
          ? {
              ...team,
              feedback: {
                tracks,
                implementation,
                idea,
                design,
              },
            }
          : team,
    );

    await updateDoc(doc(db, "users", user.id), {
      rounds: JSON.stringify(updatedJudgeRounds),
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
