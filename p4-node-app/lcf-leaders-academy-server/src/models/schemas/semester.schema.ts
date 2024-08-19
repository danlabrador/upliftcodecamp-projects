import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Semester extends Document {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const semesterSchema = new Schema<Semester>(
  {
    _id: { type: String, default: () => `SEM-${createULID()}` },

    // Semester information
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    // Registration period
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },

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
semesterSchema.index({ name: 1 });
semesterSchema.index({ startDate: 1 });
semesterSchema.index({ endDate: 1 });
semesterSchema.index({ registrationStartDate: 1 });
semesterSchema.index({ registrationEndDate: 1 });
semesterSchema.index({ deletedAt: 1 });
semesterSchema.index({ startDate: 1, endDate: 1 });
semesterSchema.index({ registrationStartDate: 1, registrationEndDate: 1 });
semesterSchema.index({ name: 1, startDate: 1 });

const SemesterModel = model<Semester>("Semester", semesterSchema);

export { Semester, SemesterModel };
