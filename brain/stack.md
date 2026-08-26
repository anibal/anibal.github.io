---
slug: stack
title: Tech stack
role: tech-stack choices
updated: "2026-08-22T22:58:27"
---

# Tech stack

## Overview

Implemented and gates-green through Session 8. Theme: boring, static, self-hosted — speed and craft over tooling novelty.

## Choices

| Domain | Choice | Rationale |
|---|---|---|
| Framework | Astro 5, static output, islands allowlist (none shipped — site is 0KB JS) | Performance is a design feature — [[astro-5-static-islands]] |
| Styling | Vanilla CSS + custom properties, one tokens file; **no Tailwind** | The token discipline *is* the design system — [[vanilla-css-design-tokens]] |
| Typography | Fraunces (display, variable opsz/SOFT/WONK), IBM Plex Sans (body, 17px/1.65), IBM Plex Mono (utility, eyebrows, wordmark `~/anibal-rojas`) | Type is the personality carrier — "beautifully typeset engineering document" |
| Fonts delivery | Self-hosted woff2 subsets, preloaded, **`font-display: optional`** + metric-matched fallbacks; no Google Fonts | Perf budget + zero CLS — [[font-loading-strategy]] |
| i18n | Astro built-in i18n; EN default at `/`, ES at `/es/`; posts prefix-less in both locales ([[blog-url-migration]]) | Bilingual parity first-class — [[en-default-locale]] |
| Content | Astro Content Collections + zod: `posts` (verbatim `generateId` — ids are filename stems, never slugified), `testimonials` | One-file publishing; byte-identical archive URLs |
| Code highlighting | Shiki, themed to the palette (amber/slate on paper) | The blog must be as considered as the homepage |
| Images | Post images in `public/` at their original published URLs; `rehype-image-dimensions` (zero-dep, repo-local) injects intrinsic width/height at build and fails on missing files. No Astro `<Image>` — hashed URLs would break migrated image URLs | Zero CLS with URL stability |
| OG images | Generated per page at build (satori + resvg), design-system styled, `/og/<route>.png`; old `<slug>-og-image.webp` URLs 301 to them | Share craft; social-card cache continuity |
| SEO | Self-canonical URLs, hreflang (in-page + sitemap serialize hook for prefix-less post pairs), JSON-LD (Person sitewide, Article on posts), sitemap, robots, `public/_redirects` for the old Quartz surface | Continuity of the i.usedtocode.com equity — [[domain-i-usedtocode]] |
| Analytics | None shipped. Old site's GA tag dropped by design (0KB-JS rule); Plausible remains a deferred option | Privacy-respecting, budget-safe |
| Hosting / CI | **Cloudflare Workers static assets** (config lives in the dashboard, no wrangler file in repo), auto-deploy from `main`, PR previews; CI = build + Lighthouse CI assertions + `verify-tz-build.sh`; `verify-migration.mjs` against deployed builds | Ship gates enforced mechanically |
