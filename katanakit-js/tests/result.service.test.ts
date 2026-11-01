import { describe, expect, it } from "vitest";

import { useAttempt, useTryJsonParse } from "@/core/services/result.service";

describe("useAttempt", () => {
	it("wraps a resolved value", async () => {
		const result = await useAttempt(async () => 21 * 2);

		expect(result).toEqual({ data: 42, error: null, ok: true });
	});

	it("normalizes thrown SDK-style errors", async () => {
		const result = await useAttempt(() => {
			throw Object.assign(new Error("boom"), { statusCode: 503, details: { retry: true } });
		});

		expect(result.ok).toBe(false);
		expect(result).toMatchObject({
			error: { message: "boom", status: 503, details: { retry: true } },
		});
	});

	it("supports custom error mappers", async () => {
		const result = await useAttempt(
			() => {
				throw new Error("nope");
			},
			() => ({ message: "mapped", status: 418 }),
		);

		expect(result).toMatchObject({ error: { message: "mapped", status: 418 }, ok: false });
	});
});

describe("useTryJsonParse", () => {
	it("parses valid JSON", () => {
		expect(useTryJsonParse<{ a: number }>('{"a":1}')).toEqual({
			data: { a: 1 },
			error: null,
			ok: true,
		});
	});

	it("returns a Safe Result for invalid JSON", () => {
		const result = useTryJsonParse("{ broken");

		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(0);
	});
});
