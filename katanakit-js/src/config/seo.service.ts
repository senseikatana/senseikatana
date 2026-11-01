import type {
	SeoMetaInput,
	SeoOgImageObject,
	SeoRobotsObject,
	SeoTagNode,
	UseSeoMetaBase,
	UseSeoMetaOptions,
} from "./seo-meta.types.js";
import { type SiteConfig, siteConfig as defaultSiteConfig } from "./site.config.js";

export type {
	SeoArrayable,
	SeoBooleanable,
	SeoMetaArticle,
	SeoMetaFlat,
	SeoMetaInput,
	SeoOgImageObject,
	SeoRobotsObject,
	SeoTagNode,
	UseSeoMetaBase,
	UseSeoMetaOptions,
} from "./seo-meta.types.js";

/**
 * Result of {@link useSeoMeta}: `html` / `tags` for the head, plus **one**
 * flat object of resolved fields (site + HTML + OG + Twitter). No duplicate
 * `title` / `meta.title` / `config.title`.
 *
 * - `title` = document title (page)
 * - `siteTitle` = brand / site name
 * - `html` / `tags` = what you inject into `<head>`
 */
export type SeoTagResult = UseSeoMetaOptions & {
	html: string;
	tags: SeoTagNode[];
	jsonLd?: Record<string, unknown>;
};

/**
 * SEO helper: one flat object in → one flat object out (+ html/tags).
 *
 * @example
 * ```ts
 * const seo = useSeoMeta({
 *   site: "https://example.com",
 *   siteTitle: "My Site",
 *   title: "Home",
 *   description: "…",
 *   ogImage: "https://example.com/image.png",
 * });
 * // seo.title, seo.site, seo.ogImage — once each
 * // seo.html / seo.tags — head injection
 * ```
 */
export function useSeoMeta<OmitKeys extends keyof UseSeoMetaBase = never>(
	opts: UseSeoMetaOptions<OmitKeys>,
	defaults: SiteConfig = useSeoMetaConfig(),
): SeoTagResult {
	if (opts == null || typeof opts !== "object") {
		throw new Error("[Seo] useSeoMeta(opts) is required (received empty options).");
	}
	const { config, meta } = splitUseSeoMetaOptions(opts as UseSeoMetaOptions, defaults);
	const merged = mergeSeoDefaults(meta, config);
	const tags = flattenSeoMetaToTags(merged, config);

	const rss = buildRssTagNode(config);
	if (rss) tags.push(rss);

	const jsonLd = config.seo.jsonLd ? buildJsonLdFromInput(merged, config) : undefined;
	if (jsonLd) {
		tags.push({
			tag: "script",
			attrs: { type: "application/ld+json" },
			text: safeJsonLd(jsonLd),
		});
	}

	const title = String(merged.title ?? config.title);
	const description = String(merged.description ?? config.description);
	const url = String(merged.ogUrl ?? merged.canonical ?? merged.url ?? config.site);
	const ogImage = resolveOgImageUrl(merged, config);

	return {
		...merged,
		site: config.site,
		siteTitle: config.title,
		lang: config.lang,
		rss: config.rss,
		seo: {
			noindex: config.seo.noindex,
			canonical: config.seo.canonical,
			openGraph: config.seo.openGraph,
			twitterCard: config.seo.twitterCard,
			jsonLd: config.seo.jsonLd,
		},
		nav: config.nav,
		title,
		description,
		url,
		ogUrl: merged.ogUrl ?? url,
		ogImage: ogImage ?? (typeof merged.ogImage === "string" ? merged.ogImage : undefined),
		canonical: merged.canonical ?? (config.seo.canonical ? url : merged.canonical),
		html: serializeSeoTags(tags),
		tags,
		jsonLd,
	};
}

/**
 * Site-wide SEO defaults registered once with {@link defineSeoMetaConfig}.
 * `null` until a config is registered; the demo defaults fill the gap.
 */
let registeredSiteConfig: SiteConfig | null = null;

