"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/committees";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/committee";
import { submit } from "@/utils/form";

const Committee = () => {
  const { data: session } = useSession();

  const [committee, setCommittee] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "committees",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: committee,
      schema,
      url: "/api/dashboard/committees",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={committee}
      setObject={setCommittee}
      header="COMMITTEE PORTAL REQUEST"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Committee;
