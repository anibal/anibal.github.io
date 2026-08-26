---
slug: roadmap
title: Roadmap
role: milestones
updated: "2026-08-22T16:23:21"
---

# Roadmap

## Status

**Session 6 (Repositioning) — DONE (2026-08-22), committed `c1d9616`, uncommitted-work risk cleared.** Every string on the site rewritten against a new positioning: facilitation, not consulting ([[positioning-facilitation-not-consulting]]). Two governing documents now arbitrate all copy — `reference/positioning-canon.md` and `reference/narrative-map.md` — superseding the old "verbatim from homepage-copy v2, do not rewrite" lock. Diagnostic reframed (alignment is the product, step 3 Report→Align); About fully rewritten; Principles gained EN siblings and the PENDING sentence finished as the outputs→outcomes bridge; `/contact/` linked into nav + footer ([[contact-pages-linked-two-paths]]); `/ideas/` got an honest empty state. Verified by 13 agents across 2 workflows — 3 blind buyer personas walked the built site (2 would book, 1 would write first) and 3 canon auditors; all findings fixed. Earlier the same session: blog URL migration ([[blog-url-migration]]), CLI nav ([[header-cli-nav]]), OG image generation (`src/lib/og.ts` — the `TODO(og)` is closed).

**Session 5 (About / Contact / booking) — DONE.** `/about/` + `/es/sobre-mi/`, `/contact/` + `/es/contacto/`, and the booking CTAs pointed at Google Calendar (`calendar.app.google/…`) — **Calendly is settled, the mailto TODOs are gone.**

**Session 4 (Templates) — DONE (2026-08-15), deployed.** Service pages ×3 both locales from one template (outcome headlines, who-for/how-it-runs/what-you-get, testimonial slot rendering nothing until real quotes, ProfessionalService JSON-LD); homepage ladder + ideas card now link. `/ideas/` index + post layout (66ch, amber-rule blockquotes, [[shiki-paper-theme]], translation cross-links, canonicalUrl support, Article JSON-LD, 0KB JS) + RSS per locale (`/rss.xml`, `/es/rss.xml`). `/principles/` landing as a typeset TOC of the 5-article series, linking the i.usedtocode.com originals ([[old-site-archive-no-migration]]). Locale switcher now on an explicit route map ([[locale-switcher-route-map]]); drafts render in dev only ([[drafts-render-in-dev-only]]). Gates green 8/8 URLs (100×4, LCP 752–791ms, CLS 0, TBT 0) — **the representative-post URLs are a `TODO(first-post)` in `lighthouserc.cjs`, deferred per Aníbal** until ≥1 real post per locale exists. Chanel pass: the /ideas/ empty-state line was cut — the archive link alone does the work.

**Session 3 (The Bottleneck) — built, then REMOVED at Aníbal's call (2026-08-15).** Shipped interactive, passed all gates; after playing with it live, Aníbal decided not to keep it — neither interactive nor static SVG (archived: [[signature-element-bottleneck]]). The thesis section is text-only; the homepage has no signature element, and prize-worthiness now rests fully on editorial craft + performance ([[performance-as-design-feature]]). Code preserved in git history.

**Session 2 (Homepage) — DONE (2026-08-14), deployed.** Both locales complete: hero, thesis, whoami (dignified portrait placeholder, fixed dims — real photo still reserved), proof ×4, services 01/02/03, testimonials OMITTED per rule (zero real quotes), ideas ×2, footer CTA. Motion system live: CSS-only load sequence (720ms ≤ 900 budget), IntersectionObserver scroll reveals (~0.7KB inline, the site's first JS, progressive enhancement). Gates green 6/6 runs: 100×4, LCP=FCP ~780–820ms, CLS 0, TBT 0. Design QA done at 360/768/1440 both locales (`node scripts/shoot.mjs` — reduced-motion emulated for deterministic captures).

**Deploy:** push to `main` auto-deploys to https://website.anibalrojas.workers.dev/ (Cloudflare Workers static assets).

## Milestones (suggested order)

1. ~~**Scaffold & system**~~ — done.
2. ~~**Homepage**~~ — done (copy-doc blocker resolved by Aníbal; v2 used verbatim, later superseded by the canon).
3. ~~**Signature element**~~ — built and removed (Aníbal's decision, see Status).
4. ~~**Templates**~~ — done (session 4). **Carry-over:** add the representative post to LHCI once a real post exists; delete the two fixture drafts then.
5. ~~**Content & polish**~~ — done across sessions 5–6 (About, Contact, Google Calendar booking, OG generation). **Remaining from this milestone:** Plausible (still deferred, never decided), testimonials in, launch checklist.
6. **Repositioning sign-off** — the copy is written; what is left is Aníbal's markup. See `HANDOFF.md`.
7. **Phase 2 (optional)** — `/now/` page; dark mode becomes possible ([[no-dark-mode-v1]]).

## Launch gates (handoff acceptance criteria)

- Lighthouse mobile/throttled **100/100/100/100** on homepage + a representative post; LCP < 1.5s, CLS = 0, TBT < 50ms ([[performance-as-design-feature]]) — enforced in CI via [[lhci-devtools-throttling]]. (Post URL pending real content; all other page types asserted since session 4.)
- WCAG 2.2 AA: keyboard nav with visible amber focus, skip-link, landmarks, verified contrast pairs, reduced-motion honored globally.
- Design QA screenshots at 360/768/1440 in **both locales** (script: `scripts/shoot.mjs`): no Spanish overflow, hand-checked headline wraps, every gap traceable to the spacing scale, the Chanel pass documented in the PR, and the tell test against three templated AI-consultant sites.
- Content gates: real portrait, ≥3 real testimonials or the section is omitted ([[testimonials-real-or-omitted]]), all links live, booking link working, both locales proofread by Aníbal — **on the Session-6 copy, not the session-4 drafts this gate originally referred to.**

## Open decisions reserved for Aníbal (ask, don't assume)

**The full, current ledger lives in `HANDOFF.md` at the repo root** — copy calls to ratify or reverse (D-01…D-04), questions only Aníbal can answer (D-05, D-06), the ICP-width question (D-08), and the reserved content decisions now carrying measured cost from three blind cold readers (D-07). Summary of the standing project-level ones:

- Final domain — **confirm, not decide**: `anibalrojas.com` is already wired into `astro.config.mjs` + `public/robots.txt`; the live deploy is still the workers.dev URL.
- Whether the repo goes public (the colophon links it if so).
- Plausible analytics — deferred, never decided; would be the only third-party request. Depends on the domain.
- Portrait choice; testimonial selection and order; a pricing signal on the Diagnostic; sign-off on the Session-6 copy in both locales.
- First real posts: ≥1 per locale (all existing writing is Spanish; an EN post means new writing or an approved translation — essay 02, the value arithmetic, is the one the EN skeptic persona went looking for). Blocks the LHCI `TODO(first-post)` and the fixture-draft cleanup.
- Ratify: `font-display: optional` ([[font-loading-strategy]]), devtools-throttled LHCI ([[lhci-devtools-throttling]]), LCP-element motion rule ([[lcp-element-motion-constraint]]).
- F-10 (wide-viewport composition) — deferred out of session 6 as design work, not copy; still unscheduled.

**Settled, do not reopen:** Calendly (→ Google Calendar), OG images (shipped), the Bottleneck (removed), `/contact/` keep-or-delete (kept and linked), the "verbatim v2, do not rewrite" copy lock (reopened, superseded by the canon).
