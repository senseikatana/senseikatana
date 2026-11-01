import { afterEach, describe, expect, it, vi } from "vitest";

import {
	useBuildYoutubeRssUrl,
	useGetChannelVideos,
	useGetChannelVideosRss,
	useGetUploadsPlaylistId,
	useGetVideoDetails,
	useGetYoutubeConfig,
	useInitYoutube,
	useParseIso8601Duration,
	useParseYoutubeRss,
} from "@/core/services/youtube.service";

const CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";
const PLAYLIST_ID = "UUxxxxxxxxxxxxxxxxxxxxxx";

function jsonResponse(payload: unknown): Response {
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

function textResponse(payload: string): Response {
	return new Response(payload, {
		status: 200,
		headers: { "Content-Type": "application/xml" },
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("youtube.service", () => {
	describe("useInitYoutube / useGetYoutubeConfig", () => {
		it("stores a local copy of the config", () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			const config = useGetYoutubeConfig();
			expect(config).toEqual({ apiKey: "key-123", channelId: CHANNEL_ID });
			config.apiKey = "mutated";
			expect(useGetYoutubeConfig().apiKey).toBe("key-123");
		});
	});

	describe("useParseIso8601Duration", () => {
		it("parses hours, minutes and seconds", () => {
			expect(useParseIso8601Duration("PT1H2M3S")).toBe(3723);
			expect(useParseIso8601Duration("PT15M33S")).toBe(933);
			expect(useParseIso8601Duration("PT45S")).toBe(45);
		});

		it("returns 0 for invalid input", () => {
			expect(useParseIso8601Duration("nope")).toBe(0);
			expect(useParseIso8601Duration("")).toBe(0);
		});
	});

	describe("useBuildYoutubeRssUrl", () => {
		it("builds the keyless channel feed URL", () => {
			expect(useBuildYoutubeRssUrl(CHANNEL_ID)).toBe(
				`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
			);
		});
	});

	describe("useParseYoutubeRss", () => {
		it("parses entries into normalized videos", () => {
			const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015">
<entry><yt:videoId>dQw4w9WgXcQ</yt:videoId><title>My &amp; talk</title><published>2024-01-15T00:00:00+00:00</published><author><name>Sensei</name></author><media:description>Desc</media:description></entry>
<entry><title>No id here</title></entry>
</feed>`;
			const videos = useParseYoutubeRss(xml);
			expect(videos).toHaveLength(1);
			expect(videos[0]?.id).toBe("dQw4w9WgXcQ");
			expect(videos[0]?.title).toBe("My & talk");
			expect(videos[0]?.embedUrl).toContain("youtube-nocookie.com/embed/dQw4w9WgXcQ");
			expect(videos[0]?.url).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		});
	});

	describe("useGetUploadsPlaylistId", () => {
		it("resolves the uploads playlist from channels.list", async () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			vi.stubGlobal(
				"fetch",
				vi.fn().mockResolvedValue(
					jsonResponse({
						items: [{ contentDetails: { relatedPlaylists: { uploads: PLAYLIST_ID } } }],
					}),
				),
			);
			const result = await useGetUploadsPlaylistId();
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.data).toBe(PLAYLIST_ID);
		});

		it("returns a config error without an API key", async () => {
			useInitYoutube({ apiKey: "", channelId: CHANNEL_ID });
			const result = await useGetUploadsPlaylistId();
			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toMatch(/API key is missing/);
		});
	});

	describe("useGetChannelVideos", () => {
		it("lists normalized videos via the uploads playlist", async () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			vi.stubGlobal(
				"fetch",
				vi.fn().mockImplementation((url: string) => {
					if (url.includes("/channels")) {
						return Promise.resolve(
							jsonResponse({
								items: [{ contentDetails: { relatedPlaylists: { uploads: PLAYLIST_ID } } }],
							}),
						);
					}
					return Promise.resolve(
						jsonResponse({
							nextPageToken: "NEXT",
							pageInfo: { totalResults: 1 },
							items: [
								{
									snippet: {
										title: "My talk",
										description: "Desc",
										publishedAt: "2024-01-15T00:00:00Z",
										channelTitle: "Sensei",
										resourceId: { videoId: "dQw4w9WgXcQ" },
									},
									contentDetails: { videoId: "dQw4w9WgXcQ" },
								},
							],
						}),
					);
				}),
			);
			const result = await useGetChannelVideos({ maxResults: 6 });
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.data.videos).toHaveLength(1);
				expect(result.data.videos[0]?.title).toBe("My talk");
				expect(result.data.nextPageToken).toBe("NEXT");
				expect(result.data.totalResults).toBe(1);
			}
		});

		it("skips the channels lookup when playlistId is known", async () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ items: [] }));
			vi.stubGlobal("fetch", fetchMock);
			const result = await useGetChannelVideos({ playlistId: PLAYLIST_ID });
			expect(result.ok).toBe(true);
			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(String(fetchMock.mock.calls[0]?.[0])).toContain("playlistItems");
		});
	});

	describe("useGetVideoDetails", () => {
		it("enriches videos with duration and views", async () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			vi.stubGlobal(
				"fetch",
				vi.fn().mockResolvedValue(
					jsonResponse({
						items: [
							{
								id: "dQw4w9WgXcQ",
								snippet: { title: "T", description: "D", publishedAt: "2024-01-15T00:00:00Z" },
								contentDetails: { duration: "PT15M33S" },
								statistics: { viewCount: "1234" },
							},
						],
					}),
				),
			);
			const result = await useGetVideoDetails(["dQw4w9WgXcQ"]);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.data[0]?.durationSeconds).toBe(933);
				expect(result.data[0]?.viewCount).toBe(1234);
			}
		});

		it("rejects empty or oversized id batches", async () => {
			useInitYoutube({ apiKey: "key-123", channelId: CHANNEL_ID });
			const empty = await useGetVideoDetails([]);
			expect(empty.ok).toBe(false);
		});
	});

	describe("useGetChannelVideosRss", () => {
		it("fetches and parses the keyless feed", async () => {
			useInitYoutube({ apiKey: "", channelId: CHANNEL_ID });
			vi.stubGlobal(
				"fetch",
				vi
					.fn()
					.mockResolvedValue(
						textResponse(
							`<feed><entry><yt:videoId>dQw4w9WgXcQ</yt:videoId><title>T</title><published>2024-01-15T00:00:00+00:00</published></entry></feed>`,
						),
					),
			);
			const result = await useGetChannelVideosRss();
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.data[0]?.id).toBe("dQw4w9WgXcQ");
		});
	});
});
