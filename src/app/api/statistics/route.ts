import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";

const labels: string[] = [
  "participants",
  "judges",
  "volunteers",
  "mentors",
  "admins",
  "committees",
  "sponsors",
  "panelists",
];

const orders: Record<string, string[]> = {
  shirt: SHIRTS,
  diet: DIETS,
  age: AGES,
  gender: GENDERS,
};

const statuses: string[] = ["-1", "0", "1"];

type heatmap = Record<string, Record<string, Record<string, number[]>>>;

export const GET = async () => {
  const snapshot = await getDocs(collection(db, "statistics"));

  const heatmaps: heatmap = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    heatmaps[doc.id] = {};

    labels.forEach((label: string) => {
      heatmaps[doc.id][label] = {};

      statuses.forEach((status: string) => {
        heatmaps[doc.id][label][status] = [];

        const results = data[label][status];
        const values: number[] = orders[doc.id].map((key) => results[key]);

        heatmaps[doc.id][label][status] = values;
      });
    });
  });

  return Response.json(heatmaps);
};
