# Google Search Console — Submission Checklist for dspops.app

**Owner:** Rashid · **Last updated:** 2026-05-18

This file is the manual playbook for getting dspops.app indexed in Google. The code/project side is done — sitemap, robots.txt, per-page metadata, prerendered HTML, 301 redirects from old `/features/*` URLs, real 404s for unknown routes, and the GSC steps below need to be run **after the latest build is deployed to production**.

> ⚠️ **Before doing any of this: deploy the current `main` branch to Railway.**
> A spot check of `https://dspops.app/sitemap.xml` showed the live sitemap still listed the old `/features/rota`, `/features/payroll`, `/features/scorecard` URLs and no new SEO pages. The new sitemap and metadata only take effect after a deploy.

---

## 0. URLs and assets reference

| What | URL |
|---|---|
| Sitemap | https://dspops.app/sitemap.xml |
| robots.txt | https://dspops.app/robots.txt |
| OG image | https://dspops.app/og-image.png |

**Public pages to be indexed:**

| Page | URL |
|---|---|
| Homepage | https://dspops.app/ |
| Pillar — DSP management software | https://dspops.app/amazon-dsp-management-software |
| Driver performance tracking | https://dspops.app/driver-performance-tracking |
| Van inspection app | https://dspops.app/van-inspection-app |
| DSP rota management | https://dspops.app/dsp-rota-management |
| Invoicing & payroll | https://dspops.app/dsp-invoicing-payroll |
| Compliance tools | https://dspops.app/dsp-compliance-tools |
| Blog index | https://dspops.app/blog |
| Cortex scorecard post | https://dspops.app/blog/improve-amazon-cortex-scorecard |
| Privacy | https://dspops.app/privacy |

**Pages that exist but are intentionally not indexed:** `/admin`, `/download` (disallowed in robots.txt), and any unknown route (returns 404 + `noindex` meta).

---

## 1. Add dspops.app as a Domain Property

1. Go to https://search.google.com/search-console
2. Click **"Add property"** → choose **"Domain"** (not URL prefix — domain covers both `www` and non-`www`, http and https, all subdomains)
3. Enter: `dspops.app`
4. Click **Continue**

---

## 2. Verify domain ownership via DNS

Google will show you a TXT record like:
```
google-site-verification=abc123XYZ...
```

1. Log in to whoever hosts the **DNS for dspops.app** (likely Cloudflare or your domain registrar — NOT Railway)
2. Add a new **TXT record**:
   - Type: `TXT`
   - Name: `@` (or leave blank — represents the root domain)
   - Value: the full `google-site-verification=...` string Google gave you
   - TTL: leave default
3. Save the record
4. Go back to Search Console and click **Verify**

> If verification fails: TXT records can take up to an hour to propagate. Wait 10–15 min and click Verify again. You can check propagation at https://dnschecker.org by searching `dspops.app` TXT.

---

## 3. Submit the sitemap

1. In Search Console, left sidebar → **Sitemaps**
2. Under "Add a new sitemap", enter: `sitemap.xml`
   (Full URL becomes `https://dspops.app/sitemap.xml` automatically)
3. Click **Submit**
4. Status should show **"Success"** within a minute (sometimes a few hours). If it says "Couldn't fetch" — check the deployment actually serves `https://dspops.app/sitemap.xml` (open it in your browser; it should show the XML)

---

## 4. Request indexing for each page

For each URL in the table below, use Search Console's **URL Inspection** tool to request indexing.

**Steps for each URL:**
1. Paste the URL into the search bar at the top of Search Console (the one labelled "Inspect any URL in dspops.app")
2. Wait for the result (10–30 sec)
3. If it says **"URL is not on Google"** → click **"Request Indexing"** → wait for the test to finish → confirmation
4. If it says **"URL is on Google"** → still click **"Request Indexing"** to nudge a recrawl after the new metadata deploys
5. Move to the next URL

> Google rate-limits this to ~10–12 URL submissions per day per property. Spread the submissions over 2 days if you hit the limit.

**Pages to submit:**
- [ ] https://dspops.app/
- [ ] https://dspops.app/amazon-dsp-management-software
- [ ] https://dspops.app/driver-performance-tracking
- [ ] https://dspops.app/van-inspection-app
- [ ] https://dspops.app/dsp-rota-management
- [ ] https://dspops.app/dsp-invoicing-payroll
- [ ] https://dspops.app/dsp-compliance-tools
- [ ] https://dspops.app/privacy
- [ ] https://dspops.app/blog
- [ ] https://dspops.app/blog/improve-amazon-cortex-scorecard

