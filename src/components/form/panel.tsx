"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/panelists";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/panel";
import { submit } from "@/utils/form";

const Panel = () => {
  const { data: session } = useSession();

  const [panel, setPanel] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    photo: session?.user.photo ?? "",
    form: "panels",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: panel,
      schema,
      url: "/api/dashboard/panels",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={panel}
      setObject={setPanel}
      header="PANEL APPLICATIONS"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Panel;
