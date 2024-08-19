import { SemesterModel } from "../models/schemas/semester.schema";

export async function getSemesterByID(semesterID: string) {
  return await SemesterModel.findOne({
    _id: semesterID,
    deletedAt: null,
  });
}
