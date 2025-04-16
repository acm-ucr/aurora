"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/interest";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/interest";
import { submit } from "@/utils/form";

const Interest = () => {
  const { data: session } = useSession();

  const [interest, setInterest] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "interests",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: interest,
      schema,
      url: "/api/dashboard/interests",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={interest}
      setObject={setInterest}
      header="INTEREST APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Interest;
