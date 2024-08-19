import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { getCurrentCourseOfferings } from "../../data-access/courseOfferings.mongoose";

export const getCurrentCourseOfferingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const currentCourseOfferings = await getCurrentCourseOfferings();
    if (!currentCourseOfferings) {
      res.status(404).json({ message: "No current course offerings found." });
    }
    res.status(200).json(currentCourseOfferings);
  }
);
