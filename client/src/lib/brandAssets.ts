/**
 * Brand artwork lives at stable paths in `public/`, so when the artwork changes
 * the URL does not — and Express serves these with
 * `Cache-Control: public, max-age=31536000, immutable`. `immutable` tells the
 * browser never to revalidate, so a returning visitor keeps the old image for a
 * year and even a hard refresh will not shift it. That is exactly what happened
 * when the logo was replaced on 2026-08-24: the file on the server was correct
 * while everyone who had visited before still saw the previous mark.
 *
 * The server rule is now scoped to `/assets/` (Vite's content-hashed output),
 * but that only helps caches which have not already pinned a copy. For those,
 * the only way through is a different URL — hence the version below.
 *
 * Bump BRAND_ASSET_VERSION whenever any of these files is replaced in place.
 */
const BRAND_ASSET_VERSION = "2";

const v = (path: string) => `${path}?v=${BRAND_ASSET_VERSION}`;

/** Full lockup, black "DSP" — for light backgrounds. */
export const LOGO_LIGHT_BG = v("/logo.png");

/** Full lockup, white "DSP" — for dark backgrounds. */
export const LOGO_DARK_BG = v("/images/logo-on-dark.png");

/** Square mark on its own, for avatars and tight spaces. */
export const LOGO_MARK = v("/images/logo-mark.png");
