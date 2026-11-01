import {
	YoutubeChannelsResponseSchema,
	YoutubePlaylistItemsResponseSchema,
	YoutubeVideosResponseSchema,
} from "@/schemas/youtube.schema.js";
import type {
	FetchResult,
	YoutubeApiConfig,
	YoutubeListParams,
	YoutubeVideoNormalized,
	YoutubeVideoPage,
} from "@/types/index.js";

import { defineApiConfig, useGet } from "./http.service.js";
import { useBuildYoutubeEmbedUrl, useBuildYoutubeThumbnail } from "./media.service.js";
import { useValidate } from "./validation.service.js";

/** Registry key for the YouTube Data API v3. */
const YOUTUBE_API_NAME = "youtube";
/** Registry key for the public channel RSS feed (no key needed). */
const YOUTUBE_FEED_API_NAME = "youtubeFeed";
const YOUTUBE_BASE_URI = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_FEED_BASE_URI = "https://www.youtube.com";

/**
 * YoutubeService — Singleton facade over the YouTube Data API v3 and the
 * keyless channel RSS feed.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link YoutubeService.getInstance}, so the registered API config and the
 * default channel are shared process-wide) and the **Facade** pattern: each
 * public method hides registry keys, HTTP calls, schema validation and video
 * normalization behind one call returning a Safe Result.
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
 * level `use*` functions below are thin wrappers kept for call-site ergonomics.
 *
 * @example
 * ```ts
 * import { useGetChannelVideos, useInitYoutube } from "katanakit-js";
 *
 * useInitYoutube({ apiKey: process.env.YOUTUBE_API_KEY!, channelId: "UC…" });
 * const page = await useGetChannelVideos({ maxResults: 6 });
 * ```
 */
export class YoutubeService {
	private static instance: YoutubeService;

