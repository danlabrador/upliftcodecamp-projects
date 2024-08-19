import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface User extends Document {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: Date;
  phone?: string;
  phoneVerifiedAt?: Date;
  password: string;
  birthDate?: Date;
  facebook?: string;
  google?: string;
  sectionID?: string;
  isPrimary: boolean;
  isLeader: boolean;
  leaderID?: string;
  status: string;
  isEarlyAdopter: boolean;
  role: string;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>(
  {
    _id: { type: String, default: () => `USR-${createULID()}` },

    // Profile information
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    emailVerifiedAt: { type: Date },
    phone: { type: String },
    phoneVerifiedAt: { type: Date },
    password: { type: String, required: true },
    birthDate: { type: Date },

    // Social Media
    facebook: { type: String },
    google: { type: String },

    // Section
    sectionID: { type: String, ref: "Section" },

    // Lighthouse information
    isPrimary: { type: Boolean, default: false, required: true },
    isLeader: { type: Boolean, default: false, required: true },
    leaderID: { type: String, ref: "User" },
    status: { type: String, required: true },
    isEarlyAdopter: { type: Boolean, default: false, required: true },

    // Roles
    role: { type: String, required: true },

    // Miscellaneous
    createdBy: { type: String, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    deletedBy: { type: String, ref: "User" },
  },
  {
    versionKey: false,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ sectionID: 1 });
userSchema.index({ leaderID: 1 });
userSchema.index({ status: 1 });
userSchema.index({ role: 1 });
userSchema.index({ deletedAt: 1 });
userSchema.index({ sectionID: 1, role: 1 });
userSchema.index({ isPrimary: 1, sectionID: 1 });

const UserModel = model<User>("User", userSchema);

export { User, UserModel };
