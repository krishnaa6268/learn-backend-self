import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
