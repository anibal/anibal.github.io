---
id: anibal-collaboration-conventions
title: "Aníbal: collaboration conventions for working sessions"
category: person
status: active
tags: [workflow, person]
created: "2026-08-23T17:40:12"
updated: "2026-08-23T17:40:12"
---

<!-- compiled_truth -->
**Who:** Aníbal Rojas, the site's owner and sole author. Reviews every change himself, often through the running site rather than the diff.

**Conventions:**
- **Leave the dev server running (`npm run dev` on port 4321) at the end of every working turn, before reporting back** — he checks the changes live at localhost:4321. Do not kill it as part of end-of-turn cleanup; only restart it if it died.
- Surface judgment calls explicitly in the report (e.g. wording choices in ES vs EN); he ratifies or overrides them fast when they are visible.
- Feedback often arrives as browser design-feedback dumps with selectors and intent per element; read for the intention behind the batch, not just the individual edits.


## Timeline

- time: 2026-08-23T17:40:12
  kind: decision
  summary: "Created this page: Aníbal: collaboration conventions for working sessions"
  source: "Aníbal, session 2026-08-23"
  affects: [anibal-collaboration-conventions]

- time: 2026-08-23T17:40:12
  kind: decision
  summary: "Created with the keep-dev-server-running convention (owner request 2026-08-23)"
  source: session 2026-08-23
  affects: [anibal-collaboration-conventions]
