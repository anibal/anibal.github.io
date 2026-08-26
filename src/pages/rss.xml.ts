import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getDict } from '../i18n/utils';
import { getPosts, postPath } from '../lib/posts';

/** EN feed at /rss.xml; ES lives at /es/rss.xml (handoff §6.4). */
export async function GET(context: APIContext) {
  const d = getDict('en');
  const posts = await getPosts('en');
  return rss({
    title: d.ideasPage.meta.title,
    description: d.ideasPage.meta.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
    })),
  });
}