/**
 * Registers the site-wide SEO config once — the same `define*Config` pattern
 * used by the HTTP client and the other services.
 *
 * After the call, every `useSeoMeta(opts)` resolves against this config, so
 * pages only pass their own fields. An explicit second argument still wins, so
 * per-call overrides and tests stay possible.
 *
 * @param config - The site config (same shape the docs site uses).
 * @returns The same config, for chaining or reference.
 * @throws {Error} When required blocks (`seo`, `rss`) are missing.
 *
 * @example
 * ```ts
 * import { defineSeoMetaConfig, useSeoMeta } from "katanakit-js";
 *
 * defineSeoMetaConfig({
 *   site: "https://myblog.com",
 *   title: "My Blog",
 *   description: "Notes on software",
 *   lang: "en",
 *   author: "Ada",
 *   ogImage: "https://myblog.com/og.png",
 *   rss: { enabled: true, path: "/rss.xml", limit: 20 },
 *   seo: { noindex: false, canonical: true, openGraph: true, twitterCard: true, jsonLd: true },
 * });
 *
 * const seo = useSeoMeta({ title: "My Post", description: "A great post" });
 * // seo.site === "https://myblog.com", seo.html / seo.tags ready for <head>
 * ```
 */
export function defineSeoMetaConfig(config: SiteConfig): SiteConfig {
	assertSiteConfigSeo(config, "defineSeoMetaConfig");
	assertSiteConfigRss(config, "defineSeoMetaConfig");
	registeredSiteConfig = config;
	return config;
}

/**
 * Returns the registered site config, falling back to the bundled demo
 * defaults when {@link defineSeoMetaConfig} was never called.
 */
export function useSeoMetaConfig(): SiteConfig {
	return registeredSiteConfig ?? defaultSiteConfig;
}

/** Clears the registered config (restores the demo defaults). Useful in tests. */
export function useResetSeoMetaConfig(): void {
	registeredSiteConfig = null;
}

/**
 * Fail-fast guard for legacy `SiteConfig` inputs.
 *
 * `SiteConfig.seo` / `SiteConfig.rss` are required by the type, but JS
 * consumers can omit them at runtime — without this the code crashes later
 * with `Cannot read properties of undefined (reading 'noindex')`.
 * `nav` stays optional on purpose (copied by reference, never dereferenced).
 */
function assertSiteConfigSeo(config: SiteConfig, caller: string): void {
	if (config == null || typeof config !== "object") {
		throw new Error(
			`[Seo] SiteConfig is required (${caller} received ${config === null ? "null" : typeof config}).`,
		);
	}
	if ((config as SiteConfig).seo == null) {
		throw new Error(
			`[Seo] SiteConfig.seo is required (${caller}). Pass seo: { noindex, canonical, openGraph, twitterCard, jsonLd }.`,
		);
	}
}

function assertSiteConfigRss(config: SiteConfig, caller: string): void {
	if (config == null || typeof config !== "object") {
		throw new Error(
			`[Seo] SiteConfig is required (${caller} received ${config === null ? "null" : typeof config}).`,
		);
	}
	if ((config as SiteConfig).rss == null) {
		throw new Error(
			`[Seo] SiteConfig.rss is required (${caller}). Pass rss: { enabled, path, limit }.`,
		);
	}
}

/** Maps a {@link SiteConfig} into unified {@link UseSeoMetaOptions} site fields. */
function siteConfigToOpts(config: SiteConfig, caller = "siteConfigToOpts"): UseSeoMetaOptions {
	assertSiteConfigSeo(config, caller);
	return {
		site: config.site,
		siteTitle: config.title,
		lang: config.lang,
		author: config.author,
		ogImage: config.ogImage,
		description: config.description,
		twitterSite: config.twitter,
		rss: config.rss,
		seo: {
			noindex: config.seo.noindex,
			canonical: config.seo.canonical,
			openGraph: config.seo.openGraph,
			twitterCard: config.seo.twitterCard,
			jsonLd: config.seo.jsonLd,
		},
		nav: config.nav,
	};
}

