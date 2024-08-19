import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { getCurrentCourseOfferings } from "../../data-access/courseOfferings.mongoose";

export const getCurrentCourseOfferingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const currentCourseOfferings = await getCurrentCourseOfferings();
    res.status(200).json(currentCourseOfferings);
  }
);