	/** Module-scoped config. One GCP project serves every repo. */
	private config: YoutubeApiConfig = { apiKey: "", channelId: "" };

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): YoutubeService {
		if (!YoutubeService.instance) {
			YoutubeService.instance = new YoutubeService();
		}
		return YoutubeService.instance;
	}

	/**
	 * Decodes the five XML entities found in YouTube RSS feeds.
	 *
	 * @param value - Raw XML text.
	 * @returns Decoded text.
	 */
	private decodeXmlEntities(value: string): string {
		return value
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
			.replace(/&#39;/g, "'")
			.replace(/&amp;/g, "&");
	}

	/**
	 * Returns a config-error Safe Result when the API key is missing.
	 *
	 * @param message - Human-readable hint.
	 * @returns Error result with `status: 0`.
	 */
	private configError(message: string): FetchResult<never> {
		return { data: null, error: { message, status: 0 }, url: "", status: 0, ok: false };
	}

	/**
	 * Hydrates a normalized video with player-ready URLs.
	 *
	 * @param video - Core fields.
	 * @returns Full {@link YoutubeVideoNormalized}.
	 */
	private hydrateVideo(video: {
		id: string;
		title: string;
		description: string;
		publishedAt: string;
		channelTitle?: string;
		thumbnails?: { default?: string; medium?: string; high?: string };
		durationSeconds?: number;
		viewCount?: number;
	}): YoutubeVideoNormalized {
		const thumbnails = {
			default: video.thumbnails?.default ?? useBuildYoutubeThumbnail(video.id, "default"),
			medium: video.thumbnails?.medium ?? useBuildYoutubeThumbnail(video.id, "mqdefault"),
			high: video.thumbnails?.high ?? useBuildYoutubeThumbnail(video.id, "hqdefault"),
		};
		return {
			id: video.id,
			title: video.title,
			description: video.description,
			publishedAt: video.publishedAt,
			channelTitle: video.channelTitle,
			thumbnails,
			thumbnail: thumbnails.high,
			url: `https://www.youtube.com/watch?v=${video.id}`,
			embedUrl: useBuildYoutubeEmbedUrl(video.id),
			durationSeconds: video.durationSeconds,
			viewCount: video.viewCount,
		};
	}

	/**
	 * Registers the YouTube APIs (`youtube` + keyless `youtubeFeed`) and
	 * stores the default channel. Call once per app, server/build-time —
	 * the API key must never ship to the browser.
	 *
	 * @param config - API key + default channel id.
	 *
	 * @example
	 * ```ts
	 * useInitYoutube({ apiKey: process.env.YOUTUBE_API_KEY!, channelId: "UC…" });
	 * const page = await useGetChannelVideos({ maxResults: 6 });
	 * ```
	 */
	useInitYoutube(config: YoutubeApiConfig): void {
		this.config = { ...config };
		defineApiConfig({
			[YOUTUBE_API_NAME]: {
				baseUri: YOUTUBE_BASE_URI,
				endpoints: {
					channels: "/channels",
					playlistItems: "/playlistItems",
					videos: "/videos",
				},
				defaultQueryParams: {
					channels: { key: config.apiKey },
					playlistItems: { key: config.apiKey },
					videos: { key: config.apiKey },
				},
			},
			[YOUTUBE_FEED_API_NAME]: {
				baseUri: YOUTUBE_FEED_BASE_URI,
				endpoints: { channelFeed: "/feeds/videos.xml" },
			},
		});
	}

	/**
	 * Returns a shallow copy of the YouTube config (safe to mutate locally).
	 *
	 * @returns The current `{ apiKey, channelId }`.
	 */
	useGetYoutubeConfig(): YoutubeApiConfig {
		return { ...this.config };
	}

	/**
	 * Builds the public channel RSS feed URL. Needs no API key and
	 * costs zero quota — ideal for "latest videos" widgets.
	 *
	 * @param channelId - Channel id (`UC…`).
	 * @returns Feed URL.
	 */
	useBuildYoutubeRssUrl(channelId: string): string {
		const url = new URL("https://www.youtube.com/feeds/videos.xml");
		url.searchParams.set("channel_id", channelId);
		return url.toString();
	}

	/**
	 * Parses an ISO 8601 duration (`PT1H2M3S`) into seconds.
	 * Pure and SSR-safe.
	 *
	 * @param input - Duration string from `contentDetails.duration`.
	 * @returns Total seconds (`0` for invalid input).
	 */
	useParseIso8601Duration(input: string): number {
		const match =
			/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(
				input.trim(),
			);
		if (!match) return 0;
		const [
			,
			years = "0",
			months = "0",
			weeks = "0",
			days = "0",
			hours = "0",
			minutes = "0",
			seconds = "0",
		] = match;
		return (
			Number(years) * 31_556_952 +
			Number(months) * 2_629_746 +
			Number(weeks) * 604_800 +
			Number(days) * 86_400 +
			Number(hours) * 3600 +
			Number(minutes) * 60 +
			Math.floor(Number(seconds))
		);
	}

	/**
	 * Resolves a channel id to its `uploads` playlist id (quota cost: 1 unit).
	 * Prefer passing `playlistId` to `useGetChannelVideos` to skip this call.
	 *
	 * @param channelId - Channel id (defaults to the configured one).
	 * @returns Safe Result with the uploads playlist id.
	 */
	async useGetUploadsPlaylistId(channelId = this.config.channelId): Promise<FetchResult<string>> {
		if (!this.config.apiKey) {
			return this.configError(
				"Config Error: YouTube API key is missing. Call useInitYoutube({ apiKey, channelId }) first.",
			);
		}
		if (!channelId) {
			return this.configError(
				"Config Error: channelId is missing. Pass it explicitly or via useInitYoutube.",
			);
		}
		const result = await useGet<unknown>(YOUTUBE_API_NAME, "channels", {
			query: { part: "contentDetails", id: channelId },
		});
		if (!result.ok) {
			return { data: null, error: result.error, url: result.url, status: result.status, ok: false };
		}
		const parsed = useValidate(YoutubeChannelsResponseSchema, result.data);
		if (!parsed.ok) {
			return {
				data: null,
				error: {
					message: "YouTube Error: unexpected channels.list shape.",
					status: 502,
					details: parsed.error.details,
				},
				url: result.url,
				status: 502,
				ok: false,
			};
		}
		const playlistId = parsed.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? "";
		if (!playlistId) {
			return {
				data: null,
				error: {
					message: "YouTube Error: uploads playlist not found for this channel.",
					status: 404,
				},
				url: result.url,
				status: 404,
				ok: false,
			};
		}
		return { data: playlistId, error: null, url: result.url, status: result.status, ok: true };
	}

	/**
	 * Lists channel videos via the quota-cheap path
	 * (`channels` → `playlistItems`, never `search.list` which costs 100 units).
	 * Call server/build-time and cache the response (1h) to share quota
	 * across every repo using the same GCP project.
	 *
	 * @param params - Channel/playlist, page size (1–50) and page token.
	 * @returns Safe Result with normalized videos + pagination.
	 */
	async useGetChannelVideos(params: YoutubeListParams = {}): Promise<FetchResult<YoutubeVideoPage>> {
		if (!this.config.apiKey) {
			return this.configError(
				"Config Error: YouTube API key is missing. Call useInitYoutube({ apiKey, channelId }) first.",
			);
		}
		let playlistId = params.playlistId ?? "";
		if (!playlistId) {
			const resolved = await this.useGetUploadsPlaylistId(params.channelId);
			if (!resolved.ok) {
				return {
					data: null,
					error: resolved.error,
					url: resolved.url,
					status: resolved.status,
					ok: false,
				};
			}
			playlistId = resolved.data;
		}
		const maxResults = Math.min(50, Math.max(1, params.maxResults ?? 12));
		const query: Record<string, string | number | undefined> = {
			part: "snippet,contentDetails",
			playlistId,
			maxResults,
			pageToken: params.pageToken,
		};
		const result = await useGet<unknown>(YOUTUBE_API_NAME, "playlistItems", {
			query,
		});
		if (!result.ok) {
			return { data: null, error: result.error, url: result.url, status: result.status, ok: false };
		}
		const parsed = useValidate(YoutubePlaylistItemsResponseSchema, result.data);
		if (!parsed.ok) {
			return {
				data: null,
				error: {
					message: "YouTube Error: unexpected playlistItems.list shape.",
					status: 502,
					details: parsed.error.details,
				},
				url: result.url,
				status: 502,
				ok: false,
			};
		}
		const videos: YoutubeVideoNormalized[] = [];
		for (const item of parsed.data.items ?? []) {
			const id = item.snippet?.resourceId?.videoId ?? item.contentDetails?.videoId ?? "";
			if (!id) continue;
			videos.push(
				this.hydrateVideo({
					id,
					title: item.snippet?.title ?? "",
					description: item.snippet?.description ?? "",
					publishedAt: item.snippet?.publishedAt ?? "",
					channelTitle: item.snippet?.channelTitle,
					thumbnails: {
						default: item.snippet?.thumbnails?.default?.url,
						medium: item.snippet?.thumbnails?.medium?.url,
						high: item.snippet?.thumbnails?.high?.url,
					},
				}),
			);
		}
		return {
			data: {
				videos,
				nextPageToken: parsed.data.nextPageToken,
				prevPageToken: parsed.data.prevPageToken,
				totalResults: parsed.data.pageInfo?.totalResults,
			},
			error: null,
			url: result.url,
			status: result.status,
			ok: true,
		};
	}

	/**
	 * Enriches videos with duration and view count (`videos.list`, 1 unit).
	 *
	 * @param ids - Up to 50 video ids.
	 * @returns Safe Result with enriched videos.
	 */
	async useGetVideoDetails(ids: string[]): Promise<FetchResult<YoutubeVideoNormalized[]>> {
		if (!this.config.apiKey) {
			return this.configError(
				"Config Error: YouTube API key is missing. Call useInitYoutube({ apiKey, channelId }) first.",
			);
		}
		if (ids.length === 0 || ids.length > 50) {
			return {
				data: null,
				error: { message: "Validation Error: pass between 1 and 50 video ids.", status: 400 },
				url: "",
				status: 400,
				ok: false,
			};
		}
		const result = await useGet<unknown>(YOUTUBE_API_NAME, "videos", {
			query: { part: "snippet,contentDetails,statistics", id: ids.join(",") },
		});
		if (!result.ok) {
			return { data: null, error: result.error, url: result.url, status: result.status, ok: false };
		}
		const parsed = useValidate(YoutubeVideosResponseSchema, result.data);
		if (!parsed.ok) {
			return {
				data: null,
				error: {
					message: "YouTube Error: unexpected videos.list shape.",
					status: 502,
					details: parsed.error.details,
				},
				url: result.url,
				status: 502,
				ok: false,
			};
		}
		const videos = (parsed.data.items ?? [])
			.filter((item) => Boolean(item.id))
			.map((item) =>
				this.hydrateVideo({
					id: String(item.id),
					title: item.snippet?.title ?? "",
					description: item.snippet?.description ?? "",
					publishedAt: item.snippet?.publishedAt ?? "",
					channelTitle: item.snippet?.channelTitle,
					durationSeconds: item.contentDetails?.duration
						? this.useParseIso8601Duration(item.contentDetails.duration)
						: undefined,
					viewCount: item.statistics?.viewCount ? Number(item.statistics.viewCount) : undefined,
				}),
			);
		return { data: videos, error: null, url: result.url, status: result.status, ok: true };
	}

	/**
	 * Parses a YouTube channel RSS feed (`feeds/videos.xml`) into normalized
	 * videos. Pure and SSR-safe — no network, no DOM parser.
	 *
	 * @param xml - Raw feed XML.
	 * @returns Normalized videos (newest first, as served by the feed).
	 */
	useParseYoutubeRss(xml: string): YoutubeVideoNormalized[] {
		const videos: YoutubeVideoNormalized[] = [];
		const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;
		let entry: RegExpExecArray | null;
		while ((entry = entryPattern.exec(xml)) !== null) {
			const body = entry[1] ?? "";
			const pick = (pattern: RegExp): string => {
				const match = pattern.exec(body);
				return match?.[1] ? this.decodeXmlEntities(match[1].trim()) : "";
			};
			const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
			if (!id) continue;
			videos.push(
				this.hydrateVideo({
					id,
					title: pick(/<title>([\s\S]*?)<\/title>/),
					description: pick(/<media:description>([\s\S]*?)<\/media:description>/),
					publishedAt: pick(/<published>([^<]+)<\/published>/),
					channelTitle: pick(/<author>\s*<name>([\s\S]*?)<\/name>/) || undefined,
				}),
			);
		}
		return videos;
	}

	/**
	 * Fetches the keyless channel RSS feed and parses it. Zero quota,
	 * limited to the latest ~15 videos with basic metadata.
	 *
	 * @param channelId - Channel id (defaults to the configured one).
	 * @returns Safe Result with normalized videos.
	 */
	async useGetChannelVideosRss(
		channelId = this.config.channelId,
	): Promise<FetchResult<YoutubeVideoNormalized[]>> {
		if (!channelId) {
			return this.configError(
				"Config Error: channelId is missing. Pass it explicitly or via useInitYoutube.",
			);
		}
		const result = await useGet<string>(YOUTUBE_FEED_API_NAME, "channelFeed", {
			query: { channel_id: channelId },
		});
		if (!result.ok) {
			return { data: null, error: result.error, url: result.url, status: result.status, ok: false };
		}
		const xml = typeof result.data === "string" ? result.data : "";
		if (!xml) {
			return {
				data: null,
				error: { message: "YouTube Error: empty channel feed.", status: 502 },
				url: result.url,
				status: 502,
				ok: false,
			};
		}
		return {
			data: this.useParseYoutubeRss(xml),
			error: null,
			url: result.url,
			status: result.status,
			ok: true,
		};
	}
}

