// Deliberate copy of F:\Github-DOP\dop-app\server\services\agreementEmails.ts
// → buildAgreementEmailHtml. Keep the two email themes in sync manually.

const BRAND_BLUE = "#2f6feb";
const INK = "#111827";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

/** Plain paragraphs (blank-line separated) → styled <p> tags. */
export function paragraphsToHtml(message: string): string {
  return message
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#333333;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`,
    )
    .join("\n");
}

function paragraphs(...parts: Array<string | null | undefined>): string {
  return parts.map((p) => (p ?? "").trim()).filter(Boolean).join("\n\n");
}

interface EmailShellOptions {
  banner: { text: string; tone: "green" | "blue" | "red" };
  bodyHtml: string;
  button: { label: string; url: string };
}

function buildEmailHtml(options: EmailShellOptions): string {
  const bannerColors =
    options.banner.tone === "green"
      ? { bg: "#e8f5ec", fg: "#1e7e42" }
      : options.banner.tone === "red"
        ? { bg: "#fdeaea", fg: "#b42318" }
        : { bg: "#eaf1fe", fg: "#2456c4" };

  const bannerHtml = `<tr><td style="background:${bannerColors.bg};padding:10px 40px;text-align:center;">
         <span style="font-size:13px;font-weight:bold;color:${bannerColors.fg};">${escapeHtml(options.banner.text)}</span>
       </td></tr>`;

  const buttonHtml = `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
         <tr><td style="border-radius:6px;background:${BRAND_BLUE};">
           <a href="${escapeHtml(options.button.url)}" target="_blank"
              style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">
             ${escapeHtml(options.button.label)}
           </a>
         </td></tr>
       </table>`;

  const signoffHtml = `<p style="margin:24px 0 4px 0;font-size:15px;line-height:1.6;color:#333333;">Best regards,</p>
       <p style="margin:0;font-size:15px;line-height:1.6;color:${INK};font-weight:bold;">Rashid</p>
       <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:#6b7280;">Director, Layerform System Ltd</p>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f1f3f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f5;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:34px 40px 22px 40px;text-align:center;">
          <span style="font-size:30px;font-weight:bold;color:${INK};font-family:Arial,Helvetica,sans-serif;">DSP<span style="color:${BRAND_BLUE};">Ops</span></span>
        </td></tr>
        ${bannerHtml}
        <tr><td style="padding:30px 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;">
          ${options.bodyHtml}
          ${buttonHtml}
          ${signoffHtml}
        </td></tr>
        <tr><td style="padding:20px 40px 30px 40px;">
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 18px 0;"/>
          <p style="margin:0 0 6px 0;font-size:12px;color:#8a94a1;text-align:center;font-family:Arial,Helvetica,sans-serif;">
            You're receiving this because you signed up for DSPOps at dspops.app.
          </p>
          <p style="margin:0 0 6px 0;font-size:12px;color:#8a94a1;text-align:center;font-family:Arial,Helvetica,sans-serif;">
            Layerform System Ltd &bull; England &amp; Wales
          </p>
          <p style="margin:0;font-size:12px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
            <a href="https://dspops.app" style="color:${BRAND_BLUE};text-decoration:none;">dspops.app</a>
            <span style="color:#8a94a1;">&nbsp;&bull;&nbsp;</span>
            <a href="mailto:support@dspops.app" style="color:${BRAND_BLUE};text-decoration:none;">support@dspops.app</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export type WaitlistEmailVariant = "welcome" | "phone-nudge";

export function buildWaitlistEmailHtml({
  name,
  variant,
}: {
  name: string | null | undefined;
  variant: WaitlistEmailVariant;
}): string {
  const firstName = name?.trim().split(/\s+/)[0];
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const noPhone = variant === "phone-nudge";

  const bodyHtml = paragraphsToHtml(
    paragraphs(
      greeting,
      noPhone
        ? "Thanks for joining the DSPOps waitlist. We'd like to speak to you, so please reply to this email with your phone number."
        : "Thanks for joining the DSPOps waitlist. We've got your number, and someone will be in touch shortly.",
      noPhone
        ? "When you reply, it would also help to know:\nWhich station(s) do you operate out of?\nHow many drivers do you run?\nWhich programme are you on — 1.0 or 2.0?"
        : "In the meantime, it would help to know:\nWhich station(s) do you operate out of?\nHow many drivers do you run?\nWhich programme are you on — 1.0 or 2.0?",
    ),
  );

  return buildEmailHtml({
    banner: { text: noPhone ? "We'd like to speak to you" : "Welcome to DSPOps", tone: "blue" },
    bodyHtml,
    button: { label: "Visit DSPOps", url: "https://dspops.app" },
  });
}
