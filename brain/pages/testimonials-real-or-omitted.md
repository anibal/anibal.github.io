---
id: testimonials-real-or-omitted
title: "Testimonials: real quotes or the section is omitted"
category: decision
status: active
tags: [content, homepage]
created: "2026-08-07T20:30:49"
updated: "2026-08-07T20:31:30"
---

<!-- compiled_truth -->
**Decided:** build the testimonials component, but if fewer than 3 real quotes (named people at named companies) exist at launch, the homepage section is omitted entirely — nothing renders. Placeholder quotes are never shipped. Each service page also carries one relevant testimonial slot.

**Rationale:** this section does heavy lifting with a skeptical B2B audience, and thin or fake social proof is worse than none — the handoff treats placeholder copy as disqualifying.

**Blast radius:** the homepage has a conditional section, so the layout must close up cleanly without it; launch is gated on Aníbal collecting the quotes, and their selection and order are his call.


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: Testimonials: real quotes or the section is omitted"
  source: HANDOFF-anibalrojas-site.md
  affects: [testimonials-real-or-omitted]

- time: 2026-08-07T20:31:30
  kind: decision
  summary: "captured from handoff page specs + content gates"
  source: HANDOFF-anibalrojas-site.md
  affects: [testimonials-real-or-omitted]
