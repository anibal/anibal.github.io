# Design Grammar — the constitution

**Authority.** This document codifies the design language of the home page *as built*
(owner ruling, 2026-08-24: home-as-built is the north star; where this document and an
older artifact — the handoff §3, the mockup — disagree, this document wins). Every page
on the site is measured against this grammar: same language, not pixel sameness. It was
extracted by a six-lens design audit (see brain: `home-design-audit-rulings`) and every
rule below is one the page already keeps — plus the dated rulings at the end.

The one sentence everything serves: **make the right visitor book a conversation.**
Devices are judged by whether they build that case. The register is editorial craft,
not effects; the Chanel rule applies (remove one accessory before shipping).

---

## 1. The governing metaphor

A terminal session printed on cool engineering paper, annotated by a human hand.
Three voices, each owning a typeface — and the copy is *written into* its register:

| Voice | Face | Speaks | Copy rule |
|---|---|---|---|
| The machine | IBM Plex Mono | prompts, nav, numerals, tags, cites, utility links, colophon | lowercase command-voiced strings; mono never persuades — the first marketing phrase set in mono breaks the spell |
| The claim | Fraunces | h1, statements, resolutions, card titles | complete, load-bearing sentences only; **skimming just the serif lines must reconstruct the whole pitch** |
| The argument | IBM Plex Sans | body prose | 66ch measure (`--prose`), 1.65 leading |
| The hand | Caveat (`--font-hand`) | one gesture per page (see §5, pen apparatus) | never set UI in it |

## 2. Color grammar and budgets

Tokens live in `src/styles/tokens.css`. Meanings, not palettes:

- `--paper` ground · `--card` = an artifact laid on the paper (raised surface)
- `--ink` text; inversion (ink fill) exists only as micro-chrome: buttons, active seg chip
- `--muted` secondary voice · `--line` hairlines
- `--amber` the system's accent voice: links, prompt labels, numerals, left rules, edit
  marks, arrows, hover answers, focus outlines. Never body-text color.
- `--amber-bright` live state ONLY — budget: cursor + text selection (2 uses). Barred
  from focus outlines (fails 3:1 non-text contrast).
- `--slate` secondary emphasis (thesis `strong`) + image placeholder gradients
- `--black` the one permitted inverted *region* per page — budget deliberately unspent
  on home (0 uses)
- `--pen` editor's red = the human hand. Budget: ONE gesture per page — the hero unit
  (squiggle + note + arrow + asterisk pair, 5 declarations). Deep-page margins stay
  empty **on purpose** (ruling D8): extending the hand would dilute its scarcity.

Emphasis grammar (one rule): `strong` is 600 site-wide (global.css), colored per
context — slate inside the thesis card, ink in the myths — never re-weighed locally.
The thesis pair *outputs/outcomes* carries slate `strong` at first introduction in
**both locales** (ruling D5), and runs unmarked in the display-face callback.

## 3. Type system

Modular scale (1.25 from 17px) for prose and display — `--text--1 … --text-5`, fluid
`--text-hero/--text-h2/--text-h2-lg`, `--text-lede` (ledes only, never body).

**Utility band** (ruling C1): chrome and metadata sizes below the scale are *named*,
never hardcoded — `--text-tag` (uppercase inline tags), `--text-chip` (seg chips),
`--text-btn` (buttons), `--text-ui` (mono UI: numerals, cli line), `--text-support`
(quiet supporting prose), `--text-hand`. A font-size literal outside `tokens.css` is a
review flag.

Mono-amber label voice speaks three case dialects, each context-bound (ruling C6):
lowercase = commands (eyebrows) · Sentence case = labels on artifact surfaces
("Side effects") · UPPERCASE = inline metadata tags (ESSAY · 01 · …).

Display lines are ch-capped and `text-wrap: balance`; a compound the pitch depends on
("AI-assisted") is welded with `.nowrap` so it never hyphen-splits (fix M1).

## 4. Spacing chassis

One opening breath (`--space-7` hero top), then a constant rhythm: every section pads
`0 --space-3 --space-6` — 64px exits all the way down, the eyebrow's own 24px margin
opening the next section. **One exhibit per section** (card, portrait, quote, ledger,
grid, close); no section carries two competing set-pieces, and no two *adjacent*
sections should share an exhibit type (rule from finding O4 — the twin quote cards are
grandfathered until their round).

## 5. Device vocabulary (meaning, then look)

