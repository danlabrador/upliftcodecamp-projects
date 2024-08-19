import { CourseOfferingModel } from "../models/schemas/courseOffering.schema";
import { SemesterModel } from "../models/schemas/semester.schema";

export async function getCourseOfferingByID(courseOfferingID: string) {
  const result = await CourseOfferingModel.aggregate([
    {
      $match: {
        _id: courseOfferingID,
        deletedAt: null,
      },
    },
    {
      $lookup: {
        from: "courses", // The name of the Course collection
        localField: "courseID",
        foreignField: "_id",
        as: "courseDetails",
        pipeline: [
          {
            $match: {
              deletedAt: null,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$courseDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return result[0] || null;
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
    {
      $lookup: {
        from: "courses",
        localField: "courseID",
        foreignField: "_id",
        as: "courseDetails",
      },
    },
    {
      $unwind: "$courseDetails",
    },
    {
      $lookup: {
        from: "coursecodes",
        localField: "courseDetails.courseCodeID",
        foreignField: "_id",
        as: "courseCodeDetails",
      },
    },
    {
      $unwind: "$courseCodeDetails",
    },
    {
      $project: {
        _id: 1,
        semesterID: 1,
        courseID: 1,
        classSchedules: 1,
        courseDetails: 1,
        courseCodeDetails: 1,
      },
    },
  ]);

  return currentCourseOfferings;
}
