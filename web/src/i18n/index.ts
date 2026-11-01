import ca from './locales/ca.json';
import en from './locales/en.json';
import es from './locales/es.json';
import { defaultLocale, type Locale } from './config';

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
