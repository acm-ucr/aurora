"use client";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import Heatmap from "./heatmap";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";
import { api } from "@/utils/api";

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
    shirts: SHIRTS,
    diets: DIETS,
    ages: AGES,
    genders: GENDERS,
  };

  const statuses = ["-1", "0", "1"];

  const heatmaps = Object.keys(orders).map((label) => ({
    key: label,
    labels: orders[label],
    values: statuses.map((status) =>
      roles.map((key) => (data ? data[label][key][status] : [])),
    ),
  }));

  return (
    <div className="flex h-full flex-col py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Statistics</Label>
      {heatmaps.map(({ key, values, labels }) => (
        <>
          <Label className="pr-5 text-xl font-medium capitalize">{key}</Label>
          <div className="grid grid-cols-3 gap-4">
            <Heatmap
              label="Rejected"
              data={values[0]}
              xLabels={labels}
              yLabels={roles}
            />
            <Heatmap
              label="Pending"
              data={values[1]}
              xLabels={labels}
              yLabels={roles}
            />
            <Heatmap
              label="Accepted"
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
