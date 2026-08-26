# i.usedtocode.com

Personal professional site for **Aníbal Rojas** — AI-adoption advisory, fractional VP of Engineering, executive coaching. Astro 5, static output, EN default at `/`, ES at `/es/`.

**Source of truth:** `HANDOFF-anibalrojas-site.md` (strategy, design system, budgets, acceptance criteria). Approved design direction: `reference/homepage-mockup.html`.

## Setup

```sh
npm ci
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # serve the built site
```

## Publish a post

1. Add one `.md` file to `src/content/posts/` with frontmatter:
   `title, description, date, lang ("en"|"es"), tags[]` (+ optional `series`, `seriesOrder`, `translationOf`, `draft`, `heroImage`, `canonicalUrl`).
2. Push. That's it — schema-validated at build. `draft: true` posts render in `astro dev` only and never reach production or RSS.

## Deploy

GitHub Pages (`anibal/anibal.github.io`), deployed by `.github/workflows/deploy.yml` on every push to `main`.
**Live: https://i.usedtocode.com/** (EN at `/`, ES at `/es/`).
Build: `npm run build`, output `dist/`.
CI (`.github/workflows/ci.yml`) runs build + Lighthouse CI assertions on every PR (100/100/100/100, LCP<1.5s, CLS=0, TBT<50ms).

Old Quartz URLs (`.html` twins, archive folder and tag pages, `/index.xml`, OG images) keep working via the `legacyStubs` integration in `astro.config.mjs` plus byte-identical OG assets in `public/` — asserted by `scripts/verify-migration.mjs` against production.

## Structure

```
src/styles/tokens.css   the design system — every value traces here (handoff §3)
src/styles/fonts.css    self-hosted woff2 (Fraunces variable, Plex Sans/Mono; latin + latin-ext)
src/styles/shiki-theme.json  code highlighting theme, amber/slate/ink on paper (wired in astro.config.mjs)
src/i18n/               UI strings + all page copy (ui.ts) + locale routing, route-equivalence map (utils.ts)
src/lib/posts.ts        posts queries (drafts render in dev only), reading time, translation lookup
src/layouts/Base.astro  head/SEO/hreflang/JSON-LD + header/footer shell
src/components/         Header, Footer, and one shared template per page type (HomePage, IdeasIndex, PostPage, AboutPage, ContactPage)
src/pages/              routes; ES mirrors EN under /es/ with localized slugs (/es/sobre-mi/, /es/contacto/); posts serve at /YYYY/MM/DD/slug/ in BOTH locales (no /es/ prefix)
src/pages/**/*.xml.ts   RSS per locale (/rss.xml, /es/rss.xml)
src/content/            posts + testimonials collections (zod schemas in content.config.ts)
reference/              approved mockup + copy docs (never shipped)
scripts/                build-font-overrides.mjs (font metrics), shoot.mjs (design-QA screenshots → shots/), verify-migration.mjs (legacy-URL harness, runs against production)
```

## Conventions

- Vanilla CSS with tokens only — no Tailwind, no ad-hoc px values outside the scales.
- Motion vocabulary: amber underline draw-in (120ms), ≤2px card lift, CTA darken; durations only from {120, 240, 480, 900}ms; `prefers-reduced-motion` honored globally.
- Fonts are self-hosted (source: `@fontsource*` devDependencies, files copied into `public/fonts/`). Never add a Google Fonts request.
- Font loading: `font-display: optional` + metric-matched local fallbacks (`src/styles/font-overrides.css`, regenerate with `npm run fonts:overrides`) + preload of the three critical latin faces. This is what makes CLS = 0 and the LCP gate physically attainable; do not change to `swap` without re-measuring (see brain: `font-loading-strategy`).
- CSS is fully inlined into each page (`build.inlineStylesheets: 'always'`) — it stays tiny (~13KB); there is no render-blocking request.
- Lighthouse CI runs with `throttlingMethod: 'devtools'` (real throttling, observed timing) — Lantern simulation's floor on this design is ~1.5s LCP even with zero fonts/JS, so the handoff gates are only meaningful under observed timing (see brain: `lhci-devtools-throttling`).
- JS budget: ≤30KB total on the homepage, 0KB on blog posts. Islands only with explicit justification.

## Pending decisions (reserved for Aníbal — see handoff §10)

Public repo or not, testimonials (≥3 real or the section stays absent), service-page copy sign-off (drafts in `ui.ts`), Calendly URL. Settled: domain is i.usedtocode.com (2026-08-22, see brain `domain-i-usedtocode`); the Bottleneck was removed entirely (session 3, Aníbal's call).
