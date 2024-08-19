import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Prerequisite extends Document {
  _id: string;
  courseCodeID: string;
  prerequisiteCourseCodeID: string;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const prerequisiteSchema = new Schema<Prerequisite>(
  {
    _id: { type: String, default: () => `PRQ-${createULID()}` },

    // Prerequisite information
    courseCodeID: { type: String, ref: "CourseCode", required: true },
    prerequisiteCourseCodeID: {
      type: String,
      ref: "CourseCode",
      required: true,
    },

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
prerequisiteSchema.index({ courseCodeID: 1 });
prerequisiteSchema.index({ prerequisiteCourseCodeID: 1 });
prerequisiteSchema.index({ createdBy: 1 });
prerequisiteSchema.index({ deletedAt: 1 });
prerequisiteSchema.index({ deletedBy: 1 });

const PrerequisiteModel = model<Prerequisite>(
  "Prerequisite",
  prerequisiteSchema
);

export { Prerequisite, PrerequisiteModel };
