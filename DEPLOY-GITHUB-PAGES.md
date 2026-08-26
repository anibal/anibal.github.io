# Deployment Plan: Cloudflare Pages → GitHub Pages for `i.usedtocode.com`

Amended 2026-08-25 after a plan review verified the live state. Two core
corrections to the original plan:

1. **DNS was never moved to Cloudflare.** `i.usedtocode.com` is a Namecheap
   CNAME → `anibal.github.io` (TTL 14400). The Astro site only ever lived at
   `website.anibalrojas.workers.dev`; the Cloudflare cutover in the HANDOFF
   runbook never executed.
2. **The old Quartz site is still live** on GitHub Pages (`anibal/anibal.github.io`,
   default branch `v4`, Pages source: GitHub Actions, custom domain attached,
   cert approved to 2026-11-23, HTTPS enforced). The first deploy to the
   default branch **is** the cutover — there is no "deploy quietly, cut DNS
   later" sequencing, and no DNS/cert work at all.

## Prior State (verified 2026-08-25)

| Layer | Before | After |
|---|---|---|
| Source code repo | `anibal/website` (branch `migration/quartz-import`) | `anibal/anibal.github.io` (default branch renamed `v4` → `main`) |
| Site framework | Astro v5 (static → `dist/`) | Same |
| Hosting | Old Quartz build live on GitHub Pages; Astro on `website.anibalrojas.workers.dev` (never cut over) | GitHub Pages serves the Astro build |
| Custom domain | `i.usedtocode.com` CNAME → `anibal.github.io` (Namecheap) | Unchanged — already correct |
| Old URL surface | Served by the Quartz build (`.html` twins, folder/tag pages, `/index.xml`, OG webp images) | Preserved via stubs + byte-identical assets (Step A2) |

## Implementation

### Step A — Code changes in the website project ✅

- `public/_redirects` — deleted (Cloudflare-specific).
- `wrangler.jsonc` — deleted; `wrangler` removed from devDependencies.
- `public/CNAME` — created (`i.usedtocode.com`), keeps the Pages custom domain
  bound through repo re-wipes.
- Stale Cloudflare references cleaned: `README.md` (deploy section), the
  `src/pages/404.astro` header comment, the `.gitignore` wrangler block,
  `HANDOFF.md` (cutover ledger + R-01).
- Unchanged, verified correct: `astro.config.mjs` `site`, `public/robots.txt`,
  build script, `ci.yml` (Lighthouse runs against `staticDistDir ./dist`, no
  live-URL dependency).

### Step A2 — Legacy URL surface on GitHub Pages (amendment) ✅

GH Pages serves static files only — no `_redirects`. Native behavior (verified
against the old site): extensionless `/dir` → 301 → `/dir/` once
`dir/index.html` exists; `/file.html` suffix-serves extensionless paths. On
top of that:

- `src/lib/legacy-stubs.mjs` (registered in `astro.config.mjs`) writes 71
  meta-refresh + canonical stubs at build: the 10 old posts' `.html` twins →
  canonical trailing-slash URLs; day folders → their post; year/month folders,
  `/tags/` and its 46 tag pages → `/es/ideas/`. It also copies
  `es/rss.xml` → `index.xml` and `sitemap-index.xml` → `sitemap.xml`.
- Byte-identical old OG assets committed under `public/` (from the Quartz
  build, hash-verified against live): `static/og-image.png`,
  `index-og-image.webp`, 10 per-post `*-og-image.webp`. Old post attachments
  already served at original paths.
- Accepted 404s: `/draft/*` (noindex, no equity) and the NFD ñ alias (the old
  site 404'd it too — parity).
- `scripts/verify-migration.mjs` rewritten to assert this whole surface
  against a deployment (default `BASE_URL=https://i.usedtocode.com`).

### Step B — `.github/workflows/deploy.yml` ✅

Standard Pages workflow (build → `upload-pages-artifact` → `deploy-pages`),
triggered on push to `main` + `workflow_dispatch`. CI (`ci.yml`, Lighthouse
gates) stays unchanged and gates the PR before the merge that deploys.

### Step C — Repo migration (amended) ✅

1. Rename the default branch on `anibal/anibal.github.io`: `v4` → `main`
   (GitHub API — history preserved, default branch follows).
2. Fresh clone → wipe everything but `.git` (find-based; `rm -rf .*` is a
   BSD-rm footgun) → import the website tree via `git archive` (tracked files
   only — `.gitignore` travels, `dist/`/`node_modules/`/`.astro/` don't).
3. Push as `astro-import` branch → PR → **CI (Lighthouse) must be green** →
   merge. The merge push to `main` fires `deploy.yml` — that is the cutover.
4. Old Quartz files (content/, quartz/, docs/, Dockerfile, …) leave the tree;
   their history stays in the repo for rollback archaeology.

### Step D — DNS cutover → **no-op** (amendment)

DNS already points at GitHub Pages (Namecheap CNAME → `anibal.github.io`);
the cert is approved and HTTPS enforced. Nothing to change. Do not touch
`www.usedtocode.com` (it resolves elsewhere deliberately).

## Post-deploy verification ✅

- `BASE_URL=https://i.usedtocode.com node scripts/verify-migration.mjs` — the
  full legacy surface + sitemap/RSS assertions (allow ≤10 min for the Fastly
  edge cache, `max-age=600`).
- Spot-check: `/` serves the Astro build (self-hosted fonts, no Google Fonts).
- Manual follow-up (owner): resubmit the sitemap in Google Search Console.

## Rollback

The import is one commit on top of Quartz history: `git revert` it on `main`,
then re-add a `main`-triggered deploy workflow in the same commit (the Quartz
`deploy.yml` only triggers on `v4`) — or fix forward. The local Quartz build
at `/Users/anibal/Sandboxes/Personal/quartz/` is untouched as a last resort.

## Out of Scope / Follow-ups (owner actions)

- Decommission the Cloudflare Worker `website` (`workers.dev` preview) after
  the cutover verifies.
- Archive `anibal/website` after the migration verifies.
- GSC sitemap resubmission.
- The Quartz project directory — untouched, kept as rollback source.