/** Registers the YouTube APIs and stores the default channel. @see {@link YoutubeService.useInitYoutube} */
export function useInitYoutube(config: YoutubeApiConfig): void {
	YoutubeService.getInstance().useInitYoutube(config);
}

/** Returns a shallow copy of the YouTube config. @see {@link YoutubeService.useGetYoutubeConfig} */
export function useGetYoutubeConfig(): YoutubeApiConfig {
	return YoutubeService.getInstance().useGetYoutubeConfig();
}

/** Builds the public channel RSS feed URL. @see {@link YoutubeService.useBuildYoutubeRssUrl} */
export function useBuildYoutubeRssUrl(channelId: string): string {
	return YoutubeService.getInstance().useBuildYoutubeRssUrl(channelId);
}

/** Parses an ISO 8601 duration into seconds. @see {@link YoutubeService.useParseIso8601Duration} */
export function useParseIso8601Duration(input: string): number {
	return YoutubeService.getInstance().useParseIso8601Duration(input);
}

/** Resolves a channel id to its uploads playlist id. @see {@link YoutubeService.useGetUploadsPlaylistId} */
export async function useGetUploadsPlaylistId(
	channelId = YoutubeService.getInstance().useGetYoutubeConfig().channelId,
): Promise<FetchResult<string>> {
	return YoutubeService.getInstance().useGetUploadsPlaylistId(channelId);
}

