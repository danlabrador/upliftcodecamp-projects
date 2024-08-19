import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface StaffRole extends Document {
  _id: string;
  userID: string;
  componentID: string;
  courseOfferingID: string;
  startAt: Date;
  endAt: Date;
}

const staffRoleSchema = new Schema<StaffRole>(
  {
    _id: { type: String, default: () => `SR-${createULID()}` },

    // Staff Role information
    userID: { type: String, ref: "User", required: true },
    componentID: { type: String, ref: "Component", required: true },
    courseOfferingID: { type: String, ref: "CourseOffering", required: true },

    // Staff Role period
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
staffRoleSchema.index({ userID: 1 });
staffRoleSchema.index({ componentID: 1 });
staffRoleSchema.index({ courseOfferingID: 1 });
staffRoleSchema.index({ startAt: 1 });
staffRoleSchema.index({ endAt: 1 });
staffRoleSchema.index({ userID: 1, componentID: 1 });
staffRoleSchema.index({ courseOfferingID: 1, startAt: 1 });
staffRoleSchema.index({ userID: 1, startAt: 1, endAt: 1 });

const StaffRoleModel = model<StaffRole>("StaffRole", staffRoleSchema);

export { StaffRole, StaffRoleModel };
