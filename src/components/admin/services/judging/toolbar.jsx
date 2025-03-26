"use client";
import { useState, useEffect } from "react";
import toaster from "@/utils/toaster";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InputWithClear } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const tags = ["professor", "industry", "student"];

const Toolbar = ({
  data,
  setData,
  setFilters,
  view,
  setView,
  setJudgesView,
}) => {
  const router = useRouter();

  const [judges, setJudges] = useState(null);
  const [popup, setPopup] = useState({
    title: "",
    text: "",
    color: "green",
    visible: false,
  });

  const [input, setInput] = useState({
    rotations: "",
    input: "",
  });

  const [search, setSearch] = useState("");

  const generate = (e) => {
    e.preventDefault();
    if (
      input.rotations === "" ||
      isNaN(input.rotations) ||
      parseInt(input.rotations) < 1 ||
      parseInt(input.rotations) > 99
    ) {
      toaster("Please enter a valid integer value between 1 and 99", "error");
      return;
    }

    if (judges.length === 0) {
      setPopup({
        title: "Insufficient Judges",
        text: "There are not enough judges to go around to each team. Please consider adding more judges via the judge dashboard. ",
        color: "green",
        visible: true,
      });
      return;
    }

    const teams = [...data];

    // Reset Rounds
    teams.forEach((team, index) => {
      team.rounds = Array.from(Array(parseInt(input.rotations)), () => []);
      team.table = index + 1;
    });

    let judge = 0;
    let round = 0;

    // assign judges
    for (let j = 0; j < input.rotations; j += 1) {
      for (let i = 0; i < teams.length; i += 1) {
        if (round === parseInt(input.rotations)) continue;
        if (
          teams[i].rounds.some((judges) =>
            judges.some((individual) => individual.name === judges[judge].name),
          )
        )
          continue;
        if (judge < judges.length) {
          teams[i].rounds[round].push(judges[judge]);
          judge += 1;
        }
        if (judge === judges.length) {
          judge = 0;
          round += 1;
        }
      }
    }

    if (judges.length * input.rotations < teams.length) {
      setPopup({
        title: "Insufficient Judges",
        text: "There are not enough judges to go around to each team. Please consider adding more judges via the judge dashboard. ",
        color: "green",
        visible: true,
      });
    }

    setData(teams);

    api({
      method: "PUT",
      url: "/api/judging",
      body: { teams },
    }).then(() => toaster("Rounds Saved!", "success"));

    setInput({
      ...input,
      rotations: "",
    });
  };

  const handleReset = () => {
    if (data.some((team) => team.rounds.length === 0)) {
      toaster("Already Reset!", "error");
      return;
    }
    setData(
      data.map((team) => {
        team.rounds = [];
        return team;
      }),
    );

    const uids = data.map((team) => team.uid).join(",");

    api({
      method: "DELETE",
      url: `/api/judging?ids=${uids}`,
    }).then(() => toaster("Successfully Reset", "success"));
  };

  const handleView = () => {
    setView(!view);
    const totalJudges = [...judges];

    totalJudges.forEach((judge) => {
      judge.rounds = Array.from(Array(data[0].rounds.length), () => []);

      data.forEach((team) => {
        const name = team.table
          ? team.table.toString().padStart(2, "0") + " : " + team.name
          : team.name;
        team.rounds.forEach((round, index) => {
          if (round.some((individual) => individual.name === judge.name))
            judge.rounds[index] = [{ name: name, affiliation: "student" }];
        });
      });
    });

    setJudgesView(totalJudges);
  };

  const handleInput = (e) => {
    setFilters(
      data.filter(({ name }) =>
        name.toLowerCase().search(e.target.value.toLowerCase()) === -1
          ? false
          : true,
      ),
    );

    setSearch(e.target.value);
  };

  const load = () => {
    api({
      method: "GET",
      url: "/api/judging",
    }).then(({ items }) => {
      setData(items.teams);
      setFilters(items.teams);
      setJudges(items.judges);

      if (items.judges.length === 0) {
        setPopup({
          title: "Insufficient Judges",
          text: "There are not enough judges to go around to each team. Please consider adding more judges via the judge dashboard. ",
          color: "green",
          visible: true,
        });
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AlertDialog open={popup.visible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{popup.text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setPopup({ ...popup, visible: false })}
              className="sm:mt-2"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                router.push("/admin/judges");
                setPopup({ ...popup, visible: false });
              }}
            >
              Add Judges
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form
        className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center"
        onSubmit={generate}
      >
        <div className="flex flex-row items-center gap-2 pb-3 pl-2">
          <InputOTP
            maxLength={2}
            value={input.rotations}
            onChange={(value) => setInput({ ...input, rotations: value })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
          <p className="font-semibold"># of rotations</p>
        </div>

        <div className="flex flex-row justify-center gap-3">
          <Button onClick={generate}>generate</Button>
          <Button
            variant="destructive"
            onClick={handleReset}
            disabled={!data || data.some(({ rounds }) => rounds.length === 0)}
          >
            reset
          </Button>

          <Button
            onClick={handleView}
            disabled={!data || data.some(({ rounds }) => rounds.length === 0)}
          >
            change view
          </Button>
        </div>
        <div className="pl-2">
          <Label htmlFor="search">Search</Label>
          <InputWithClear
            id="search"
            value={search}
            maxLength={100}
            placeholder="Search"
            onClear={() => setSearch("")}
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-row justify-center">
          {tags.map((tag, index) => (
            <Badge type={tag} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </form>
    </>
  );
};

export default Toolbar;
