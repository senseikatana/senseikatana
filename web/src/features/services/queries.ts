import { getCollection, type CollectionEntry } from 'astro:content';
import { contentSlug, contentSlugs, localizeEntries } from '../../lib/content';
import { defaultLocale, type Locale } from '../../i18n/config';

export type Service = CollectionEntry<'services'>;

/** Published services ordered by their `order` field. */
export async function getServices(locale: Locale = defaultLocale): Promise<Service[]> {
  const services = await getCollection('services', ({ data }) => !data.draft);
  return localizeEntries(services, locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getService(locale: Locale, slug: string): Promise<Service | undefined> {
  const services = await getServices(locale);
  return services.find((service) => contentSlug(service.id) === slug);
}

/** Every route slug, regardless of locale. */
export async function getServiceSlugs(): Promise<string[]> {
  const services = await getCollection('services', ({ data }) => !data.draft);
  return contentSlugs(services);
}
