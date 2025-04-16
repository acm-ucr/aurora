"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/leads";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/lead";
import { submit } from "@/utils/form";

const Lead = () => {
  const { data: session } = useSession();

  const [lead, setLead] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    roles: session?.user.roles || {},
    email: session?.user.email || "",
    form: "leads",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: lead,
      schema,
      url: "/api/dashboard/leads",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={lead}
      setObject={setLead}
      header="LEAD APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Lead;
