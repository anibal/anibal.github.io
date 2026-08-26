---
id: lcp-element-motion-constraint
title: The LCP element never opacity-animates
category: decision
status: active
tags: [performance, motion]
created: "2026-08-14T15:10:22"
updated: "2026-08-14T15:10:43"
---

<!-- compiled_truth -->
**Decided:** whatever element is (or could become) the LCP gets transform-only motion — never an opacity fade-in. On the homepage the hero h1 rises (`translateY(12px)`, delay 120ms, dur 480ms) at full opacity; the fade beats belong to the eyebrow, lede, and actions, which are never LCP candidates.

**Rationale:** measured in LHCI — with a rise+fade h1, LCP waited for the animation's *end* (LCP = FCP + delay + duration ≈ 1677ms against the 1500ms gate); with a transform-only h1, LCP = FCP ≈ 780–820ms on both locales. The handoff's motion recipe ("subtle rise + fade") yields to its own LCP gate — motion must never hold the LCP paint hostage.

**Blast radius:** applies to session 3 (the Bottleneck must not animate the h1/thesis in ways that gate paint), session 4 templates (post titles are LCP candidates — transform-only there too), and any future hero treatment. Enforces [[performance-as-design-feature]] under [[lhci-devtools-throttling]].


## Timeline

- time: 2026-08-14T15:10:22
  kind: decision
  summary: "Created this page: The LCP element never opacity-animates"
  source: "session 2 — LHCI measurement"
  affects: [lcp-element-motion-constraint]

- time: 2026-08-14T15:10:43
  kind: decision
  summary: Rewrote compiled_truth to the new best understanding
  source: "session 2 — LHCI measurement"
  affects: [lcp-element-motion-constraint]

- time: 2026-08-14T15:10:43
  kind: evidence
  summary: "rise+fade h1: LCP 1677 (fail); transform-only h1: LCP=FCP 773–821ms, 6/6 runs, both locales, CLS 0"
  source: "LHCI, session 2"
  affects: [performance-as-design-feature]
