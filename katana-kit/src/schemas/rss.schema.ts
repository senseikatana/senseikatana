import { z } from "zod";

/** A single item in an RSS feed. */
export const RssItemSchema = z.object({
	/** Title of the item. */
	title: z.string().min(1),
	/** Publication date (Date object or ISO string). */
	pubDate: z.union([z.string(), z.date()]),
	/** URL of the item (relative to site, e.g. "/blog/my-post/"). */
	link: z.string().min(1),
	/** Optional description or excerpt. */
	description: z.string().optional(),
	/** Optional full content (HTML allowed). */
	content: z.string().optional(),
	/** Optional categories/tags. */
	categories: z.array(z.string()).optional(),
	/** Optional author name. */
	author: z.string().optional(),
	/** Optional custom data (e.g. enclosure for podcasts). */
	customData: z.string().optional(),
});

/** Configuration for generating an RSS feed. */
export const RssConfigSchema = z.object({
	/** Title of the feed (e.g. "My Blog"). */
	title: z.string().min(1),
	/** Description of the feed. */
	description: z.string(),
	/** Base URL of the site (e.g. "https://example.com"). */
	site: z.string().min(1),
	/** Feed items. */
	items: z.array(RssItemSchema),
	/** Output path (default: "/rss.xml"). */
	xmlPath: z.string().optional(),
	/** Language code (default: "en"). */
	language: z.string().optional(),
	/** Custom XML to inject into the `<channel>` element. */
	customData: z.string().optional(),
	/** XSL stylesheet URL for browser rendering (optional). */
	xslUrl: z.string().optional(),
	/** Whether to include the `<lastBuildDate>` (default: true). */
	lastBuildDate: z.boolean().optional(),
	/** Trailing slash behavior for item links (default: true). */
	trailingSlash: z.boolean().optional(),
});
