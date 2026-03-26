import express, { Request, Response } from "express";
import urlRoutes from "./routes/url.js";
import staticRoutes from "./routes/staticRouter.js";
import { connectDB } from "./connection.js";
import { logReqRes } from "./midlewares/index.js";
import { URL } from "./models/url.js";
import { handleGetAnalytics } from "./controllers/url.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = 8001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt"));

app.get("/test", async (req: Request, res: Response) => {
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoutes);
app.use("/", staticRoutes);

app.get("/analytics/:shortId", handleGetAnalytics);
app.get("/:shortId", async (req: Request, res: Response) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },
  );

  if (!entry) {
    res.status(404).send("URL not found");
    return;
  }

  res.redirect(entry.redirectUrl);
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("server is running...", PORT);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("MongoDB Connection Failed:", message);
    process.exit(1);
  }
};

void startServer();
