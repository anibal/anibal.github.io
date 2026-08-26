# SESSION 2 — Complete the homepage

**Read first, in this order:**
1. `HANDOFF-anibalrojas-site.md` — source of truth (§2 philosophy, §3 design system, §3.4 motion, §6.1 homepage spec, §9 gates)
2. `reference/homepage-copy-anibal-rojas.md` — the approved bilingual copy. **Use it verbatim** for every section; do not rewrite, "improve," or translate anything. EN and ES are both final. Text in *[brackets]* in that doc is instructions, never rendered.
3. `reference/homepage-mockup.html` — approved visual direction for the sections you're building (proof cards, services ladder, ideas cards). The production version should be its more refined sibling.
4. `brain/` — decision notes from session 1. Add new notes for any decision you make this session.

**Session goal:** both homepage locales complete (all sections), the §3.4 motion system implemented, session-1 review debts paid, and a deployed preview URL as the exit gate.

---

## Part A — Pay session-1 review debts (do these first)

1. **Footer links — real URLs now exist:**
   - email → `mailto:i@usedtocode.com` (label: `email`)
   - linkedin → `https://www.linkedin.com/in/anibalrojas/`
   - substack → `https://anibal.substack.com/`
   - ocorres.com → keep as is
   - Add all three (plus i.usedtocode.com) to `sameAs` in the Person JSON-LD (`Base.astro`).
2. **CTA destination.** Calendly does **not** exist yet (decision still reserved). Every `Book a conversation` / `Agenda una conversación` CTA (header, hero, footer) becomes `mailto:i@usedtocode.com` with a locale-appropriate subject, e.g. `?subject=Conversation` / `?subject=Conversación`. Remove the self-referencing `#contact` no-op. Leave a `TODO(calendly)` at each site. The footer keeps `id="contact"` (in-page anchor target is fine).
3. **Off-grid values → tokens.** Fix without visual regression:
   - `1.08rem` hero lede → add `--text-lede: 1.08rem;` to `tokens.css` with a comment (intermediate step between --text-0 and --text-1, used only for ledes) — or snap to `--text-0` if it looks right; judge on screen.
   - The three `14px` gaps/margins (hero actions gap, thesis `p + p`, header gaps) → `--space-2` (16px) unless it visibly damages rhythm; if 14px truly wins, mint `--space-1_5: 0.875rem` once and reuse.
   - `.btn:hover { background: #000 }` → `color-mix(in srgb, var(--ink) 88%, black)` or a `--ink-deep` token. No raw hex outside `tokens.css`.
4. **Head minors** (`Base.astro`): Person JSON-LD `url` = site root (locale home), not the page canonical; add `<meta property="og:site_name" content="Aníbal Rojas">`; add `<meta name="theme-color" content="#F7F7F3">`; pass the i18n config to `@astrojs/sitemap` so hreflang alternates appear in the sitemap.

## Part B — Build the remaining homepage sections

Order on the page (per handoff §6.1 and the copy doc): Hero → Thesis → **Who I am → Proof → Services → [Testimonials: OMIT] → Ideas** → Footer. Both locales, from the copy doc's EN and ES versions respectively. Section conventions from the mockup: mono `>` eyebrows, `.inner` max-width, spacing from the scale only.

1. **Who I am** (`> whoami` / `> whoami`). Two-column ≥900px (portrait column + prose), stacked below. **Portrait is still pending (reserved decision):** build the slot as a dignified placeholder — a `--slate`→lighter-slate gradient block, `--radius-md`, small mono label `[ portrait ]` — sized so the real photo drops in with zero layout change (fixed aspect ratio, explicit dimensions). Do not use a stock image or generated face.
2. **Proof** (`> proof` / `> credenciales`). Four cards, 2×2 ≥700px, 1-col below. Card style per mockup: `--card` bg, `--line` border, mono lowercase heading with `■` amber marker. The ocorres.com link inside card 4 opens in a new tab with `rel="noopener"`.
3. **Services** (`> services` / `> servicios`), `id="services"`. The 01/02/03 ladder rows per mockup (mono amber numeral · Fraunces title · prose), hairline separators. After the ladder: the ghost CTA ("Not sure which fits…" / "¿No sabes cuál encaja…") → `mailto:` for now. **Retarget the hero's secondary CTA from `#thesis` to `#services`.** Row titles are NOT links yet (service pages are session 4); leave `TODO(session-4)`.
4. **Testimonials: render nothing.** Zero real quotes exist. Handoff §6.1: fewer than 3 → the section does not exist in the DOM. Do not scaffold a hidden version.
5. **Ideas** (`> ideas`). Two cards per mockup: writing (Fundamental Principles / Principios Fundamentales — link `TODO(session-4)` → `/principles/`, render as non-link title + mono tag until then, no dead `#` links) and podcast (→ `https://ocorres.com`, new tab). Copy verbatim from the copy doc's Ideas section.

## Part C — Motion system (handoff §3.4, exactly)

1. **Load sequence, homepage only, ≤900ms total:** eyebrow (fade) → h1 (opacity + ≤12px rise) → cursor begins blinking → hero lede + actions (fade). Stagger with `--dur` values only; easing `--ease` only. CSS-only (animation-delay); no JS. Cursor animation starts after the h1 lands (`animation-delay`), so the sequence reads eyebrow → headline → *cursor* → lede.
2. **Scroll reveals** for the new sections: opacity + ≤12px translate, once, via one small `IntersectionObserver` inline script (this is the page's first JS — keep it <1KB, vanilla, no island). Stagger ≤60ms between siblings (proof cards, service rows). Elements start visible when JS is absent (progressive enhancement: the hidden state is applied by JS, not by default CSS).
3. **Reduced motion:** load sequence, reveals, and cursor all fully disabled — content simply present. The existing global reduced-motion block probably covers it; verify explicitly.
4. Nothing else moves. No parallax, no pinning, no new hover effects beyond the existing vocabulary.

## Part D — Exit gates for this session

- `npm run build` clean; `npm run lhci` green (100/100/100/100, LCP<1.5s, CLS=0, TBT<50ms) on `/` and `/es/`.
- JS on the homepage: only the reveal script, well under budget. Blog/none elsewhere.
- Keyboard pass: tab through both locales end to end; every interactive element visibly focused; no `href="#"` anywhere in the DOM.
- Both-locale screenshot review at 360 / 768 / 1440: no Spanish overflow or bad wraps (check the h1, service titles, card headings; use `text-wrap: balance` and, only if needed, manual `<wbr>`/breaks). Spacing audit: every gap traces to the scale.
- The Chanel pass, documented in the commit or PR description: name the one accessory you removed.
- **Deploy:** Cloudflare Pages connected and a public `*.pages.dev` preview URL live (framework preset Astro, build `npm run build`, output `dist/`). Put the URL in the README. This gate is not optional — session 3's review happens against the rendered site.
- Update `brain/` with any decisions made (e.g., lede token, 14px resolution, reveal implementation).

## Out of scope — do not touch

The Bottleneck (session 3; the thesis block keeps its TODO comment), service/blog/about/contact pages and header nav (session 4–5), OG image generation, Plausible, dark mode, testimonials content, portrait sourcing, domain change.

**Still reserved for Aníbal** (unchanged): final domain, public repo, portrait, testimonials, service-page copy sign-off, Bottleneck interactive-vs-static, Calendly.

*When in doubt: dry confidence, visible thesis, remove one accessory.*
