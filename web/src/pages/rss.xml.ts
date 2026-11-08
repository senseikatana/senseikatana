import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../features/blog/queries';
import { site } from '../config/site';
import { defaultLocale } from '../i18n/config';
import { contentSlug } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getPosts(defaultLocale);

  return rss({
    title: `${site.name} · Blog`,
    description: site.description.en,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${contentSlug(post.id)}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en</language>`,
  });
}
