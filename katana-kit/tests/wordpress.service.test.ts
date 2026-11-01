import { afterEach, describe, expect, it, vi } from "vitest";

import {
	defineWordPressConfig,
	useWpCreatePost,
	useWpGetPosts,
} from "@/adapters/wordpress/wordpress.service";

function jsonResponse(payload: unknown): Response {
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("wordpress.service", () => {
	it("lists posts and returns titles", async () => {
		defineWordPressConfig({ baseUrl: "https://example.com" });
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(jsonResponse([{ id: 1, title: { rendered: "Hello World" } }])),
		);
		const result = await useWpGetPosts({ per_page: 5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.data[0]?.title?.rendered).toBe("Hello World");
	});

	it("rejects malformed list payloads with 502", async () => {
		defineWordPressConfig({ baseUrl: "https://example.com" });
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ items: "nope" })));
		const result = await useWpGetPosts();
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.status).toBe(502);
	});

	it("rejects array items with wrong types with 502", async () => {
		defineWordPressConfig({ baseUrl: "https://example.com" });
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse([{ id: "nan" }])));
		const result = await useWpGetPosts();
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.status).toBe(502);
	});

	it("rejects create post without title with 400 and no fetch", async () => {
		defineWordPressConfig({ baseUrl: "https://example.com" });
		const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
		vi.stubGlobal("fetch", fetchMock);
		const result = await useWpCreatePost({ content: "No title" } as never);
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.status).toBe(400);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("throws on invalid init config", () => {
		expect(() => defineWordPressConfig({} as never)).toThrow();
	});
});

describe("defineWordPressConfig", () => {
	it("registers the config and returns declared methods bound to `this.config`", () => {
		const facade = defineWordPressConfig({
			baseUrl: "https://example.com",
			readBase: function () {
				return this.config.baseUrl;
			},
		});

		expect(facade.config.baseUrl).toBe("https://example.com");
		expect(facade.readBase()).toBe("https://example.com");
	});

	it("validates the config", () => {
		expect(() => defineWordPressConfig({ baseUrl: 42 } as unknown as { baseUrl: string })).toThrow(
			/\[WordPress\] Invalid config/,
		);
	});

	it("registers so the rest of the service works without a separate init", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify([{ id: 1, title: { rendered: "Hi" } }]), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				}),
			),
		);

		defineWordPressConfig({ baseUrl: "https://example.com" });
		const result = await useWpGetPosts();
		expect(result.ok).toBe(true);
	});
});
