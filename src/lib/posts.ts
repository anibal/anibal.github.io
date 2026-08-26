import { getCollection, type CollectionEntry } from 'astro:content';
import { type Locale } from '../i18n/ui';

export type Post = CollectionEntry<'posts'>;

/**
 * Posts for one locale, newest first.
 * Drafts render in `astro dev` only — this is how the post template gets
 * QA'd before real posts exist; production builds exclude them at the
 * collection query.
 */
export async function getPosts(lang: Locale): Promise<Post[]> {
  const posts = await getCollection(
    'posts',
    ({ data }) => data.lang === lang && (import.meta.env.DEV || !data.draft),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Calendar parts of a post date. Frontmatter `date: YYYY-MM-DD` parses as UTC
 * midnight, so these MUST be UTC getters: local-time getters shift the URL a
 * day backwards on any machine west of UTC, and dev/CI stop agreeing on paths.
 */
export function postDateParts(date: Date): { y: string; m: string; d: string } {
  return {
    y: String(date.getUTCFullYear()),
    m: String(date.getUTCMonth() + 1).padStart(2, '0'),
    d: String(date.getUTCDate()).padStart(2, '0'),
  };
}

/** URL path of a post: `/${year}/${month}/${day}/${slug}/` — no locale prefix. */
export function postPath(post: Post): string {
  const { y, m, d } = postDateParts(post.data.date);
  return `/${y}/${m}/${d}/${post.id}/`;
}

/** Reading time in whole minutes at ~200 wpm. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** The post's translation in the other locale, when `translationOf` is set. */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  if (!post.data.translationOf) return undefined;
  const other: Locale = post.data.lang === 'es' ? 'en' : 'es';
  const posts = await getPosts(other);
  return posts.find((p) => p.id === post.data.translationOf);
}
