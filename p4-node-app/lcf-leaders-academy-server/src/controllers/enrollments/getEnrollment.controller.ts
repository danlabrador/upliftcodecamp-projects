import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { getEnrollmentByID } from "../../data-access/enrollments.mongoose";
import { NotFoundError } from "../../util/errors";

export const getEnrollmentByIDController = asyncHandler(
  async (req: Request, res: Response) => {
    const enrollment = await getEnrollmentByID(req.params.id);

    if (!enrollment) {
      throw new NotFoundError("Enrollment not found");
    }

    res.status(200).json(enrollment);
  }
);
