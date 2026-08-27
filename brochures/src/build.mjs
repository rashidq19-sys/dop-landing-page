// Builds both sales brochures from their templates.
//
//   node brochures/src/build.mjs
//
// Each template is body-only HTML with {{IMG:key}} placeholders. Images are
// pre-compressed WebP data URIs in assets.json, so the output is one
// self-contained file with no asset routes and no build step of its own.
//
// Two outputs per brochure:
//   brochures/<name>/...       body-only, for publishing as a Claude Artifact
//   client/public/<file>.html  full HTML document, served at dspops.app/<file>
//   dist/public/<file>.html    the SAME file — Railway runs only build:server
//                              for this service and serves the committed dist,
//                              so client/public alone never reaches production.
import fs from "fs";
import path from "path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const REPO = path.resolve(HERE, "..", "..");
const assets = JSON.parse(fs.readFileSync(path.join(HERE, "assets.json"), "utf8"));

const BROCHURES = [
  {
    template: "sbl.template.html",
    artifact: "brochures/sbl/dspops-sbl-brochure-short.html",
    page: "sbl.html",
    description: "DSPOps — the UK-built operations platform for delivery fleets. Prepared for SBL Couriers.",
    og: "Run every driver and depot from one screen. Prepared for SBL Couriers.",
  },
  {
    template: "generic.template.html",
    artifact: "brochures/generic/dspops-brochure.html",
    page: "brochure.html",
    description: "DSPOps — the UK-built operations platform for Amazon DSPs and delivery fleets. Rota, dispatch, check-in, onboarding, van checks, compliance and driver invoicing in one place.",
    og: "Run every driver and depot from one screen. Operations software for UK delivery fleets.",
  },
];

for (const b of BROCHURES) {
  let body = fs.readFileSync(path.join(HERE, b.template), "utf8");

  const missing = [];
  body = body.replace(/\{\{IMG:([a-zA-Z]+)\}\}/g, (m, k) => {
    if (!assets[k]) { missing.push(k); return m; }
    return assets[k];
  });
  if (missing.length) {
    console.error(`${b.template}: missing image keys: ${[...new Set(missing)].join(", ")}`);
    process.exit(1);
  }

  // 1. Artifact copy keeps the raw <title>/<link> lines the platform expects.
  const artifactPath = path.join(REPO, b.artifact);
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
  fs.writeFileSync(artifactPath, body, "utf8");

  // 2. Standalone document: lift <title> and <link> into a real <head>.
  const title = (body.match(/^<title>([^<]*)<\/title>/) || [, "DSPOps"])[1];
  let s = body.replace(/^<title>[^<]*<\/title>\s*/, "");
  const links = [];
  s = s.replace(/^<link [^>]*>\s*/gm, (m) => { links.push(m.trim()); return ""; });

  const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${b.description}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#071231">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${b.og}">
<meta property="og:type" content="website">
${links.join("\n")}
</head>
<body>
${s.trim()}
</body>
</html>
`;

  for (const dir of ["client/public", "dist/public"]) {
    fs.writeFileSync(path.join(REPO, dir, b.page), doc, "utf8");
  }
  console.log(`${b.page.padEnd(14)} ${Math.round(doc.length / 1024)}KB -> client/public, dist/public, ${b.artifact}`);
}
console.log("\nBoth brochures are noindex + disallowed in robots.txt. Keep it that way.");
