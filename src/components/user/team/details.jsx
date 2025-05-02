"use client";
import { useState } from "react";
import toaster from "@/utils/toaster";
import { Copy, Link } from "lucide-react";
import { api } from "@/utils/api";
import { SiDiscord as Discord } from "@icons-pack/react-simple-icons";
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

const Details = ({ team }) => {
  const [details, setDetails] = useState(team);

  const handleCopy = () => {
    navigator.clipboard.writeText(details.id);
    toaster("Successfully copied team id!", "success");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}user/join/${details.id}`,
    );
    toaster("Successfully copied join link!", "success");
  };

  const handleLeave = async () => {
    await api({
      method: "DELETE",
      url: "/api/members",
    });

    toaster("Successfully left team!", "success");
  };

  const handleSave = async () => {
    if (
      !(
        details.links.github === "" ||
        details.links.github.includes("github.com/")
      )
    ) {
      toaster("Invalid Github Link", "error");
      return;
    }
    if (
      !(
        details.links.devpost === "" ||
        details.links.devpost.includes("devpost.com/")
      )
    ) {
      toaster("Invalid Devpost Link", "error");
      return;
    }
    if (
      !(
        details.links.figma === "" || details.links.figma.includes("figma.com/")
      )
    ) {
      toaster("Invalid Figma Link", "error");
      return;
    }

    await api({
      method: "PUT",
      url: "/api/team",
      body: details,
    });

    toaster("Successfully Updated!", "success");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team Details</CardTitle>
        <CardDescription>Customize your team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Team Name</Label>
          <Input
            id="name"
            value={details.name}
            onChange={(e) =>
              setDetails({
                ...details,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="team">Team ID</Label>
          <div className="flex items-center gap-4">
            <Input id="team" placeholder={details.id} disabled />
            <Copy
              onClick={handleCopy}
              className="hover:cursor-pointer hover:opacity-50"
            />
            <Link
              onClick={handleCopyLink}
              className="hover:cursor-pointer hover:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="team">Team Members</Label>
          <div className="flex flex-wrap gap-4 pt-3">
            {details.members.length === 0 &&
              "No Team Members. Invite others to join your team."}

            {details.members.map(({ name, discord }, index) => (
              <div key={index} className="space-y-1 rounded-lg bg-gray-100 p-4">
                <p className="text-sm leading-none font-medium">{name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Discord size={20} />
                  <span>{discord}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="devpost">Devpost</Label>
          <Input
            id="devpost"
            value={details.links.devpost}
            placeholder="https://devpost.com/super-cool-project"
            onChange={(e) =>
              setDetails({
                ...details,
                links: { ...details.links, devpost: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="github">Github</Label>
          <Input
            id="github"
            value={details.links.github}
            placeholder="https://github.com/super-cool-code"
            onChange={(e) =>
              setDetails({
                ...details,
                links: { ...details.links, github: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="figma">Figma</Label>
          <Input
            id="figma"
            value={details.links.figma}
            placeholder="https://figma.com/super-cool-design"
            onChange={(e) =>
              setDetails({
                ...details,
                links: { ...details.links, figma: e.target.value },
              })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={handleLeave}>
          Leave Team
        </Button>
        <Button onClick={handleSave} className="bg-hackathon-green-400">
          Save Team
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Details;
