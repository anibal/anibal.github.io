import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeImageDimensions from './src/lib/rehype-image-dimensions.mjs';
import { legacyStubs } from './src/lib/legacy-stubs.mjs';

// Code highlighting at build: a light theme derived from tokens.css —
// amber/slate/ink on paper, no dark theme (handoff §6.4).
const shikiTheme = JSON.parse(
  readFileSync(new URL('./src/styles/shiki-theme.json', import.meta.url), 'utf8'),
);

/**
 * hreflang alternates for post URLs in the sitemap.
 *
 * @astrojs/sitemap pairs locales by URL prefix, but posts are deliberately
 * prefix-less in BOTH languages (/YYYY/MM/DD/slug/ — brain: blog-url-migration),
 * so the integration can never pair them on its own. This scans the posts'
 * frontmatter at config load (regex between the --- fences, zero deps) and
 * builds path → [{lang, path}] for every `translationOf` pair; the `serialize`
 * hook below attaches them. Unpaired posts correctly get none.
 *
 * Dates are split as strings — never through `new Date()` — so the paths here
 * agree with `postDateParts()` (UTC) regardless of the build machine's TZ.
 */
function postAlternates() {
  const dir = new URL('./src/content/posts/', import.meta.url);
  const posts = new Map();
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const fm = readFileSync(new URL(encodeURIComponent(name), dir), 'utf8').match(
      /^---\r?\n([\s\S]*?)\r?\n---/,
    );
    if (!fm) continue;
    const field = (key) =>
      fm[1].match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+?)['"]?\\s*$`, 'm'))?.[1];
    if (field('draft') === 'true') continue;
    const date = field('date');
    const lang = field('lang');
    if (!date || !lang) continue;
    const [y, m, d] = date.split('-');
    const id = name.replace(/\.md$/, '');
    posts.set(id, { path: `/${y}/${m}/${d}/${id}/`, lang, translationOf: field('translationOf') });
  }
  const links = new Map();
  for (const post of posts.values()) {
    const sibling = post.translationOf ? posts.get(post.translationOf) : undefined;
    if (!sibling) continue;
    const en = post.lang === 'en' ? post.path : sibling.path;
    const es = post.lang === 'es' ? post.path : sibling.path;
    links.set(post.path, [
      { lang: 'en', path: en },
      { lang: 'es', path: es },
      { lang: 'x-default', path: en },
    ]);
  }
  return links;
}
const postLinks = postAlternates();

// Domain decided (2026-08-22): the new site serves on i.usedtocode.com, keeping
// every old Quartz URL byte-identical. Keep in sync with public/robots.txt.
const SITE = 'https://i.usedtocode.com';
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    // site CSS is tiny (~13KB): inlining kills the render-blocking request
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: { theme: shikiTheme },
    rehypePlugins: [rehypeImageDimensions],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // i18n passed through so hreflang alternates appear in the sitemap
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
      serialize(item) {
        // runs after the i18n pairing, so posts (which it can't pair) can be
        // given their links here without touching the prefixed pages
        const path = decodeURIComponent(new URL(item.url).pathname);
        const alternates = postLinks.get(path);
        if (alternates) {
          item.links = alternates.map((alt) => ({
            lang: alt.lang,
            url: new URL(alt.path, item.url).href,
          }));
        }
        return item;
      },
    }),
    // Old Quartz URLs that GitHub Pages can't redirect (static hosting, no
    // _redirects) — meta-refresh stubs + feed copies, see the module.
    legacyStubs(SITE),
  ],
});
