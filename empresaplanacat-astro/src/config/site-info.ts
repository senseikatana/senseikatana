import type { Locale } from "./i18n/types";

export interface SiteInfoProps {
	title: string;
	description?: string;
	lang?: Locale;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogType?: string;
	canonicalUrl?: string;
	author?: string;
	keywords?: string[];
	themeColor?: string;
}

const SITE_BASE_URL = "https://empresaplana.cat";

export const SITE_INFO = {
	brand: "Empresa Plana",
	title: "Empresa Plana - Autocars i mobilitat per la Costa Daurada",
	description:
		"Empresa Plana: horaris d'autobús, rutes, trasllats a l'aeroport i serveis discrecionals a la Costa Daurada, Camp de Tarragona i Barcelona.",
	baseUrl: SITE_BASE_URL,
	defaultLang: "ca",
	author: "Empresa Plana",
	themeColor: "#013990",
	keywords: [
		"Empresa Plana",
		"autocars",
		"autobusos",
		"horaris",
		"Tarragona",
		"Costa Daurada",
		"trasllats aeroport",
	],
} as const;

export const title = SITE_INFO.title;
export const description = SITE_INFO.description;

export function getSiteInfo(page: Partial<SiteInfoProps> = {}): SiteInfoProps {
	const { lang = SITE_INFO.defaultLang as Locale, ...rest } = page;

	return {
		title: SITE_INFO.title,
		description: SITE_INFO.description,
		author: SITE_INFO.author,
		themeColor: SITE_INFO.themeColor,
		keywords: [...SITE_INFO.keywords],
		lang,
		...rest,
	};
}

export function getCanonicalUrl(pathname: string): string {
	return `${SITE_BASE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
