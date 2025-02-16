"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toaster from "@/utils/toaster";
import Link from "next/link";
import { api } from "@/utils/api";

const NewTeam = () => {
  const [team, setTeam] = useState({
    id: "",
    name: "",
  });

  const [id, setId] = useState("");

  const handleJoin = async () => {
    if (team.id === "") {
      toaster("Enter a Valid Team ID", "error");
      return;
    }

    const response = await api({
      method: "PUT",
      url: "/api/members",
      body: { team: team.id },
    });

    if (response.message === "OK") {
      toaster("Successfully joined team!", "success");
      setId(team.id);
      return;
    }

    toaster(`${response.message}`, "error");
  };

  const handleCreate = async () => {
    if (team.name === "") {
      toaster("Enter a Valid Team Name", "error");
      return;
    }

    const { id } = await api({
      method: "POST",
      url: "/api/team",
      body: { team: team },
    });

    setId(id);

    toaster("Successfully created a new team!", "success");
  };

  return (
    <>
      <AlertDialog open={id !== ""}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to your new team!</AlertDialogTitle>
            <AlertDialogDescription>
              Using the team dashboard, you can add team members, upload
              submission links and view critical information for judging!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href={`/user/team`}>
              <AlertDialogAction>Visit New Team</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="join" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 space-x-4 bg-transparent">
          <TabsTrigger
            className="rounded bg-gray-200 py-2 text-xl font-bold text-gray-500 data-[state=active]:text-hackathon-blue-200 md:text-2xl"
            value="join"
          >
            Join a Team
          </TabsTrigger>
          <TabsTrigger
            className="rounded bg-gray-200 py-2 text-xl font-bold text-gray-500 data-[state=active]:text-hackathon-blue-200 md:text-2xl"
            value="create"
          >
            Create a Team
          </TabsTrigger>
        </TabsList>
        <TabsContent className="items-center" value="join">
          <Card>
            <CardHeader className="items-center">
              <CardTitle className="text-4xl font-bold text-hackathon-blue-200">
                Join a Team
              </CardTitle>
              <CardDescription className="text-xl">
                Ask your teammates for a team id to join their team.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8 flex flex-col items-center space-y-2">
              <Label className="text-xl font-semibold" htmlFor="team">
                Team ID
              </Label>
              <Input
                className="w-1/2 rounded border-2 border-hackathon-blue-200 py-6 text-xl"
                id="team"
                placeholder="ie. abc123"
                onChange={(e) => setTeam({ id: e.target.value, name: "" })}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                className="w-1/8 mt-5 h-14 rounded bg-hackathon-blue-200 text-2xl font-bold"
                onClick={handleJoin}
              >
                Join Team
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="items-center" value="create">
          <Card>
            <CardHeader className="items-center">
              <CardTitle className="text-4xl font-bold text-hackathon-blue-200">
                Create a Team
              </CardTitle>
              <CardDescription className="text-xl">
                Enter a unique and fun team name! You can change this name
                later.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8 flex flex-col items-center space-y-2">
              <Label className="text-xl font-semibold" htmlFor="name">
                Team Name
              </Label>
              <Input
                className="w-1/2 rounded border-2 border-hackathon-blue-200 py-6 text-xl"
                id="name"
                type="text"
                placeholder="ie. Cool Coders"
                onChange={(e) => setTeam({ name: e.target.value, id: "" })}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                className="w-1/8 mt-5 h-14 rounded bg-hackathon-blue-200 text-2xl font-bold"
                onClick={handleCreate}
              >
                Create Team
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default NewTeam;
