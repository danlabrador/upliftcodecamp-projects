import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../util/errors";
import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import z from "zod";
import {
  createEnrollment,
  enrollmentExists,
} from "../../data-access/enrollments.mongoose";
import {
  checkIfUserExists,
  getUsersAuthorizedToCreateEnrollment,
} from "../../data-access/users.mongoose";
import { CreateEnrollmentBodySchema } from "../../models/validations/enrollments.validations";

export const createEnrollmentController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // Validate request body
      CreateEnrollmentBodySchema.parse(req.body);

      const { authenticatedUser, studentID, courseOfferingID, creditTo } =
        req.body;

      // Check if user exists
      const isUserExists = await checkIfUserExists(studentID);
      if (!isUserExists) {
        throw new NotFoundError("User not found");
      }

      // Check if user is authorized to create enrollment
      const authorizedUsers = await getUsersAuthorizedToCreateEnrollment(
        courseOfferingID
      );
      authorizedUsers.push(studentID);
      if (!authorizedUsers.includes(authenticatedUser?.id as string)) {
        throw new AuthorizationError();
      }

      // Check if enrollment already exists
      const isEnrollmentExists = await enrollmentExists(
        studentID,
        courseOfferingID
      );
      if (isEnrollmentExists) {
        throw new ConflictError("Enrollment already exists");
      }

      // Create enrollment and return response
      const enrollment = await createEnrollment({
        studentID,
        courseOfferingID,
        creditTo: creditTo || null,
      });
      res.status(201).json(enrollment);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new ValidationError("Invalid enrollment body.");
      }

      throw error;
    }
  }
);
