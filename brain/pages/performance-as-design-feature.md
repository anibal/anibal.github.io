---
id: performance-as-design-feature
title: Performance budgets are a design feature and a ship gate
category: decision
status: active
tags: [performance]
created: "2026-08-07T20:30:49"
updated: "2026-08-14T15:11:01"
---

<!-- compiled_truth -->
**Decided:** ship gates — Lighthouse (mobile, throttled, enforced in CI) **100/100/100/100** on the homepage and a representative post; LCP < 1.5s, CLS = 0, TBT < 50ms. Supporting budgets: ≤30KB total JS on the homepage and 0KB on posts; fonts self-hosted woff2 subsets (Latin + Latin-ext), preloaded, `font-display: swap`, no Google Fonts requests; images AVIF/WebP with explicit dimensions; Plausible is the *only* third-party request, deferred.

**Rationale:** for an audience of engineering executives, a perfect score is an aesthetic statement and a sales argument — the site must be shockingly fast.

**Blast radius:** every asset, font, script, and component spends from a budget; CI blocks regressions (build + Lighthouse CI on PRs); even the subtle paper-grain texture is dropped if it breaks the budget or reads as decoration. See [[astro-5-static-islands]].


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: Performance budgets are a design feature and a ship gate"
  source: HANDOFF-anibalrojas-site.md
  affects: [performance-as-design-feature]

- time: 2026-08-07T20:31:30
  kind: decision
  summary: "captured from handoff budgets + acceptance criteria"
  source: HANDOFF-anibalrojas-site.md
  affects: [performance-as-design-feature]

- time: 2026-08-08T00:55:56
  kind: reversal
  summary: "font-display clause amended: swap → optional (with metric-matched fallbacks + selective preload); swap made the CLS=0 gate unsatisfiable. See [[font-loading-strategy]]. CI measures with devtools throttling, see [[lhci-devtools-throttling]]."
  source: session 1 LHCI experiments
  affects: [font-loading-strategy, lhci-devtools-throttling]

- time: 2026-08-14T12:29:59
  kind: note
  summary: "Deploy pipeline live: Cloudflare (Workers static assets) auto-deploys main; preview at https://website.anibalrojas.workers.dev/ — verified both locales + fonts serving"
  source: "anibal, session 2 kickoff"
  affects: [performance-as-design-feature]

- time: 2026-08-14T15:11:01
  kind: evidence
  summary: "Full homepage (all sections, load sequence, reveal script ~0.7KB inline) gates green: 100/100/100/100 both locales, LCP=FCP 773–821ms, CLS 0.00000, TBT 0, 6/6 runs"
  source: "LHCI, session 2"
  affects: [performance-as-design-feature]
