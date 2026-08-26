# SESSION 4 — Templates: service pages, blog, Principles landing

**Read first, in this order:**
1. `HANDOFF-anibalrojas-site.md` — source of truth (§4 IA, §6.2/6.3/6.4 page specs, §7 content model, §8 tech spec, §9 gates). Note: §5 (the Bottleneck) is superseded — it shipped in session 3 and Aníbal removed it entirely (interactive *and* static SVG). Do not resurrect it, do not reference it; the thesis section is text-only by decision.
2. `brain/` — decision notes from sessions 1–3. Especially: `lcp-element-motion-constraint` (post titles are LCP candidates — transform-only motion), `font-loading-strategy`, `lhci-devtools-throttling`, `vanilla-css-design-tokens`. Add new notes for any decision you make this session.
3. `reference/homepage-mockup.html` — the structural devices (mono `>` eyebrows, hairlines, card grammar) carry over to templates.
4. `src/i18n/ui.ts` — the dictionary pattern; all new UI strings go there, both locales.

**Session goal:** every remaining template built and both locales live — service pages ×3, `/ideas/` index + post layout + RSS per locale, `/principles/` landing — with the ship gates green and a deployed preview.

---

## Part A — Plumbing first

1. **Locale-switcher equivalence map.** New routes have localized slugs, so replace the generic prefix swap in `src/i18n/utils.ts` with an explicit route map. Handoff §4 pairs:
   - `/services/diagnostic/` ↔ `/es/servicios/diagnostico/`
   - `/services/fractional/` ↔ `/es/servicios/fractional/`
   - `/services/coaching/` ↔ `/es/servicios/coaching/`
   - `/principles/` ↔ `/es/principios/`
   - `/ideas/` ↔ `/es/ideas/` (same slug, prefix-only)
   Keep the prefix swap as the fallback for unmapped routes. The switcher must land on the equivalent page, never the homepage.
2. **Draft handling for posts.** `draft: true` posts must render in `astro dev` but be excluded from production builds (filter at `getCollection` with `import.meta.env.DEV`). This is how the post template gets QA'd before real posts exist.
3. If the posts collection warns at build about the empty testimonials glob — that's expected; testimonials stay empty until real quotes exist.

## Part B — Service pages ×3 (one shared layout, both locales)

Routes per the §4 pairs above. Template structure (handoff §6.2): mono eyebrow (`> services/diagnostic`) → Fraunces headline — **the outcome, not the service name** → "Who this is for" (≤3 bullets) → "How it runs" (diagnose → plan → execute as a simple horizontal step row in the same visual grammar: mono numerals, hairlines, no new components) → "What you get" → one testimonial slot (render only if a testimonials entry with a matching `serviceRef` exists; otherwise render nothing) → CTA.

- **Copy:** draft it by expanding the homepage service blurbs ~3×, dry-confidence register, no adjectives Aníbal wouldn't say out loud. ES is written for the longer language, not translated patchwork. **Aníbal signs off before launch — put the drafts in the PR/preview for his review.** Content lives in the i18n dictionary or a small content collection — your call, but both locales in one obvious place.
- **JSON-LD:** `ProfessionalService` on each service page.
- **Homepage wiring:** the services ladder row titles become links to these pages (remove the `TODO(session-4)`). Titles-link; rows keep their current look otherwise.
- CTAs stay `mailto:` (Calendly still reserved; leave `TODO(calendly)`).

## Part C — Blog (`/ideas/`, both locales)

1. **Index** (`/ideas/`, `/es/ideas/`): year-grouped list, newest first; each row: title (link), one-liner (`description`), mono tags, reading time. Show only the current locale's posts (`lang` field). Footer of the index: the archive link → `https://i.usedtocode.com` (mono, quiet). No card grid — this is an index, typeset like one (hairline-separated rows; think table of contents, not Pinterest).
2. **Post layout** (`/ideas/[slug]/`, `/es/ideas/[slug]/`): 66ch measure, Fraunces headings, styled blockquotes (amber left rule — same family as the thesis block), figure/caption styles, dates + reading time + tags as mono metadata with tabular numerals. Cross-link the translation when `translationOf` exists (a quiet mono "also in english / también en español" line). Honor `canonicalUrl` (canonical + a "originally published at" line when present). JSON-LD `Article`. **0KB JS on post pages** — this layout carries most future traffic; it must be as considered as the homepage and the Lighthouse gates apply here.
3. **Code highlighting:** Shiki at build (Astro's markdown already wires it) with a custom theme derived from `tokens.css` — amber/slate/ink on paper, no dark theme. One small JSON theme file; keep it minimal.
4. **RSS per locale:** `/rss.xml` (EN) and `/es/rss.xml` via `@astrojs/rss`. Link tags in `<head>`.
5. **Reading time:** compute from the post body (~200 wpm), mono, tabular-nums.

## Part D — Principles landing (`/principles/`, `/es/principios/`)

Editorial page presenting the *Fundamental Principles* series as a coherent body of work — treat it with the care of a book's table of contents (handoff §6.3). Intro paragraph (why first principles — "playbooks expire, principles don't" is the thesis of the page), then the articles as a typeset index: mono numerals, Fraunces titles, one-line summaries. Links point to the posts wherever they live (on-site posts when they exist; the original Substack/old-site URLs otherwise — do not migrate content). Wire the homepage Ideas writing card to this page (remove the `TODO(session-4)`).

## Part E — Exit gates

- `npm run build` clean; add a representative post to `lighthouserc.cjs` `url` list (both locales) and keep the gates green: **100/100/100/100, LCP < 1.5s, CLS = 0, TBT < 50ms** everywhere asserted.
- Post pages ship 0KB JS; homepage stays ≤30KB; no new third-party requests.
- Keyboard pass on every new page type; no `href="#"`; focus ring visible everywhere.
- Screenshots at 360/768/1440, both locales (`node scripts/shoot.mjs` — extend its route list): one service page, `/ideas/` index, one post, `/principles/`. No Spanish overflow; headline wraps hand-checked; spacing traces to the scale.
- Chanel pass, documented in the commit: name the accessory you removed.
- Deploy: push to `main` → auto-deploys to https://website.anibalrojas.workers.dev/. Verify the new routes serve.
- Update `brain/` with decisions (equivalence map, Shiki theme, drafts-in-dev, RSS URLs).

## Content asks for Aníbal (needed this session, flag early)

1. **≥1 real post per locale** as `.md` in `src/content/posts/` — the representative-post gate needs one; the blog index looks empty with fewer than three per locale (fine at launch if that's the truth).
2. **Service-page copy sign-off** on the ~3× expansions.
3. **Principles series**: the article list (titles + one-line summaries + where each lives) — or point the session at the Substack/old-site URLs to transcribe from.
4. Still open (unchanged): portrait, testimonials (≥3 real or the homepage section stays absent), Calendly URL, final domain.

## Out of scope — do not touch

OG image generation and Plausible (session 5), `/about/` + `/contact/` pages (session 5), `/now/`, dark mode, testimonials on the homepage, any signature element (removed by decision), header nav redesign, domain change.

*When in doubt: dry confidence, visible thesis, remove one accessory.*
