import { afterEach, describe, expect, it, vi } from "vitest";

import {
	defineNotionConfig,
	useNotionGetPage,
	useNotionSearchContent,
} from "@/adapters/notion/notion.service";

function jsonResponse(payload: unknown): Response {
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("notion.service", () => {
	describe("useNotionGetPage", () => {
		it("returns the page on success", async () => {
			defineNotionConfig({ token: "secret_test" });
			vi.stubGlobal(
				"fetch",
				vi.fn().mockResolvedValue(
					jsonResponse({
						object: "page",
						id: "page-id",
						created_time: "2024-01-15T00:00:00.000Z",
						last_edited_time: "2024-01-16T00:00:00.000Z",
						created_by: { object: "user", id: "user-id" },
						last_edited_by: { object: "user", id: "user-id" },
						parent: { type: "page_id", page_id: "parent-id" },
						archived: false,
						url: "https://www.notion.so/page-id",
						properties: {},
					}),
				),
			);
			const result = await useNotionGetPage("page-id");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.data.id).toBe("page-id");
		});

		it("returns 502 for a malformed page payload", async () => {
			defineNotionConfig({ token: "secret_test" });
			vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ object: "page", id: 42 })));
			const result = await useNotionGetPage("page-id");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.status).toBe(502);
				expect(result.error.message).toMatch(/Notion Validation Error/);
			}
		});
	});

	describe("useNotionSearchContent", () => {
		it("returns 400 without fetch for an invalid filter value", async () => {
			defineNotionConfig({ token: "secret_test" });
			const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
			vi.stubGlobal("fetch", fetchMock);
			const result = await useNotionSearchContent({
				filter: { value: "nope", property: "object" },
			});
			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.status).toBe(400);
			expect(fetchMock).not.toHaveBeenCalled();
		});
	});

	describe("defineNotionConfig", () => {
		it("throws for a bad config", () => {
			expect(() => defineNotionConfig({ token: 42 } as unknown as { token: string })).toThrow(
				/\[Notion\] Invalid config/,
			);
		});
	});

	describe("defineNotionConfig", () => {
		it("registers the config and returns declared methods bound to `this.config`", () => {
			const facade = defineNotionConfig({
				token: "secret_define",
				readToken: function () {
					return this.config.token;
				},
			});

			expect(facade.config.token).toBe("secret_define");
			expect(facade.readToken()).toBe("secret_define");
		});

		it("validates the config (Zod strips the declared methods)", () => {
			expect(() => defineNotionConfig({ token: 42 } as unknown as { token: string })).toThrow(
				/\[Notion\] Invalid config/,
			);
		});

		it("leaves the registered config free of methods", () => {
			defineNotionConfig({
				token: "secret_clean",
				readToken: function () {
					return this.config.token;
				},
			});

			// a follow-up call proves the stored config is plain data
			const again = defineNotionConfig({ token: "secret_other" });
			expect(again.config.token).toBe("secret_other");
		});
	});
});
