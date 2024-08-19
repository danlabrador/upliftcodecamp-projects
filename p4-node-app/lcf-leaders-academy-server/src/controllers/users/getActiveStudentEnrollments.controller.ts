import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { getActiveStudentEnrollments } from "../../data-access/users.mongoose";

export const getActiveStudentEnrollmentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const activeEnrollments = await getActiveStudentEnrollments(req.params.id);
    res.status(200).json(activeEnrollments);
  }
);