- **Prompt eyebrow** `> label` — a command typed into the session; the section is its
  output. The ONLY section-heading device; deliberately level-blind (h2 ≡ h3 — prompts
  don't nest; the outline lives in the DOM); always left-anchored. Two ratified
  exceptions: the **thesis carries no prompt** (it is the hero command's output — never
  "fix" this) and the **footer centers its prompt** (the session sign-off is the one
  staged moment, ruling G7).
- **Amber left rule** — 3px = Aníbal's own declaration (thesis card, myths-closing
  pivot); 2px = quoted/presented material (Clarke, skeptic, portrait). Radius sits
  opposite the rule; quote text additionally muted italic; a real source gets a mono
  `cite`, a fictional voice self-attributes in text. The thesis is the ONLY shadowed
  surface (apex artifact = +1 device, nothing more). This 1px distinction is
  load-bearing and invisible — protect it deliberately. **Cards hug their measure**
  (ruling D8): surfaces stop at `--prose` (+ padding); no card runs to the container
  edge.
- **Pen apparatus** — the single sanctioned rule-break: squiggle on the gated headline
  word, Caveat margin note, drawn arrow, asterisk footnote pair. Laws: the asterisk
  pair keeps exactly two ends in every locale and at every breakpoint; the mobile
  collapse is a *rewrite, not a truncation*, reading as a caption below the CTAs with
  the soft door (`/contact/`) kept live (rulings D1/P2/P3). The arrow annotates the
  *headline*; the squiggle + asterisk bind the *word* (ruling D7 — the tip is not
  guaranteed to touch the word in every locale/wrap).
- **Edit marks** — the argument performed as a red-line edit: ONE strike per page
  (2px amber, "consultant"). The former insertion-underline is retired (ruling D4):
  a permanent underline is the web's strongest link cue and may not sit on a non-link.
  Inline emphasis in the accent voice = **amber italic** (h1 `em`, the lede's
  "facilitated" phrase). Amber underline now belongs to link hover alone.
- **Arrow contract** — `→` continues within the site, `↗` leaves it, always visible on
  ink title-links (amber, mono, `::after`), always welded to its label with a no-break
  space. `mailto:` is neither continuation nor departure: no glyph. No exemptions —
  the colophon row and the calendar shortcut comply (ruling D3).
