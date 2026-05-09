import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(subject: string, body: string): Promise<void> {
  await resend.emails.send({
    from: "DSPOps <onboarding@resend.dev>",
    to: process.env.NOTIFY_EMAIL || "rashid@dspops.app",
    subject,
    text: body,
  });
}
