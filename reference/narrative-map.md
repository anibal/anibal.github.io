# Narrative Map — v1 (2026-08-21)

Companion to `positioning-canon.md`. One job card per route. A page's copy exists to do its
job; anything on the page not serving the job card gets cut. "Next step" is ordered: primary
first.

The journey the site must support: **entry → recognition ("this is my problem") → proof
("this person understands it") → fit ("this room is my shape") → contact.** Every page is an
entry point; every page must offer the next room.

---

## / and /es/ — Homepage

- **Entry:** search, LinkedIn, podcast, referral. The generalist front door.
- **Question answered:** "Who is this, and can he help us adopt AI without wrecking things?"
- **Belief shift:** AI adoption is an organizational-change problem, not a licensing problem —
  and this person works on exactly the part that fails.
- **Structure (narrative order, existing sections kept):**
  1. Hero = the flag (canon §4.1). Sharpened, keeps "without breaking" clause.
  2. Thesis = the argument, now carrying the bridge: bottleneck moves → outputs ≠ outcomes →
     the horizon (AI at the core of the workforce).
  3. whoami + proof = the person (current copy is good; minimal touch).
  4. Services ladder gets a short intro block ABOVE the three items: the refusal + the four
     verbs (the ~~consulting~~ strikethrough lives here). Blurbs updated to match reframed
     service pages.
  5. Ideas: cadence claim softened to fact ("I write about…" not "I write regularly").
- **Next step:** book a conversation (primary) · services (secondary) · principles (proof path).

## /services/* and /es/servicios/* — three service pages

- **Entry:** homepage ladder, or direct referral link — a visitor already in buying mode.
- **Question:** "Is this the shape of help we need, and what actually happens if we start?"
- **Belief shift:** starting is low-risk and concrete; this is facilitation with skin in it,
  not consulting theater.
- **Copy changes:** per canon §5 (diagnostic reframed to alignment-not-document; fractional
  named as facilitation-incarnate; coaching vocabulary pass). Each page: one line naming its
  verbs (facilitate/coach/mentor/train).
- **Template changes (ServicePage.astro, all six pages at once):**
  - CTA directly under the lede (currently first CTA is at the very bottom, F-07).
  - "The other two rooms" cross-link row before the footer (F-07).
- **Next step:** book (primary, now reachable early) · the sibling services (secondary).

## /about/ and /es/sobre-mi/ — About  ⟵ highest-stakes rewrite

- **Entry:** the buying-interest click. Also referrals checking him out.
- **Question:** "Who am I actually going to be in a room with?"
- **Belief shift:** this is a specific person with a specific way of working — and specific
  refusals — not an interchangeable consultant.
- **Content (all NEW — currently duplicates homepage verbatim, F-04):**
  1. Keep the aburrida hook (signature, canon §4.3) — this is its home.
  2. **The arc:** 30 years → Platzi at scale → back to the code for a year → the uncomfortable
     conclusion (playbooks expire; principles don't). Told as story, not CV. May reuse *facts*
     from the homepage bio but not its sentences.
  3. **What I actually do in a room:** the four verbs, levels, intentions — concretely (what a
     facilitated session is, what coaching contracts look like, what mentoring transfers, what
     training installs).
  4. **What I refuse:** the full ~~consulting~~ treatment. No analysis, no reports, no slides —
     and why (they produce activity, not outcomes). Deadpan allowed here.
  5. **Who this is not for** (honest disqualifier — one short block).
  6. Compact links to the three services (links, not the homepage's card text) + CTA.
- **Template change (AboutPage.astro):** replace `d.who.paragraphs` / `d.services.items`
  reuse with `aboutPage`-owned content arrays.
- **Next step:** book (primary) · principles (the thinking) · services (the shapes).

## /principles/ and /es/principios/ — the intellectual proof

- **Entry:** nav (most substantive link), homepage writing card, essay readers arriving warm.
- **Question:** "Does he actually understand how these systems work?"
- **Belief shift:** rigor. First principles instead of recipes. And — the bridge — the series
  is the discipline of *outputs*; turning outputs into *outcomes* is the work he does with
  organizations (closing block links to services/contact — currently the page dead-ends).
- **Copy changes:**
  - EN locale gets real English: credo, myths intro + 7 myths, side effects (short texts —
    canon §6). Essay titles stay Spanish, marked `lang="es"`, with existing EN summaries.
    `spanishNote` shrinks to cover only the series ("The essays are in Spanish — the language
    they were written in.").
  - The PENDING sentence (F-01) gets finished in both locales — it is the myths section's
    conclusion and the natural place the outputs→outcomes bridge lands.
  - New closing block after the series: the bridge to working together.
- **Template changes (PrinciplesPage.astro):** remove the dashed `.pending` scaffold (becomes
  a real closing paragraph); `lang="es"` on Spanish spans in EN locale; series titles h2 → h3
  (F-12); add closing bridge block.
- **Next step:** read an essay (warm) · about/services (the bridge) · book.

## /ideas/ and /es/ideas/ — the index

- **Question:** "What does he think, and where can I follow it?"
- **Copy changes:** honest empty state (F-06): no posts → a designed block that says where the
  writing lives today (archive + Substack) and offers subscribe as the low-commitment path
  (F-08). Intro claim softened same as homepage.
- **Template change (IdeasIndex.astro):** zero-posts branch.
- **Next step:** archive/Substack subscribe (primary while empty) · principles.

## /contact/ and /es/contacto/ — linked at last (F-03: keep, not delete)

- **Decision:** the pages stay and get linked: `contact/` joins the CLI nav (5 items). The
  header/footer CTA buttons still go straight to the calendar (lowest friction); the contact
  page is the room for the person not ready to book.
- **Question:** "What happens if I reach out — and do I have to book a call to start?"
- **Copy:** what a first conversation is (no pitch, no deck, no commitment — existing register
  is right), TWO real paths: book (calendar) or write (email, as a first-class option, not a
  colophon link) (F-05). What to bring / what to expect, briefly. Distinct enough from the
  footer that the page no longer reads as the footer twice.
- **Next step:** book · email.

## Footer (site-wide)

- Keeps the big CTA → calendar. Adds one quiet line under the button: "Prefer to write first?"
  → /contact/ (gives the contact page its second sitewide link; gives the undecided a path).

---

## Mechanical fixes folded into this pass (from the 2026-08 critique)

- `scroll-margin-top` for the sticky header (F-09) — global.css.
- Header CTA visible below 700px if it fits at 390px; `contact/` in nav covers the path-to-action
  on mobile regardless (F-08).
- Focus ring token `--amber-bright` → `--amber` (F-13) — global.css.
- Header.astro stray `}` + hardcoded nav aria-label → `a11y.nav` key (F-14).
- Homepage eyebrows promoted to real h2s with `aria-hidden` prompt glyph, pull quote demoted
  (F-11) — only if it doesn't fight the visual system; verify after.

## Out of scope (reserved decisions, unchanged)

Portrait, testimonials, pricing visibility, final domain, first posts, F-10 (wide-viewport
composition — design work, not copy).
