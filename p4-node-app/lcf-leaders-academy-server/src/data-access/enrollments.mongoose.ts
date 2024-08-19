import { EnrollmentModel } from "../models/schemas/enrollment.schema";

export async function createEnrollment(enrollment: {
  studentID: string;
  courseOfferingID: string;
  creditTo: string | null;
}) {
  return await EnrollmentModel.create(enrollment);
}

export async function enrollmentExists(
  studentID: string,
  courseOfferingID: string
) {
  return await EnrollmentModel.exists({
    studentID,
    courseOfferingID,
    deletedAt: null,
  });
}

export async function getEnrollmentByID(enrollmentID: string) {
  return await EnrollmentModel.findOne({
    _id: enrollmentID,
    deletedAt: null,
  });
}

export async function deleteEnrollmentByID(
  enrollmentID: string,
  deletedBy: string
) {
  return await EnrollmentModel.updateOne(
    { _id: enrollmentID },
    { deletedAt: new Date(), deletedBy }
  );
}

export async function getEnrollmentsByStudentID(studentID: string) {
  return await EnrollmentModel.find({
    studentID,
    deletedAt: null,
  });
}
