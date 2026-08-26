---
id: astro-5-static-islands
title: Astro 5 static output with a strict island allowlist
category: decision
status: active
tags: [stack, performance]
created: "2026-08-07T20:30:49"
updated: "2026-08-07T20:31:12"
---

<!-- compiled_truth -->
**Decided:** Astro 5 with static output. Client JavaScript is an allowlist of three islands: the language-aware header (only if it proves necessary), the Bottleneck signature element ([[signature-element-bottleneck]], lazy-mounted `client:visible`, ≤15KB), and the Calendly loader (loads only on interaction). Budgets: ≤30KB total JS on the homepage, 0KB on blog posts.

**Alternatives:** a client-side framework / SPA, or per-page hydration everywhere. Rejected — the content is static and JS spend is the enemy of the performance gate.

**Rationale:** performance is a design feature and a sales argument for this audience ([[performance-as-design-feature]]); islands put interactivity exactly where it earns its place and nowhere else.

**Blast radius:** every interactive idea must fit the island model and the budget; no client-side routing; third-party scripts effectively banned except Plausible.


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: Astro 5 static output with a strict island allowlist"
  source: HANDOFF-anibalrojas-site.md
  affects: [astro-5-static-islands]

- time: 2026-08-07T20:31:12
  kind: decision
  summary: captured from handoff tech spec
  source: HANDOFF-anibalrojas-site.md
  affects: [astro-5-static-islands]
