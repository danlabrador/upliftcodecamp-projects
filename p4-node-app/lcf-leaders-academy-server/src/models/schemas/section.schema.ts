import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Section extends Document {
  _id: string;
  headID?: string;
  name: string;
  address: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const sectionSchema = new Schema<Section>(
  {
    _id: { type: String, default: () => `SEC-${createULID()}` },
    headID: { type: String, ref: "User" },

    // Section information
    name: { type: String, required: true },
    address: {
      addressLineOne: { type: String, required: true },
      addressLineTwo: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
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
sectionSchema.index({ headID: 1 });
sectionSchema.index({ name: 1 });
sectionSchema.index({ "address.city": 1 });
sectionSchema.index({ "address.state": 1 });
sectionSchema.index({ deletedAt: 1 });
sectionSchema.index({ "address.city": 1, "address.state": 1 });

const SectionModel = model<Section>("Section", sectionSchema);

export { Section, SectionModel };
