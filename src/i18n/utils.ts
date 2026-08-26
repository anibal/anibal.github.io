import { defaultLocale, locales, ui, type Dict, type Locale } from './ui';

/** Locale of the current URL: everything under /es/ is Spanish. */
export function getLocale(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

/** The full UI/copy dictionary for a locale. */
export function getDict(locale: Locale): Dict {
  return ui[locale] ?? ui[defaultLocale];
}

/**
 * Routes whose slugs are localized (handoff §4), keyed by EN path.
 * Anything unmapped (`/ideas/…` shares slugs across locales) falls back to
 * the prefix swap. The switcher must land on the equivalent page, never the
 * homepage — a route missing here is a bug, not a fallback case.
 */
const localizedRoutes: Record<string, string> = {
  '/about/': '/es/sobre-mi/',
  '/contact/': '/es/contacto/',
};
// Reverse lookups key on the *prefix-stripped* ES path (`/sobre-mi/…`),
// because equivalentPath strips `/es` before consulting the map.
const reverseLocalizedRoutes: Record<string, string> = Object.fromEntries(
  Object.entries(localizedRoutes).map(([en, es]) => [es.slice(3), en]),
);

/**
 * Path of `pathname` in `targetLocale`.
 * Explicit equivalence map first, generic prefix swap as the fallback:
 * `/about/` ↔ `/es/sobre-mi/`, `/ideas/` ↔ `/es/ideas/`.
 */
export function equivalentPath(pathname: string, targetLocale: Locale): string {
  const esPrefix = '/es/';
  let base = pathname;
  if (base === '/es') base = '/';
  else if (base.startsWith(esPrefix)) base = base.slice(esPrefix.length - 1);
  if (!base.endsWith('/')) base += '/';

  if (targetLocale === defaultLocale) return reverseLocalizedRoutes[base] ?? base;
  return localizedRoutes[base] ?? (base === '/' ? '/es/' : `/es${base}`);
}

/** Locale home path: `/` for EN, `/es/` for ES. */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : '/es/';
}

/** Absolute URL helper for canonical/hreflang tags. */
export function absoluteUrl(site: URL, path: string): string {
  return new URL(path, site).href;
}
