import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Component extends Document {
  _id: string;
  name: string;
  description: string;
  iconID: string;
  createdBy: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const componentSchema = new Schema<Component>(
  {
    _id: { type: String, default: () => `CMP-${createULID()}` },

    // Component information
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconID: { type: String, ref: "Attachment" },

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
componentSchema.index({ name: 1 });
componentSchema.index({ iconID: 1 });
componentSchema.index({ deletedAt: 1 });
componentSchema.index({ name: 1, iconID: 1 });
componentSchema.index({ iconID: 1, deletedAt: 1 });

const ComponentModel = model<Component>("Component", componentSchema);

export { Component, ComponentModel };
