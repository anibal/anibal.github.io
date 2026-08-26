import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Legacy URL surface of the old Quartz site, frozen 2026-08-25 (ported from
 * public/_redirects when hosting moved from Cloudflare Workers to GitHub
 * Pages — GH Pages serves static files only, no redirect config). Two
 * mechanisms keep the old URLs alive:
 *
 *  1. Byte-identical assets committed under public/ (old OG images:
 *     static/og-image.png, index-og-image.webp, per-post *-og-image.webp).
 *  2. This integration writes meta-refresh + canonical stubs into dist/ for
 *     the HTML surface: .html twins of the 10 old posts, the old archive
 *     folder pages, and the 46 old tag pages — all → their current targets.
 *     It also copies the built feeds to their old paths (/index.xml was the
 *     Spanish feed; /sitemap.xml).
 *
 * Everything else is native GitHub Pages behavior (verified against the old
 * site 2026-08-25): extensionless /dir → 301 → /dir/ once dir/index.html
 * exists. The surface is FROZEN — it is the old site's URL space, a closed
 * set; new posts get no entries. Asserted end-to-end against production by
 * scripts/verify-migration.mjs. See brain: legacy-url-stubs,
 * blog-url-migration.
 */

// The 10 posts published on the old site (9 ES + 1 EN tutorial), no trailing
// slash. The 9 EN translations joined later — they never had old URLs.
const OLD_POSTS = [
  '/2025/10/18/Using-a-Github-Page-with-your-own-Domain-to-publish-you-Obsidian-vault-through-Quartz-for-free',
  '/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms',
  '/2025/10/28/las-matematicas-del-codigo-asistido-por-ia',
  '/2025/11/03/una-vision-de-sistemas-para-la-programacion-asistida-por-ia',
  '/2025/11/06/steering-favoreciendo-las-alucinaciones-positivas',
  '/2025/11/13/todo-prompting-es-prompt-injection',
  '/2025/11/26/backpressure-rechazando-las-alucinaciones-negativas',
  '/2025/12/16/2025-recap-mi-vida-con-apnea-del-sueño',
  '/2025/12/20/2025-recap-de-apenas-poder-caminar-a-entrenar-tres-veces-por-semana',
  '/2025/12/28/2025-recap-el-ano-en-que-me-valio-madres-la-gente',
];

// Old year/month archive pages → the Spanish ideas index (9 of 10 old posts
// are Spanish — same rule the Cloudflare _redirects used).
const YEAR_MONTHS = ['/2025', '/2025/10', '/2025/11', '/2025/12'];
const IDEAS_ES = '/es/ideas/';

// The 46 old tag pages (enumerated from the deployed Quartz build). All → the
// Spanish ideas index, same as the old /tags/* splat rule. NFC, like every
// URL the old site ever served (its NFD forms 404'd — parity is preserved).
const OLD_TAGS = [
  '2025-recap', 'agentes', 'alucinaciones-negativas', 'alucinaciones-positivas',
  'alucinaciones', 'apnea-del-sueño', 'asistentes-de-programación', 'backpressure',
  'claude-code', 'código', 'contexto', 'cpap', 'desarrollo-de-software',
  'entrenamiento', 'equipos', 'fascitis-plantar', 'flujos', 'free',
  'github-pages', 'ia-generativa', 'liderazgo', 'llm', 'llms', 'macos',
  'management', 'matemáticas', 'obsidian', 'polisomnografía', 'procesos',
  'programación', 'prompt-injection', 'prompting', 'quartz', 'recap-2025',
  'sabático', 'salud', 'seguridad', 'sistemas', 'software', 'steering',
  'sueño', 'tokens', 'valor', 'vector-de-ataque', 'vibe-coding', 'website',
];

export function legacyStubs(site) {
  return {
    name: 'legacy-url-stubs',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const origin = site.replace(/\/$/, '');
        const stub = (rel, to) => {
          const file = join(out, rel.normalize('NFC').replace(/^\//, ''));
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(
            file,
            `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>This page has moved</title>
<meta http-equiv="refresh" content="0; url=${to}">
<link rel="canonical" href="${origin}${to}">
<body>
<p>This page has moved to <a href="${to}">${to}</a>.</p>
</html>
`,
          );
        };

        let count = 0;
        for (const post of OLD_POSTS) {
          stub(`${post}.html`, `${post}/`); // .html twins → canonical form
          stub(`${dirname(post)}/index.html`, `${post}/`); // day folders → their post
          count += 2;
        }
        for (const ym of YEAR_MONTHS) stub(`${ym}/index.html`, IDEAS_ES);
        stub('tags/index.html', IDEAS_ES);
        for (const tag of OLD_TAGS) stub(`tags/${tag}.html`, IDEAS_ES);
        count += YEAR_MONTHS.length + 1 + OLD_TAGS.length;

        // Old feed/sitemap paths: serve the real artifacts (GH Pages cannot
        // redirect XML). /index.xml was the old (Spanish) feed.
        for (const [from, to] of [
          ['es/rss.xml', 'index.xml'],
          ['sitemap-index.xml', 'sitemap.xml'],
        ]) {
          if (existsSync(join(out, from))) copyFileSync(join(out, from), join(out, to));
          else logger.warn(`legacy-url-stubs: ${from} not in the build — ${to} not written`);
        }

        logger.info(`legacy-url-stubs: ${count} redirect stubs + /index.xml + /sitemap.xml`);
      },
    },
  };
}
