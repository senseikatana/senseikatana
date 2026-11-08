import { getCollection, type CollectionEntry } from 'astro:content';
import { contentSlug, contentSlugs, localizeEntries } from '../../lib/content';
import { defaultLocale, type Locale } from '../../i18n/config';

export type Experience = CollectionEntry<'experience'>;

/** Published roles ordered from most to least recent. */
export async function getExperience(locale: Locale = defaultLocale): Promise<Experience[]> {
  const entries = await getCollection('experience', ({ data }) => !data.draft);
  return localizeEntries(entries, locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getExperienceEntry(
  locale: Locale,
  slug: string,
): Promise<Experience | undefined> {
  const entries = await getExperience(locale);
  return entries.find((entry) => contentSlug(entry.id) === slug);
}

/** Every route slug, regardless of locale. */
export async function getExperienceSlugs(): Promise<string[]> {
  const entries = await getCollection('experience', ({ data }) => !data.draft);
  return contentSlugs(entries);
}
