import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { useParseSmartVideoOptions } from "@/core/services/media.service";
import { useValidate } from "@/core/services/validation.service";
import { useGetUploadsPlaylistId, useInitYoutube } from "@/core/services/youtube.service";
import {
	AiMessageSchema,
	AiRoleSchema,
	AiToolCallSchema,
	ApiErrorSchema,
	LogLevelSchema,
	RssConfigSchema,
	RssItemSchema,
	SmartVideoOptionsSchema,
	YoutubeListParamsSchema,
	YoutubeVideoNormalizedSchema,
} from "@/schemas/index.js";

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("useValidate", () => {
	it("returns typed data on success", () => {
		const result = useValidate(z.object({ name: z.string() }), { name: "katana" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.data).toEqual({ name: "katana" });
	});

	it("returns a Validation Error Safe Result on failure", () => {
		const result = useValidate(z.object({ age: z.number() }), { age: "old" });
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error.message).toMatch(/Validation Error/);
			expect(result.error.message).toContain("age");
			expect(result.status).toBe(400);
			expect(result.data).toBeNull();
		}
	});
});

describe("schemas", () => {
	it("accepts valid SmartVideoOptions and rejects missing src/title", () => {
		expect(
			useValidate(SmartVideoOptionsSchema, {
				src: "https://youtu.be/dQw4w9WgXcQ",
				title: "Talk",
			}).ok,
		).toBe(true);
		const bad = useParseSmartVideoOptions({ src: "", title: "" });
		expect(bad.ok).toBe(false);
		if (!bad.ok) expect(bad.error.message).toContain("src");
	});

	it("accepts RSS items with string or Date pubDate", () => {
		const base = { title: "Post", link: "/blog/post/", description: "Excerpt" };
		expect(useValidate(RssItemSchema, { ...base, pubDate: "2024-01-15" }).ok).toBe(true);
		expect(useValidate(RssItemSchema, { ...base, pubDate: new Date() }).ok).toBe(true);
		expect(useValidate(RssItemSchema, { ...base }).ok).toBe(false);
		expect(
			useValidate(RssConfigSchema, {
				title: "Blog",
				description: "Feed",
				site: "https://example.com",
				items: [],
			}).ok,
		).toBe(true);
	});

	it("validates OpenAI-compatible wire shapes", () => {
		expect(AiRoleSchema.safeParse("assistant").success).toBe(true);
		expect(AiRoleSchema.safeParse("robot").success).toBe(false);
		expect(
			useValidate(AiMessageSchema, {
				role: "assistant",
				content: "hi",
				tool_calls: [{ id: "1", type: "function", function: { name: "f", arguments: "{}" } }],
			}).ok,
		).toBe(true);
		expect(useValidate(AiToolCallSchema, { id: "1", type: "other" }).ok).toBe(false);
	});

	it("rejects out-of-range YouTube page sizes and validates normalized videos", () => {
		expect(useValidate(YoutubeListParamsSchema, { maxResults: 51 }).ok).toBe(false);
		expect(useValidate(YoutubeListParamsSchema, { maxResults: 12 }).ok).toBe(true);
		expect(
			useValidate(YoutubeVideoNormalizedSchema, {
				id: "dQw4w9WgXcQ",
				title: "T",
				description: "D",
				publishedAt: "2024-01-15T00:00:00Z",
				thumbnails: {
					default: "a",
					medium: "b",
					high: "c",
				},
				thumbnail: "c",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0",
			}).ok,
		).toBe(true);
	});

	it("validates error and level unions", () => {
		expect(useValidate(ApiErrorSchema, { message: "x", status: 500 }).ok).toBe(true);
		expect(useValidate(LogLevelSchema, "verbose").ok).toBe(false);
	});
});

describe("youtube.service runtime validation", () => {
	it("rejects malformed channels.list payloads with a 502", async () => {
		useInitYoutube({ apiKey: "key-123", channelId: "UCxxxxxxxxxxxxxxxxxxxxxx" });
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ items: "not-an-array" }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				}),
			),
		);
		const result = await useGetUploadsPlaylistId();
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.status).toBe(502);
			expect(result.error.message).toMatch(/unexpected channels\.list/);
		}
	});
});
