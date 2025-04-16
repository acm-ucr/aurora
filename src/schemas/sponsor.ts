import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, { message: "First name is invalid" }),
  lastName: z.string().min(1, { message: "Last name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\d{3} \d{3} \d{4}$/, {
    message: "Invalid phone number. Expected format: 123 456 7890",
  }),
  company: z.string().min(1, { message: "Company name is invalid" }),
  position: z.string().min(1, { message: "Position is invalid" }),
  tier: z.enum(["Bronze", "Silver", "Gold", "Tier4", "Tier5", "Other"], {
    message: "Please select your tier",
  }),
  comments: z.string().min(1, { message: "Comments/Questions are required" }),
  requirements: z
    .array(z.string())
    .min(1, { message: "You must agree to the terms and conditions" }),
});
