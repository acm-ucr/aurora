import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/judge/judge";
import { db } from "@/utils/firebase";
import {
  getDoc,
  getDocs,
  doc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
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

export const POST = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.POST);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { uid: teamId, round } = await req.json();
  try {
    const judgeSnapshot = await getDoc(doc(db, "users", user.id));
    const teamSnapShot = await getDocs(
      query(collection(db, "teams"), where("status", "==", 1)),
    );
    const { rounds } = judgeSnapshot.data();
    const teams = teamSnapShot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        name: data.name,
        table: data.table,
        rounds: JSON.parse(data.rounds),
      };
    });
    const formattedRounds = JSON.parse(rounds);

    const filteredTeams = teams.filter((team) => {
      const isNotAssigned = !team.rounds[round].length;
      const haveNotJudged = !team.rounds.some((round) => round.uid === user.id);

      return isNotAssigned && haveNotJudged;
    });

    let selectedTeam;
    let minTeam = Infinity;

    for (const team of filteredTeams) {
      if (team.rounds.length < minTeam) {
        selectedTeam = team;
        minTeam = team.rounds.length;
      }
    }

    formattedRounds[round] = [
      {
        uid: selectedTeam.uid,
        name:
          selectedTeam.table.toString().padStart(2, "0") +
          " : " +
          selectedTeam.name,
      },
    ];
    const selectedSnapshot = await getDoc(doc(db, "teams", selectedTeam.uid));
    const oldSnapshot = await getDoc(doc(db, "teams", teamId));
    const selectedRounds = JSON.parse(selectedSnapshot.data().rounds);
    const oldRounds = JSON.parse(oldSnapshot.data().rounds);
    selectedRounds[round] = [
      {
        name: user.firstName + " " + user.lastName,
        uid: user.id,
        affiliation: user.affiliation,
        rounds: formattedRounds,
      },
    ];
    oldRounds[round] = [];

    await updateDoc(doc(db, "teams", selectedTeam.uid), {
      rounds: JSON.stringify(selectedRounds),
    });
    await updateDoc(doc(db, "teams", teamId), {
      rounds: JSON.stringify(oldRounds),
    });
    await updateDoc(doc(db, "users", user.id), {
      rounds: JSON.stringify(formattedRounds),
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
