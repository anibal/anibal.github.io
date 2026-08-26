---
id: old-site-archive-no-migration
title: "Old blog stays live as the archive; no migration in v1"
category: decision
status: archived
tags: [content]
created: "2026-08-07T20:30:49"
updated: "2026-08-19T12:01:28"
---

<!-- compiled_truth -->
**Decided:** `i.usedtocode.com` remains live and untouched as the public archive; the new `/ideas/` footer links to it ("archive → i.usedtocode.com"). No content migration in v1. The About page narrative is *adapted* from the old site's about page (burnout → leadership → Platzi → sabbatical → now), turned toward clients. Posts republished from Substack or the old site carry a `canonicalUrl` in frontmatter.

**Rationale:** keeps v1 scope shippable and preserves the digital-garden lineage without a two-site maintenance burden.

**Blast radius:** two live properties indefinitely; SEO handled via `canonicalUrl` on republished posts; the optional `/now/` page (phase 2) continues the lineage on the new site.


## Timeline

- time: 2026-08-07T20:30:49
  kind: decision
  summary: "Created this page: Old blog stays live as the archive; no migration in v1"
  source: HANDOFF-anibalrojas-site.md
  affects: [old-site-archive-no-migration]

- time: 2026-08-07T20:31:30
  kind: decision
  summary: "captured from handoff IA + content model"
  source: HANDOFF-anibalrojas-site.md
  affects: [old-site-archive-no-migration]

- time: 2026-08-15T10:14:54
  kind: decision
  summary: "Principles landing links the 5 series articles to their i.usedtocode.com originals (Aníbal's call, session 4) — not the later Substack reposts; consistent with canonicalUrl pointing at the old site"
  source: session 4
  affects: [old-site-archive-no-migration]

- time: 2026-08-19T12:01:28
  kind: reversal
  summary: "Posts migrated from i.usedtocode.com to this site at their original date-based URLs (/YYYY/MM/DD/slug/) for SEO continuity; unified route serves EN+ES with locale from frontmatter. Decided and implemented 2026-08-19."
  source: brain archive-page
  affects: [old-site-archive-no-migration]
