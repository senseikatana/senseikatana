import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
	dictionaries,
	LOCALE_LABELS,
	type Locale,
	type StringsDict,
} from './dictionaries';

const STORAGE_KEY = 'whm.locale';

function detectLocale(): Locale {
	if (typeof window === 'undefined') return 'es';
	const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
	if (saved && saved in dictionaries) return saved;
	const lang = navigator.language?.slice(0, 2).toLowerCase();
	if (lang === 'ca') return 'ca';
	if (lang === 'fr') return 'fr';
	if (lang === 'en') return 'en';
	return 'es';
}

export interface I18nValue {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	S: StringsDict;
	localeLabel: (locale: Locale) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocale] = useState<Locale>(detectLocale);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, locale);
	}, [locale]);

	const value = useMemo<I18nValue>(
		() => ({
			locale,
			setLocale,
			S: dictionaries[locale],
			localeLabel: (next) => LOCALE_LABELS[next],
		}),
		[locale],
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useI18n must be used within a LocaleProvider');
	}
	return context;
}
