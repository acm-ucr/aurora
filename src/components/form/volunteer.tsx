"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/volunteers";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/volunteer";
import { submit } from "@/utils/form";

const Volunteer = () => {
  const { data: session } = useSession();

  const [volunteer, setVolunteer] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "volunteers",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: volunteer,
      schema,
      url: "/api/dashboard/volunteers",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={volunteer}
      setObject={setVolunteer}
      header="VOLUNTEER APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Volunteer;
