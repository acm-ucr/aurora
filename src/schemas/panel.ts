import { z } from "zod";
import { GENDERS, SHIRTS } from "@/data/form/information";

export const schema = z.object({
  name: z.string().min(1, { message: "Name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\d{3} \d{3} \d{4}$/, {
    message: "Invalid phone number. Expected format: 123 456 7890",
  }),
  panelist: z.enum(["Professor", "Intern", "Researcher"], {
    required_error: "Please select your panelist role",
  }),
  company: z.string().min(1, { message: "Company name is invalid" }),
  title: z.string().min(1, { message: "Title is invalid" }),
  gender: z.enum(GENDERS as [string, ...string[]], {
    required_error: "Please select your gender",
  }),
  shirt: z.enum(SHIRTS as [string, ...string[]], {
    required_error: "Please select your shirt size",
  }),
  photo: z.string().min(1, { message: "Photo is required" }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
