"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/judge";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/judge";
import { submit } from "@/utils/form";

const Judge = () => {
  const { data: session } = useSession();

  const [judge, setJudge] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    photo: session?.user.photo ?? "",
    form: "judges",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: judge,
      schema,
      url: "/api/dashboard/judges",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={judge}
      setObject={setJudge}
      header="JUDGE APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Judge;
