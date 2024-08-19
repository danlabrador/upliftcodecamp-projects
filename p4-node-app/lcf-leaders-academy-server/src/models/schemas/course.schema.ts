import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Course extends Document {
  _id: string;
  courseCodeID: string;
  name: string;
  description?: string;
  credits: number;
  codeVersion: number;
  passingScore?: number;
  effectiveFrom: Date;
  badgeID?: string;
  wallpaperID?: string;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const courseSchema = new Schema<Course>(
  {
    _id: { type: String, default: () => `CRS-${createULID()}` },
    courseCodeID: { type: String, ref: "CourseCode", required: true },

    // Course information
    name: { type: String, required: true },
    description: { type: String },
    credits: { type: Number, required: true },
    codeVersion: { type: Number, required: true },
    passingScore: { type: Number },
    effectiveFrom: { type: Date, required: true },
    badgeID: { type: String, ref: "Attachment" },
    wallpaperID: { type: String, ref: "Attachment" },

    // Miscellaneous
    createdBy: { type: String, ref: "User" },
    deletedAt: { type: Date },
    deletedBy: { type: String, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
courseSchema.index({ courseCodeID: 1 });
courseSchema.index({ codeVersion: 1 });
courseSchema.index({ badgeID: 1 });
courseSchema.index({ wallpaperID: 1 });
courseSchema.index({ effectiveFrom: 1 });
courseSchema.index({ courseCodeID: 1, codeVersion: 1 }, { unique: true });
courseSchema.index({ name: 1, effectiveFrom: 1 });
courseSchema.index({ deletedAt: 1 });
courseSchema.index({ deletedAt: 1, courseCodeID: 1 });

const CourseModel = model<Course>("Course", courseSchema);

export { Course, CourseModel };
