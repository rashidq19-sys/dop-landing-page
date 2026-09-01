import { Router } from "express";
import pool from "../db.js";
import { sendEmail, sendVisitorEmail } from "../email.js";
import { buildWaitlistEmailHtml } from "../emailShell.js";

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
    void pool.query(
      `UPDATE waitlist SET welcome_email_sent_at = now()
       WHERE id = $1 AND welcome_email_sent_at IS NULL
       RETURNING email, name, dsp_name`,
      [id]
    ).then((welcomeResult) => {
      const welcomeRow = welcomeResult.rows[0];
      if (!welcomeRow) return;

      return sendVisitorEmail({
        to: welcomeRow.email,
        subject: "Welcome to DSPOps",
        html: buildWaitlistEmailHtml({
          name: welcomeRow.name,
          variant: "welcome",
        }),
      });
    }).catch((err) => console.error("Visitor welcome email failed (step 2):", err));

    sendEmail(
      "DSPOps signup complete — Step 2 (full details)",
      `A signup has been completed.\n\nDSP name: ${cleanDspName || "—"}\nContact name: ${cleanName || "—"}\nEmail: ${row.email}\nPhone: ${cleanPhone}\nSignup source: ${row.source || "unknown"}`
    ).catch((err) => console.error("Notification email failed (step 2):", err));
  } catch (err) {
    console.error("Waitlist update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/waitlist/:id/demo-booked — Step 3: they picked a slot in the
// embedded Cal.com calendar. Cal.com owns the booking itself (invites,
// reminders, the calendar entry); this only records against the lead that a
// demo was booked, so the admin list can tell a booked lead from a cold one.
router.post("/:id/demo-booked", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Cal.com reports the slot start; treat anything unparseable as absent
  // rather than failing the request — the booking itself is already made.
  const rawStart = req.body?.startTime;
  const parsedStart = typeof rawStart === "string" ? new Date(rawStart) : null;
  const slotAt = parsedStart && !isNaN(parsedStart.getTime()) ? parsedStart.toISOString() : null;

  // Cal.com's own reference for the booking, used to build a link Rashid can
  // open to reschedule or cancel. Restricted to the characters Cal.com uses so
  // it cannot be turned into some other URL.
  const rawUid = req.body?.uid;
  const bookingUid =
    typeof rawUid === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(rawUid) ? rawUid : null;

  try {
    const result = await pool.query(
      `UPDATE waitlist
       SET demo_booked_at = NOW(),
           demo_slot_at = COALESCE($1::timestamptz, demo_slot_at),
           updated_at = NOW()
       WHERE id = $2
       RETURNING email, name, dsp_name, phone`,
      [slotAt, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ success: true });

    const row = result.rows[0];
    const slotLabel = slotAt
      ? new Date(slotAt).toLocaleString("en-GB", {
          timeZone: "Europe/London",
          dateStyle: "full",
          timeStyle: "short",
        }) + " (UK time)"
      : "see the Cal.com confirmation";

    sendEmail(
      "Demo booked — DSPOps website",
      `Someone booked a demo slot from the website.\n\n` +
        `DSP name: ${row.dsp_name || "—"}\n` +
        `Contact name: ${row.name || "—"}\n` +
        `Email: ${row.email}\n` +
        `Phone: ${row.phone || "—"}\n` +
        `Slot: ${slotLabel}\n\n` +
        `Cal.com has sent the calendar invite and will send the reminders.` +
        (bookingUid ? `\n\nView, reschedule or cancel: https://cal.com/booking/${bookingUid}` : "")
    ).catch((err) => console.error("Notification email failed (demo booked):", err));
  } catch (err) {
    console.error("Demo booking update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