- **CTA funnel law** (ruling D2) — the solid ink button means ONE thing: **Start the
  conversation → the contact room** (`cta.start`); the room reassures, then books.
  "Book" verbs belong to the calendar itself and appear only where booking actually
  happens (the contact page) or as the quiet mono shortcut for the already-sure
  (`prefer to book directly? calendar ↗`). Ghost = orientation ("How we can work
  together", "Not sure which fits?"). The persistent CTA survives every breakpoint:
  below 700px the header carries the compact rewrite (`cta.compact`: "Let's talk" /
  "Conversemos") — mobile never loses the booking affordance (ruling D1).
- **Numbered ledger** — an auditable enumeration: mono amber numerals (`--text-ui`,
  tabular), hairline row tops. A ledger that is a *menu* closes its frame (services);
  one that flows into prose stays open-bottom (myths) — ruling C2.
- **Quiet-mono links** — one register, one physics (ruling C4): mono, muted, no
  underline draw (`background-image: none`), `color` transition at `--dur-1`, hover
  answers amber. Applies to cli nav, seg chips, footer links, write-first, index links.
- **CLI header** — `ls ~/anibal-rojas <TAB>` + tab-completion nav. The conceit is
  *literally truthful*: nav labels are the real dirnames in both locales
  (`sobre-mi/`, ruling G6). ≤480px drops the `ls`/`<TAB>` noise.
- **Portrait** — 4:5 editorial crop behind the 2px amber rule (brain:
  `portrait-editorial-treatment`).

## 6. Motion grammar

A well-damped physical system: one ease, four duration tokens, one displacement
quantum (12px rise), `--stagger` (= `--dur-1`/2) for reveal batches. Laws:

- The LCP element **rises, never fades** (measured: a fade gates LCP).
- Load sequence enacts the metaphor: the machine prints → the cursor blinks at exactly
  h1-end → the hand enters last (note ≥ `--dur-4`, arrow after).
- Scroll reveals stagger by the batch that enters *together*, not by DOM position.
  Eyebrows are chrome and never reveal; section intros always reveal; the thesis is
  never hidden (the core claim outranks choreography) — ruling C5.
- Hover: links answer in amber at `--dur-1`; buttons darken/fill in ink (their own CTA
  grammar); every interactive element answers the pointer — nothing is silent.
- Reduced-motion / no-JS: content-first, twice over — the hidden state exists only
  after JS confirms motion is welcome; the global kill zeroes everything.
- Any new `ms` literal in CSS is a review flag.

## 7. Parity ship gates

- ES is a **sibling, not a translation**: every device crosses the locale line —
  including the handwriting — and emphasis carries by *role* (accent voice), not by
  tag. Localization may be asymmetric only when the information itself is asymmetric
  (the EN reader is told the podcast is in Spanish).
- Mobile is the same grammar at narrower measure; renegotiations are rewrites, never
  truncations, and are commented at the site of the compromise.
- ES parity of every annotation device is a ship gate; so is the persistent CTA at
  every breakpoint.
- Performance is a design feature: 100/100/100/100, LCP < 1.5s, CLS = 0, TBT < 50ms
  (brain: `performance-as-design-feature`).

## 8. Interior pages (phase 2, 2026-08-24)

Interior pages are the same manuscript at a quieter register — same grammar, not
pixel sameness. Their specific laws:

- **Interior chassis**: pages open with `--space-6` (the `--space-7` breath belongs to
  the home hero alone); sections exit at `--space-6`; **no hairline seams between
  sections** — the eyebrow rail and spacing carry the structure (hairlines belong to
  ledger rows, chrome borders, and the contact page's two-path split).
- **Interior h1 spec**: Fraunces 640, `--text-h2-lg`, −0.01em, balanced — the page's
  one authority moment (home's fluid `--text-hero` is the hero's alone).
- **The prompt rail is universal**: interior sections are commanded by `> eyebrows`
  exactly like home — never labeled with claim-voice serif. Page prompts name the
  page truthfully (`> about`, `> sobre-mi`, `> ideas`, `> contact`, `> 404`).
- **The site-wide close is the footer band**: pages do not add their own solid CTA
  before it (the about page's duplicate close was removed when ruling D2 made the
  two labels identical). The contact page suppresses the band because its body IS
  that CTA expanded — and it speaks the **ceremony register (centered)** for the
  same reason, ratified.
- **The reveal system is homepage choreography**: interior pages are static (posts
  carry 0KB JS as a ship gate). Motion on interior pages = hover physics only.
- **Post prose devices**: article headings use the display face with visible levels —
  they are content, not chrome, so the level-blind prompt rule does not apply inside
  an article. The markdown blockquote is the post's **pull-quote device**: 3px amber
  rule + card + display italic — the author's own claim inside his own essay (the 3px
  = declaration mapping holds). Inline code sits on a bordered card chip; `pre` blocks
  at `--text--1` on a hairline card; tables at `--text-ui` with mono headers.
- **One strike per page** holds site-wide: home strikes "consultant", about strikes
  "consulting" in the refusals — one each, same device, same argument.
- **404**: a terminal error is a native genre here — the standard `> 404` prompt, and
  recovery links that are the literal dirnames (`home/`, `ideas/`, `es/`,
  `es/ideas/`), keeping the tab-completion conceit honest at the dead end.

## 9. Rulings log

Owner delegated the audit's eight open decisions (2026-08-24); rulings applied:

- **D1** Mobile keeps a persistent CTA: compact header button < 700px; the hero
  qualifier moved *below* the CTAs (caption, not gate) and its contact link restored.
- **D2** One meaning for solid: every solid → the contact room via `cta.start`; the
  calendar keeps "book" verbs and lives on the contact page + the quiet footer
  shortcut. One verb family.
- **D3** Arrow contract has no exemptions: `calendar ↗` (new tab), footer externals
  marked, mailto glyph-free.
- **D4** Insertion underline retired for the amber-italic accent voice; permanent
  underlines don't exist in prose.
- **D5** *outputs/outcomes* gets slate `strong` at introduction in both locales.
- **D6** The offer is never typeset quieter than the education: service body and the
  facilitation definition at full body voice.
- **D7** Arrow annotates the headline (tie-to-word not guaranteed); ES nav says
  `sobre-mi/` — the conceit stays honest.
- **D8** Cards hug their measure (thesis included); deep-page margins stay empty; the
  pen budget stays one gesture.

Deferred to future rounds, deliberately: differentiating the skeptic quote card's
voice (O4), myths-ledger micro-blemishes (column hairlines, the 07 orphan cell),
mobile myths compression (P5-optional), a word-anchored arrow tie (CSS anchor
positioning, progressive enhancement), collapsing the statement-band leadings
(1.25–1.4) into one token.
