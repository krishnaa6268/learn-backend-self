import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

interface CreateShortUrlRequestBody {
  url?: string;
}

export async function handleGenerateNewShortURL(
  req: Request<{}, {}, CreateShortUrlRequestBody>,
  res: Response,
): Promise<void> {
  try {
    console.log("BODY:", req.body);

    const { url } = req.body;

    if (!url) {
      res.status(400).json({ error: "Url is required." });
      return;
    }

    const shortId = nanoid(8);

    const result = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    console.log("Saved:", result);

    res.render("home", { id: shortId });
    // return res.json({ id: shortId });
  } catch (error) {
    console.error("ERROR:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
}

export async function handleGetAnalytics(
  req: Request<{ shortId: string }>,
  res: Response,
): Promise<void> {
  const { shortId } = req.params;

  const result = await URL.findOne({ shortId });

  if (!result) {
    res.status(404).json({ error: "URL not found" });
    return;
  }

  res.status(200).json({
    totalClicks: result.visitHistory.length,
  });
}