function splitUseSeoMetaOptions(
	opts: UseSeoMetaOptions,
	defaults: SiteConfig,
): { config: SiteConfig; meta: SeoMetaInput } {
	assertSiteConfigSeo(defaults, "useSeoMeta(defaults)");
	assertSiteConfigRss(defaults, "useSeoMeta(defaults)");
	const { site, siteTitle, lang, rss, seo, nav, ...metaRest } = opts;

	const brand =
		siteTitle ??
		(typeof opts.ogSiteName === "string" ? opts.ogSiteName : undefined) ??
		defaults.title;

	const config: SiteConfig = {
		site: site ?? defaults.site,
		title: brand,
		description:
			(typeof metaRest.description === "string" ? metaRest.description : undefined) ??
			defaults.description,
		lang: lang ?? defaults.lang,
		author: (typeof metaRest.author === "string" ? metaRest.author : undefined) ?? defaults.author,
		ogImage:
			typeof metaRest.ogImage === "string" ? metaRest.ogImage : (defaults.ogImage ?? undefined),
		twitter: defaults.twitter,
		rss: {
			enabled: rss?.enabled ?? defaults.rss.enabled,
			path: rss?.path ?? defaults.rss.path,
			title: rss?.title ?? defaults.rss.title,
			description: rss?.description ?? defaults.rss.description,
			limit: rss?.limit ?? defaults.rss.limit,
		},
		seo: {
			noindex: seo?.noindex ?? defaults.seo.noindex,
			canonical: seo?.canonical ?? defaults.seo.canonical,
			openGraph: seo?.openGraph ?? defaults.seo.openGraph,
			twitterCard: seo?.twitterCard ?? defaults.seo.twitterCard,
			jsonLd: seo?.jsonLd ?? defaults.seo.jsonLd,
		},
		nav: nav ?? defaults.nav,
	};

	return { config, meta: { ...metaRest } };
}

/**
 * Applies tags from a {@link SeoTagResult} into `document.head` (Vanilla / SPA).
 * No-op when `document` is unavailable (SSR).
 */
export function useApplySeoTag(
	seo: SeoTagResult,
	head: ParentNode | null = typeof document !== "undefined" ? document.head : null,
): void {
	if (!head || typeof document === "undefined") return;

	for (const el of head.querySelectorAll("[data-katanakit-seo]")) {
		el.remove();
	}

	for (const node of seo.tags) {
		const el = document.createElement(node.tag);
		el.setAttribute("data-katanakit-seo", "");
		if (node.attrs) {
			for (const [key, value] of Object.entries(node.attrs)) {
				el.setAttribute(key, value);
			}
		}
		if (node.text !== undefined) {
			el.textContent = node.text;
		}
		head.appendChild(el);
	}
}

/** HTML string of meta tags (no RSS). Prefer {@link useSeoMeta}. */
export function useGenerateMetaTags(config: SiteConfig, meta: SeoMetaInput): string {
	assertSiteConfigSeo(config, "useGenerateMetaTags");
	assertSiteConfigRss(config, "useGenerateMetaTags");
	const { tags } = useSeoMeta({
		...siteConfigToOpts({ ...config, rss: { ...config.rss, enabled: false } }, "useGenerateMetaTags"),
		...meta,
	});
	return serializeSeoTags(tags.filter((t) => !(t.tag === "link" && t.attrs?.rel === "alternate")));
}

export function useTitle(config: SiteConfig, pageTitle?: string): string {
	if (config == null || typeof config !== "object") {
		throw new Error("[Seo] SiteConfig is required (useTitle received empty config).");
	}
	if (!pageTitle || pageTitle === config.title) {
		return `<title>${escapeHtml(config.title)}</title>`;
	}
	return `<title>${escapeHtml(`${pageTitle} | ${config.title}`)}</title>`;
}

export function useRssHeadLink(config: SiteConfig): string {
	assertSiteConfigRss(config, "useRssHeadLink");
	const node = buildRssTagNode(config);
	return node ? serializeSeoTag(node) : "";
}

/** Full `<head>` HTML (meta + RSS) from a flat {@link SeoMetaInput}. */
export function useHeadTags(config: SiteConfig, meta: SeoMetaInput): string {
	return useSeoMeta({ ...siteConfigToOpts(config, "useHeadTags"), ...meta }).html;
}

