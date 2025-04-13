"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import toaster from "@/utils/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useState } from "react";
import { Team } from "@/types/users";

interface props {
  team: Team;
  id: string;
}

const Invite = ({ team, id }: props) => {
  const [alert, setAlert] = useState(false);

  const handleJoin = async () => {
    const response = await api({
      method: "PUT",
      url: "/api/members",
      body: { team: id },
    });

    if (response.message !== "OK") {
      toaster(`${response.message}`, "error");
      return;
    }

    setAlert(true);
    toaster("Successfully joined team!", "success");
  };

  return (
    <>
      <AlertDialog open={alert}>
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

      <Card>
        <CardHeader>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>
            You have recieved an invite to join this team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Current Members</Label>
          {team.members.map((member, index) => (
            <p className="m-0 flex items-center pl-3" key={index}>
              {member.name} - {member.discord}
            </p>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleJoin}>Join Team</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Invite;
