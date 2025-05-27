"use client";
import { useState } from "react";
import Contact from "./contact";
import { Label } from "@/components/ui/label";

const contacts = [
  "admins",
  "committees",
  "feedback",
  "interests",
  "judges",
  "leads",
  "mentors",
  "panelists",
  "participants",
  "sponsors",
  "teams",
  "volunteers",
];

const Contacts = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex h-full flex-col gap-3 py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Contacts</Label>

      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {contacts.map((role, index) => (
          <Contact
            key={index}
            role={role}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
