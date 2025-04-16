import { z } from "zod";
import {
  GENDERS,
  SHIRTS,
  GRADES,
  MAJORS,
  AVAILABILITY,
  AGES,
  DIETS,
} from "@/data/form/information";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is invalid" }),
  lastName: z.string().min(1, { message: "Last name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\d{3} \d{3} \d{4}$/, {
    message: "Invalid phone number. Expected format: 123 456 7890",
  }),
  discord: z.string().min(1, { message: "Discord username is invalid" }),
  major: z.enum(MAJORS as [string, ...string[]], {
    message: "Please select your major",
  }),
  age: z.enum(AGES as [string, ...string[]], {
    message: "Please select your age",
  }),
  grade: z.enum(GRADES as [string, ...string[]], {
    message: "Please select your grade",
  }),
  availability: z
    .array(z.enum(AVAILABILITY as [string, ...string[]]))
    .min(1, { message: "Please select at least one availability option" }),
  gender: z.enum(GENDERS as [string, ...string[]], {
    message: "Please select your gender",
  }),
  shirt: z.enum(SHIRTS as [string, ...string[]], {
    message: "Please select your shirt size",
  }),
  response: z.string().min(1, { message: "Response is required" }),
  diet: z.enum(DIETS as [string, ...string[]], {
    message: "Please select your dietary restrictions",
  }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
