"use client";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import Rounds from "./rounds";
import Teams from "./teams";
import { getResults } from "./actions";
import { Team } from "@/types/users";

const Result = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/admin/results"],
    queryFn: async () => await getResults(),
  });
  const [team, setTeam] = useState<Team | null>(null);

  if (isLoading) return <Loading />;
  return (
    <div className="font-poppins flex h-full flex-col gap-3 py-4">
      <Label className="pr-5 text-2xl font-bold">Results</Label>
      {data ? (
        <div className="flex flex-col gap-3">
          <Teams teams={data} setTeam={setTeam} />
          {team ? <Rounds team={team} /> : <span>Select a Team</span>}
        </div>
      ) : (
        <span>Judging has not started yet</span>
      )}
    </div>
  );
};

export default Result;
