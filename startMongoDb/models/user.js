import mongoose from "mongoose";

const user_schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    jobTitle: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", user_schema);