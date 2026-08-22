import { Router, Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";
import pool from "../db.js";
import { issueAdminToken, isValidAdminToken, revokeAdminToken } from "../lib/adminTokens.js";

const router = Router();

// The token store moved to server/lib/adminTokens.ts so the chat routes can
// recognise a logged-in admin too. Still in memory — a restart signs you out.

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: "Admin password not configured" });
  }

  if (typeof password !== "string" || password.length !== adminPassword.length ||
      !timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword))) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ success: true, token: issueAdminToken() });
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    revokeAdminToken(auth.slice(7));
  }
  res.json({ success: true });
});

// Middleware: verify admin token
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = auth.slice(7);
  if (!isValidAdminToken(token)) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

// GET /api/admin/waitlist
router.get("/waitlist", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, dsp_name, phone, source, created_at FROM waitlist ORDER BY created_at DESC`
    );
    res.json({ entries: result.rows, total: result.rowCount });
  } catch (err) {
    console.error("Admin waitlist fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/admin/waitlist/:id
router.delete("/waitlist/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const result = await pool.query(`DELETE FROM waitlist WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Admin waitlist delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/stats — site traffic summary from the page_views table.
// All day buckets use Europe/London so "today" matches the user's clock.
// Note: a window's "unique visitors" is COUNT(DISTINCT visitor_id) over that
// whole window, so it intentionally does NOT equal the sum of the daily unique
// figures (someone who visits on 3 days counts once in the 30-day total but
// appears in 3 daily rows).
router.get("/stats", requireAuth, async (_req, res) => {
  try {
    const [headline, daily, byPage] = await Promise.all([
      pool.query(`
        WITH t AS (SELECT (now() AT TIME ZONE 'Europe/London')::date AS today),
        v AS (
          SELECT visitor_id, (created_at AT TIME ZONE 'Europe/London')::date AS day
          FROM page_views
        )
        SELECT
          to_char(t.today, 'YYYY-MM-DD') AS today,
          COUNT(v.visitor_id)            FILTER (WHERE v.day = t.today)        AS pv_today,
          COUNT(DISTINCT v.visitor_id)   FILTER (WHERE v.day = t.today)        AS uv_today,
          COUNT(v.visitor_id)            FILTER (WHERE v.day >= t.today - 6)   AS pv_7,
          COUNT(DISTINCT v.visitor_id)   FILTER (WHERE v.day >= t.today - 6)   AS uv_7,
          COUNT(v.visitor_id)            FILTER (WHERE v.day >= t.today - 29)  AS pv_30,
          COUNT(DISTINCT v.visitor_id)   FILTER (WHERE v.day >= t.today - 29)  AS uv_30,
          COUNT(v.visitor_id)                                                  AS pv_all,
          COUNT(DISTINCT v.visitor_id)                                         AS uv_all
        FROM t LEFT JOIN v ON true
        GROUP BY t.today
      `),
      pool.query(`
        SELECT to_char(day, 'YYYY-MM-DD') AS day,
               COUNT(*)                   AS page_views,
               COUNT(DISTINCT visitor_id) AS unique_visitors
        FROM (
          SELECT visitor_id, (created_at AT TIME ZONE 'Europe/London')::date AS day
          FROM page_views
        ) v
        WHERE day >= (now() AT TIME ZONE 'Europe/London')::date - 29
        GROUP BY day
        ORDER BY day DESC
      `),
      pool.query(`
        SELECT path,
               COUNT(*)                   AS page_views,
               COUNT(DISTINCT visitor_id) AS unique_visitors
        FROM (
          SELECT visitor_id, path, (created_at AT TIME ZONE 'Europe/London')::date AS day
          FROM page_views
        ) v
        WHERE day >= (now() AT TIME ZONE 'Europe/London')::date - 29
        GROUP BY path
        ORDER BY page_views DESC, path ASC
        LIMIT 50
      `),
    ]);

    const h = headline.rows[0] || {};
    const n = (x: unknown) => Number(x) || 0;

    res.json({
      summary: {
        today: { uniqueVisitors: n(h.uv_today), pageViews: n(h.pv_today) },
        last7Days: { uniqueVisitors: n(h.uv_7), pageViews: n(h.pv_7) },
        last30Days: { uniqueVisitors: n(h.uv_30), pageViews: n(h.pv_30) },
        allTime: { uniqueVisitors: n(h.uv_all), pageViews: n(h.pv_all) },
      },
      daily: daily.rows.map((r) => ({
        day: r.day,
        uniqueVisitors: n(r.unique_visitors),
        pageViews: n(r.page_views),
      })),
      byPage: byPage.rows.map((r) => ({
        path: r.path,
        uniqueVisitors: n(r.unique_visitors),
        pageViews: n(r.page_views),
      })),
    });
  } catch (err) {
    console.error("Admin stats fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
