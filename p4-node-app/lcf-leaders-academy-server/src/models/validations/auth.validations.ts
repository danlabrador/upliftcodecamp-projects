import { z } from "zod";

export const LogInViaGoogleBodySchema = z.object({
  user: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email(),
    image: z.string().url().optional(),
  }),
  expiresAt: z.string().min(1).optional(),
});

export type LoginViaGoogleBody = z.infer<typeof LogInViaGoogleBodySchema>;
