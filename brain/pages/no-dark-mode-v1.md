---
id: no-dark-mode-v1
title: No dark mode in v1
category: decision
status: active
tags: [design-system]
created: "2026-08-07T20:30:49"
updated: "2026-08-07T20:31:30"
---

<!-- compiled_truth -->
**Decided:** dark mode is out of scope for v1 — the handoff is explicit: do not half-ship it. Design tokens must be architected so a dark theme can be added later.

**Rationale:** a half-shipped dark mode would undercut the craft bar, and v1 scope is already ambitious (bilingual parity, the signature element, 100×4 Lighthouse gates).

**Blast radius:** no hard-coded colors outside the tokens file ([[vanilla-css-design-tokens]]); contrast pairs are verified only for the light theme in v1; phase-2 dark mode is a token swap, not a redesign.


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: No dark mode in v1"
  source: HANDOFF-anibalrojas-site.md
  affects: [no-dark-mode-v1]

- time: 2026-08-07T20:31:30
  kind: decision
  summary: captured from handoff design system
  source: HANDOFF-anibalrojas-site.md
  affects: [no-dark-mode-v1]
