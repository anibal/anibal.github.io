---
slug: flow
title: Key flows
role: key flows
updated: "2026-08-07T20:30:09"
---

# Key flows

## Overview

Two flows matter: the **publishing flow** (how content reaches production — deliberately one-step) and the **conversion flow** (how the right visitor becomes a booked conversation — the site's single job).

## Publishing flow

```mermaid
sequenceDiagram
  participant A as Aníbal
  participant R as repo — main
  participant CI as CI — build + Lighthouse
  participant CF as Cloudflare Pages
  participant V as Visitor
  A->>R: add one post .md + frontmatter, push
  R->>CI: push / PR triggers astro build
  CI->>CI: zod validates collections; Lighthouse CI asserts 100×4 gates
  CI-->>A: PR preview deploy URL
  R->>CF: merge to main → auto-deploy
  CF->>V: static HTML — 0KB JS on posts
  V->>CF: /contact → click → Calendly loads only on interaction
```

Handoff requirement: publishing a post = adding one .md file with frontmatter and pushing, no other steps; the README documents this in ≤10 lines. Every build session should end with a shippable preview URL.

## Conversion flow

1. Visitor lands (homepage or a post) → the hero states the positioning in one sentence.
2. Thesis section — The Bottleneck *demonstrates* the thesis instead of stating it ([[signature-element-bottleneck]]).
3. Evidence in service of the CTA: who-I-am, proof cards, the 01/02/03 services ladder, testimonials (only if ≥3 real — [[testimonials-real-or-omitted]]), ideas/podcast cards.
4. CTA → `/contact` → one page, one job: Calendly (click-to-load) + email + LinkedIn/Substack/ocorres.com.
