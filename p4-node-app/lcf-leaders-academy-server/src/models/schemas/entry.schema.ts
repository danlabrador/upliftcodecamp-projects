import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Entry extends Document {
  _id: string;
  upcomingEntryID: string;
  enrollmentID: string;
  score: number;
  location: string;
  feedback?: string;
  attachments?: string[];
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const entrySchema = new Schema<Entry>(
  {
    _id: { type: String, default: () => `ENT-${createULID()}` },

    // Entry information
    upcomingEntryID: { type: String, ref: "UpcomingEntry", required: true },
    enrollmentID: { type: String, ref: "Enrollment", required: true },
    score: { type: Number, required: true },
    location: { type: String, required: true },
    feedback: { type: String },
    attachments: [{ type: String, ref: "Attachment" }],

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
entrySchema.index({ upcomingEntryID: 1 });
entrySchema.index({ enrollmentID: 1 });
entrySchema.index({ score: 1 });
entrySchema.index({ location: 1 });
entrySchema.index({ deletedAt: 1 });
entrySchema.index({ upcomingEntryID: 1, enrollmentID: 1 });
entrySchema.index({ createdBy: 1 });
entrySchema.index({ deletedBy: 1 });
entrySchema.index({ createdAt: 1 });
entrySchema.index({ feedback: "text" });

const EntryModel = model<Entry>("Entry", entrySchema);

export { Entry, EntryModel };
