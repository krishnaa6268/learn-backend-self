import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./connection.js";
import { logReqRes } from "./midlewares/index.js";

const app = express();
const PORT = 8000;

// connection
connectDB("mongodb://127.0.0.1:27017/my-users");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt")); // Custom middleware to log requests and responses

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
