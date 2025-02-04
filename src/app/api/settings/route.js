import {
  collection,
  doc,
  query,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";

const roles = [
  "participants",
  "judges",
  "volunteers",
  "mentors",
  "admins",
  "committees",
  "sponsors",
  "panelists",
];

const orders = {
  shirt: SHIRTS,
  diet: DIETS,
  age: AGES,
  gender: GENDERS,
};

const getStatistic = async (role, status, statistic) => {
  const snapshot = await getDocs(
    query(collection(db, "users"), where(`roles.${role}`, "==", status)),
  );

  const results = [];

  snapshot.forEach((doc) => results.push(doc.data()[statistic]));

  const frequency = {};

  for (const option of orders[statistic]) {
    frequency[option] = 0;
  }

  results.forEach((value) => {
    frequency[value] += 1;
  });

  return frequency;
};

export const GET = async () => {
  const heatmaps = {};

  for (const statistic of Object.keys(orders)) {
    heatmaps[statistic] = {};

    for (const role of roles) {
      heatmaps[statistic][role] = {
        0: {},
        1: {},
        "-1": {},
      };

      heatmaps[statistic][role]["-1"] = await getStatistic(role, -1, statistic);
      heatmaps[statistic][role]["0"] = await getStatistic(role, 0, statistic);
      heatmaps[statistic][role]["1"] = await getStatistic(role, 1, statistic);
    }
  }

  await setDoc(doc(db, "statistics", "shirt"), heatmaps["shirt"]);
  await setDoc(doc(db, "statistics", "gender"), heatmaps["gender"]);
  await setDoc(doc(db, "statistics", "age"), heatmaps["age"]);
  await setDoc(doc(db, "statistics", "diet"), heatmaps["diet"]);

  return Response.json(heatmaps);
};
