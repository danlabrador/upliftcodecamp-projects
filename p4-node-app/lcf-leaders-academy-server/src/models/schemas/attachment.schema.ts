import { createULID } from "../../util/ulid";
import { Document, Schema, model } from "mongoose";

interface Attachment extends Document {
  _id: string;
  fileName: string;
  fileURL: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
}

const attachmentSchema = new Schema<Attachment>(
  {
    _id: { type: String, default: () => `ATT-${createULID()}` },
    fileName: { type: String, required: true },
    fileURL: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedAt: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
attachmentSchema.index({ fileName: 1 });
attachmentSchema.index({ fileType: 1 });
attachmentSchema.index({ uploadedAt: 1 });
attachmentSchema.index({ fileType: 1, uploadedAt: 1 });

const AttachmentModel = model<Attachment>("Attachment", attachmentSchema);

export { Attachment, AttachmentModel };
