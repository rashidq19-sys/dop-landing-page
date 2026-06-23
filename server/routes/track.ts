import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Known bot / crawler / automation signatures. The client-side beacon already
// excludes non-JS bots, but this catches JS-capable crawlers, link previewers,
// and our own build-time prerenderer (HeadlessChrome) so they don't inflate the
// human visitor counts.
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|headless|puppeteer|playwright|lighthouse|pingdom|uptimerobot|monitor|curl|wget|python-requests|axios|node-fetch|go-http|facebookexternalhit|whatsapp|telegrambot|slackbot|discordbot|embedly|preview/i;

// POST /api/track — record one anonymous page view. Fire-and-forget: the client
// ignores the response, so failures never surface to the visitor.
router.post("/", async (req, res) => {
  const ua = req.headers["user-agent"] || "";
  if (BOT_UA.test(ua)) {
    return res.status(204).end();
  }

  const { path, visitorId } = req.body || {};
  if (typeof path !== "string" || typeof visitorId !== "string") {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // Normalise to a same-site path; drop query/hash. Ignore the admin area and
  // anything that doesn't look like a real site path.
  const cleanPath = path.split("?")[0].split("#")[0].trim();
  if (
    !cleanPath.startsWith("/") ||
    cleanPath.startsWith("/admin") ||
    cleanPath.startsWith("/api") ||
    cleanPath.length > 512
  ) {
    return res.status(204).end();
  }

  const cleanVisitor = visitorId.trim().slice(0, 64);
  if (!cleanVisitor) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    await pool.query(
      `INSERT INTO page_views (visitor_id, path) VALUES ($1, $2)`,
      [cleanVisitor, cleanPath]
    );
  } catch (err) {
    console.error("Track insert error:", err);
  }
  res.status(204).end();
});

export default router;
