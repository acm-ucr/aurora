import { z } from "zod";
import { api } from "@/utils/api";
import toaster from "@/utils/toaster";

export const submit = async <T extends z.ZodObject<z.ZodRawShape>>({
  data,
  schema,
  url,
  method = "POST",
  setLoading,
  setState,
}: {
  data: z.infer<T>;
  schema: T;
  url: string;
  method?: "POST" | "PUT";
  setLoading: (loading: boolean) => void;
  setState: (state: number) => void;
}) => {
  setLoading(true);

  const result = schema.safeParse(data);

  if (!result.success) {
    result.error.errors.forEach((err) => {
      toaster(err.message, "error");
    });
    setLoading(false);
    return;
  }

  try {
    await api({
      method: method,
      url: url,
      body: data,
    });
    toaster(`Submitted successfully!`, "success");
    setState(2);
  } catch {
    toaster(`Internal Server Error`, "error");
    setState(0);
  } finally {
    setLoading(false);
  }
};
