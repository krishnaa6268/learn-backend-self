import userModel from "../models/user.js";
import { setUser } from "../services/auth.js";

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render("signup", { msg: "All fields are required!" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("signup", { msg: "Email is already registered. Please log in." });
    }

    const user = await userModel.create({ name, email, password });
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("signup", { msg: "Error creating account. Please try again." });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { msg: "Email and password are required!" });
  }

  try {
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.render("login", { msg: "Invalid email or password!" });
    }

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("login", { msg: "Something went wrong. Please try again." });
  }
}

function handleUserLogout(req, res) {
  res.clearCookie("token");
  return res.redirect("/login");
}

export { handleUserLogin, handleUserLogout, handleUserSignup };
