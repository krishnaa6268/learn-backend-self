import express from "express";
import {
  createNote,
  deleteNote,
  getHomePage,
  getNotes,
  showEditNote,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getHomePage);

router
  .route("/notes")
  .get(getNotes)
  .post(createNote);

router
  .route("/notes/:id/edit")
  .get(showEditNote)
  .post(updateNote);

router.post("/notes/:id", deleteNote);

export default router;
