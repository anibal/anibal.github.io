---
id: home-design-audit-rulings
title: "Home design audit: grammar codified, eight rulings applied"
category: decision
status: active
tags: [design-system, audit, conversion]
created: "2026-08-24T07:34:09"
updated: "2026-08-24T11:36:40"
---

<!-- compiled_truth -->
**Context.** A six-lens design audit (art director, typographer, motion, EN/ES+mobile parity, conversion, cold juror; negative findings adversarially verified) ran against the home page under the owner's rulings: **home-as-built = north star** and **pitch-first** ("the site's single job"). Verdict: home is one coherent language; the grammar lived only in the rendered page and scattered comments — which is why other pages drifted. Full report: the "The Grammar of Home" artifact; constitution now at repo root **DESIGN-GRAMMAR.md** (supersedes HANDOFF §3 where they disagree; tokens.css points to it).

**Owner delegated the eight open decisions ("you have the best knowledge and skills... I delegate them"). Rulings applied:**

- **D1 Mobile CTA topology (audit sev-3):** compact solid CTA in the header below 700px ("Let's talk" / "Conversemos" — a rewrite, not a truncation, same pattern as the callout collapse); hero qualifier moved BELOW the CTA buttons (caption, not gate — solid back above the fold in both locales); the compact qualifier's closing phrase links /contact/ again (the soft door for the gated segment).
- **D2 One meaning for solid:** every solid button = "Start the conversation" → the contact room (`cta.start` minted; header, hero, footer, about). "Book" verbs stay with the calendar: only the contact page books directly; the footer keeps the quiet `calendar ↗` shortcut (now new-tab + marked). The fold trades its direct-calendar route for the reassured path — deliberate (cold click on a bare Google Calendar = trust drop for a high-trust purchase).
- **D3 Arrow contract, no exemptions:** `calendar ↗`, footer externals marked `↗`, mailto glyph-free; glyphs welded with no-break spaces everywhere.
- **D4 Insertion underline retired:** "it has to be facilitated"/"se facilita" is now amber italic (the h1-em accent voice), not underlined — a permanent underline may not sit on a non-link. The services strike remains the page's one edit mark. (This deliberately overrides the audit's praise of the strike+insertion pairing — affordance truth beat symmetric conceit.)
- **D5 outputs/outcomes:** slate `strong` at first introduction in both locales (ES had unstyled `<em>`).
- **D6 Offer register:** service body and the facilitation definition promoted to full body voice — the offer is never typeset quieter than the education.
- **D7 ES polish:** arrow ratified as annotating the *headline* (squiggle+asterisk bind the word); ES nav label is the literal dirname `sobre-mi/`.
- **D8 Cards hug their measure:** thesis card capped at prose+padding (its ~350px empty field at 1440 was the juror's "unfinished" moment); deep-page margins stay empty; pen budget stays one gesture.

**Also applied (approved batches):** codify pass — utility type band tokens (`--text-tag/chip/btn/ui/support/hand`, `--stagger`), global `strong{font-weight:600}`, quiet-link unification, reveal rules (eyebrows never reveal / intros always / thesis never hidden), ledger spec comment, dead `.locale-link` selector fixed to `.seg-item`, credo `!important` removed. Mechanical fixes — EN h1 "AI-assisted" wrap-guarded; LinkedIn ↗ orphan fixed; ideas-grid gaps raised to `--space-5/--space-3`; reveal stagger now per intersection batch (fixes 300ms mobile lag); essay-title hover answers amber; wordmark hover added; ES `/es/#services` normalized.

**Verified:** production build green; screenshots EN/ES × 1440/390/360 (mobile solid above fold both locales; 360 ES header fits one row); scoped LHCI on both homepages: 100×4, LCP<1.5s, CLS=0, TBT<50 — gates hold.

**Blast radius:** every future page is measured against DESIGN-GRAMMAR.md (phase 2: about/contact/ideas/posts/404 with the same lenses). `strong=600` applies site-wide including posts. Deferred deliberately: skeptic-card voice differentiation, myths-ledger micro-blemishes, mobile myths compression, word-anchored arrow tie, statement-leading collapse. See [[vanilla-css-design-tokens]], [[performance-as-design-feature]], [[portrait-editorial-treatment]].


## Timeline

- time: 2026-08-24T07:34:09
  kind: decision
  summary: "Created this page: Home design audit: grammar codified, eight rulings applied"
  source: "session 2026-08-24, owner-delegated"
  affects: [home-design-audit-rulings]

- time: 2026-08-24T07:34:39
  kind: decision
  summary: "Six-lens audit of home-as-built; owner delegated the eight open decisions; rulings applied and codified in DESIGN-GRAMMAR.md"
  source: "audit workflow + session 2026-08-24"
  affects: [home-design-audit-rulings]

- time: 2026-08-24T11:36:40
  kind: decision
  summary: "Phase 2 applied inline (subagent limit hit; audited solo against the constitution): about converted to the prompt rail (Fraunces labels were the grammar inversion), duplicate about close removed (D2 had made it identical to the footer band), contact h1 to interior spec + new-tab booking, ideas/post title+cross-link physics + welded arrows + size tokens, 404 standard prompt + literal-dirname recovery links. DESIGN-GRAMMAR.md gained the interior-pages section. Gates green on about/contact/post (100x4, LCP<1.5s, CLS=0)"
  source: "session 2026-08-24, phase 2"
  affects: [vanilla-css-design-tokens]
