import { describe, expect, it, vi } from "vitest";

import type { IAuthProvider } from "@/core/services/auth.service";
import { AuthService, useBearerToken, useResolveSubject } from "@/core/services/auth.service";
import type { Principal } from "@/schemas/identity.schema";

const principal: Principal = {
	subject: "u_1",
	provider: "stub",
	method: "password",
	email: "a@b.c",
};

function stubProvider(overrides: Partial<IAuthProvider> = {}): IAuthProvider {
	return {
		provider: "stub",
		methods: ["password"],
		async useResolve() {
			return { data: principal, error: null, ok: true };
		},
		...overrides,
	};
}

const request = () => new Request("https://app.test/api", { method: "GET" });

describe("AuthService", () => {
	describe("useRegister", () => {
		it("resolves through a registered provider", async () => {
			const auth = AuthService.create();
			auth.useRegister(stubProvider());

			const result = await auth.useResolve("stub", request());

			expect(result.ok).toBe(true);
			expect(result.data?.subject).toBe("u_1");
		});

		it("replaces a provider registered twice under the same id", async () => {
			const auth = AuthService.create();
			auth.useRegister(stubProvider());
			auth.useRegister(
				stubProvider({
					async useResolve() {
						return { data: null, error: null, ok: true };
					},
				}),
			);

			expect(auth.useProviders()).toEqual(["stub"]);
			expect((await auth.useResolve("stub", request())).data).toBeNull();
		});

		it("fails on an unknown provider rather than reporting anonymous", async () => {
			const auth = AuthService.create();
			const result = await auth.useResolve("typo", request());

			expect(result.ok).toBe(false);
			expect(result.error?.message).toContain('unknown provider "typo"');
		});

		it("lists what a failed lookup could have used", async () => {
			const auth = AuthService.create();
			auth.useRegister(stubProvider());

			expect((await auth.useResolve("nope", request())).error?.message).toContain("stub");
		});

		it("forgets an unregistered provider", () => {
			const auth = AuthService.create();
			auth.useRegister(stubProvider());

			expect(auth.useHas("stub")).toBe(true);
			expect(auth.useUnregister("stub")).toBe(true);
			expect(auth.useHas("stub")).toBe(false);
			expect(auth.useUnregister("stub")).toBe(false);
		});
	});

	describe("anonymous vs broken", () => {
		it("treats an anonymous answer as a success with null data", async () => {
			const auth = AuthService.create();
			auth.useRegister(
				stubProvider({
					async useResolve() {
						return { data: null, error: null, ok: true };
					},
				}),
			);

			const result = await auth.useResolve("stub", request());

			expect(result).toEqual({ data: null, error: null, ok: true });
		});

		it("keeps a provider failure observable instead of flattening it to anonymous", async () => {
			const auth = AuthService.create();
			auth.useRegister(
				stubProvider({
					async useResolve() {
						return {
							data: null,
							error: { message: "provider unreachable", status: 503 },
							ok: false,
						};
					},
				}),
			);

			const result = await auth.useResolve("stub", request());

			expect(result.ok).toBe(false);
			expect(result.error?.status).toBe(503);
		});
	});
});

describe("useResolveSubject", () => {
	it("builds a subject carrying the id, roles and how they authenticated", async () => {
		const auth = AuthService.create();
		auth.useRegister(stubProvider());

		const result = await useResolveSubject("stub", request(), () => ["editor"], auth);

		expect(result.ok).toBe(true);
		expect(result.data).toMatchObject({
			id: "u_1",
			roles: ["editor"],
			provider: "stub",
			method: "password",
		});
	});

	it("returns no subject for an anonymous visitor", async () => {
		const auth = AuthService.create();
		auth.useRegister(
			stubProvider({
				async useResolve() {
					return { data: null, error: null, ok: true };
				},
			}),
		);

		expect((await useResolveSubject("stub", request(), () => ["owner"], auth)).data).toBeNull();
	});

	it("keeps an authenticated user with no roles distinguishable from anonymous", async () => {
		const auth = AuthService.create();
		auth.useRegister(stubProvider());

		const result = await useResolveSubject("stub", request(), () => [], auth);

		// Not anonymous — a real subject with an empty role list, so the route
		// answers 403 rather than 401 and the UX differs.
		expect(result.data).not.toBeNull();
		expect(result.data?.roles).toEqual([]);
	});

	it("awaits an async role lookup", async () => {
		const auth = AuthService.create();
		auth.useRegister(stubProvider());

		const result = await useResolveSubject("stub", request(), async () => ["admin"], auth);

		expect(result.data?.roles).toEqual(["admin"]);
	});

	it("reports a failed role lookup instead of defaulting to no roles", async () => {
		const auth = AuthService.create();
		auth.useRegister(stubProvider());

		const result = await useResolveSubject(
			"stub",
			request(),
			() => {
				throw new Error("directory unreachable");
			},
			auth,
		);

		expect(result.ok).toBe(false);
		expect(result.error?.message).toContain("role lookup failed");
	});

	it("propagates a provider failure without calling the role lookup", async () => {
		const auth = AuthService.create();
		const useRoles = vi.fn(() => ["owner"]);
		auth.useRegister(
			stubProvider({
				async useResolve() {
					return { data: null, error: { message: "down" }, ok: false };
				},
			}),
		);

		const result = await useResolveSubject("stub", request(), useRoles, auth);

		expect(result.ok).toBe(false);
		expect(useRoles).not.toHaveBeenCalled();
	});
});

describe("useBearerToken", () => {
	it("reads a bearer token", () => {
		expect(useBearerToken(new Headers({ authorization: "Bearer abc123" }))).toBe("abc123");
	});

	it("is case-insensitive on the scheme and the header", () => {
		expect(useBearerToken(new Headers({ Authorization: "bearer abc123" }))).toBe("abc123");
	});

	it("returns null for a missing header", () => {
		expect(useBearerToken(new Headers())).toBeNull();
	});

	it("returns null for a scheme it does not recognise", () => {
		expect(useBearerToken(new Headers({ authorization: "Basic abc123" }))).toBeNull();
	});

	it("returns null for an empty token rather than an empty string", () => {
		expect(useBearerToken(new Headers({ authorization: "Bearer " }))).toBeNull();
		expect(useBearerToken(new Headers({ authorization: "Bearer    " }))).toBeNull();
	});

	it("reads through a Request", () => {
		expect(
			useBearerToken(new Request("https://app.test", { headers: { authorization: "Bearer t" } })),
		).toBe("t");
	});

	it("reads through a bare { headers } object", () => {
		expect(useBearerToken({ headers: new Headers({ authorization: "Bearer t" }) })).toBe("t");
	});
});
