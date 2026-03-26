import mongoose, { InferSchemaType, Model } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true },
);

type UrlDocument = InferSchemaType<typeof urlSchema>;

export const URL: Model<UrlDocument> = mongoose.model<UrlDocument>(
  "url-col",
  urlSchema,
);
