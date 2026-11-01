import { afterEach, describe, expect, it } from "vitest";

import {
	type AstroContextLike,
	useRequireCapability as useAstroGuard,
} from "@/adapters/astro/access.guard";
import {
	type NextGuardOptions,
	useRequireCapability as useNextGuard,
} from "@/adapters/next/access.guard";
import {
	type NuxtGuardOptions,
	type NuxtRouteLike,
	useRequireCapability as useNuxtGuard,
} from "@/adapters/nuxt/access.guard";
import { useResetRoles } from "@/core/services/access.service";
import type { AccessSubject } from "@/types/index";

/** Rank 0, so the hierarchical strategy grants it every registered capability. */
const owner: AccessSubject = { id: 1, roles: ["owner"] };

/** Rank 5 with no capabilities: the anonymous-equivalent authenticated subject. */
const guest: AccessSubject = { id: 2, roles: ["guest"] };

/** A slug nobody registered — `useCan` throws on it, which must fail closed. */
const unknown: AccessSubject = { id: 3, roles: ["role_that_does_not_exist"] };

const route: NuxtRouteLike = { path: "/admin", fullPath: "/admin?tab=orders" };

function astroContext(path = "/admin"): AstroContextLike {
	return {
		locals: {},
		url: new URL(`https://example.com${path}`),
		redirect: (location: string, status = 302) =>
			new Response(null, { status, headers: { Location: location } }),
	};
}

afterEach(() => {
	useResetRoles();
});

describe("astro guard", () => {
	const next = () => new Response("rendered", { status: 200 });

	it("continues when the subject holds the capability", async () => {
		const guard = useAstroGuard("content:publish", () => owner);
		const response = await guard(astroContext(), next);

		expect(await response.text()).toBe("rendered");
	});

	it("answers 401 for an anonymous request", async () => {
		const guard = useAstroGuard("content:publish", () => null);
		const response = await guard(astroContext(), next);

		expect(response.status).toBe(401);
		expect(await response.json()).toEqual({
			ok: false,
			data: null,
			error: { message: "Authentication required", status: 401 },
		});
	});

	it("answers 403 naming the missing capability", async () => {
		const guard = useAstroGuard("content:publish", () => guest);
		const response = await guard(astroContext(), next);

		expect(response.status).toBe(403);
		expect(await response.json()).toEqual({
			ok: false,
			data: null,
			error: { message: "Missing capability: content:publish", status: 403 },
		});
	});

	it("fails closed on an unknown role instead of throwing", async () => {
		const guard = useAstroGuard("content:publish", () => unknown);
		const response = await guard(astroContext(), next);

		expect(response.status).toBe(403);
	});

	it("redirects anonymous visitors when a destination is configured", async () => {
		const guard = useAstroGuard("content:publish", () => null, {
			redirectTo: "/login",
			forbiddenTo: "/403",
		});
		const response = await guard(astroContext(), next);

		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/login");
	});

	it("sends an unauthorized subject to the forbidden page, not to sign-in", async () => {
		const guard = useAstroGuard("content:publish", () => guest, {
			redirectTo: "/login",
			forbiddenTo: "/403",
		});
		const response = await guard(astroContext(), next);

		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/403");
	});
});

describe("next guard", () => {
	const request = new Request("https://example.com/admin");

	async function call(
		guard: ReturnType<typeof useNextGuard>,
	): Promise<{ status: number; body: unknown; location: string | null }> {
		const response = await guard(request);
		// A handler that returns `undefined` is the proxy's "continue to the route".
		if (response === undefined) return { status: 200, body: "continued", location: null };
		const text = await response.text();
		return {
			status: response.status,
			body: text ? JSON.parse(text) : null,
			location: response.headers.get("location"),
		};
	}

	it("returns undefined so the request continues to the route", async () => {
		const guard = useNextGuard("content:publish", () => owner);
		expect(await call(guard)).toEqual({ status: 200, body: "continued", location: null });
	});

	it("answers 401 for an anonymous request", async () => {
		const guard = useNextGuard("content:publish", () => null);
		const result = await call(guard);

		expect(result.status).toBe(401);
		expect(result.body).toEqual({
			ok: false,
			data: null,
			error: { message: "Authentication required", status: 401 },
		});
	});

	it("answers 403 naming the missing capability", async () => {
		const guard = useNextGuard("content:publish", () => guest);
		const result = await call(guard);

		expect(result.status).toBe(403);
		expect(result.body).toEqual({
			ok: false,
			data: null,
			error: { message: "Missing capability: content:publish", status: 403 },
		});
	});

	it("fails closed on an unknown role instead of throwing", async () => {
		const guard = useNextGuard("content:publish", () => unknown);
		expect((await call(guard)).status).toBe(403);
	});

	it("redirects and lets the caller pick the status", async () => {
		const options: NextGuardOptions = {
			redirectTo: "/login",
			forbiddenTo: "/403",
			redirectStatus: 307,
		};
		const anonymous = await call(useNextGuard("content:publish", () => null, options));
		const denied = await call(useNextGuard("content:publish", () => guest, options));

		expect(anonymous).toEqual({ status: 307, body: null, location: "/login" });
		expect(denied).toEqual({ status: 307, body: null, location: "/403" });
	});
});

describe("nuxt guard", () => {
	it("returns undefined so the navigation continues", () => {
		const guard = useNuxtGuard("content:publish", () => owner);
		expect(guard(route, route)).toBeUndefined();
	});

	it("aborts the navigation when no destination is configured", () => {
		const anonymous = useNuxtGuard("content:publish", () => null);
		const denied = useNuxtGuard("content:publish", () => guest);

		expect(anonymous(route, route)).toBe(false);
		expect(denied(route, route)).toBe(false);
	});

	it("navigates to the configured destinations", () => {
		const options: NuxtGuardOptions = { redirectTo: "/login", forbiddenTo: "/403" };
		const anonymous = useNuxtGuard("content:publish", () => null, options);
		const denied = useNuxtGuard("content:publish", () => guest, options);

		expect(anonymous(route, route)).toEqual({ path: "/login" });
		expect(denied(route, route)).toEqual({ path: "/403" });
	});

	it("fails closed on an unknown role instead of throwing", () => {
		const guard = useNuxtGuard("content:publish", () => unknown, { forbiddenTo: "/403" });
		expect(guard(route, route)).toEqual({ path: "/403" });
	});
});
