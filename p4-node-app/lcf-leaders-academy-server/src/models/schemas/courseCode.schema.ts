import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface CourseCode extends Document {
  _id: string;
  code: string;
  name: string;
  description?: string;
  alternateTo?: string;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const courseCodeSchema = new Schema<CourseCode>(
  {
    _id: { type: String, default: () => `COD-${createULID()}` },
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    alternateTo: { type: String, ref: "CourseCode" },

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
courseCodeSchema.index({ code: 1 });
courseCodeSchema.index({ createdBy: 1 });
courseCodeSchema.index({ deletedAt: 1 });
courseCodeSchema.index({ deletedBy: 1 });
courseCodeSchema.index({ deletedAt: 1, deletedBy: 1 });

const CourseCodeModel = model<CourseCode>("CourseCode", courseCodeSchema);

export { CourseCode, CourseCodeModel };
