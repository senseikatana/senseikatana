import ca from "./ca.json";
import en from "./en.json";
import es from "./es.json";
import type { I18nDictionary, Locale } from "./types";

export type { I18nDictionary, Locale, LocalizedPageProps, DictionaryProps } from "./types";

export const DEFAULT_LOCALE: Locale = "ca";

export const LOCALES: readonly Locale[] = ["ca", "es", "en"] as const;

const dictionaries: Record<Locale, I18nDictionary> = { ca, en, es };

export function isLocale(value: string | undefined | null): value is Locale {
	if (!value) return false;
	return LOCALES.includes(value.toLowerCase() as Locale);
}

export function getLocale(value: string | undefined | null, fallback: Locale = DEFAULT_LOCALE): Locale {
	if (!value) return fallback;
	const normalized = value.toLowerCase() as Locale;
	return isLocale(normalized) ? normalized : fallback;
}

export function getDictionary(locale: Locale): I18nDictionary {
	return dictionaries[locale];
}

type Join<K extends string, P extends string> = P extends "" ? K : `${P}.${K}`;

type StringLeafPaths<T, P extends string = ""> = {
	[K in keyof T & string]: T[K] extends string
		? Join<K, P>
		: StringLeafPaths<T[K], Join<K, P>>;
}[keyof T & string];

export type DictionaryKey = StringLeafPaths<I18nDictionary>;

export function t(locale: Locale, key: DictionaryKey): string {
	const parts = key.split(".");
	let node: unknown = dictionaries[locale];

	for (const part of parts) {
		if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
			node = (node as Record<string, unknown>)[part];
		} else {
			return key;
		}
	}

	return typeof node === "string" ? node : key;
}
