export const locales = ['en', 'es', 'ca'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
