# Handoff — decisions pending

As of commit `c1d9616` (Session 6, 2026-08-22). Working tree clean, build green (16 pages, EN + ES).

---

## ⚡ Session 9 (2026-08-23) — dossier rulings executed + the Workers Builds fix. Branch `migration/quartz-import`.

Aníbal ruled on the migration dossier's five flags and ordered a copy/design pass. All executed:

**Dossier flags closed:**
- **01** — third recap's EN title stands as translated (Aníbal's call).
- **02** — the four Spanish prompt-template fences in the EN Backpressure post translated to
  English; same for the `f(modelo,contexto,prompt)` formula in the EN Mathematics essay.
- **03a** — the Backpressure ES "no ocurran errores" sentence: Aníbal explained it as a deliberate
  raise-the-simplistic-take-then-rebut move; Claude's assessment (in the session report): the
  rhetorical structure is real but the "no" still misstates the principle the sentence attributes
  to the series. **ES left untouched, awaiting Aníbal's final word.** EN keeps the corrected sense.
- **03b + 05** — proper nouns aligned in BOTH languages (owner amended the byte-identical mandate):
  Garret Galoway → Garrett Galloway (both prompt-injection posts), Moonshoot → Moonshot (ES
  systems-view), Github → GitHub (ES mathematics).
- **03c** — "sin ayudas mecánicas" in the sleep-apnea post: left as written — during the magic
  months he had no CPAP and no férula, so "without mechanical aids" is literally what the
  evidence shows; the reviewer's "chemical" reading is not forced by the text.
