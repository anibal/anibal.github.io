---
id: contact-pages-linked-two-paths
title: "Contact pages kept and linked; two first-contact paths (book or write)"
category: decision
status: active
tags: [content, conversion, nav]
created: "2026-08-21T08:58:57"
updated: "2026-08-23T09:47:12"
---

<!-- compiled_truth -->
**Decided:** `/contact/` and `/es/contacto/` stay and are linked: `contact/` / `contacto/` added to the CLI nav (5 items), and the footer carries a quiet "prefer to write first? → contact/" line under the booking button. Header/footer CTA buttons still go straight to Google Calendar (lowest friction); the contact page is the room for the visitor not ready to book.

The page offers **two first-class paths**: book (calendar button + redirect note) or write (mailto:i@usedtocode.com with copy inviting a paragraph about team + context). The global footer CTA is suppressed on the contact page itself (`footerCta={false}` through Base → Footer) so the page no longer reads as the footer printed twice.

Low-commitment path for not-ready visitors also added on `/ideas/`: the designed empty state links archive + Substack subscribe.

Alternative considered: deleting the routes (audit F-03 offered link-or-delete) — rejected; the narrative needs a room between "interested" and "meeting".


## Timeline

- time: 2026-08-21T08:58:57
  kind: decision
  summary: "Created this page: Contact pages kept and linked; two first-contact paths (book or write)"
  source: session 2026-08-21
  affects: [contact-pages-linked-two-paths]

- time: 2026-08-21T08:59:20
  kind: decision
  summary: "Resolved audit F-03/F-05/F-08: contact kept, linked, and given a second path"
  source: reference/narrative-map.md
  affects: [contact-pages-linked-two-paths]

- time: 2026-08-23T09:47:12
  kind: reversal
  summary: "Footer/services CTAs now route to the contact room, not straight to Google Calendar: footer button 'Start the conversation' -> /contact/, quiet line 'prefer to book directly? -> calendar' keeps the hot path; services 'Not sure which fits?' -> /contact/. Hero button still books directly. Owner call 2026-08-23 (footer 'Ready to talk about your team?' retired as dated); reverses the 'header/footer buttons go straight to calendar' half of this decision."
  source: session 2026-08-23
  affects: [contact-pages-linked-two-paths]
