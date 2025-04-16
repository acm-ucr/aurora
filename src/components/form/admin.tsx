"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/admins";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/admin";
import { submit } from "@/utils/form";

const Admin = () => {
  const { data: session } = useSession();

  const [admin, setAdmin] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "admins",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: admin,
      schema,
      url: "/api/dashboard/admins",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={admin}
      setObject={setAdmin}
      header="ADMIN PORTAL REQUEST"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Admin;
