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
    from: "DSPOps <notifications@dspops.app>",
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

export async function sendVisitorEmail({
  to,
  subject,
  html,
  replyTo = process.env.VISITOR_EMAIL_REPLY_TO || "rashid@dspops.app",
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[email] RESEND_API_KEY is not set — skipping visitor email");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "DSPOps <notifications@dspops.app>",
      to,
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error("[email] Resend visitor email API error:", JSON.stringify(error));
    } else {
      console.log(`[email] Visitor email sent OK — id: ${data?.id}, to: ${to}`);
    }
  } catch (err) {
    console.error("[email] Visitor email failed:", err);
  }
}
