import { Router } from "express";
import pool from "../db.js";
import { sendEmail } from "../email.js";

const router = Router();

// POST /api/waitlist — Step 1: capture email
router.post("/", async (req, res) => {
  const { email, source } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const cleanEmail = email.toLowerCase().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const cleanSource = typeof source === "string" ? source.trim() : null;
    const cleanDspName = typeof req.body.dsp_name === "string" ? req.body.dsp_name.trim() : null;
    const result = await pool.query(
      `INSERT INTO waitlist (email, source, dsp_name) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET dsp_name = COALESCE($3, waitlist.dsp_name), updated_at = NOW()
       RETURNING id`,
      [cleanEmail, cleanSource, cleanDspName || null]
    );
    res.json({ success: true, id: result.rows[0].id });

    sendEmail(
      "New DSPOps signup — Step 1 (email captured)",
      `A new visitor has joined the waitlist.\n\nEmail: ${cleanEmail}\nDSP name: ${cleanDspName || "—"}\nSignup source: ${cleanSource || "unknown"}`
    ).catch((err) => console.error("Notification email failed (step 1):", err));
  } catch (err) {
    console.error("Waitlist insert error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/waitlist/:id — Step 2: add details (name, dsp_name, phone)
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const { name, dsp_name, phone } = req.body;

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({ error: "Phone is required" });
  }

  const cleanName = typeof name === "string" ? name.trim() : null;
  const cleanDspName = typeof dsp_name === "string" ? dsp_name.trim() : null;
  const cleanPhone = phone.trim();

  try {
    const result = await pool.query(
      `UPDATE waitlist
       SET name = COALESCE($1, name),
           dsp_name = COALESCE($2, dsp_name),
           phone = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, email, source`,
      [cleanName || null, cleanDspName || null, cleanPhone, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ success: true });

    const row = result.rows[0];
    sendEmail(
      "DSPOps signup complete — Step 2 (full details)",
      `A signup has been completed.\n\nDSP name: ${cleanDspName || "—"}\nContact name: ${cleanName || "—"}\nEmail: ${row.email}\nPhone: ${cleanPhone}\nSignup source: ${row.source || "unknown"}`
    ).catch((err) => console.error("Notification email failed (step 2):", err));
  } catch (err) {
    console.error("Waitlist update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
