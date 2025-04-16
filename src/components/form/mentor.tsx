"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/mentors";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/mentor";
import { submit } from "@/utils/form";

const Mentor = () => {
  const { data: session } = useSession();

  const [mentor, setMentor] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "mentors",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: mentor,
      schema,
      url: "/api/dashboard/mentors",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={mentor}
      setObject={setMentor}
      header="MENTOR APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Mentor;
