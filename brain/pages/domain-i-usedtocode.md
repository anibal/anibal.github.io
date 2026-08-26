---
id: domain-i-usedtocode
title: The site serves on i.usedtocode.com
category: decision
status: active
tags: [seo, domain, launch]
created: "2026-08-22T22:57:22"
updated: "2026-08-25T18:38:14"
---

<!-- compiled_truth -->
Aníbal decided (2026-08-22) the new Astro site serves on **i.usedtocode.com** — the old Quartz site's domain — closing HANDOFF R-01 ("the DNS call"). Rationale: every indexed archive URL stays byte-identical on the same domain, the strongest SEO-continuity option; no cross-domain 301 service, no Search Console change-of-address.

Consequences already applied: `site` in `astro.config.mjs` and the Sitemap line in `public/robots.txt` point at https://i.usedtocode.com (keep them in sync); the i.usedtocode.com entry was dropped from the JSON-LD `sameAs` (it is now self). Alternative rejected: anibalrojas.com + redirect worker on the old domain (equity transfers via 301 but with re-indexing churn).

Cutover (dashboard-side, NOT yet done): attach i.usedtocode.com as the Worker's custom domain, set assets `not_found_handling: 404-page`, remove the custom domain from the GitHub Pages repo settings. Blocked behind Aníbal's final review of the migration branch, plus a pre-existing Workers Builds failure visible on main. See [[blog-url-migration]] for the URL invariants.


## Timeline

- time: 2026-08-22T22:57:22
  kind: decision
  summary: "Created this page: The site serves on i.usedtocode.com"
  source: "Aníbal, 2026-08-22 migration planning"
  affects: [domain-i-usedtocode]

- time: 2026-08-22T22:57:22
  kind: decision
  summary: "Domain decided: i.usedtocode.com (Aníbal, 2026-08-22)"
  source: migration planning session
  affects: [domain-i-usedtocode]

- time: 2026-08-23T09:47:12
  kind: decision
  summary: "Workers Builds failure fixed in-repo: wrangler.jsonc (worker 'website', assets ./dist, not_found_handling 404-page) + wrangler pinned as devDependency. Cutover-runbook step 3 (404-page) now code, not dashboard. Validated: deploy --dry-run reads 155 assets; verify-migration 122/122 against wrangler dev on this config."
  source: session 2026-08-23
  affects: [domain-i-usedtocode]

- time: 2026-08-25T18:38:14
  kind: evidence
  summary: "Deploy-plan review verified live state (2026-08-25): i.usedtocode.com is CNAME→anibal.github.io at Namecheap DNS (dns-parking.com, TTL 14400) — DNS never moved to Cloudflare; the live site is still the OLD Quartz build (GH Pages, v4, last-modified 2025-12-30, .html twins serve 200); Astro never cut over (workers.dev preview only). GH Pages: build_type workflow, default branch v4, cname attached, cert approved to 2026-11-23, https_enforced. DEPLOY-GITHUB-PAGES.md Step D is a no-op; first deploy to the default branch IS the cutover."
  source: plan review session 2026-08-25
  affects: [domain-i-usedtocode, blog-url-migration]
