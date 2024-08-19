import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface CourseOffering extends Document {
  _id: string;
  courseID: string;
  semesterID: string;
  location: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  price: number;
  classSchedules?: string[];
  maxStudents?: number;
  remarks?: string;
  coordinatorID: string;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const courseOfferingSchema = new Schema<CourseOffering>(
  {
    _id: { type: String, default: () => `CO-${createULID()}` },

    // Course Offering information
    courseID: { type: String, ref: "Course", required: true },
    semesterID: { type: String, ref: "Semester", required: true },
    location: {
      addressLineOne: { type: String, required: true },
      addressLineTwo: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    price: { type: Number, required: true },
    classSchedules: { type: [String] },
    maxStudents: { type: Number },
    remarks: { type: String },
    coordinatorID: { type: String, ref: "User", required: true },

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
courseOfferingSchema.index({ courseID: 1 });
courseOfferingSchema.index({ semesterID: 1 });
courseOfferingSchema.index({ coordinatorID: 1 });
courseOfferingSchema.index({ "location.addressLineOne": 1 });
courseOfferingSchema.index({ "location.addressLineTwo": 1 });
courseOfferingSchema.index({ "location.city": 1 });
courseOfferingSchema.index({ "location.state": 1 });
courseOfferingSchema.index({ "location.country": 1 });
courseOfferingSchema.index({ deletedAt: 1 });
courseOfferingSchema.index({ courseID: 1, semesterID: 1 });
courseOfferingSchema.index({ coordinatorID: 1, semesterID: 1 });

const CourseOfferingModel = model<CourseOffering>(
  "CourseOffering",
  courseOfferingSchema
);

export { CourseOffering, CourseOfferingModel };