function mergeSeoDefaults(input: SeoMetaInput, config?: SiteConfig): SeoMetaInput {
	if (!config) return { ...input };

	const pageTitle = input.title ?? config.title;
	const siteSuffix = ` | ${config.title}`;
	const alreadySuffixed =
		typeof pageTitle === "string" && pageTitle !== config.title && pageTitle.endsWith(siteSuffix);
	const title =
		pageTitle === config.title || !pageTitle || alreadySuffixed
			? (pageTitle ?? config.title)
			: `${pageTitle} | ${config.title}`;

	const description = input.description ?? config.description;
	const url = input.ogUrl ?? input.canonical ?? input.url ?? config.site;
	const ogImage = input.ogImage ?? config.ogImage;

	const merged: SeoMetaInput = {
		...input,
		title,
		description,
		ogTitle: input.ogTitle ?? title,
		ogDescription: input.ogDescription ?? description,
		ogUrl: input.ogUrl ?? url,
		ogSiteName: input.ogSiteName ?? config.title,
		ogLocale: input.ogLocale ?? config.lang.replace("-", "_"),
		ogType: input.ogType ?? "website",
		author: input.author ?? config.author,
		canonical: input.canonical ?? (config.seo.canonical ? url : input.canonical),
		url,
	};

	if (ogImage !== undefined && ogImage !== null) {
		merged.ogImage = ogImage;
	}

	if (config.seo.noindex && merged.robots == null) {
		merged.robots = "noindex, nofollow";
	}

	if (!config.seo.openGraph) {
		for (const key of Object.keys(merged) as (keyof SeoMetaInput)[]) {
			if (String(key).startsWith("og") || String(key).startsWith("article")) {
				delete merged[key];
			}
		}
		merged.title = title;
		merged.description = description;
		merged.author = input.author ?? config.author;
		merged.canonical = input.canonical ?? (config.seo.canonical ? url : undefined);
	}

	return merged;
}

function resolveOgImageUrl(input: SeoMetaInput, config?: SiteConfig): string | undefined {
	const raw = input.ogImage ?? input.ogImageUrl ?? config?.ogImage;
	if (raw == null) return undefined;
	if (typeof raw === "string") {
		return absoluteUrl(raw, config?.site);
	}
	const first = Array.isArray(raw) ? raw[0] : raw;
	if (first && typeof first === "object" && "url" in first && first.url) {
		return absoluteUrl(String(first.url), config?.site);
	}
	return undefined;
}

function absoluteUrl(value: string, site?: string): string {
	if (value.startsWith("http://") || value.startsWith("https://")) return value;
	if (!site) return value;
	return `${site.replace(/\/$/, "")}${value.startsWith("/") ? value : `/${value}`}`;
}

// --- Flatten input → nodes ---

const NAME_KEYS = new Set(["description", "keywords", "author", "viewport", "robots"]);

const SKIP_KEYS = new Set([
	"url",
	"title",
	"canonical",
	"charset",
	"site",
	"siteTitle",
	"lang",
	"rss",
	"seo",
	"nav",
	"twitterCard",
	"twitterTitle",
	"twitterDescription",
	"twitterImage",
	"twitterImageAlt",
	"twitterSite",
	"twitterCreator",
]);

function flattenSeoMetaToTags(input: SeoMetaInput, config?: SiteConfig): SeoTagNode[] {
	const tags: SeoTagNode[] = [];

	if (input.charset) {
		tags.push({ tag: "meta", attrs: { charset: String(input.charset) } });
	}

	if (input.title != null && input.title !== "") {
		tags.push({ tag: "title", text: String(input.title) });
	}

	if (input.canonical) {
		tags.push({ tag: "link", attrs: { rel: "canonical", href: String(input.canonical) } });
	}

	for (const [key, raw] of Object.entries(input)) {
		if (raw === undefined || raw === null) continue;
		if (SKIP_KEYS.has(key)) continue;

		if (key === "ogImage") {
			tags.push(...flattenOgImage(raw, config));
			continue;
		}

		if (key === "robots") {
			const content = serializeRobots(raw as string | SeoRobotsObject);
			if (content) tags.push({ tag: "meta", attrs: { name: "robots", content } });
			continue;
		}

		if (key === "viewport" && typeof raw === "object") {
			const content = Object.entries(raw as Record<string, unknown>)
				.filter(([, v]) => v != null)
				.map(([k, v]) => `${camelToKebab(k)}=${v}`)
				.join(", ");
			if (content) tags.push({ tag: "meta", attrs: { name: "viewport", content } });
			continue;
		}

		if (Array.isArray(raw)) {
			for (const item of raw) {
				pushScalarMeta(tags, key, item);
			}
			continue;
		}

		pushScalarMeta(tags, key, raw);
	}

	if (config?.seo.twitterCard) {
		tags.push(...flattenTwitterCard(input, config));
	}

	return tags;
}

