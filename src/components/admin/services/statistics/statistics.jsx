"use client";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import Heatmap from "./heatmap";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";
import { api } from "@/utils/api";
import { STATUSES } from "@/data/statuses";

const Statistics = () => {
  const { data } = useQuery({
    queryKey: ["/admin/statistics"],
    queryFn: async () => api({ url: "/api/statistics", method: "GET" }),
  });

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

  const heatmaps = Object.keys(orders).map((label) => ({
    key: label,
    labels: orders[label],
    values: Object.keys(STATUSES).map((status) =>
      roles.map((key) => (data ? data[label][key][status] : [])),
    ),
  }));

  console.log(Object.keys(STATUSES));

  return (
    <div className="flex h-full flex-col py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Statistics</Label>
      {heatmaps.map(({ key, values, labels }) => (
        <>
          <Label className="pr-5 text-xl font-medium capitalize">{key}</Label>
          <div className="grid grid-cols-3 gap-4">
            <Heatmap
              label="Pending"
              data={values[0]}
              xLabels={labels}
              yLabels={roles}
            />
            <Heatmap
              label="Accepted"
              data={values[1]}
              xLabels={labels}
              yLabels={roles}
            />
            <Heatmap
              label="Rejected"
              data={values[2]}
              xLabels={labels}
              yLabels={roles}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default Statistics;
