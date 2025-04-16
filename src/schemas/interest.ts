import { z } from "zod";
import { AGES, SHIRTS, GENDERS, DIETS } from "@/data/form/information";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.enum(AGES as [string, ...string[]], {
    message: "Please select your age",
  }),
  gender: z.enum(GENDERS as [string, ...string[]], {
    message: "Please select your gender",
  }),
  shirt: z.enum(SHIRTS as [string, ...string[]], {
    message: "Please select your shirt size",
  }),
  eventSource: z
    .string()
    .min(1, { message: "Please select how you found the event" }),
  diet: z.enum(DIETS as [string, ...string[]], {
    message: "Please select your dietary restrictions",
  }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
