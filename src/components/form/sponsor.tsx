"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/sponsors";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/sponsor";
import { submit } from "@/utils/form";

const Sponsor = () => {
  const { data: session } = useSession();

  const [sponsor, setSponsor] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "sponsors",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: sponsor,
      schema,
      url: "/api/dashboard/sponsors",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={sponsor}
      setObject={setSponsor}
      header="SPONSORSHIP INQUIRY"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Sponsor;
