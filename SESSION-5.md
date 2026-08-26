# SESSION 5 — Content & polish: About, Contact, OG images, Plausible, launch checklist

**Read first, in this order:**
1. `HANDOFF-anibalrojas-site.md` — source of truth (§6.5 About/Contact, §8 tech spec, §9 gates).
2. `brain/` — decision notes from sessions 1–4. Especially: `locale-switcher-route-map` (new localized routes MUST be added to `localizedRoutes` in `src/i18n/utils.ts`), `drafts-render-in-dev-only`, `shiki-paper-theme`, `old-site-archive-no-migration`, `lcp-element-motion-constraint`.
3. `src/i18n/ui.ts` — the dictionary pattern; all new UI strings go there, both locales.
4. `src/components/PostPage.astro` / `ServicePage.astro` — the template grammar new pages should speak.

**Session goal:** the last page types shipped (`/about/` + `/contact/`, both locales), OG images generated at build, Plausible wired as the only third-party request, the launch checklist (handoff §9) walked end to end.

---

## Part A — Carry-overs from session 4 (do these first)

1. **First real posts.** Session 4 shipped the blog with zero production posts (Aníbal's call — the representative-post LHCI gate is deferred). When ≥1 real post per locale lands in `src/content/posts/`: delete the two fixtures (`example-draft.md`, `plantilla-ejemplo.md`), add the post URLs (both locales) to `lighthouserc.cjs` (search `TODO(first-post)`), and un-defer the gate. If the posts are republished from Substack/old site, set `canonicalUrl`.
2. **Service-page copy sign-off.** The three pages' copy (in `ui.ts` under `servicePages`) is a session-4 draft expansion of the approved homepage blurbs — **Aníbal must approve or edit before launch.** Same for the `/principles/` summaries.
3. Testimonials: still zero real quotes. The homepage section and the per-service testimonial slot already render nothing; when ≥3 real quotes exist, drop `.md` files into `src/content/testimonials/` (schema in `content.config.ts`, `serviceRef` per service).

## Part B — `/about/` + `/es/sobre-mi/` (handoff §6.5)

- Narrative adapted from https://i.usedtocode.com (burnout → leadership → Platzi → sabbatical → now), turned toward clients at the close. The raw material is on the old site's front page; the adaptation is new copy — **Aníbal signs off.**
- Add BOTH routes to `localizedRoutes` (`/about/` ↔ `/es/sobre-mi/`) or the switcher silently misroutes (see brain: `locale-switcher-route-map`).
- Register the routes in `lighthouserc.cjs` and `scripts/shoot.mjs`.

## Part C — `/contact/` + `/es/contacto/` (handoff §6.5)

- One page, one job: Calendly (click-to-load — never eager) + email + LinkedIn/Substack/ocorres.com. If Calendly is still undecided, ship the page with the mailto and leave `TODO(calendly)`; if it lands, replace every `TODO(calendly)` in the repo (header, hero, footer, service pages) with the real URL.
- The Calendly loader is an island (allowed list, handoff §8) — click-to-load means 0KB until interaction.
- Same `localizedRoutes` + gate-config registration as About.

## Part D — OG images + Plausible (handoff §8)

- OG images generated per page at build (satori or equivalent): mono metadata + Fraunces title on `--paper` with the amber accent. Replace the `TODO(og)` in `Base.astro`. Homepage OG: since the Bottleneck was removed, use the wordmark/thesis composition — do NOT resurrect the diagram.
- Plausible: deferred script, the only third-party request; excluded from perf-budget assertions but keep the request count honest. Confirm the domain decision with Aníbal before pointing Plausible at it.

## Part E — Launch checklist (handoff §9, walked in order)

- LHCI green on every page type including a real post: 100/100/100/100, LCP < 1.5s, CLS = 0, TBT < 50ms.
- Keyboard pass everywhere; focus ring visible; no `href="#"`.
- Screenshots at 360/768/1440, both locales, all page types; Spanish wrap check; spacing traces to the scale; Chanel pass documented in the commit.
- The tell test against three templated AI-consultant sites.
- Content gates: portrait (still pending), testimonials (rule above), all external links live, Calendly working, both locales proofread by Aníbal.
- Deploy: push to `main` → https://website.anibalrojas.workers.dev/ — verify every route, both RSS feeds, and one OG image URL.
- Update `brain/` (About/Contact routes in the map, OG approach, Plausible decision) and retire the session files if Aníbal wants the repo clean for launch.

## Out of scope — do not touch

`/now/` (phase 2), dark mode ([[no-dark-mode-v1]]), any signature element (removed by decision), header nav redesign, domain change (until Aníbal decides), content migration from the old site ([[old-site-archive-no-migration]]).

*When in doubt: dry confidence, visible thesis, remove one accessory.*
