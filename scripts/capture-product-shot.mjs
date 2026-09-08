/**
 * Capture the Rota Management grid from the Aurora Logistics DEMO client for
 * the marketing site. Aurora's people are fabricated, which is the whole reason
 * the shot comes from there and not from a live DSP.
 *
 * Matches the house style of the other shots in client/public/images/product/:
 * the grid card ONLY — no sidebar, no app header, no legend.
 *
 * Run from the marketing repo (it owns the puppeteer dependency):
 *   node <this file> <appOrigin> <bearerToken> <out.webp>
 */
import puppeteer from 'puppeteer';

const [, , ORIGIN, TOKEN, OUT] = process.argv;
if (!ORIGIN || !TOKEN || !OUT) {
  console.error('usage: node capture-rota.mjs <origin> <token> <out.webp>');
  process.exit(1);
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1100, deviceScaleFactor: 2 });

// Load the origin once so localStorage is writable, drop any httpOnly cookie
// session (a lingering super_admin cookie outranks the token and lands on a
// client picker instead of the grid), then set the bearer.
await page.goto(`${ORIGIN}/`, { waitUntil: 'networkidle2' });
await page.evaluate(async (token) => {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
  localStorage.setItem('authToken', token);
}, TOKEN);

await page.goto(`${ORIGIN}/rota-management`, { waitUntil: 'networkidle2' });
await page.waitForFunction(() => document.body.innerText.includes('Ride Along'), { timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));

// The grid card is the SMALLEST element containing both a day header and a
// driver code — going by class names would break the next time the grid is
// restyled, and this shot needs to be re-takeable.
const box = await page.evaluate(() => {
  const candidates = [...document.querySelectorAll('div')].filter((el) => {
    const t = el.innerText || '';
    return t.includes('TUE') && t.includes('DRV007') && t.includes('DA');
  });
  if (!candidates.length) return null;
  const el = candidates[candidates.length - 1];
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
if (!box) throw new Error('Could not locate the rota grid card');

await page.screenshot({
  path: OUT,
  type: 'webp',
  quality: 90,
  clip: {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(box.width, 1500 - box.x),
    height: Math.min(box.height, 1100 - box.y),
  },
});
console.log('saved', OUT, `${Math.round(box.width)}x${Math.round(box.height)} css px`);
await browser.close();
