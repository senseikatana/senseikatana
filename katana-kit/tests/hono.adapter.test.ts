import { afterEach, describe, expect, it, vi } from "vitest";

import { useCreateApp, useRequireCapability, useSafeJson } from "@/adapters/hono/index";
import { useResetRoles } from "@/core/services/access.service";
import type { AccessSubject, FetchResult } from "@/types/index";

/** App with a guarded route; the subject is fixed per test. */
function appWithGuard(subject: AccessSubject | null) {
	const app = useCreateApp();
	app.get(
		"/admin",
		useRequireCapability("content:publish", () => subject),
		(context) => context.json({ ok: true }),
	);
	return app;
}

/** App whose only route returns the given Safe Result through `useSafeJson`. */
function appWithResult(result: FetchResult<unknown>, fallbackStatus = 500) {
	const app = useCreateApp();
	app.get("/data", (context) => useSafeJson(context, result, fallbackStatus));
	return app;
}

afterEach(() => {
	useResetRoles();
	vi.unstubAllEnvs();
});

describe("useCreateApp", () => {
	it("serves /health with the toolkit JSON shape", async () => {
		const response = await useCreateApp().request("/health");

		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ status: "ok" });
	});

	it("can disable the health route", async () => {
		const response = await useCreateApp({ health: false }).request("/health");
		expect(response.status).toBe(404);
	});

	it("answers unknown routes with the safe-result 404 body", async () => {
		const response = await useCreateApp().request("/nope");

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({
			ok: false,
			data: null,
			error: { message: "Not Found", status: 404 },
		});
	});

	it("applies CORS for the configured origins", async () => {
		const response = await useCreateApp({ corsOrigins: ["https://example.com"] }).request("/health", {
			headers: { Origin: "https://example.com" },
		});

		expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://example.com");
	});

	it("reads CORS origins from the environment when no options are given", async () => {
		vi.stubEnv("CORS_ORIGINS", "https://one.dev, https://two.dev");

		const response = await useCreateApp().request("/health", {
			headers: { Origin: "https://two.dev" },
		});

		expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://two.dev");
	});

	it("mounts user routes", async () => {
		const app = useCreateApp();
		app.get("/custom", (context) => context.json({ ok: true }));

		const response = await app.request("/custom");

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
	});
});

describe("useRequireCapability", () => {
	it("rejects anonymous requests with 401", async () => {
		const response = await appWithGuard(null).request("/admin");

		expect(response.status).toBe(401);
		expect(await response.json()).toMatchObject({
			ok: false,
			error: { message: "Authentication required", status: 401 },
		});
	});

	it("rejects authenticated subjects without the capability with 403", async () => {
		const response = await appWithGuard({ id: 3, roles: ["member"] }).request("/admin");

		expect(response.status).toBe(403);
		expect(await response.json()).toMatchObject({
			ok: false,
			error: { message: "Missing capability: content:publish", status: 403 },
		});
	});

	it("lets subjects whose role grants the capability through", async () => {
		const response = await appWithGuard({ id: 5, roles: ["owner"] }).request("/admin");

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
	});

	it("fails closed when the subject is malformed", async () => {
		const response = await appWithGuard({ id: 9 } as unknown as AccessSubject).request("/admin");

		expect(response.status).toBe(403);
	});
});

describe("useSafeJson", () => {
	const okResult: FetchResult<{ name: string }> = {
		ok: true,
		data: { name: "pikachu" },
		error: null,
		url: "https://pokeapi.co/api/v2/pokemon/25",
		status: 200,
	};

	it("returns the Safe Result with 200 on success", async () => {
		const response = await appWithResult(okResult).request("/data");

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(okResult);
	});

	it("echoes upstream HTTP error statuses", async () => {
		const failed: FetchResult<unknown> = {
			ok: false,
			data: null,
			error: { message: "HTTP Error: Not Found", status: 404 },
			url: "https://pokeapi.co/api/v2/pokemon/99999",
			status: 404,
		};

		const response = await appWithResult(failed).request("/data");

		expect(response.status).toBe(404);
		expect(await response.json()).toEqual(failed);
	});

	it("falls back to 500 for network errors without a status", async () => {
		const failed: FetchResult<unknown> = {
			ok: false,
			data: null,
			error: { message: "Network Error: fetch failed", status: 0 },
			url: "",
			status: 0,
		};

		const response = await appWithResult(failed).request("/data");

		expect(response.status).toBe(500);
	});

	it("honors a custom fallback status", async () => {
		const failed: FetchResult<unknown> = {
			ok: false,
			data: null,
			error: { message: "Network Error: fetch failed", status: 0 },
			url: "",
			status: 0,
		};

		const response = await appWithResult(failed, 502).request("/data");

		expect(response.status).toBe(502);
	});
});
