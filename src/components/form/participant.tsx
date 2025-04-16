"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/participant";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/participant";
import { submit } from "@/utils/form";

const Participant = () => {
  const { data: session } = useSession();

  const [participant, setParticipant] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "participants",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: participant,
      schema,
      url: "/api/dashboard/participants",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={participant}
      setObject={setParticipant}
      header="HACKER APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Participant;
