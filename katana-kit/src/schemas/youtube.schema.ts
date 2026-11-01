import { z } from "zod";

/** Config for the YouTube service. One GCP project serves all repos. */
export const YoutubeApiConfigSchema = z.object({
	/** YouTube Data API v3 key (server/build-time only, never public). */
	apiKey: z.string(),
	/** Default channel id (`UC…`). Per-call params can override it. */
	channelId: z.string(),
});

/** Params for `useGetChannelVideos`. */
export const YoutubeListParamsSchema = z.object({
	/** Channel id (defaults to the one from `useInitYoutube`). */
	channelId: z.string().min(1).optional(),
	/** Skip the channels lookup when the uploads playlist id is known. */
	playlistId: z.string().min(1).optional(),
	/** Items per page (1–50, defaults to `12`). */
	maxResults: z.number().int().min(1).max(50).optional(),
	/** Opaque page token from a previous response. */
	pageToken: z.string().min(1).optional(),
});

/** Resolution-keyed thumbnails (all derivable without an API key). */
export const YoutubeVideoThumbnailsSchema = z.object({
	default: z.string().min(1),
	medium: z.string().min(1),
	high: z.string().min(1),
});

/** Normalized video, enriched with player-ready URLs. */
export const YoutubeVideoNormalizedSchema = z.object({
	id: z.string().min(1),
	title: z.string(),
	description: z.string(),
	publishedAt: z.string(),
	channelTitle: z.string().optional(),
	thumbnails: YoutubeVideoThumbnailsSchema,
	/** `hqdefault` shortcut for posters/facades. */
	thumbnail: z.string().min(1),
	/** Watch URL. */
	url: z.string().min(1),
	/** Privacy-enhanced (`youtube-nocookie`) embed URL. */
	embedUrl: z.string().min(1),
	/** From `videos.list` (`contentDetails.duration`), in seconds. */
	durationSeconds: z.number().nonnegative().optional(),
	/** From `videos.list` (`statistics.viewCount`). */
	viewCount: z.number().nonnegative().optional(),
});

/** Paginated channel listing result. */
export const YoutubeVideoPageSchema = z.object({
	videos: z.array(YoutubeVideoNormalizedSchema),
	nextPageToken: z.string().optional(),
	prevPageToken: z.string().optional(),
	totalResults: z.number().nonnegative().optional(),
});

/* -------------------------------------------------------------------------- */
/* Raw API responses (runtime validation boundary)                            */
/* -------------------------------------------------------------------------- */

const optionalThumbnail = z.object({ url: z.string().optional() }).optional();

/** Minimal `channels.list` shape (only what the service reads). */
export const YoutubeChannelsResponseSchema = z.object({
	items: z
		.array(
			z.object({
				contentDetails: z
					.object({
						relatedPlaylists: z.object({ uploads: z.string().optional() }).optional(),
					})
					.optional(),
			}),
		)
		.optional(),
});

/** Minimal `playlistItems.list` shape (only what the service reads). */
export const YoutubePlaylistItemsResponseSchema = z.object({
	nextPageToken: z.string().optional(),
	prevPageToken: z.string().optional(),
	pageInfo: z.object({ totalResults: z.number().optional() }).optional(),
	items: z
		.array(
			z.object({
				snippet: z
					.object({
						title: z.string().optional(),
						description: z.string().optional(),
						publishedAt: z.string().optional(),
						channelTitle: z.string().optional(),
						resourceId: z.object({ videoId: z.string().optional() }).optional(),
						thumbnails: z
							.object({
								default: optionalThumbnail,
								medium: optionalThumbnail,
								high: optionalThumbnail,
							})
							.optional(),
					})
					.optional(),
				contentDetails: z.object({ videoId: z.string().optional() }).optional(),
			}),
		)
		.optional(),
});

/** Minimal `videos.list` shape (only what the service reads). */
export const YoutubeVideosResponseSchema = z.object({
	items: z
		.array(
			z.object({
				id: z.string().optional(),
				snippet: z
					.object({
						title: z.string().optional(),
						description: z.string().optional(),
						publishedAt: z.string().optional(),
						channelTitle: z.string().optional(),
					})
					.optional(),
				contentDetails: z.object({ duration: z.string().optional() }).optional(),
				statistics: z.object({ viewCount: z.string().optional() }).optional(),
			}),
		)
		.optional(),
});
