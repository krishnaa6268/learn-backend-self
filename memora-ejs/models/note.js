import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);
const noteModel = mongoose.model("note", noteSchema);

export default noteModel;
