import express from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
} from "../controllers/userController.js";

const router = express.Router();

router
  .post("/signup", handleUserSignup)
  .post("/login", handleUserLogin)
  .post("/logout", handleUserLogout);

export default router;
