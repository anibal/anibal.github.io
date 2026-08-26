---
id: blog-url-migration
title: Blog posts serve at original date-based URLs
category: decision
status: active
tags: [seo, i18n, content]
created: "2026-08-19T12:01:28"
updated: "2026-08-23T09:47:12"
---

<!-- compiled_truth -->
One unified route `src/pages/[year]/[month]/[day]/[slug].astro` serves every post in both locales; locale comes from frontmatter `lang`, not the URL (ES posts have NO /es/ prefix — the original paths must stay byte-identical for SEO). Executed 2026-08-22: all 10 published i.usedtocode.com posts migrated (9 ES + 1 EN tutorial) plus 9 English translations, paired via `translationOf` on both siblings.

Three invariants keep URLs stable, each earned by a real breakage:
1. **UTC date parts** — `postDateParts()` in `src/lib/posts.ts` (UTC getters) is the only legal way to decompose a post date into URL segments; local-time getters made dev (America/Bogota) and CI (UTC) emit different paths. Used by `postPath()`, the post route, and the OG route. Guard: `scripts/verify-tz-build.sh` builds twice and diffs.
2. **Verbatim ids** — the posts collection sets `generateId` to the raw filename stem; the glob loader's default slugifies (lowercases), which broke the mixed-case tutorial URL. macOS's case-insensitive FS masks this class of bug — only Linux CI catches it.
3. **NFC filenames** — the ñ slug (`2025-recap-mi-vida-con-apnea-del-sueño`) must stay NFC bytes (C3 B1) in git; the old sitemap's percent-encoded form depends on it.

The old URL surface (extensionless posts, .html twins, folder pages, /tags/*, /index.xml, OG webp images, /draft/*) is mapped in `public/_redirects`; `scripts/verify-migration.mjs` asserts all 122 checks against a deployed build (or `wrangler dev` locally). Sitemap hreflang for the prefix-less pairs comes from the `serialize` hook in `astro.config.mjs`. This supersedes [[old-site-archive-no-migration]] (archived as reversal).


## Timeline

- time: 2026-08-19T12:01:28
  kind: decision
  summary: "Created this page: Blog posts serve at original date-based URLs"
  source: session 2026-08-19
  affects: [blog-url-migration]

- time: 2026-08-19T12:01:36
  kind: decision
  summary: "All posts (EN+ES) live at /YYYY/MM/DD/slug/ matching i.usedtocode.com originals"
  source: session 2026-08-19
  affects: [blog-url-migration]

- time: 2026-08-22T22:57:11
  kind: decision
  summary: "Migration executed 2026-08-22: 10 posts + 9 EN translations live; UTC date parts + verbatim generateId added after real-world breakage"
  source: migration/quartz-import branch
  affects: [blog-url-migration]

- time: 2026-08-23T09:47:12
  kind: decision
  summary: "Owner amended the byte-identical mandate for three factual fixes applied to BOTH languages: Garrett Galloway (both prompt-injection posts), Moonshot (ES systems-view), GitHub (ES mathematics). Spanish prompt-template fences in EN Backpressure + the f(modelo,contexto,prompt) formula in EN Mathematics translated (owner call on dossier flag 02). Backpressure ES 'no ocurran errores' deliberately left untouched pending owner's final word (flag 03a); sleep-apnea 'sin ayudas mecánicas' judged correct as written (flag 03c)."
  source: session 2026-08-23
  affects: [blog-url-migration]
