import { z } from "zod";
import { GENDERS, SHIRTS, AGES, DIETS } from "@/data/form/information";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\d{3} \d{3} \d{4}$/, {
    message: "Invalid phone number. Expected format: 123 456 7890",
  }),
  gender: z.enum(GENDERS as [string, ...string[]], {
    message: "Please select your gender",
  }),
  age: z.enum(AGES as [string, ...string[]], {
    message: "Please select your age",
  }),
  shirt: z.enum(SHIRTS as [string, ...string[]], {
    message: "Please select your shirt size",
  }),
  affiliation: z.enum(["Professor", "Student", "Industry"], {
    message: "Please select your affiliation",
  }),
  title: z.string().min(1, { message: "Title is required" }),
  photo: z.string().optional(),
  diet: z.enum(DIETS as [string, ...string[]], {
    message: "Please select your dietary restrictions",
  }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
