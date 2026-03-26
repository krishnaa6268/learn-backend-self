import mongoose from "mongoose";

export const connectDB = async (url?: string): Promise<void> => {
  if (!url) {
    throw new Error("MONGO_URI is not set");
  }

  await mongoose.connect(url);
  console.log("MongoDB Connected Successfully");
};
