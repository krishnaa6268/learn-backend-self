import express from "express";
import urlRoutes from "./routes/url.js";
import { connectDB } from "./connection.js";
import { logReqRes } from "./midlewares/index.js";
import { URL } from "./models/url.js";
import { handleGetAnalytics } from "./controllers/url.js";

const app = express();
const PORT = 8001;

// connection
connectDB("mongodb://127.0.0.1:27017/short-url-tb");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt"));

app.use("/url", urlRoutes);
app.use("/analytics/:shortId", handleGetAnalytics);

app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  console.log("Data", entry);

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("server is running...", PORT);
});
