import { defaultLocale, type Locale } from '../i18n/config';

/** Content ids follow `<locale>/<slug>`; URLs only use the slug. */
export function contentSlug(id: string): string {
  const [, ...rest] = id.split('/');
  return rest.join('/');
}

function contentLocale(id: string): string {
  return id.split('/')[0] ?? '';
}

/**
 * Resolves one entry per slug for `locale`, falling back to the default
 * locale when a translation is missing.
 */
export function localizeEntries<T extends { id: string }>(entries: T[], locale: Locale): T[] {
  const picked = new Map<string, T>();

  for (const entry of entries) {
    if (contentLocale(entry.id) === locale) picked.set(contentSlug(entry.id), entry);
  }

  for (const entry of entries) {
    if (contentLocale(entry.id) === defaultLocale && !picked.has(contentSlug(entry.id))) {
      picked.set(contentSlug(entry.id), entry);
    }
  }

  return [...picked.values()];
}

/** Unique slugs across every locale — the canonical route set. */
export function contentSlugs(entries: { id: string }[]): string[] {
  return [...new Set(entries.map((entry) => contentSlug(entry.id)))];
}
