import { Router, Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";
import { nanoid } from "nanoid";
import pool from "../db.js";

const router = Router();

// In-memory token store (simple, resets on server restart)
const validTokens = new Set<string>();

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

  const token = nanoid(32);
  validTokens.add(token);
  res.json({ success: true, token });
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    validTokens.delete(auth.slice(7));
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
  if (!validTokens.has(token)) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

// GET /api/admin/waitlist
router.get("/waitlist", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, phone, created_at FROM waitlist ORDER BY created_at DESC`
    );
    res.json({ entries: result.rows, total: result.rowCount });
  } catch (err) {
    console.error("Admin waitlist fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