/** Lists channel videos via the quota-cheap path. @see {@link YoutubeService.useGetChannelVideos} */
export async function useGetChannelVideos(
	params: YoutubeListParams = {},
): Promise<FetchResult<YoutubeVideoPage>> {
	return YoutubeService.getInstance().useGetChannelVideos(params);
}

/** Enriches videos with duration and view count. @see {@link YoutubeService.useGetVideoDetails} */
export async function useGetVideoDetails(
	ids: string[],
): Promise<FetchResult<YoutubeVideoNormalized[]>> {
	return YoutubeService.getInstance().useGetVideoDetails(ids);
}

/** Parses a YouTube channel RSS feed into normalized videos. @see {@link YoutubeService.useParseYoutubeRss} */
export function useParseYoutubeRss(xml: string): YoutubeVideoNormalized[] {
	return YoutubeService.getInstance().useParseYoutubeRss(xml);
}

/** Fetches and parses the keyless channel RSS feed. @see {@link YoutubeService.useGetChannelVideosRss} */
export async function useGetChannelVideosRss(
	channelId = YoutubeService.getInstance().useGetYoutubeConfig().channelId,
): Promise<FetchResult<YoutubeVideoNormalized[]>> {
	return YoutubeService.getInstance().useGetChannelVideosRss(channelId);
}
