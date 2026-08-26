---
id: header-cli-nav
title: Header nav uses the CLI tab-completion metaphor
category: decision
status: active
tags: [design, typography, nav]
created: "2026-08-19T12:01:45"
updated: "2026-08-19T12:01:45"
---

<!-- compiled_truth -->
Header top line reads `ls ~/anibal-rojas <TAB>` (mono; `ls`/`<TAB>` muted, `~/anibal-rojas` ink with amber `~`, wordmark links home). Second line is the tab-completion result: `services/  ideas/  principles/  about/` (mono, muted, amber when active/hover; `services` active on home + service pages, ES equivalents `servicios/ ideas/ principios/ sobre mí/`). Layout rules learned: flexbox collapses whitespace-only text nodes between items — spacing MUST come from `gap` on the flex container, never from `{' '}` expressions or trailing spaces inside spans. Typography rule: ALL h1s site-wide are Fraunces 640 (inner pages were drifted to 560 and unified 2026-08-19); IBM Plex Mono 400 must be preloaded alongside 500 because nav chrome renders in 400. Zero JS; <480px drops `ls`/`<TAB>`.


## Timeline

- time: 2026-08-19T12:01:45
  kind: decision
  summary: "Created this page: Header nav uses the CLI tab-completion metaphor"
  source: session 2026-08-19
  affects: [header-cli-nav]

- time: 2026-08-19T12:01:45
  kind: decision
  summary: "Header renders 'ls ~/anibal-rojas <TAB>' with a directory-listing nav row"
  source: session 2026-08-19
  affects: [header-cli-nav]
