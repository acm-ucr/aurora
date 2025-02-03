"use client";
import {
  User,
  Gavel,
  Handshake,
  Lock,
  Heart,
  HandHeart,
  Crown,
  Users,
  CircleAlert,
  MessagesSquare,
} from "lucide-react";
import Select from "@/components/select";
import { useState } from "react";
import { api } from "@/utils/api";
import toaster from "@/utils/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUSES = ["confirmed", "pending", "not attending"];

const MAPPINGS = {
  confirmed: 1,
  pending: 0,
  "not attending": -1,
};

const roleIcons = {
  participants: <User className="mx-2" />,
  judges: <Gavel className="mx-2" />,
  volunteers: <Heart className="mx-2" />,
  mentors: <HandHeart className="mx-2" />,
  admins: <Lock className="mx-2" />,
  committees: <Handshake className="mx-2" />,
  sponsors: <Users className="mx-2" />,
  interests: <CircleAlert className="mx-2" />,
  feedback: <MessagesSquare className="mx-2" />,
  leads: <Crown className="mx-2" />,
  panelists: <Users className="mx-2" />,
  teams: <Users className="mx-2" />,
};

const Contact = ({ role, disabled, setDisabled }) => {
  const [status, setStatus] = useState({
    status: "",
  });

  const onClick = async () => {
    setDisabled(true);
    const number = MAPPINGS[status.status];

    const { items } = await api({
      method: "GET",
      url: `/api/contacts?role=${role}&status=${number}`,
    });

    if (items.length === 0) {
      toaster("The email list is empty!", "error");
      setDisabled(false);
      return;
    }

    navigator.clipboard.writeText(items);
    toaster("Copied all email addresses!", "success");

    setDisabled(false);
  };

  return (
    <Card key={role} className="flex w-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          {roleIcons[role]} {role}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Select
          items={STATUSES}
          placeholder="Select a status..."
          field="status"
          user={status}
          setUser={setStatus}
          onChange={() => setDisabled(status.status === "")}
          className="placeholder-gray-400"
        />

        <Button onClick={onClick} disabled={status.status === "" || disabled}>
          copy
        </Button>
      </CardContent>
    </Card>
  );
};

export default Contact;
