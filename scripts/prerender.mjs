/**
 * Build-time prerenderer.
 *
 * Walks the public route list, renders each one via Puppeteer using a local
 * `vite preview` server, and writes the resulting HTML to
 * `dist/public/<route>/index.html`. Express then serves these files at the
 * matching path so crawlers see fully-rendered HTML without running JS.
 *
 * Notes:
 * - Only public marketing routes are prerendered. /admin and /download are
 *   not prerendered (auth / redirect).
 * - On failure of any single route, the script continues with the others
 *   so a flaky render doesn't fail the whole build. A summary is printed
 *   at the end with any errors.
 */

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_PUBLIC = path.join(PROJECT_ROOT, "dist", "public");

const ROUTES = [
  "/",
  "/amazon-dsp-management-software",
  "/driver-performance-tracking",
  "/van-inspection-app",
  "/dsp-rota-management",
  "/dsp-invoicing-payroll",
  "/dsp-compliance-tools",
  "/blog",
  "/blog/van-inspection-compliance-amazon-dsp",
  "/blog/reduce-driver-turnover-amazon-dsp",
  "/blog/how-to-onboard-new-drivers-amazon-dsp",
  "/blog/amazon-cortex-dcr-score",
  "/blog/improve-amazon-cortex-scorecard",
  "/privacy",
];

const PORT = process.env.PRERENDER_PORT ? Number(process.env.PRERENDER_PORT) : 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === "win32";
    const proc = spawn(
      isWin ? "npx.cmd" : "npx",
      ["vite", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
      { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "pipe"], shell: isWin }
    );

    let resolved = false;
    const readyMatcher = /Local:\s+http/i;
    const onData = (chunk) => {
      const text = chunk.toString();
      if (!resolved && readyMatcher.test(text)) {
        resolved = true;
        resolve(proc);
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (!resolved) {
        reject(new Error(`vite preview exited with code ${code} before ready`));
      }
    });

    // Fallback: assume ready after 5s if we never saw the banner
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(proc);
      }
    }, 5000);
  });
}

function stopPreviewServer(proc) {
  return new Promise((resolve) => {
    if (!proc || proc.killed) return resolve();
    proc.once("exit", () => resolve());
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(proc.pid), "/f", "/t"]);
    } else {
      proc.kill("SIGTERM");
    }
    // Hard cutoff so the build doesn't hang
    setTimeout(() => resolve(), 5000);
  });
}

function writeRouteHtml(route, html) {
  const rel = route === "/" ? "" : route.replace(/^\//, "");
  const dir = rel ? path.join(DIST_PUBLIC, rel) : DIST_PUBLIC;
  mkdirSync(dir, { recursive: true });
  // For "/" we already have the root index.html from Vite; rewrite it with the
  // hydrated version. For other routes, write <route>/index.html.
  const target = path.join(dir, "index.html");
  writeFileSync(target, html, "utf-8");
  return target;
}

async function prerender() {
  console.log("[prerender] starting vite preview…");
  const server = await startPreviewServer();
  let browser;
  const errors = [];

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent("DSPOps-Prerender/1.0 (+https://dspops.app)");
    // Block analytics during prerender so we don't pollute metrics
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("umami") || url.includes("google-analytics")) return req.abort();
      return req.continue();
    });

    for (const route of ROUTES) {
      const url = `${ORIGIN}${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        // Small extra wait for any async hydration (usePageMeta effects)
        await new Promise((r) => setTimeout(r, 300));
        const html = await page.content();
        const target = writeRouteHtml(route, html);
        console.log(`[prerender] ✓ ${route} → ${path.relative(PROJECT_ROOT, target)} (${(html.length / 1024).toFixed(1)} kB)`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push({ route, message });
        console.warn(`[prerender] ✗ ${route} — ${message}`);
      }
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
    await stopPreviewServer(server);
  }

  if (errors.length) {
    console.warn(`[prerender] completed with ${errors.length} error(s):`);
    for (const e of errors) console.warn(`  - ${e.route}: ${e.message}`);
    // Don't fail the build — better to ship without prerendered HTML for the
    // failed routes than to block deploys.
  } else {
    console.log("[prerender] done — all routes prerendered.");
  }
}

prerender().catch((err) => {
  console.error("[prerender] fatal:", err);
  // Exit 0 so a prerender failure doesn't block the build / deploy.
  process.exit(0);
});
