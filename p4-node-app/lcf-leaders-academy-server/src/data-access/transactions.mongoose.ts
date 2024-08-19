import { TransactionModel } from "../models/schemas/transaction.schema";

export async function createTransaction(transaction: {
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
}) {
  return await TransactionModel.create(transaction);
}
