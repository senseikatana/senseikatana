/**
 * Slim SEO types: typical HTML meta + Open Graph (Facebook) only.
 * CamelCase keys map to `<title>` / `<meta>` / `<link rel="canonical">`.
 *
 * Naming cheat-sheet for {@link UseSeoMetaOptions}:
 * - `site` = base URL (`https://example.com`)
 * - `siteTitle` = brand / site name (`"My Site"`)
 * - `title` = **page** document title (`"Blog Post"` → often `"Blog Post | My Site"`)
 */

export type SeoBooleanable = boolean | "true" | "false" | "" | 0 | 1;

export type SeoArrayable<T> = T | readonly T[];

/** Open Graph image (string URL or object). */
export interface SeoOgImageObject {
	url?: string;
	secureUrl?: string;
	type?: "image/jpeg" | "image/gif" | "image/png" | "image/webp" | "image/avif" | string;
	width?: string | number;
	height?: string | number;
	alt?: string;
}

/** Robots as string or simple object. */
export interface SeoRobotsObject {
	index?: SeoBooleanable;
	follow?: SeoBooleanable;
	noindex?: SeoBooleanable;
	nofollow?: SeoBooleanable;
	none?: SeoBooleanable;
	noarchive?: SeoBooleanable;
	nosnippet?: SeoBooleanable;
}

/** Article Open Graph extensions (`og:type=article`). */
export interface SeoMetaArticle {
	articleAuthor?: readonly string[];
	articleModifiedTime?: string;
	articlePublishedTime?: string;
	articleSection?: string;
	articleTag?: readonly string[];
}

/**
 * Flat meta: HTML head essentials, Open Graph and optional Twitter/X cards.
 */
export interface SeoMetaFlat extends SeoMetaArticle {
	/**
	 * Page document title → `<title>`.
	 * Not the site brand (`siteTitle`). When both differ, the helper usually
	 * renders `"Page | Brand"`.
	 */
	title?: string;
	/**
	 * Page summary → `<meta name="description">`.
	 * Prefer this for the page; use `ogDescription` only to override the share preview.
	 */
	description?: string;
	/** Meta keywords (legacy; optional). */
	keywords?: string;
	/** Meta author. */
	author?: string;
	/**
	 * Explicit canonical URL → `<link rel="canonical">`.
	 * Prefer this over `url` when you know the preferred address.
	 */
	canonical?: string;
	/**
	 * Absolute page URL. Fallback for canonical / `og:url` when those are omitted
	 * (resolution order: `ogUrl` → `canonical` → `url` → `site`).
	 */
	url?: string;
	charset?: "utf-8" | string;
	viewport?: string | Record<string, string | number | undefined>;
	robots?: "noindex, nofollow" | "index, follow" | string | SeoRobotsObject;

	/**
	 * Open Graph page URL (`og:url`).
	 * Falls back to `canonical` → `url` → `site`.
	 */
	ogUrl?: string;
	/**
	 * Open Graph title (`og:title`). Defaults to the resolved page `title` when omitted.
	 */
	ogTitle?: string;
	/**
	 * Open Graph description (`og:description`). Defaults to `description` when omitted.
	 */
	ogDescription?: string;
	ogType?: "website" | "article" | "profile" | string;
	ogLocale?: string;
	/**
	 * Open Graph site name (`og:site_name`). Defaults to `siteTitle` when omitted.
	 */
	ogSiteName?: string;
	ogImage?: string | SeoArrayable<SeoOgImageObject>;
	ogImageUrl?: string;
	ogImageSecureUrl?: string;
	ogImageType?: string;
	ogImageWidth?: string | number;
	ogImageHeight?: string | number;
	ogImageAlt?: string;

	/** Twitter/X card size; defaults to `summary_large_image` when an image is available. */
	twitterCard?: "summary" | "summary_large_image";
	/** Twitter/X title; defaults to the resolved Open Graph title. */
	twitterTitle?: string;
	/** Twitter/X description; defaults to the resolved Open Graph description. */
	twitterDescription?: string;
	/** Twitter/X image URL; defaults to the resolved Open Graph image. */
	twitterImage?: string;
	/** Alt text for the Twitter/X image. */
	twitterImageAlt?: string;
	/** Twitter/X site handle, e.g. `"@katanakit"`. */
	twitterSite?: string;
	/** Twitter/X creator handle, e.g. `"@katanakit"`. */
	twitterCreator?: string;
}

/** Flat meta input (all keys optional / nullable). */
export type SeoMetaInput = {
	[K in keyof SeoMetaFlat]?: SeoMetaFlat[K] | null;
};

/** Site + HTML + OG fields in one object (before Omit). */
export type UseSeoMetaBase = SeoMetaInput & {
	/**
	 * Site origin / base URL (no trailing slash), e.g. `"https://example.com"`.
	 * Not a title — used for canonical, OG, RSS, and JSON-LD defaults.
	 */
	site?: string;
	/**
	 * Site brand / product name (e.g. `"KatanaKit"`).
	 * Distinct from page {@link SeoMetaFlat.title}.
	 * Used as `<title>` suffix (`"Page | Brand"`), `og:site_name`, and RSS feed name.
	 */
	siteTitle?: string;
	/** Language code (e.g. `"en"`, `"es-ES"`). */
	lang?: string;
	rss?: Partial<{
		enabled: boolean;
		path: string;
		title?: string;
		description?: string;
		limit: number;
	}>;
	seo?: Partial<{
		noindex: boolean;
		canonical: boolean;
		openGraph: boolean;
		twitterCard: boolean;
		jsonLd: boolean;
	}>;
	nav?: Array<{ label: string; href: string; external?: boolean }>;
};

/**
 * Public options for {@link useSeoMeta}.
 * HTML, Open Graph, Twitter/X card and site fields in one object.
 * Omit keys you do not want in the type.
 *
 * @example
 * ```ts
 * // site = URL, siteTitle = brand, title = this page
 * useSeoMeta({
 *   site: "https://katanakit.dev",
 *   siteTitle: "KatanaKit",
 *   title: "Getting started", // → <title>Getting started | KatanaKit</title>
 *   description: "…",
 *   ogImage: "/og.png",
 * } satisfies UseSeoMetaOptions);
 *
 * useSeoMeta({ title: "Home" } as UseSeoMetaOptions<"rss" | "nav">);
 * ```
 */
export type UseSeoMetaOptions<OmitKeys extends keyof UseSeoMetaBase = never> = Omit<
	UseSeoMetaBase,
	OmitKeys
>;

export interface SeoTagNode {
	tag: "title" | "meta" | "link" | "script";
	attrs?: Record<string, string>;
	text?: string;
}
