import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Enrollment extends Document {
  _id: string;
  studentID: string;
  courseOfferingID: string;
  creditTo?: string;
  enrollmentDate?: Date;
  isPaid: boolean;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const enrollmentSchema = new Schema<Enrollment>(
  {
    _id: { type: String, default: () => `ENR-${createULID()}` },

    // Enrollment information
    studentID: { type: String, ref: "User", required: true },
    courseOfferingID: { type: String, ref: "CourseOffering", required: true },
    creditTo: { type: String },
    enrollmentDate: { type: Date },
    isPaid: { type: Boolean, default: false, required: true },

    // Miscellaneous
    createdBy: { type: String, ref: "User" },
    deletedAt: { type: Date },
    deletedBy: { type: String, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
enrollmentSchema.index({ studentID: 1 });
enrollmentSchema.index({ courseID: 1 });
enrollmentSchema.index({ enrollmentDate: 1 });
enrollmentSchema.index({ isPaid: 1 });
enrollmentSchema.index({ deletedAt: 1 });
enrollmentSchema.index({ studentID: 1, courseID: 1 });
enrollmentSchema.index({ courseID: 1, enrollmentDate: 1 });
enrollmentSchema.index({ studentID: 1, isPaid: 1 });

const EnrollmentModel = model<Enrollment>("Enrollment", enrollmentSchema);

export { Enrollment, EnrollmentModel };
