import express from "express";
import {
  showLoginPage,
  showSignupPage,
} from "../controllers/staticController.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   return res.render("home");
// });

router.get("/signup", showSignupPage);

router.get("/login", showLoginPage);

export default router;
