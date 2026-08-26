---
id: portrait-editorial-treatment
title: "Portrait: 4:5 editorial crop with amber rule; sticky on about"
category: decision
status: active
tags: [design, images]
created: "2026-08-23T19:54:52"
updated: "2026-08-23T19:54:52"
---

<!-- compiled_truth -->
**Decision (owner-ratified via structured Q&A, 2026-08-23):** the headshot at 160px square got lost against the site's long text blocks. The ratified treatment:

- **4:5 vertical editorial crop, 280×350 display** (assets: `public/images/anibal-rojas-280x350.*` + 560×700 @2x, AVIF+WebP), replacing the square crop everywhere. Vertical reads "bigger" beside text columns without dominating.
- **Amber-rule accent:** the portrait's `<picture>` carries `border-left: 2px solid var(--amber)` + small gap — the same signature device as the site's blockquotes (aburrida/credo). Rejected: neutral no-accent, and B&W/duotone.
- **On /about/**, the portrait is **position: sticky** in its column (≥900px) so it rides along the long memoir instead of stranding at the top. On mobile it sits above the text, not sticky.
- **Scope:** the two portrait instances only — the podcast thumb (16:9 episode art in the ideas card) was explicitly excluded; owner is fine with its size.
- Rejected alternatives for the record: plain size bump to 240px square, column-width opener photo, header identity block.

Performance note: even the 2x AVIF is ~20KB, so image weight is a non-issue; the constraint that matters is zero layout shift (explicit width/height attrs stay mandatory).


## Timeline

- time: 2026-08-23T19:54:52
  kind: decision
  summary: "Created this page: Portrait: 4:5 editorial crop with amber rule; sticky on about"
  source: "Aníbal, session 2026-08-23"
  affects: [portrait-editorial-treatment]

- time: 2026-08-23T19:54:52
  kind: decision
  summary: Owner-ratified portrait treatment across home and about
  source: "Aníbal, session 2026-08-23"
  affects: [portrait-editorial-treatment]
