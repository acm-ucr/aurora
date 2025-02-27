"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import Heatmap from "./heatmap";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";
import { api } from "@/utils/api";
import { STATUSES } from "@/data/statuses";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Statistics = () => {
  const { data } = useQuery({
    queryKey: ["/admin/statistics"],
    queryFn: async () => api({ url: "/api/statistics", method: "GET" }),
  });

  const [value, setValue] = useState("Accepted");

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

  const mappings = {
    Pending: 0,
    Accepted: 1,
    Rejected: 2,
  };

  const heatmaps = Object.keys(orders).map((label) => ({
    key: label,
    labels: orders[label],
    values: Object.keys(STATUSES).map((status) =>
      roles.map((key) => (data ? data[label][key][status] : [])),
    ),
  }));

  return (
    <div className="flex h-full flex-col py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Statistics</Label>
      <div className="flex h-full items-start">
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(value) => {
            if (value) setValue(value);
          }}
        >
          {Object.keys(mappings).map((value, index) => (
            <ToggleGroupItem value={value} key={index}>
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {heatmaps.map(({ key, values, labels }) => (
        <>
          <Label className="pr-5 text-xl font-medium capitalize">{key}</Label>
          <Heatmap
            key={key}
            label={value}
            data={values[mappings[value]]}
            xLabels={labels}
            yLabels={roles}
          />
        </>
      ))}
    </div>
  );
};

export default Statistics;
