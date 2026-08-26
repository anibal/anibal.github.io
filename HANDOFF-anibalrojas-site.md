# HANDOFF — anibalrojas.com (working name)

**Purpose of this document:** complete brief for building the production website with Claude Code. It contains the strategy, the approved copy, the design system, the elevation targets that take the design from "good" to award-worthy, the tech spec, and acceptance criteria. Treat it as the source of truth; where it conflicts with improvisation, this document wins. Where it is silent, decide in the spirit of the Design Philosophy section.

**Companion files in repo (`/reference`):**
- `homepage-copy-anibal-rojas.md` — approved bilingual copy (v2)
- `homepage-mockup.html` — approved design direction (v1 mockup). The production site must feel like this mockup's more talented sibling, not a different site.

---

## 1. Project summary

Personal professional site for **Aníbal Rojas** — 30-year engineering executive (ex-VP of Engineering / SVP of Technology at Platzi), now independent: AI-adoption advisory, fractional VP of Engineering, and executive coaching, for engineering organizations, primarily in Latin America.

**Positioning (the one sentence everything serves):**
> I help engineering organizations adopt AI-assisted development — without breaking their teams or their codebase.

**Thesis (the intellectual signature):**
> The problem is still the people and the teams. It just got more complex. Software is knowledge work performed by humans inside a complex system; AI moves the bottleneck to judgment, trust, and how teams actually work. Lenses: systems thinking + high-performance teams.

**Audience:** CEOs/CTOs/VPs of LatAm scale-ups and corporates (Spanish-first), plus US/global companies (English-first, hence EN is the default locale). Secondary: engineers and leaders who follow his writing/podcast — the funnel.

**The site's single job:** make the right visitor book a conversation. Everything else (blog, podcast, credentials) is evidence in service of that.

---

## 2. Design philosophy — what "prize-worthy" means here

The bar: a site that could plausibly earn an Awwwards Site of the Day / CSS Design Awards nomination **while remaining a credible B2B advisory site**. That combination is the hard part and the point. Prize-worthiness comes from:

1. **A thesis made visible.** The best awarded sites embody their subject. This site's subject is *systems under AI acceleration* — so the site itself should demonstrate systems literacy: one interactive, thesis-embodying signature element (§5), impeccable typographic systems, and motion that behaves like a well-engineered system (orchestrated, physical, interruptible).
2. **Editorial craft, not effects.** The register is "beautifully typeset engineering document," not "agency showreel." No WebGL hero for its own sake, no scroll-jacking, no cursor-following blobs. Every award juror has seen those; few have seen restraint executed perfectly.
3. **Performance as a design feature.** The site must be shockingly fast (§9). For this audience, a 100/100 Lighthouse score *is* an aesthetic statement and a sales argument.
4. **Bilingual as first-class.** EN/ES parity in design quality. Spanish text runs ~15–20% longer; layouts must be designed for the longer language, not patched for it.
5. **One risk, spent deliberately.** The signature element (§5) is where boldness lives. Everything around it is quiet, disciplined, and precise. Before shipping any page, apply the Chanel rule: remove one accessory.

**Anti-goals (instant disqualification):**
- Generic AI-site aesthetics: dark background + neon gradient, glassmorphism cards, floating 3D shapes, typing-effect headlines, particle starfields.
- Hacker-terminal cosplay: green-on-black, matrix rain, fake CLI boot sequences.
- The templated look: cream + serif + terracotta accent; identical card grids with icon + title + text × 6; stock illustrations of robots/brains.
- Any copy that sounds like it was written by the tools the site discusses.

---

## 3. Design system (extends the approved mockup)

### 3.1 Color — "amber phosphor on cool paper"
Rationale: amber CRT phosphor = the "old-skool, from the terminal" identity without hacker cliché. Cool paper = engineering document, not warm-cream template.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F7F7F3` | page background |
| `--card` | `#FFFFFF` | raised surfaces |
| `--ink` | `#191C21` | primary text |
| `--muted` | `#5C6370` | secondary text |
| `--line` | `#E4E3DC` | hairlines, borders |
| `--amber` | `#A85A0A` | accent: links, prompts, markers |
| `--amber-bright` | `#D97706` | cursor, focus, live states |
| `--slate` | `#3B4A63` | diagrams, secondary emphasis |

