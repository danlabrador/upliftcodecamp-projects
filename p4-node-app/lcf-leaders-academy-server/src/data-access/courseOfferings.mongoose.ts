import { CourseOfferingModel } from "../models/schemas/courseOffering.schema";
import { SemesterModel } from "../models/schemas/semester.schema";

export async function getCourseOfferingByID(courseOfferingID: string) {
  return await CourseOfferingModel.findOne({
    _id: courseOfferingID,
    deletedAt: null,
  });
}

export async function getCurrentCourseOfferings() {
  const currentTime = new Date();

  const currentCourseOfferings = await SemesterModel.aggregate([
    {
      $match: {
        startDate: { $lte: currentTime },
        endDate: { $gte: currentTime },
        deletedAt: null,
      },
    },
    {
      $lookup: {
        from: "courseofferings",
        localField: "_id",
        foreignField: "semesterID",
        as: "courseOfferings",
      },
    },
    {
      $unwind: "$courseOfferings",
    },
    {
      $match: {
        "courseOfferings.deletedAt": null,
      },
    },
    {
      $replaceRoot: {
        newRoot: "$courseOfferings",
      },
    },
  ]);

  return currentCourseOfferings;
}