function pushScalarMeta(tags: SeoTagNode[], key: string, value: unknown): void {
	const content = String(value);
	if (NAME_KEYS.has(key)) {
		tags.push({ tag: "meta", attrs: { name: camelToMetaName(key), content } });
		return;
	}
	if (key.startsWith("og") || key.startsWith("article")) {
		tags.push({ tag: "meta", attrs: { property: camelToMetaProperty(key), content } });
		return;
	}
	tags.push({ tag: "meta", attrs: { name: camelToMetaName(key), content } });
}

function flattenOgImage(raw: unknown, config?: SiteConfig): SeoTagNode[] {
	const tags: SeoTagNode[] = [];
	const prop = "og:image";

	if (typeof raw === "string") {
		tags.push({
			tag: "meta",
			attrs: { property: prop, content: absoluteUrl(raw, config?.site) },
		});
		return tags;
	}

	const list = Array.isArray(raw) ? raw : [raw];
	for (const item of list) {
		if (!item || typeof item !== "object") continue;
		const obj = item as SeoOgImageObject;
		if (obj.url) {
			tags.push({
				tag: "meta",
				attrs: { property: prop, content: absoluteUrl(String(obj.url), config?.site) },
			});
		}
		if (obj.secureUrl) {
			tags.push({
				tag: "meta",
				attrs: { property: `${prop}:secure_url`, content: String(obj.secureUrl) },
			});
		}
		if (obj.type)
			tags.push({ tag: "meta", attrs: { property: `${prop}:type`, content: String(obj.type) } });
		if (obj.width != null) {
			tags.push({ tag: "meta", attrs: { property: `${prop}:width`, content: String(obj.width) } });
		}
		if (obj.height != null) {
			tags.push({ tag: "meta", attrs: { property: `${prop}:height`, content: String(obj.height) } });
		}
		if (obj.alt)
			tags.push({ tag: "meta", attrs: { property: `${prop}:alt`, content: String(obj.alt) } });
	}
	return tags;
}

function flattenTwitterCard(input: SeoMetaInput, config: SiteConfig): SeoTagNode[] {
	const image =
		input.twitterImage != null
			? absoluteUrl(input.twitterImage, config.site)
			: resolveOgImageUrl(input, config);
	const card = input.twitterCard ?? (image ? "summary_large_image" : "summary");
	const tags: SeoTagNode[] = [{ tag: "meta", attrs: { name: "twitter:card", content: card } }];
	const fields: [string, unknown][] = [
		["twitter:title", input.twitterTitle ?? input.ogTitle ?? input.title],
		["twitter:description", input.twitterDescription ?? input.ogDescription ?? input.description],
		["twitter:image", image],
		["twitter:image:alt", input.twitterImageAlt ?? input.ogImageAlt ?? resolveOgImageAlt(input)],
		["twitter:site", normalizeTwitterHandle(input.twitterSite ?? config.twitter)],
		["twitter:creator", normalizeTwitterHandle(input.twitterCreator)],
	];

	for (const [name, value] of fields) {
		if (value != null && value !== "") {
			tags.push({ tag: "meta", attrs: { name, content: String(value) } });
		}
	}
	return tags;
}

function resolveOgImageAlt(input: SeoMetaInput): string | undefined {
	const raw = input.ogImage;
	if (raw == null || typeof raw === "string") return undefined;
	const images = Array.isArray(raw) ? raw : [raw];
	return images.find((image) => image && typeof image === "object" && image.alt)?.alt;
}

