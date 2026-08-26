import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getDict } from '../../i18n/utils';
import { getPosts, postPath } from '../../lib/posts';

/** ES feed at /es/rss.xml. */
export async function GET(context: APIContext) {
  const d = getDict('es');
  const posts = await getPosts('es');
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
