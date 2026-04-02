import { Router } from "express";
import pool from "../db.js";

const router = Router();

// POST /api/waitlist — Step 1: capture email
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO waitlist (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id`,
      [email.toLowerCase().trim()]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("Waitlist insert error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/waitlist/:id — Step 2: add name + phone
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({ error: "Phone is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE waitlist SET name = $1, phone = $2, updated_at = NOW() WHERE id = $3 RETURNING id`,
      [name.trim(), phone.trim(), id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Waitlist update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
