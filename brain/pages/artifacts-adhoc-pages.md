---
id: artifacts-adhoc-pages
title: "/artifacts/ is reserved for unlinked ad-hoc pages; heavy assets live in R2"
category: decision
status: active
tags: [artifacts, hosting, r2]
created: "2026-10-26T12:17:13"
updated: "2026-10-26T12:21:45"
---

<!-- compiled_truth -->
**Decided:** `/artifacts/<slug>/` is a reserved path for ad-hoc standalone pages that are public but never linked from the site, sitemap, or nav. Each page ships as plain HTML in `public/artifacts/<slug>/` with a `noindex,nofollow` meta tag (GitHub Pages cannot set `X-Robots-Tag`, and a robots.txt `Disallow` would advertise the path, so neither is used).

**Assets:** binaries/data are not committed (Aníbal does not want the repo bloated). They live in the R2 bucket `usedtocode-artifacts` under `<slug>/data/`, served from its r2.dev public URL, CORS limited to `https://i.usedtocode.com` and `http://localhost:4321`. Page HTML references them by absolute R2 URL. `scripts/sync-artifact.sh <slug> <source-site-dir> <r2-base>` rewrites the HTML (data URLs + noindex) and uploads `data/`.

**First page:** `maria-corina-machado-el-regreso` (story `index.html` + unlinked `archivo.html`), exported from the El Regreso corpus project. Pages are not expected to evolve.

**Caveat:** r2.dev is rate-limited and not for production; move to a custom domain (needs usedtocode.com DNS on Cloudflare) if traffic grows.


## Timeline

- time: 2026-10-26T12:17:13
  kind: decision
  summary: "Created this page: /artifacts/ is reserved for unlinked ad-hoc pages; heavy assets live in R2"
  source: "Aníbal, 2026-10-26"
  affects: [artifacts-adhoc-pages]

- time: 2026-10-26T12:21:45
  kind: decision
  summary: Record the /artifacts/ convention and R2 asset hosting
  source: "Aníbal, 2026-10-26"
  affects: [artifacts-adhoc-pages]
