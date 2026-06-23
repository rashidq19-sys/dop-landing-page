import "dotenv/config";
import express from "express";
import compression from "compression";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { initDb } from "./db.js";
import waitlistRoutes from "./routes/waitlist.js";
import adminRoutes from "./routes/admin.js";
import chatRoutes from "./routes/chat.js";
import trackRoutes from "./routes/track.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 301 redirects for the old /features/* URLs to the new keyword-targeted pages.
// Keeps any existing bookmarks/backlinks working while consolidating SEO signal
// onto the new single canonical URL per topic.
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/features/rota": "/dsp-rota-management",
  "/features/payroll": "/dsp-invoicing-payroll",
  "/features/scorecard": "/driver-performance-tracking",
};

// Allowlist of public SPA routes. Anything not here, not /api/*, and not a
// static file gets a real 404 status (instead of the SPA's soft-404 default).
const PUBLIC_ROUTE_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/admin$/,
  /^\/privacy$/,
  /^\/download$/,
  /^\/amazon-dsp-management-software$/,
  /^\/driver-performance-tracking$/,
  /^\/van-inspection-app$/,
  /^\/dsp-rota-management$/,
  /^\/dsp-invoicing-payroll$/,
  /^\/dsp-compliance-tools$/,
  /^\/blog$/,
  /^\/blog\/[a-z0-9-]+$/,
];

function isKnownRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_PATTERNS.some((re) => re.test(pathname));
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Gzip/Brotli compression for all responses.
  app.use(compression());

  // Parse JSON request bodies
  app.use(express.json());

  // Initialize database
  await initDb();

  // 301 redirects (must come before API + static)
  app.get(Object.keys(PERMANENT_REDIRECTS), (req, res) => {
    const target = PERMANENT_REDIRECTS[req.path];
    if (target) {
      res.redirect(301, target);
    } else {
      res.status(404).end();
    }
  });

  // API routes
  app.use("/api/waitlist", waitlistRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/track", trackRoutes);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(
    express.static(staticPath, {
      // Don't auto-serve index.html for directories — we handle SPA routing below.
      index: false,
      // Don't auto-redirect /route → /route/ when the directory exists. The
      // canonical URL for each page has no trailing slash, and the catch-all
      // below serves the prerendered HTML directly. Without this flag, every
      // SEO page would 301-redirect on hit.
      redirect: false,
      // Set sensible cache headers for static assets; HTML stays uncached so
      // updates take effect immediately.
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        } else if (/\.(?:js|css|woff2?|png|jpg|jpeg|webp|svg|ico)$/.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // SPA + 404 handler.
  // For known public routes, serve the prerendered HTML if it exists, otherwise
  // fall back to the SPA shell (index.html).
  // For unknown routes, return a real 404 status with the SPA shell so React
  // renders the NotFound page (which adds noindex meta).
  app.get("*", (req, res) => {
    const pathname = req.path;

    if (pathname.startsWith("/api/")) {
      return res.status(404).json({ error: "Not found" });
    }

    // "/$" and its percent-encoded equivalent "/%24" are garbage URLs that were
    // indexed by Google before the 404 catch-all was added. 301-redirect them to
    // the homepage so Google deindexes them quickly rather than waiting for the
    // 404 + noindex signal to propagate.
    if (pathname === "/$" || pathname === "/%24") {
      return res.redirect(301, "/");
    }

    const known = isKnownRoute(pathname);

    if (known) {
      // Try a prerendered file at /<route>/index.html
      const rel = pathname === "/" ? "" : pathname.replace(/\/$/, "");
      const prerendered = path.join(staticPath, rel, "index.html");
      if (prerendered.startsWith(staticPath) && fs.existsSync(prerendered)) {
        res.setHeader("Cache-Control", "no-cache");
        return res.sendFile(prerendered);
      }
      return res.sendFile(path.join(staticPath, "index.html"));
    }

    // Unknown route — real 404 status with SPA shell so NotFound renders.
    res.status(404).sendFile(path.join(staticPath, "index.html"));
  });

  // In dev, Vite uses port 3000, so Express runs on 3001. In production, use PORT env.
  const port = process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
