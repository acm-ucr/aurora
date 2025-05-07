"use client";
import { useState } from "react";
import Form from "./form";
import { submit } from "@/utils/form";
import { schema } from "@/schemas/judging";
import { FIELDS } from "@/data/judge/form";
import { useRouter } from "next/navigation";
interface props {
  id: string;
  name: string;
  round: string;
  table: string;
}

const Start = ({ id, name, round, table }: props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    teamId: id,
    teamName: name,
    round: round,
    table,
    tracks: [],
    implementation: { rating: 0, comment: "" },
    idea: { rating: 0, comment: "" },
    design: { rating: 0, comment: "" },
  });
  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: form,
      schema: schema,
      url: "/api/judging/start",
      method: "PUT",
      setLoading,
      setState,
    });
    router.push("/judge/start");
  };
  return (
    <Form
      fields={FIELDS}
      object={form}
      setObject={setForm}
      header={`Team ${table} - ${name}`}
      onSubmit={onSubmit}
      round={round}
    />
  );
};

export default Start;
