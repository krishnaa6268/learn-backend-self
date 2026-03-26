import { URL } from "../models/url.js";
import { nanoid } from "nanoid";

async function handleGenerateNewShortURL(req, res) {
  try {
    console.log("BODY:", req.body);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Url is required." });
    }

    const shortId = nanoid(8);

    const result = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    console.log("Saved:", result);

    return res.json({ id: shortId });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
  });
}

export { handleGenerateNewShortURL, handleGetAnalytics };
