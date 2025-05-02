"use client";
import { useState } from "react";
import Table from "./table";
import Toolbar from "./toolbar";
import { Label } from "@/components/ui/label";

const Judging = () => {
  const [teams, setTeams] = useState(null);
  const [filters, setFilters] = useState(teams);
  const [judges, setJudges] = useState(null);
  const [view, setView] = useState(false);

  return (
    <div className="font-poppins flex h-full flex-col gap-3 py-4">
      <Label className="pr-5 text-2xl font-bold">Judging</Label>
      <Toolbar
        data={teams}
        setData={setTeams}
        setFilters={setFilters}
        view={view}
        setView={setView}
        judgesView={judges}
        setJudgesView={setJudges}
      />
      <Label className="pr-5 text-2xl font-bold">
        {view ? "Judges" : "Teams"}
      </Label>

      {filters === null || filters.length === 0 ? (
        <div className="flex flex-grow items-center justify-center">
          {view ? "No Judges Available" : "No Teams Available"}
        </div>
      ) : (
        <Table data={view === false ? filters : judges} />
      )}
    </div>
  );
};

export default Judging;
