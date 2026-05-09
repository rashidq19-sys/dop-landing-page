import { Resend } from "resend";

export async function sendEmail(subject: string, body: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL || "rashid@dspops.app";

  if (!apiKey) {
    console.error("[email] RESEND_API_KEY is not set — skipping notification");
    return;
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: "DSPOps <onboarding@resend.dev>",
    to: toEmail,
    subject,
    text: body,
  });

  if (error) {
    console.error("[email] Resend API error:", JSON.stringify(error));
  } else {
    console.log(`[email] Sent OK — id: ${data?.id}, to: ${toEmail}`);
  }
}
