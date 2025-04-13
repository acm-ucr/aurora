import { z } from "zod";

export const schema = z.object({
  teamId: z.string(),
  teamName: z.string(),
  round: z.string(),
  table: z.string(),
  tracks: z.array(z.string()).min(1, {
    message: "Please select at least one track",
  }),

  implementation: z.object({
    rating: z.number().min(1).max(5, {
      message: "Rating must be between 1 and 5",
    }),
    comment: z.string().min(1, { message: `Response Invalid` }),
  }),

  idea: z.object({
    rating: z.number().min(1).max(5, {
      message: "Rating must be between 1 and 5",
    }),
    comment: z.string().min(1, { message: `Response Invalid` }),
  }),

  design: z.object({
    rating: z.number().min(1).max(5, {
      message: "Rating must be between 1 and 5",
    }),
    comment: z.string().min(1, { message: `Response Invalid` }),
  }),
});