- **04** — the January-2026 mentoring CTA lives only inside the dated recap post → stays (dated
  posts are historical record, pages are not; Aníbal's rule).

**Workers Builds fixed (was the "one pre-existing problem"):** `wrangler.jsonc` now in the repo —
assets-only Worker `website`, `assets.directory: ./dist`, `not_found_handling: 404-page` (runbook
step 3 now in code). `wrangler` pinned as a devDependency. Validated: `wrangler deploy --dry-run`
reads all 155 dist files; `scripts/verify-migration.mjs` = **122/122 against `wrangler dev` running
this config**. Next push should give a green build + preview URL for the human QA pass Aníbal wants.

**Copy/design pass (Aníbal's list, both locales):**
- Em dashes purged from all site chrome (ui.ts, OG images, titles now use `·` separators, the
  AI-translation note in the 9 EN posts). Posts' own prose untouched. Brain: `no-em-dashes-site-copy`.
- Hero margin note: comma not dash, Caveat 600 at 1.55rem (500 faces removed — 600 is the only
  consumer), and it gained its asterisk pair: a hero footnote that qualifies the claim ("depends on
  your culture, and on how your leadership understands technology right now") and gates the
  non-software-core segment toward `/contact/`. On mobile the note+footnote stack under the actions
  — the "doesn't show on responsive" complaint was the note rendering orphaned at the fold.
- `.credo-closing` and `.myths-closing` moved from mid-weight sans (the "disconnected font") into
  the Fraunces statement register — italic display for the credo resolution, amber-border display
  for the services pivot.
- Footer CTA rewritten: title now echoes the thesis ("Aligning people, technology, and the business
  starts with a conversation."), button → `/contact/`, quiet line → direct calendar. Services
  "Not sure which fits?" → `/contact/` too. **`/contact/` stays** — the standing brain decision
  (`contact-pages-linked-two-paths`: the room between "interested" and "meeting") now has the
  funnel pointing at it; deleting it would re-litigate a settled call.
- Essay cards on home carry original publish dates (`ESSAY · 01 · OCT 2025`).
- New side effect appended: "Creating an asymmetrical workload for human verification" (+ES).
- Services → about quiet link ("the experience behind them → about"); ideas → LinkedIn articles link.
- Contact pages: "my Google Calendar", comma-not-dash intro, tightened write-first line.

Before/after screenshots: `shots/qa/`. Still open for Aníbal: 03a final word, and the preview QA
once Workers Builds goes green on this push.

**Round 2 (same day, Aníbal's design-feedback pass on `/`):** the principles section restructured
into three terminal prompts — eyebrow `principles` → **`> the goal`**, credo h3 → **`> working
principles`**, myths h3 → **`> the recurring core problem`** (ES: `el objetivo` / `principios de
trabajo` / `el problema recurrente de fondo`, Aníbal's pick over Claude's `el problema de siempre`) with the old myths title kept as the statement `p` below.
Credo now reads as a dialog: "I believe that" merged into the belief sentence (amber lead
retired), the counter is the skeptic's voice ("But Aníbal! … they work!"), consequence refocused
on "our teams". `.credo-closing` downsized to match `.myths-closing` (`--text-1`). Two roads to
about/ in Aníbal's voice: whoami ¶4 ("My whole story is a bit more complicated…") and the
services prose paragraph ("I can talk system design, management principles, or existential
philosophy… you can read them in about/") replacing the mono label, tighter spacing. Both locales.

**Round 3 (same day):** the aburrida restructured — hook is now a regular paragraph ending
"because:", Clarke's aphorism sits in a real quote card (same device as the credo dialog, with a
mono `Arthur C. Clarke` cite), and the explanation starts "And the problem with magic…" and ends
"…the real work can start." Bold emphasis added to "simulating a human-like intelligence on the
other side of the prompt" (credo rebuttal) and "the illusion that all of this is true" (myths
intro). Both locales. The about page keeps its big-statement aburrida motif — feedback was scoped
to the homepage.

**Round 4 (same day):** the hero footnote moved into the right margin column with the handwritten
note — one `.hero-aside` unit, note + footnote stacked (mobile keeps the stack under the actions);
the note stepped up to Caveat 700 at 1.8rem (600 files swapped for 700) and the arrow grew to
280px / stroke 2. Aburrida explanation gained emphasis: bold "the problem with magic is that it
happens to us", italic "but we cannot manage it". Both locales.

**Round 5 (same day):** responsive hero treatment split by viewport — below 1100px the handwritten
note + footnote are replaced by one plain muted paragraph (`.hero-callout-compact`) between the
lede and the CTAs: "Even if engineering isn't at your core, we may still fit: it depends on your
culture… To find out if this is you, start the conversation." No handwriting, no link (the booking
buttons sit right below). Desktop margin column unchanged. Both locales.

---

## ⚡ Session 8 (2026-08-22) — the migration. Branch `migration/quartz-import`, PR #1.

All 10 published i.usedtocode.com posts migrated (byte-verified) + 9 English translations
(triple-reviewed), full old-URL redirect map, verification harness (122 checks green against
wrangler dev). Build is 28 pages. Details: `brain` pages `blog-url-migration` and
`domain-i-usedtocode`, and the PR body.

**Closed today** (do not reopen):
- **R-01** — the DNS call: Aníbal chose **i.usedtocode.com** as the site's domain. Config flipped
  (`astro.config.mjs` + `robots.txt`).
- **R-05** — real posts exist in both locales; fixtures deleted; LHCI post-gate live (3 post URLs,
  all 100s, CLS = 0).
- **S7-07** — all posts migrated before publishing, as demanded.
- **D-07d** — the five-essay series now exists in English; EN homepage cards link the translations
  with English titles (Aníbal's call — supersedes "titles are artifacts: Spanish in both locales").

**Cutover executed 2026-08-25 — hosting pivoted to GitHub Pages** (plan + record: `DEPLOY-GITHUB-PAGES.md`;
Aníbal's go-ahead cleared the review gate). The Cloudflare runbook below is dead: DNS was never moved to
Cloudflare (still a Namecheap CNAME → `anibal.github.io`), and the old Quartz site was still live on GitHub
Pages — the first deploy to `anibal/anibal.github.io`'s default branch IS the cutover. `wrangler.jsonc`,
`public/_redirects` and the wrangler devDependency are gone; the old URL surface is preserved by the
`legacyStubs` integration (`src/lib/legacy-stubs.mjs`, registered in `astro.config.mjs`) plus byte-identical
OG assets in `public/`, asserted against production by `scripts/verify-migration.mjs`. Manual follow-ups:
submit the sitemap in GSC, decommission the `website` Worker, archive `anibal/website`.

This is the ledger of what is **open**. The record of *how* these came up is the Session 6 report:
https://claude.ai/code/artifact/1cee3173-973c-4ca2-9f1a-857212b7ffbb
The arbiters for any new sentence are `reference/positioning-canon.md` and `reference/narrative-map.md`.

IDs `D-01`…`D-07` are stable and match the report. Sub-IDs (`D-05a`…) split bundles so they can be
ticked off one at a time. `D-08` and the `R-xx` series are decisions that exist in the canon,
the narrative map, or `brain/roadmap.md` but were never given a number.

---

## ⚡ Session 7 (2026-08-22) — the collapse. Read this before the ledger below.

Aníbal returned a printed, hand-annotated homepage (4 photos) plus AskUserQuestion ratifications.
**Annotations overrule the ledger.** The site collapsed to 8 pages: home (absorbing `/principles/`),
`/ideas/` + posts, `/about/`, `/contact/` — all service pages and `/principles/` deleted, both locales.
**Every `:line` reference below predates this and is stale** (`ui.ts` lost ~300 lines); grep, don't trust numbers.

**Closed today** (do not reopen):
- **D-02a + D-02b** — hero replaced in both locales: *"elevating the team and the codebase"* /
  *"elevando al equipo y al codebase"*. Old strings recoverable at `c1d9616`.
- **D-05a** — dissolved: Diagnostic no longer exists. Service 01 is **Talks/Charlas**, card only, no page.
- **D-05b** — dissolved with the fractional page (the `servicePages` block is deleted).
- **D-06b** — dissolved with the Diagnostic.
- **D-07b** — the mislabeled **proof** section is gone; home now carries the principles credo instead.
  The testimonials rule itself (≥3 real quotes or render nothing) still stands for any future section.
- **D-08** — answered leanly, not by repositioning: ICP stays engineering-wedge; the hero's ink margin
  note (*"even if engineering isn't at your core — we may still fit."*) does the widening, and the
  thesis heading now says *aligning people, technology, and the business*.
- **D-07c** — mooted as written (the fixed-fee Diagnostic is gone). Pricing signal is now a free choice.

**Moved, still open**: D-01 (Clarke) and D-04 (myths conclusion) now live in the home `principles`
section. D-06c's proof-card surface is gone; only the About mention remains.

**New in Session 7 — drafts awaiting the red pen** (all comment-flagged `draft` in `ui.ts`):
- **S7-01** — the facilitation definition under the services verbs (EN + ES).
- **S7-02** — the Talks/Charlas card copy (EN + ES).
- **S7-03** — the ink-note callout copy (EN: *"even if engineering isn't at your core — we may still
  fit."* / ES: *"aunque la ingeniería no sea tu centro — igual podemos encajar."*).
- **S7-04** — "I used to promote myself as a ~~consultant~~" statement; deliberate *iusedtocode* echo.
- **S7-05** — essay-card teasers reuse the existing five-article summaries; Aníbal will check EN
  teasers against the Spanish originals later (his words: "fix the translation later").

**New in Session 7 — assets & follow-ups**:
- **S7-06** — podcast thumbnail: `[ thumbnail ]` placeholder (112px square, portrait contract) awaits
  Aníbal's artwork; a multi-thumbnail animation is a possible later pass.
- **S7-07** — migrate all posts from i.usedtocode.com into the site **before publishing** (his words).
  Until then the three essay cards link out to the original site (↗). Ties into R-05/D-07d.
- **S7-08** — Caveat (hand face for the ink note) self-hosted via @fontsource, `font-display: optional`
  per site policy — cold-cache first paint may show the fallback cursive. Revisit a home-only preload.
- **S7-09** — nav is now `home/ ideas/ about|sobre-mí/ contact|contacto/` (per Aníbal's chosen site map).

**Integration catches (fixed, worth knowing)**:
- **S7-10** — the shorter hero made the **lede** the LCP element; its opacity fade was gating LCP at
  FCP+720ms (measured 1513ms vs the 1500ms gate). It now obeys the same rise-only law as the h1
  (`brain/pages/lcp-element-motion-constraint.md` has a second confirmed instance). Home LCP: ~800ms.
- **S7-11** — About's `shapes-row` rendered `<a>` without href once service items lost theirs
  (SEO 0.92, `crawlable-anchors`); all three shapes now link to the home `#services` ladder.
- LHCI list now audits all 8 pages (about/contact restored); all gates green across both runs.

---

## A. Calls Claude made — ratify or reverse

Each is one string (or one pair of sibling strings) in `src/i18n/ui.ts`. Reversal is cheap.

### D-01 · The Clarke sentence no longer dangles
`src/i18n/ui.ts:285` (EN) · `:741` (ES) — the `principles` block, i.e. the /principles/ opening.
Was, verbatim in `e272e08`: *"…the magic disappears, and …"* / *"…la magia desaparece, y …"* — a
deliberate hand-off into the credo that **two of three cold readers read as a build bug**
("looks like truncated copy"). Now: *"…the magic disappears — and then the real work begins."* /
*"…la magia desaparece — y empieza el trabajo de verdad."*
This is your manifesto text. **Revert** = restore those two exact strings.
Note: the About-page sibling (`:413` / `:868`) stops at *"the magic disappears."* and always did —
shorter cut, no dangle, untouched by this pass. Locales agree in both places.

### D-02a · Hero stays verbatim — a bolder option is on file
`src/i18n/ui.ts:39` (EN) · `:494` (ES).
Kept the flag as-is; the lede now carries facilitation. Alternative that leads with the verb:
*"I facilitate the adoption of AI-assisted development in engineering organizations — without
breaking their teams or their codebase."*

### D-02b · ES hero says "ni su código"
`src/i18n/ui.ts:494`, and the meta description at `:472`. Your loanword identity would say
**"ni su codebase"** (canon §7 lists codebase as canon). Separate, smaller call than D-02a.

### D-03 · Three voice beats on About that put words in your mouth
- *"I don't rent out authority."* — `:456` / ES `:913` (*"No alquilo autoridad."*)
- *"Also, I have produced enough slides for one career."* — `:451` / ES `:908`
- *"I grew suspicious of my own distance from it"* — `:420`; the ES sibling deliberately says
  *"…con el código"* (`:877`), which is a stronger, more specific claim than the English.

All three are in-register and all three are yours to strike. **Read About out loud** — that is the
single highest-value hour on this list.

### D-04 · The myths conclusion — two alternates on file
`src/i18n/ui.ts:339` (EN) · `:796` (ES). Current text lands the outputs→outcomes bridge.
- **alt A** (keeps the original cadence): *"Y nada de esto ayuda a crear valor, ni a construir la
  capacidad de crearlo. Genera actividad — y la actividad no son outputs, ni los outputs, solos,
  son outcomes que el negocio pueda medir."*
- **alt B** (side-effects callback): *"…Dormidos al volante producimos actividad — no outputs de
  calidad consistente, y mucho menos outcomes."*

---

## B. Open questions only you can answer

### D-05a · Does "Diagnostic" keep its name?
`src/i18n/ui.ts:89`, `:139`, `:172`, `:186` (EN) · `:545`, `:595` (ES) — plus the route
`/services/diagnostic/` and `/es/servicios/diagnostico/`, the OG route, `lighthouserc.cjs`,
`scripts/shoot.mjs`, and the `localizedRoutes` map. The copy is reframed (alignment is the
product), but the *name* still reads analysis-shaped. Kept for continuity; flagged `[REVISIT]` in
canon §5. **Renaming touches routes and gate configs, not just strings.**

### D-05b · ES Fractional step name: "Embeber" vs "Embeberme"
`src/i18n/ui.ts:652` — "Retirarme" (`:656`) is first person; "Embeber" is not. Parallelism argues
for *Embeberme*.

### D-05c · "collapsing non-linearly trying to scale"
`src/i18n/ui.ts:56` (EN) · `:512` (ES). The CEO cold reader's least favourite line on the site;
your own copy notes defend it as a systems-literacy signal. Keep or soften.

### D-06a · What the booked conversation actually is
`src/i18n/ui.ts:33-35` / `:488-490` (`cta.book` → `calendar.app.google/…`). Length? Free? One line
under the CTA removes the last hesitation before the click. Currently nothing says.

### D-06b · Does governance/security of ungoverned AI use belong in the Diagnostic's scope?
Diagnostic scope language: `:169`, `:547`, `:597`, `:601`. The ES cold reader's board asks this
first ("shadow AI"); the scope list currently ends at *risks* without naming it.

### D-06c · The Gestalt training's institution
`src/i18n/ui.ts:72`, `:223`, `:246`, `:435` (ES siblings at `:528` ff.). Naming the institution
converts a credential claim into a checkable fact. Only you know whether you want it named.

### D-06d · Remote vs on-site expectations
Nowhere on the site. Matters for the EN buyer deciding whether Medellín is a blocker; the contact
page already states you work in English or Spanish, which is the same class of fact.

### D-08 · Does the ICP widen beyond engineering organizations? *(new — canon §4 `[REVISIT]`)*
The canon holds engineering orgs as the wedge and "AI at the core of the workforce" as the horizon.
Widening the ICP to knowledge work broadly is **a bigger repositioning than the Session 6 pass** —
it would reopen the hero, the thesis, and all three service pages. Unresolved, this quietly caps
who the site can speak to. Decide deliberately, not by drift.

---

## C. Reserved decisions — now carrying measured cost

These were reserved long before Session 6. What changed is that three blind cold readers hit every
one of them independently. Listed once here; canon §8, the narrative map, and D-07 all point at
these same four.

### D-07a · The portrait
`[ portrait ]` / `[ foto ]` renders on the two pages where trust is decided:
`src/components/HomePage.astro:51` and `src/components/AboutPage.astro:41`; labels at
`src/i18n/ui.ts:52` / `:508`. **3 of 3 readers** named it as the moment the site stopped feeling
finished. Dimensions are already fixed, so dropping in a real photo causes no layout work.

### D-07b · Three real testimonials, or the section stays a credentials list
Rule unchanged (`brain/pages/testimonials-real-or-omitted.md`): the component renders nothing until ≥3 real
quotes from named people at named companies exist. Consequence today: the section labelled
**proof** (`src/components/HomePage.astro:59-63`, strings at `src/i18n/ui.ts:59` ff.) holds
credentials, not proof — one reader's words: *"zero clients, zero outcomes, zero testimonials."*
Either land the quotes, or consider renaming the section so it stops promising what it doesn't show.

### D-07c · The pricing signal
The Diagnostic says *fixed scope, fixed fee* (`:169`, `:597`, `:625`) and never a number. Both
booking-ready readers said the same thing: they book anyway, but the call has to open with a real
figure — *"if the fee question gets the classic 'it depends' dance, the spell breaks."* An order of
magnitude on the Diagnostic would be enough, and it fits the anti-opacity voice better than silence.

### D-07d · An English essay — the EN skeptic's single blocker
The five essays (`src/i18n/ui.ts:349-377`, ES siblings `:806-834`) are the entire evidentiary base
and are Spanish-only. The VP persona would have booked instead of writing if he could read one.
**Essay 02, the value arithmetic**, is the one to translate first — it is the proof-of-depth he
went looking for. Also unblocks R-05.

---

## D. Standing project decisions (from `brain/roadmap.md`, corrected)

### R-01 · Final domain — DECIDED (2026-08-22)
**i.usedtocode.com** — wired in `astro.config.mjs` + `public/robots.txt`; the old Quartz domain, kept for
SEO continuity (brain: `domain-i-usedtocode`). Hosting is GitHub Pages since 2026-08-25.

### R-02 · Does the repo go public?
The colophon links it if so. Untouched since session 1.

### R-03 · Plausible analytics — deferred, never decided
Not in the codebase (verified). It would be the site's only third-party request. Depends on R-01.

### R-04 · Ratify three standing technical calls
Made by Claude across earlier sessions, never formally ratified:
`font-display: optional` (`brain/pages/font-loading-strategy.md`) · devtools-throttled LHCI
(`brain/pages/lhci-devtools-throttling.md`) · the LCP-element motion rule (`brain/pages/lcp-element-motion-constraint.md`).

### R-05 · First real posts — ≥1 per locale
All existing writing is Spanish; an EN post means new writing or an approved translation (see
D-07d). **Two things die silently until this lands:** the `TODO(first-post)` representative-post
URLs in `lighthouserc.cjs:5` (so the post template is never perf-gated), and the two fixture drafts
that should be deleted the same day.

### R-06 · F-10 — wide-viewport composition
Flagged in the 2026-08 critique, deferred out of Session 6 as *design work, not copy*
(`reference/narrative-map.md:127`). Still open, still unscheduled.

### R-07 · Both locales proofread by you
The launch gate predates the rewrite. Session 6 replaced essentially every string, so the
sign-off that matters is on the **current** copy, not the session-4 drafts the gate refers to.

### R-08 · Do the working documents stay in the repo at launch?
`SESSION-2/4/5/6.md`, this file, and `reference/` are all tracked. Raised in SESSION-5 Part E as
your call ("retire the session files if Aníbal wants the repo clean for launch"). Bears on R-02:
if the repo goes public and the colophon links it, these become part of the published surface.

---

## E. No longer pending — do not reopen

- **Calendly** → resolved: Google Calendar booking link is live (`src/i18n/ui.ts:34` / `:489`).
- **OG images** → shipped in `e272e08` (`src/lib/og.ts`, `src/pages/og/[...route].png.ts`).
- **Service-page copy sign-off (session 4 drafts)** → superseded by the canon rewrite; what needs
  sign-off now is R-07.
- **The Bottleneck / signature element** → removed by your decision (`brain/pages/signature-element-bottleneck.md`).
- **`/contact/` keep-or-delete** → kept and linked (`brain/pages/contact-pages-linked-two-paths.md`).
- **The "verbatim v2, do not rewrite" copy lock** → reopened by you, superseded by the canon.

---

## F. Suggested order

Trust gained per hour spent. The first three need nobody but you.

1. **D-03** — read About out loud, strike what you wouldn't say. One sitting.
2. **D-07a** — ship the portrait. No layout work, largest single credibility gain.
3. **D-06a + D-07c** — one line on what the conversation is, one number on the Diagnostic.
4. **D-01, D-02, D-04, D-05** — ratify or reverse; each is one string.
5. **D-07b** — collect three real quotes. Long lead time, so start it early even though it lands late.
6. **D-07d → R-05** — translate essay 02; it unblocks the perf gate and the EN skeptic at once.
7. **D-08** — decide the ICP question deliberately before the next copy pass builds on top of it.
8. **R-01 → R-03**, then the launch gates.
