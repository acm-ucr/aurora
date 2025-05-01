import { z } from "zod";
import { MAJORS, AGES, GRADES, SHIRTS, GENDERS, DIETS } from "@/data/form/information"; // Common imports found in most schemas

// following exports are common in 9 out of 12 schemas
export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
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
  gender: z.enum(GENDERS as [string, ...string[]], {
    message: "Please select your gender",
  }),
  shirt: z.enum(SHIRTS as [string, ...string[]], {
    message: "Please select your shirt size",
  }),
  diet: z.enum(DIETS as [string, ...string[]], {
    message: "Please select your dietary restrictions",
  }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
