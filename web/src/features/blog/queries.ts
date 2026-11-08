import { getCollection, type CollectionEntry } from 'astro:content';
import { contentSlug, contentSlugs, localizeEntries } from '../../lib/content';
import { defaultLocale, type Locale } from '../../i18n/config';

export type BlogPost = CollectionEntry<'blog'>;

/** Published posts, newest first, resolved for `locale` with fallback. */
export async function getPosts(locale: Locale = defaultLocale): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.published);
  return localizeEntries(posts, locale).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getPost(locale: Locale, slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts(locale);
  return posts.find((post) => contentSlug(post.id) === slug);
}

/** Every route slug, regardless of locale. */
export async function getPostSlugs(): Promise<string[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.published);
  return contentSlugs(posts);
}

/** Up to `limit` other posts, newest first. */
export async function getRelated(locale: Locale, slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getPosts(locale);
  return posts.filter((post) => contentSlug(post.id) !== slug).slice(0, limit);
}

export function formatDate(date: Date, locale = 'es-ES'): string {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
