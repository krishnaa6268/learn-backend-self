import express from "express";
import path from "path";
import "dotenv/config";
import connectMongoDB from "./conection.js";

import staticRoute from "./routes/staticRoutes.js";
import noteRoute from "./routes/noteRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { authCheckLoginOnly } from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;
const mongoDbUrl = process.env.MONGO_URL;
connectMongoDB(mongoDbUrl);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/", authCheckLoginOnly, noteRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
