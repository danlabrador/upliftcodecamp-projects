import { z } from "zod";

export const UpdateUserBodySchema = z.object({
  authenticatedUser: z
    .object({
      id: z.string(),
    })
    .optional(),
  firstName: z.string().min(1).optional(),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  birthDate: z.date().optional(),
  facebook: z.string().min(1).optional(),
  google: z.string().min(1).optional(),
});
export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;
