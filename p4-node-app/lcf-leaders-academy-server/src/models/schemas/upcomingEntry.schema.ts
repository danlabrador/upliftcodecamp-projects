import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface UpcomingEntry extends Document {
  _id: string;
  courseOfferingID: string;
  componentID: string;
  title: string;
  description?: string;
  maxScore?: number;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const upcomingEntrySchema = new Schema<UpcomingEntry>(
  {
    _id: { type: String, default: () => `UE-${createULID()}` },

    // UpcomingEntries information
    courseOfferingID: { type: String, ref: "CourseOffering", required: true },
    componentID: { type: String, ref: "Component", required: true },
    title: { type: String, required: true },
    description: { type: String },
    maxScore: { type: Number },

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
upcomingEntrySchema.index({ courseOfferingID: 1 });
upcomingEntrySchema.index({ componentID: 1 });
upcomingEntrySchema.index({ title: 1 });
upcomingEntrySchema.index({ deletedAt: 1 });
upcomingEntrySchema.index({ courseOfferingID: 1, componentID: 1 });
upcomingEntrySchema.index({ courseOfferingID: 1, title: 1 });
upcomingEntrySchema.index({ componentID: 1, maxScore: 1 });

const UpcomingEntryModel = model<UpcomingEntry>(
  "UpcomingEntry",
  upcomingEntrySchema
);

export { UpcomingEntry, UpcomingEntryModel };
