import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { deleteEnrollmentByID } from "../../data-access/enrollments.mongoose";
import { NotFoundError } from "../../util/errors";

export const deleteEnrollmentByIDController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const enrollment = await deleteEnrollmentByID(
      req.params.id,
      req.body.authenticatedUser.id
    );

    if (!enrollment) {
      throw new NotFoundError("Enrollment not found");
    }

    res.status(204).send();
  }
);