Permitted additions: a near-black `#101318` for an *optional* inverted band (e.g., footer or the signature element's canvas) — at most one inverted region per page. A very subtle paper-grain texture (SVG noise, ≤2% opacity) on `--paper` is allowed if it survives the performance budget; drop it if it reads as decoration.

Dark mode: **out of scope for v1** (do not half-ship it). Architect tokens so it can be added later.

### 3.2 Typography — the personality carrier
- **Display:** Fraunces (variable; use optical sizing and the `wght`/`SOFT`/`WONK` axes deliberately — e.g., slightly wonky `WONK 1` at display sizes only, for warmth). Headlines, thesis, service names.
- **Body:** IBM Plex Sans. 17px base, 1.65 line-height, `--prose: 66ch` max measure.
- **Utility:** IBM Plex Mono. Eyebrows (`> section` prompt convention from mockup), labels, metadata, footnotes, the wordmark `~/anibal-rojas`.
- Self-host all fonts as woff2 subsets (Latin + Latin-ext for Spanish), `font-display: swap`, preloaded. No Google Fonts requests in production.
- Type scale: define a modular scale (suggest 1.25 ratio from 17px) as CSS custom properties; every size on the site comes from the scale. Fluid clamp() for display sizes.
- Prize-level details: real small caps or letter-spaced mono for labels (never faux); hanging punctuation on the thesis blockquote if feasible; `font-variant-numeric: tabular-nums` in any numeric/metadata context; correct Spanish typography (« », ¿ ¡, proper accents everywhere).

### 3.3 Layout & spacing
- Max content width 1060px; prose 66ch. 8px spatial base grid; section rhythm from a spacing scale, never ad-hoc values.
- Structural devices carry meaning (mockup conventions kept): `>` mono eyebrows; `01/02/03` only on Services (it's a genuine ladder); `■` markers on proof cards.
- Grid: an *visible* hairline grid is permitted as a background device on at most one section if it reinforces the "engineering document" idea — judge in context.

### 3.4 Motion system
Motion behaves like a well-damped physical system. Rules:
- One orchestrated page-load sequence on the homepage (≤900ms total): eyebrow → headline (subtle rise + fade, stagger) → cursor begins blinking → hero paragraph. Nothing else animates on load.
- Scroll-triggered reveals: opacity + ≤12px translate, once, `IntersectionObserver`, stagger ≤60ms. No parallax, no scroll-jacking, no pinning.
- Hover micro-interactions: links get an amber underline that draws in (120ms); cards lift ≤2px with shadow ease; the CTA button darkens. That's the full vocabulary — reuse it everywhere.
- `prefers-reduced-motion: reduce` disables all of the above including the cursor blink and the signature element's animation (§5 must have a static fallback).
- Easing: one custom cubic-bezier for the whole site (suggest `cubic-bezier(0.22, 1, 0.36, 1)`); durations only from {120, 240, 480, 900}ms.

---

## 4. Information architecture

```
/                      Homepage (EN — default locale)
/es/                   Homepage (ES)
/services/diagnostic          /es/servicios/diagnostico
/services/fractional          /es/servicios/fractional
/services/coaching            /es/servicios/coaching
/principles/           Series landing: Fundamental Principles   /es/principios/
/ideas/                Blog index (tags: ai-development, leadership, systems)   /es/ideas/
/ideas/[slug]/         Post pages (language per post; cross-link translation when it exists)
/about/                /es/sobre-mi/     (long-form narrative; adapt from i.usedtocode.com "about", turned toward clients)
/contact/              /es/contacto/     (Calendly embed + email; loads Calendly only on interaction)
/now/                  optional, phase 2 — fits his digital-garden lineage
```

- Locale switcher in header persists the equivalent page (EN `/services/coaching` ↔ ES `/es/servicios/coaching`), not the homepage.
- `hreflang` pairs on every page; sitemap includes both locales.
- Old site: `i.usedtocode.com` remains live as the archive; link from `/ideas/` footer ("archive → i.usedtocode.com"). No migration in v1.

---

## 5. The signature element — "The Bottleneck"

The one memorable, prize-earning thing. An interactive diagram that **demonstrates the thesis instead of stating it**, embedded in the Thesis section of the homepage (both locales).

**Concept.** A minimal, elegant system diagram in the site's visual language (SVG/canvas, ink lines, slate nodes, amber tokens): work items flow left → right through stages of a delivery system — *ideas → code → review → integration → production*. A single control labeled **"AI velocity"** (a slider, or three preset states: 2019 / 2024 / now). As the user increases it:
- The *code* stage visibly accelerates (tokens speed up, multiply).
- Queues pile up amber at *review* and *integration* — the bottleneck visibly **moves right**, into the human/coordination stages. Slight, controlled instability at max: the point where "a system collapses non-linearly trying to scale," rendered politely.
- A one-line mono caption updates with the state, e.g. `> bottleneck: code` → `> bottleneck: judgment & coordination`.

**Craft requirements.**
- Reads instantly without instructions; delightful within 3 seconds; rewards 20 seconds of play.
- Fully in design-system colors and type. No physics library — small hand-rolled rAF loop or CSS. Budget: ≤15KB JS for this component, lazy-mounted (Astro island, `client:visible`).
- Static fallback: a beautifully drawn SVG of the "now" state with the caption, used for no-JS, reduced-motion, and as the OG-image basis.
- Mobile: full interaction if it stays smooth at 60fps on a mid-range phone; otherwise presets-only.
- If, after honest self-critique, the interactive version isn't *excellent*, ship the static SVG diagram at high craft instead — a mediocre interactive is worse than a superb static. Do not let this component delay launch.

---

## 6. Page specs

### 6.1 Homepage
Structure and copy exactly per `homepage-copy-anibal-rojas.md` (v2) and the mockup: Hero (with blinking amber cursor) → Thesis (with signature element §5) → Who I am (real portrait photo — request from Aníbal; duotone treatment in slate/amber is permitted if the photo needs unifying) → Proof (4 cards) → Services (01/02/03 ladder) → Testimonials → Ideas (writing + podcast cards) → Footer CTA.
- Testimonials: build the component; if fewer than 3 real quotes exist at launch, **omit the section entirely** (render nothing). Never ship placeholder quotes.
- Footer colophon: "built from the terminal" / "construido desde la terminal" + link to the site's public repo if Aníbal agrees (credibility with this audience).

### 6.2 Service pages (template ×3)
One shared layout: mono eyebrow (`> services/diagnostic`) → Fraunces headline (the outcome, not the service name) → "Who this is for" (3 bullets max) → "How it runs" (diagnose → plan → execute, as a simple horizontal step diagram in system style) → "What you get" → one relevant testimonial slot → CTA. Copy: draft from the homepage service blurbs, expanded ~3×; keep the dry-confidence register; Aníbal reviews before launch.

### 6.3 Principles landing (`/principles/`)
Editorial page presenting the *Fundamental Principles* series as a coherent body of work: intro paragraph (why first principles — "playbooks expire, principles don't"), then the articles as a typeset index (mono numerals, Fraunces titles, one-line summaries, links to the original posts wherever they live). This page is a design showcase — treat it with the care of a book's table of contents.

### 6.4 Blog (`/ideas/`)
Index: year-grouped list, title + one-liner + tags + reading time. Post layout: 66ch measure, Fraunces headings, styled blockquotes (amber left rule — same family as the thesis block), Shiki code highlighting themed to the palette (amber/slate on paper), good figure/caption styles. RSS per locale. This layout will carry most future traffic — it must be as considered as the homepage.

### 6.5 About / Contact
About: narrative adapted from i.usedtocode.com (burnout → leadership → Platzi → sabbatical → now), closing turned toward clients. Contact: one page, one job — Calendly (click-to-load) + email + LinkedIn/Substack/ocorres.com.

---

## 7. Content model

Astro Content Collections, schema (zod):
```
posts:    title, description, date, lang ("en"|"es"), tags[], series?, seriesOrder?,
          translationOf? (slug), draft (default false), heroImage?, canonicalUrl?  // for posts republished from Substack/old site
testimonials: quote, name, role, company, lang, featured (bool), serviceRef?
```
Writing workflow requirement: publishing a post = adding one `.md` file with frontmatter and pushing. No other steps. Document this in the repo README in ≤10 lines.

---

## 8. Tech spec

- **Astro 5**, static output. Islands only for: language-aware header (if needed), the signature element, Calendly loader. Target ≤30KB total JS on the homepage, 0KB on blog posts.
- **Styling:** vanilla CSS with custom properties (design tokens in one file, mirroring §3). No Tailwind — the token discipline *is* the design system, and the CSS should be readable as a design artifact.
- **i18n:** Astro's built-in i18n routing; EN default at `/`, ES at `/es/`. All UI strings in a translations module; content per-locale via collections.
- **Images:** Astro `<Image>`, AVIF/WebP, explicit dimensions everywhere (zero CLS).
- **OG images:** generated per page at build (satori or equivalent) in the design system — mono metadata + Fraunces title on paper with amber accent; the signature diagram's static SVG as the homepage OG.
- **SEO:** canonical URLs, `hreflang`, JSON-LD (`Person` sitewide, `Article` on posts, `ProfessionalService` on service pages), sitemap, robots.
- **Analytics:** Plausible (script deferred; excluded from perf budget assertions but keep it the only third-party request).
- **Hosting:** Cloudflare Pages, auto-deploy from `main`, PR preview deploys. Custom domain + `www` redirect; old-site links untouched.
- **Repo hygiene:** README (setup, publish-a-post, deploy), `/reference` folder with this handoff + copy doc + mockup, meaningful commit messages. CI: build + Lighthouse CI assertions on PRs.

---

## 9. Budgets & acceptance criteria (ship gates)

**Performance** (mobile, throttled, Lighthouse CI):
- Performance / Accessibility / Best Practices / SEO: **100 / 100 / 100 / 100** on homepage and a representative post. LCP < 1.5s, CLS = 0, TBT < 50ms.

**Accessibility:** WCAG 2.2 AA. Full keyboard navigation with visible focus (amber-bright, 2px offset); skip-link; semantic landmarks; contrast verified for every token pair in use (note: `--amber` on `--paper` passes for large/bold text and UI accents; body-size amber text must be checked and darkened if used for long text); signature element keyboard-operable with a text status output (`aria-live="polite"` on the caption); reduced-motion honored globally.

**Design QA (screenshot review at 360 / 768 / 1440, both locales, before ship):**
- No Spanish string overflows or awkward wraps; headlines hand-checked for wrap points in both languages (use `text-wrap: balance` + manual breaks where needed).
- Spacing audit: every gap traceable to the scale.
- The Chanel pass, documented in the PR: name the accessory that was removed.
- The tell test: put the homepage next to three templated AI-consultant sites; a stranger must be able to say what makes this one different in one sentence. If they can't, the signature isn't landing — iterate.

**Content gates:** real portrait, real testimonials (≥3) or section omitted, all links live (ocorres.com, LinkedIn, Substack, archive), Calendly working, both locales proofread by Aníbal.

---

## 10. Build plan (suggested sessions)

1. **Scaffold & system.** Repo, Astro 5, tokens, fonts self-hosted, base layout, header/footer, i18n routing, deploy pipeline live from day one (every session ends with a shippable preview URL).
2. **Homepage.** Both locales, full motion system, static version of the signature diagram.
3. **Signature element.** The interactive Bottleneck as an island; self-critique against §5; keep or fall back.
4. **Templates.** Service pages ×3, blog index + post layout, RSS, Principles landing.
5. **Content & polish.** About, Contact, OG generation, JSON-LD, testimonials in, Lighthouse CI green, design QA pass (§9), launch checklist.

**Decisions reserved for Aníbal (ask, don't assume):** final domain; whether the repo goes public; portrait choice; testimonial selection/order; service-page copy sign-off; whether the Bottleneck ships interactive or static.

---

*End of handoff. When in doubt: dry confidence, visible thesis, remove one accessory.*
