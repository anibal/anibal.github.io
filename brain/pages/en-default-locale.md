---
id: en-default-locale
title: "EN is the default locale; ES lives under /es/"
category: decision
status: active
tags: [i18n, content]
created: "2026-08-07T20:30:49"
updated: "2026-08-07T20:31:12"
---

<!-- compiled_truth -->
**Decided:** EN is the default locale at `/`; Spanish lives under `/es/`. Astro's built-in i18n routing; UI strings in a translations module; content per locale via collections; hreflang pairs on every page; the locale switcher swaps to the *equivalent* page (EN `/services/coaching` ↔ ES `/es/servicios/coaching`), never back to the homepage.

**Alternatives:** ES as default (the primary LatAm audience is Spanish-first), or browser-sniffing redirects. Rejected: US/global companies are English-first, and sniffing breaks shareability and SEO.

**Rationale:** the revenue audience splits across both languages; bilingual parity is a design requirement, not a translation afterthought — Spanish runs ~15–20% longer, so layouts are designed for the longer language, not patched for it.

**Blast radius:** every page, component, QA screenshot, and content decision exists ×2; sitemap and SEO duplicate; every new route needs an ES slug mapping.


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: EN is the default locale; ES lives under /es/"
  source: HANDOFF-anibalrojas-site.md
  affects: [en-default-locale]

- time: 2026-08-07T20:31:12
  kind: decision
  summary: "captured from handoff project summary + IA"
  source: HANDOFF-anibalrojas-site.md
  affects: [en-default-locale]
