import { getCourseOfferingByID } from "../../data-access/courseOfferings.mongoose";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { Request, Response } from "express";

export const getCourseOfferingController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const currentCourseOfferings = await getCourseOfferingByID(req.params.id);
      res.status(200).json(currentCourseOfferings);
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
);
