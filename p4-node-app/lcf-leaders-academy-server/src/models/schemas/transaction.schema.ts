import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Transaction extends Document {
  _id: string;
  enrollmentID: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentID?: string;
  description?: string;
  attachments?: string[];
  paidAt?: Date;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

const transactionSchema = new Schema<Transaction>(
  {
    _id: { type: String, default: () => `TRN-${createULID()}` },
    enrollmentID: { type: String, ref: "Enrollment", required: true },

    // Transaction information
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    paymentID: { type: String },
    description: { type: String },
    attachments: [{ type: String, ref: "Attachment" }],
    paidAt: { type: Date },

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
transactionSchema.index({ enrollmentID: 1 });
transactionSchema.index({ paymentStatus: 1 });
transactionSchema.index({ paidAt: 1 });
transactionSchema.index({ deletedAt: 1 });
transactionSchema.index({ enrollmentID: 1, paymentStatus: 1 });
transactionSchema.index({ paymentMethod: 1, paymentStatus: 1 });
transactionSchema.index({ enrollmentID: 1, paidAt: 1 });

const TransactionModel = model<Transaction>("Transaction", transactionSchema);

export { Transaction, TransactionModel };
