import { createHmac, timingSafeEqual } from "crypto";

// One-click links into a single chat, for the escalation email.
//
// The ordinary admin token lives in an in-memory Set (server/routes/admin.ts)
// and is destroyed on every server restart, so a link mailed out would often be
// dead before it was clicked. These tokens are stateless instead.
//
// They are also scoped to ONE conversation: if the email is forwarded or the
// URL ends up in a referrer header, the holder can read and reply to that chat
// and nothing else — not the lead list, not the traffic stats, not another
// visitor's conversation.

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

function secret(): string {
  const value = process.env.CHAT_LINK_SECRET;
  if (!value) {
    throw new Error(
      "CHAT_LINK_SECRET is not set — chat links cannot be signed. Set it in .env and on Railway."
    );
  }
  return value;
}

// The expiry is inside the signed payload, so it cannot be extended by editing
// the token — a longer expiry produces a different signature.
function sign(publicId: string, expiry: number): string {
  return createHmac("sha256", secret())
    .update(`${publicId}.${expiry}`)
    .digest("base64url");
}

export function signChatLink(publicId: string, ttlMs: number = DEFAULT_TTL_MS): string {
  const expiry = Date.now() + ttlMs;
  return `${expiry}.${sign(publicId, expiry)}`;
}

export function verifyChatLink(publicId: string, token: string): boolean {
  if (typeof token !== "string" || !token.includes(".")) return false;

  const separator = token.indexOf(".");
  const expiry = Number(token.slice(0, separator));
  const signature = token.slice(separator + 1);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expected = Buffer.from(sign(publicId, expiry));
  const given = Buffer.from(signature);
  // timingSafeEqual throws on a length mismatch, so check that first.
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function chatLinkUrl(publicId: string): string {
  const base = process.env.PUBLIC_BASE_URL || "https://dspops.app";
  return `${base}/admin/chat/${publicId}?k=${signChatLink(publicId)}`;
}
