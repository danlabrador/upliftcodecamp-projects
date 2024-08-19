import { z } from "zod";

export const CreateEnrollmentBodySchema = z.object({
  authenticatedUser: z
    .object({
      id: z.string(),
    })
    .optional(),
  studentID: z.string(),
  courseOfferingID: z.string(),
  creditTo: z.string().optional(),
});
export type CreateEnrollmentBody = z.infer<typeof CreateEnrollmentBodySchema>;
