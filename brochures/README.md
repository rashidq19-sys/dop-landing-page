# Sales brochures

Self-contained one-page brochures sent to prospects by link. Not part of the
React site: each is a single HTML file with every screenshot inlined as a WebP
data URI, so it has no asset routes and nothing to break.

| Page | Live at | Audience |
|---|---|---|
| `src/sbl.template.html` | https://dspops.app/sbl.html | SBL Couriers specifically |
| `src/generic.template.html` | https://dspops.app/brochure.html | Any DSP |

## Editing

Edit the **template**, never the built HTML (that file is ~1MB of base64).

```bash
node brochures/src/build.mjs
```

That writes all six outputs: `client/public/*.html`, `dist/public/*.html`, and
the `brochures/<name>/` copies used for publishing as Claude Artifacts.

## Two things that will bite you

**`dist/public` must be committed.** Railway runs only `npm run build:server`
for this service (see `nixpacks.toml`), so Vite never runs in the cloud and
`client/public` is never copied. A file written only to `client/public` 404s in
production while looking perfect locally. The build script writes both; if you
change any React source, run the full `npm run build` and commit `dist/`.

**Keep them out of search.** Both carry `noindex, nofollow` and are disallowed
in `robots.txt`. They are sales links for named prospects, not public pages.

## Images

`src/assets.json` holds every screenshot as a compressed WebP data URI, keyed by
the `{{IMG:key}}` placeholders in the templates. Screenshots are deliberately
cropped so the app's left navigation is never shown: the point is to show what
the product does without handing over a blueprint of the interface.
