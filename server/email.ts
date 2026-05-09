import { Resend } from "resend";

export async function sendEmail(subject: string, body: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "DSPOps <onboarding@resend.dev>",
    to: process.env.NOTIFY_EMAIL || "rashid@dspops.app",
    subject,
    text: body,
  });
}
