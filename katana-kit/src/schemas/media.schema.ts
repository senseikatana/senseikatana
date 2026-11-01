import { z } from "zod";

/** Where a media source comes from. `file` = direct mp4/webm (native `<video>`). */
export const MediaProviderSchema = z.enum(["youtube", "vimeo", "file", "unknown"]);

/** Normalized media source: provider + stable id or direct src. */
export const MediaSourceSchema = z.object({
	provider: MediaProviderSchema,
	/** Video id for youtube/vimeo, full URL for `file`. */
	id: z.string().min(1),
	/** Original input (URL or bare id). */
	raw: z.string(),
});

/** Options for the YouTube nocookie embed URL. */
export const YoutubeEmbedOptionsSchema = z.object({
	/** Start time in seconds. */
	start: z.number().nonnegative().optional(),
	/** End time in seconds. */
	end: z.number().nonnegative().optional(),
	/** Autoplay on iframe creation (facade clicks pass `1`). */
	autoplay: z.boolean().optional(),
	/** Extra `playerVars` merged into the query string. */
	params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

/** Thumbnail quality for `i.ytimg.com`. */
export const YoutubeThumbnailQualitySchema = z.enum([
	"default",
	"mqdefault",
	"hqdefault",
	"sddefault",
	"maxresdefault",
]);

/** Input for `useBuildVideoEmbed` (core) — one `src`, unified output. */
export const SmartVideoOptionsSchema = z.object({
	/** YouTube URL/id, Vimeo URL/id, or direct `.mp4`/`.webm` URL. */
	src: z.string().min(1),
	/** Accessible title. Used as `<iframe title>` / `<video aria-label>`. */
	title: z.string().min(1),
	/** Optional `<figcaption>` text. */
	caption: z.string().optional(),
	/** Poster for native `<video>` or facade thumbnail override. */
	poster: z.string().optional(),
	/** Extra CSS class on the `<figure>` wrapper. */
	className: z.string().optional(),
	/** Aspect ratio box: `16/9` (default) or `4/3`, `1/1`, `9/16`. */
	aspect: z.string().optional(),
	/** Render the click-to-play facade for embeds (no heavy iframe on load). */
	facade: z.boolean().optional(),
	/** YouTube player options (only for `youtube` provider). */
	youtube: YoutubeEmbedOptionsSchema.optional(),
});