function normalizeTwitterHandle(handle?: string | null): string | undefined {
	if (!handle) return undefined;
	return handle.startsWith("@") ? handle : `@${handle}`;
}

function serializeRobots(value: string | SeoRobotsObject): string {
	if (typeof value === "string") return value;
	const parts: string[] = [];
	const map: Record<string, string> = {
		index: "index",
		follow: "follow",
		noindex: "noindex",
		nofollow: "nofollow",
		none: "none",
		noarchive: "noarchive",
		nosnippet: "nosnippet",
	};
	for (const [k, directive] of Object.entries(map)) {
		if (truthy(value[k as keyof SeoRobotsObject])) parts.push(directive);
	}
	return parts.join(", ");
}

function truthy(v: unknown): boolean {
	return v === true || v === "true" || v === 1 || v === "1";
}

function camelToKebab(key: string): string {
	return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function camelToMetaName(key: string): string {
	return camelToKebab(key);
}

function camelToMetaProperty(key: string): string {
	const overrides: Record<string, string> = {
		ogSiteName: "og:site_name",
		ogImageSecureUrl: "og:image:secure_url",
	};
	if (overrides[key]) return overrides[key];

	if (key.startsWith("og")) {
		const rest = key.slice(2);
		return `og:${rest.replace(/([a-z0-9])([A-Z])/g, "$1:$2").toLowerCase()}`;
	}
	if (key.startsWith("article")) {
		const rest = key.slice("article".length);
		return `article:${rest.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()}`;
	}
	return camelToKebab(key);
}

function buildRssTagNode(config: SiteConfig): SeoTagNode | null {
	assertSiteConfigRss(config, "buildRssTagNode");
	if (!config.rss.enabled) return null;
	const path = config.rss.path ?? "/rss.xml";
	const title = config.rss.title ?? config.title;
	return {
		tag: "link",
		attrs: {
			rel: "alternate",
			type: "application/rss+xml",
			title,
			href: path,
		},
	};
}

function buildJsonLdFromInput(
	input: SeoMetaInput,
	config: SiteConfig,
): Record<string, unknown> | undefined {
	const url = String(input.ogUrl ?? input.canonical ?? input.url ?? config.site);

	if (input.ogType === "article") {
		return {
			"@context": "https://schema.org",
			"@type": "Article",
			headline: input.ogTitle ?? input.title,
			description: input.ogDescription ?? input.description ?? config.description,
			url,
			author: {
				"@type": "Person",
				name: input.articleAuthor?.[0] ?? input.author ?? config.author,
			},
			publisher: {
				"@type": "Organization",
				name: config.title,
			},
			datePublished: input.articlePublishedTime,
			dateModified: input.articleModifiedTime ?? input.articlePublishedTime,
			image: resolveOgImageUrl(input, config),
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": url,
			},
		};
	}

	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: config.title,
		description: config.description,
		url: config.site,
		author: {
			"@type": "Person",
			name: config.author,
		},
	};
}

function safeJsonLd(data: Record<string, unknown>): string {
	return JSON.stringify(data)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026");
}

function serializeSeoTags(tags: SeoTagNode[]): string {
	return tags.map(serializeSeoTag).join("\n");
}

function serializeSeoTag(node: SeoTagNode): string {
	if (node.tag === "title") {
		return `<title>${escapeHtml(node.text ?? "")}</title>`;
	}
	if (node.tag === "script") {
		return `<script${formatAttrs(node.attrs)}>${node.text ?? ""}</script>`;
	}
	if (node.tag === "meta" && node.attrs?.charset) {
		return `<meta charset="${escapeAttr(node.attrs.charset)}" />`;
	}
	return `<${node.tag}${formatAttrs(node.attrs)} />`;
}

function formatAttrs(attrs?: Record<string, string>): string {
	if (!attrs) return "";
	return Object.entries(attrs)
		.map(([key, value]) => ` ${key}="${escapeAttr(value)}"`)
		.join("");
}

function escapeHtml(text: string): string {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}
