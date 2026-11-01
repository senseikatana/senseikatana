import ca from './ca.json';
import en from './en.json';
import es from './es.json';
import { defaultLocale, isLocale, type Locale } from './languages';

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = {
  es,
  ca: ca as Dictionary,
  en: en as Dictionary,
};

/**
 * Returns the nested value at `path` (dot notation) for a locale,
 * falling back to the default locale when the key is missing.
 */
export function t(locale: Locale = defaultLocale, path = ''): unknown {
  const read = (dict: Dictionary) =>
    path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, dict);

  return read(dictionaries[locale]) ?? read(dictionaries[defaultLocale]);
}

export function useTranslations(locale: Locale = defaultLocale) {
  return (path: string) => String(t(locale, path) ?? path);
}

export const dateLocales: Record<Locale, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-US',
};

/**
 * Resolves the active locale. `Astro.currentLocale` is authoritative on i18n
 * fallback routes, where `Astro.url.pathname` still points at the source page.
 */
export function getLocale(pathname: string, currentLocale?: string): Locale {
  if (currentLocale && isLocale(currentLocale)) return currentLocale;
  const segment = pathname.split('/')[1] ?? '';
  return isLocale(segment) ? segment : defaultLocale;
}

/** Reads a list value (principles, tags) with a safe fallback. */
export function useList<T>(locale: Locale, path: string): T[] {
  const value = t(locale, path);
  return Array.isArray(value) ? (value as T[]) : [];
}
