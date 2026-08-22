import { nanoid } from "nanoid";

// Admin session tokens, shared between routes/admin.ts and routes/adminChat.ts.
//
// This lived as a module-private Set inside routes/admin.ts, which meant the
// chat routes had no way to recognise a logged-in admin. Same behaviour as
// before, just reachable from both places.
//
// Still in memory, so every server restart signs the admin out. That is why the
// chat links in the escalation emails are signed and stateless instead (see
// chatLinks.ts) — a link that died on the next deploy would be useless.

const validTokens = new Set<string>();

export function issueAdminToken(): string {
  const token = nanoid(32);
  validTokens.add(token);
  return token;
}

export function isValidAdminToken(token: string): boolean {
  return typeof token === "string" && token.length > 0 && validTokens.has(token);
}

export function revokeAdminToken(token: string): void {
  validTokens.delete(token);
}

/** Reads a Bearer token off the request and says whether it is a live session. */
export function hasValidBearer(authorization: string | undefined): boolean {
  if (!authorization?.startsWith("Bearer ")) return false;
  return isValidAdminToken(authorization.slice(7));
}
