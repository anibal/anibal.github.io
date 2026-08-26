#!/usr/bin/env node
/**
 * Legacy-URL verification harness — asserts the OLD i.usedtocode.com URL
 * surface behaves correctly on a DEPLOYED GitHub Pages build, and that
 * sitemap/RSS carry every post. Run against production (or any static server
 * that reproduces GH Pages semantics):
 *
 *   node scripts/verify-migration.mjs
 *   BASE_URL=https://staging.example node scripts/verify-migration.mjs
 *
 * GitHub Pages serves static files only (no _redirects), so the surface is a
 * mix of three mechanisms, each asserted here:
 *   native   /slug and /dir → 301 → /slug/ (directory redirect, once
 *            dir/index.html exists — or 200 via suffix-match when a slug.html
 *            stub also exists; both accepted, the harness reports which)
 *   stubs    /slug.html, folder and tag pages → 200 meta-refresh + canonical
 *            (written by the legacyStubs integration in astro.config.mjs)
 *   copies   /index.xml, /sitemap.xml → byte-copies of the built feeds; old
 *            OG images → byte-identical assets from public/
 *
 * `astro preview` does NOT reproduce GH Pages redirect semantics — run this
 * against a deployment. Zero dependencies, node >= 18.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = (process.env.BASE_URL ?? 'https://i.usedtocode.com').replace(/\/$/, '');
const ORIGIN = BASE;

// ---------- expected posts, derived from the content collection ----------
const postsDir = fileURLToPath(new URL('../src/content/posts/', import.meta.url));
const posts = [];
for (const name of readdirSync(postsDir)) {
  if (!name.endsWith('.md')) continue;
  const fm = readFileSync(postsDir + name, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const field = (key) =>
    fm[1].match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+?)['"]?\\s*$`, 'm'))?.[1];
  if (field('draft') === 'true') continue;
  const [y, m, d] = field('date').split('-');
  const id = name.replace(/\.md$/, '').normalize('NFC');
  posts.push({
    id,
    lang: field('lang'),
    path: `/${y}/${m}/${d}/${id}/`,
    translationOf: field('translationOf'),
  });
}

// ---------- check plumbing ----------
const results = [];
let failures = 0;
function record(ok, name, detail = '', warnOnly = false) {
  if (!ok && !warnOnly) failures++;
  results.push({ mark: ok ? 'PASS' : warnOnly ? 'WARN' : 'FAIL', name, detail });
}
function locPath(res) {
  const loc = res.headers.get('location') ?? '';
  try {
    return decodeURIComponent(new URL(loc, BASE).pathname);
  } catch {
    return loc;
  }
}
async function get(path, { raw = false } = {}) {
  // string concat (not new URL(path, BASE)) so pre-encoded test paths survive
  return fetch(BASE + (raw ? path : encodeURI(path)), { redirect: 'manual' });
}

async function expect200(path, { raw = false } = {}) {
  const res = await get(path, { raw });
  record(res.status === 200, `200 ${path}`, res.status === 200 ? '' : `got ${res.status}`);
  return res;
}
// GH Pages directory redirect: /dir → 301 → /dir/ when dir/index.html exists.
async function expect301(path, target, { warnOnly = false, raw = false } = {}) {
  const res = await get(path, { raw });
  const ok = [301, 308].includes(res.status) && locPath(res) === target;
  record(ok, `301 ${path}`, ok ? `→ ${target}` : `got ${res.status} → ${locPath(res) || '(none)'}, wanted 301 → ${target}`, warnOnly);
}
// A legacyStubs redirect page: 200 + meta-refresh + canonical → target.
async function expectStub(path, target, { raw = false } = {}) {
  const res = await get(path, { raw });
  const detail = `got ${res.status}`;
  if (res.status !== 200) {
    record(false, `stub ${path}`, detail);
    return;
  }
  const body = await res.text();
  const refresh = body.includes(`http-equiv="refresh" content="0; url=${target}"`);
  const canonical = body.includes(`rel="canonical" href="${ORIGIN}${target}"`);
  record(refresh && canonical, `stub ${path}`, refresh && canonical ? `→ ${target}` : `missing refresh/canonical → ${target}`);
}
// Extensionless legacy URL where BOTH the /dir/ page and the .html stub exist
// (posts): GH Pages either 301s to the canonical /dir/ or suffix-serves the
// stub at 200 — both end at the canonical URL, both accepted.
async function expectExtensionless(path, target, { raw = false } = {}) {
  const res = await get(path, { raw });
  if ([301, 308].includes(res.status)) {
    const ok = locPath(res) === target;
    record(ok, `legacy ${path}`, ok ? `301 → ${target}` : `301 → ${locPath(res)}, wanted ${target}`);
    return;
  }
  if (res.status === 200) {
    const body = await res.text();
    const ok = body.includes(`content="0; url=${target}"`);
    record(ok, `legacy ${path}`, ok ? `stub-served → ${target}` : `200 without refresh to ${target}`);
    return;
  }
  record(false, `legacy ${path}`, `got ${res.status}, wanted 301 or stub → ${target}`);
}
async function expect404(path, { warnOnly = false, raw = false } = {}) {
  const res = await get(path, { raw });
  record(res.status === 404, `404 ${path}`, res.status === 404 ? '' : `got ${res.status}`, warnOnly);
}

// ---------- 1. every post URL serves ----------
for (const p of posts) await expect200(p.path);

// ---------- 2. the 10 old indexed URLs (extensionless) + .html twins ----------
const OLD_SLUGS = [
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
for (const slug of OLD_SLUGS) {
  await expectExtensionless(slug, `${slug}/`);
  await expectStub(`${slug}.html`, `${slug}/`);
}

// ñ byte-forms: NFC percent-encoded extensionless (redirect-or-stub) and the
// real slashed page; the NFD alias 404'd on the old site too — parity, WARN.
const N_NFC = '/2025/12/16/2025-recap-mi-vida-con-apnea-del-sue%C3%B1o';
const N_TARGET = '/2025/12/16/2025-recap-mi-vida-con-apnea-del-sueño/';
await expectExtensionless(N_NFC, N_TARGET, { raw: true });
{
  const res = await get(N_NFC + '/', { raw: true });
  const ok = res.status === 200 && !(await res.text()).includes('http-equiv="refresh"');
  record(ok, `200 ${N_NFC}/ (real page, NFC percent-encoded)`, ok ? '' : `got ${res.status}`);
}
await expect404('/2025/12/16/2025-recap-mi-vida-con-apnea-del-suen%CC%83o', { raw: true, warnOnly: true });

// ---------- 3. folder archive pages (stub dirs; extensionless → native 301) ----------
for (const f of ['/2025', '/2025/10', '/2025/11', '/2025/12']) {
  await expect301(f, `${f}/`);
  await expectStub(`${f}/`, '/es/ideas/');
}
for (const slug of [OLD_SLUGS[0], OLD_SLUGS[1], OLD_SLUGS[7]]) {
  const day = slug.slice(0, slug.lastIndexOf('/'));
  await expect301(day, `${day}/`);
  await expectStub(`${day}/`, `${slug}/`);
}

// ---------- 4. tags (old suffix-match form), feeds, sitemap, OG, drafts ----------
await expect301('/tags', '/tags/');
await expectStub('/tags/', '/es/ideas/');
await expectStub('/tags/backpressure', '/es/ideas/');
await expectStub('/tags/asistentes-de-programaci%C3%B3n', '/es/ideas/', { raw: true });
await expect404('/tags/backpressure/'); // slashed tag 404'd on the old site too

// old feed/sitemap paths serve byte-copies of the built artifacts
{
  const [old, current] = await Promise.all([get('/index.xml'), get('/es/rss.xml')]);
  const same = old.status === 200 && current.status === 200 && (await old.text()) === (await current.text());
  record(same, '/index.xml = /es/rss.xml', same ? '' : `got ${old.status}/${current.status} or content differs`);
}
{
  const [old, current] = await Promise.all([get('/sitemap.xml'), get('/sitemap-index.xml')]);
  const same = old.status === 200 && current.status === 200 && (await old.text()) === (await current.text());
  record(same, '/sitemap.xml = /sitemap-index.xml', same ? '' : `got ${old.status}/${current.status} or content differs`);
}

// old OG images: byte-identical assets (meta-refresh can't redirect an image)
for (const [path, asset, type] of [
  ['/static/og-image.png', '../public/static/og-image.png', 'image/png'],
  ['/index-og-image.webp', '../public/index-og-image.webp', 'image/webp'],
  [`${OLD_SLUGS[1]}-og-image.webp`, `../public${OLD_SLUGS[1]}-og-image.webp`, 'image/webp'],
]) {
  const res = await get(path);
  const okStatus = res.status === 200;
  const okType = (res.headers.get('content-type') ?? '').startsWith(type);
  const okBytes = okStatus && Buffer.from(await res.arrayBuffer()).equals(readFileSync(fileURLToPath(new URL(asset, import.meta.url))));
  record(okStatus && okType && okBytes, `asset ${path}`, okStatus && okType && okBytes ? 'byte-identical' : `status ${res.status}, type ${res.headers.get('content-type')}, bytes ${okBytes}`);
}
await expect200(`/og${OLD_SLUGS[1]}.png`);

// /draft/* was noindex,nofollow on the old site — 404 accepted (WARN).
await expect404('/draft/FAQ', { warnOnly: true });
await expect404('/draft/', { warnOnly: true });

// ---------- 5. 404 handling ----------
{
  const res = await get('/definitely-not-a-page/');
  const body = res.status === 404 ? await res.text() : '';
  const ok = res.status === 404 && body.includes('nothing at this address');
  record(ok, '404 /definitely-not-a-page/', ok ? 'serves the 404 page' : `got ${res.status}`);
}

// ---------- 6. sitemap content ----------
{
  const res = await get('/sitemap-0.xml');
  const xml = res.status === 200 ? decodeURIComponent(await res.text()) : '';
  record(res.status === 200, '200 /sitemap-0.xml', res.status === 200 ? '' : `got ${res.status}`);
  for (const p of posts) {
    const inMap = xml.includes(p.path);
    record(inMap, `sitemap has ${p.path}`, inMap ? '' : 'missing');
    const block = xml.split('<url>').find((b) => b.includes(`${p.path}</loc>`)) ?? '';
    const hasAlt = block.includes('hreflang');
    if (p.translationOf) record(hasAlt, `sitemap hreflang for ${p.id}`, hasAlt ? '' : 'no xhtml:link alternates');
    else record(!hasAlt, `sitemap no-hreflang for unpaired ${p.id}`, hasAlt ? 'unexpected alternates' : '');
  }
}

// ---------- 7. RSS ----------
for (const [feed, lang] of [['/rss.xml', 'en'], ['/es/rss.xml', 'es']]) {
  const expected = posts.filter((p) => p.lang === lang);
  const res = await get(feed);
  const xml = res.status === 200 ? decodeURIComponent(await res.text()) : '';
  const items = (xml.match(/<item>/g) ?? []).length;
  record(res.status === 200 && items === expected.length, `${feed} carries ${expected.length} items`, `found ${items}`);
  for (const p of expected)
    record(xml.includes(p.path), `${feed} links ${p.path}`, xml.includes(p.path) ? '' : 'missing (date-path drift? UTC bug?)');
}

// ---------- report ----------
const width = Math.max(...results.map((r) => r.name.length));
for (const r of results)
  console.log(`${r.mark}  ${r.name.padEnd(width)}  ${r.detail}`);
const warns = results.filter((r) => r.mark === 'WARN').length;
console.log(`\n${results.length} checks against ${BASE}: ${failures} failed, ${warns} warnings`);
process.exit(failures ? 1 : 0);