---

## 5. After Google starts crawling (3–14 days)

Check these reports in Search Console regularly during the first month:

### Pages report (left sidebar → "Pages")

Look at the **"Why pages aren't indexed"** breakdown. Watch for:

| Status | What it means | What to do |
|---|---|---|
| **Crawled — currently not indexed** | Google saw it but decided not to index. Usually thin content or low authority. | Wait 2–4 weeks; build backlinks; improve internal linking. Don't keep resubmitting. |
| **Discovered — currently not indexed** | Google knows the URL exists but hasn't crawled it yet. | Normal for new sites. Will resolve as crawl budget grows. |
| **Duplicate without user-selected canonical** | Two pages with very similar content. | The Home vs `/amazon-dsp-management-software` titles have been differentiated specifically to avoid this. If it still triggers, the description or H1 may need to be more distinct. |
| **Soft 404** | Google thinks the page is empty / "Not found" despite returning 200. | We've fixed this: unknown routes return real 404 + `noindex`. If a real page triggers this, that page lacks substantive content. |
| **Blocked by robots.txt** | robots.txt is preventing crawl. | Should only affect `/admin`, `/download`, `/api/*`. Anything else here means robots.txt was changed by accident. |
| **Alternate page with proper canonical tag** | This isn't an error — it means Google saw a duplicate URL (e.g. with a tracking param) and correctly used the canonical you specified. Safe to ignore. |
| **Not found (404)** | A URL Google found is genuinely missing. | If it's a random invalid URL, that's the expected behaviour. If it's a real page, fix the broken link. |
| **Page with redirect** | Expected for `/features/rota`, `/features/payroll`, `/features/scorecard` — they 301 to the new SEO URLs. Safe to ignore. |

### Performance report (left sidebar → "Performance")

After ~2 weeks, you should start seeing impressions and clicks. Look for:
- Which **queries** people use to find you (filter by "Queries" tab) — confirms which keywords are landing pages are ranking for
- Which **pages** are getting impressions (filter by "Pages" tab)
- Click-through rate (CTR) per page — if a page is impressing but not getting clicks, the title/description needs work

### Enhancements (left sidebar)

- **FAQs** — should show entries from `client/index.html` and each SEO page's FAQ JSON-LD. If errors appear, the JSON-LD is malformed.
- **Sitelinks searchbox / Logo / Organization** — populated from the JSON-LD in `client/index.html`. Errors here usually mean a schema validation issue.
- **Breadcrumbs** — each SEO page has a `BreadcrumbList`. Errors mean the path or name is malformed.

---

## 6. Important caveats

- **Indexing is not guaranteed.** Google decides what to index. New domains commonly take 2–8 weeks before all pages appear in search results.
- **Don't keep clicking "Request Indexing" on the same URL.** Google may rate-limit you or even view it as a spam signal.
- **Don't submit URLs blocked by robots.txt** (i.e. `/admin`, `/download`, `/api/*`). They are intentionally blocked.
- **Don't add `www.dspops.app` separately.** The Domain property in step 1 covers both.
- **PageSpeed matters.** After indexing starts, check the Core Web Vitals report in Search Console. The build already produces a ~165 KB gzipped initial bundle, but if CWV scores are bad, prioritise fixing those before backlinks.

---

## 7. After all the above is done

- [ ] Domain property added and verified
- [ ] Sitemap submitted, status "Success"
- [ ] All 10 URLs requested for indexing
- [ ] Check back in **3 days**: any URL with "URL is on Google" status — done
- [ ] Check back in **2 weeks**: review the Pages report, fix anything in the "Why pages aren't indexed" section
- [ ] Check back in **4 weeks**: review the Performance report for first impressions/clicks

---

## 8. Useful tools (optional)

- **Live test of structured data:** https://search.google.com/test/rich-results — paste any of the SEO URLs; should show valid FAQPage / BreadcrumbList / SoftwareApplication.
- **Mobile-friendly test:** https://search.google.com/test/mobile-friendly
- **Bing Webmaster Tools:** https://www.bing.com/webmasters — same idea as GSC, smaller traffic share but free and easy to set up. The same sitemap.xml works.
