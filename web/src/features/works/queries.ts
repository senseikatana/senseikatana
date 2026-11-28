import { getCollection, type CollectionEntry } from 'astro:content';
import { contentSlug, contentSlugs, localizeEntries } from '../../lib/content';
import { defaultLocale, type Locale } from '../../i18n/config';

export type Work = CollectionEntry<'works'>;

/** Published works ordered by their `order` field. */
export async function getWorks(locale: Locale = defaultLocale): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return localizeEntries(works, locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getWork(locale: Locale, slug: string): Promise<Work | undefined> {
  const works = await getWorks(locale);
  return works.find((work) => contentSlug(work.id) === slug);
}

/** Every route slug, regardless of locale. */
export async function getWorkSlugs(): Promise<string[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return contentSlugs(works);
}

export async function getFeaturedWorks(locale: Locale = defaultLocale): Promise<Work[]> {
  const works = await getWorks(locale);
  return works.filter((work) => work.data.featured);
}
