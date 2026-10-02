import pool from "./db.js";
import { sendVisitorEmail } from "./email.js";
import { buildWaitlistEmailHtml } from "./emailShell.js";

/**
 * The "add your phone number" nudge, sent to a sign-up who has not given one
 * within 5 minutes.
 *
 * This used to be a sweep every 2 minutes, and that query alone stopped the
 * Neon compute from ever reaching its 5-minute idle suspend, so the database was
 * billed around the clock for a form that gets a few sign-ups a day. Now each
 * sign-up schedules its own check just after the 5 minutes are up, and a
 * half-hourly sweep catches anything a restart dropped. Anything that queries
 * every 5 minutes or less keeps Neon awake.
 */
const NUDGE_AFTER_SIGNUP_MS = 5.5 * 60_000;
const BACKSTOP_MS = 30 * 60_000;

export async function sendPhoneNudges() {
  try {
    const result = await pool.query(`
      SELECT id, email, name, dsp_name FROM waitlist
      WHERE phone IS NULL
        AND phone_nudge_sent_at IS NULL
        AND welcome_email_sent_at IS NULL
        AND created_at < now() - interval '5 minutes'
        AND created_at > now() - interval '1 day'
    `);

    for (const row of result.rows) {
      try {
        const claimResult = await pool.query(
          `UPDATE waitlist SET phone_nudge_sent_at = now()
           WHERE id = $1 AND phone_nudge_sent_at IS NULL AND phone IS NULL
           RETURNING email, name, dsp_name`,
          [row.id]
        );
        const claimedRow = claimResult.rows[0];
        if (!claimedRow) continue;

        await sendVisitorEmail({
          to: claimedRow.email,
          subject: "Welcome to DSPOps",
          html: buildWaitlistEmailHtml({
            name: claimedRow.name,
            variant: "phone-nudge",
          }),
        });
      } catch (err) {
        console.error("Visitor phone-nudge email failed:", err);
      }
    }
  } catch (err) {
    console.error("Phone-nudge sweeper failed:", err);
  }
}

/** Call after a sign-up is saved. */
export function scheduleNudgeAfterSignup(): void {
  setTimeout(() => void sendPhoneNudges(), NUDGE_AFTER_SIGNUP_MS);
}

/** Sweep at boot, then on the :00 and :30 marks. */
export function startPhoneNudgeBackstop(): void {
  void sendPhoneNudges();
  const untilBoundary = BACKSTOP_MS - (Date.now() % BACKSTOP_MS);
  setTimeout(() => {
    void sendPhoneNudges();
    setInterval(() => void sendPhoneNudges(), BACKSTOP_MS);
  }, untilBoundary);
}
