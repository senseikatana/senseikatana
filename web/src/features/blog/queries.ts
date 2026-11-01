import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts never leave the build. */
export async function getPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.published);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPost(id: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.id === id);
}

/** Up to `limit` other posts, newest first. */
export async function getRelated(id: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.id !== id).slice(0, limit);
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
