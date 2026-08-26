---
id: no-em-dashes-site-copy
title: Site chrome copy avoids em dashes in both locales
category: decision
status: active
tags: [copy, style]
created: "2026-08-23T09:47:00"
updated: "2026-08-23T09:47:00"
---

<!-- compiled_truth -->
**Decided (Aníbal, 2026-08-23):** no em dashes in site chrome copy — ui.ts strings, page titles, OG image text, the AI-translation note on EN posts. Replacements chosen per sentence: comma, colon, semicolon, period, or parentheses, whichever reads best; title separators became `·`.

**Boundary:** migrated posts keep their original punctuation (the byte-faithful archive), and translations mirror the originals' prose style — only the site-authored AI-note inside them was swept. The `—` list bullet in the side-effects card (CSS `content`) stays: it is a typographic device, not prose punctuation. The `3–6` range en dash stays.

**Why:** owner's stylistic call ("let's avoid em dashes in general") — em dashes read as an AI-writing tell in 2026, and the site's voice must be unmistakably his.


## Timeline

- time: 2026-08-23T09:47:00
  kind: decision
  summary: "Created this page: Site chrome copy avoids em dashes in both locales"
  source: "Aníbal, session 2026-08-23"
  affects: [no-em-dashes-site-copy]

- time: 2026-08-23T09:47:00
  kind: decision
  summary: "Created with the em-dash rule, its boundaries, and rationale"
  source: session 2026-08-23
  affects: [no-em-dashes-site-copy]
