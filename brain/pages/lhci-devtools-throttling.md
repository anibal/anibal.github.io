---
id: lhci-devtools-throttling
title: "Lighthouse CI enforces gates with devtools throttling, not Lantern simulation"
category: decision
status: active
tags: [performance, ci]
created: "2026-08-08T00:55:21"
updated: "2026-08-14T15:11:01"
---

<!-- compiled_truth -->
**Decided:** Lighthouse CI runs with `throttlingMethod: 'devtools'` (real network/CPU throttling, observed timings), mobile form factor, asserting the handoff gates on `/` and `/es/`: 100/100/100/100, LCP ≤ 1500ms, CLS = 0, TBT ≤ 50ms. **Not** the LHCI default `simulate` (Lantern model).

**Rationale:** measured floor under Lantern simulation on this design is LCP ≈ 1500–1650ms with **zero webfonts, zero JS, fully inlined CSS** (Lantern inflates a large display-size text element's paint task ~800ms past FCP under its 4× CPU model; every webfont adds ~750ms to the chain). The handoff gates are therefore physically unattainable under simulation and meaningful only under observed-throttled timing — which is also closer to field experience (observed LCP 848ms).

**Blast radius:** CI assertions live in `lighthouserc.cjs`; if gates are ever recalibrated (e.g. to CrUX field data), revisit. Enforces [[performance-as-design-feature]]; enables honest measurement of [[font-loading-strategy]].


## Timeline

- time: 2026-08-08T00:55:21
  kind: decision
  summary: "Created this page: Lighthouse CI enforces gates with devtools throttling, not Lantern simulation"
  source: "session 1 scaffold — LHCI experiments"
  affects: [lhci-devtools-throttling]

- time: 2026-08-08T00:55:50
  kind: decision
  summary: Rewrote compiled_truth to the new best understanding
  source: session 1 LHCI experiments
  affects: [lhci-devtools-throttling]

- time: 2026-08-08T00:55:50
  kind: evidence
  summary: "Lantern floor test: fontless page LCP 1502ms (FCP 681); text-wrap/cursor/em variants no effect; devtools throttling: FCP=LCP 848, CLS 0, TBT 0, perf 100 both locales"
  source: "LHCI runs, session 1"
  affects: [performance-as-design-feature]

- time: 2026-08-14T15:11:01
  kind: note
  summary: "numberOfRuns raised to 3 (median) — one-run variance observed at ±150ms on EN FCP"
  source: session 2
  affects: [lhci-devtools-throttling]
