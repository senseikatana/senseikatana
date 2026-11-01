import { describe, expect, it, vi } from "vitest";

import { useBetterAuthProvider } from "@/adapters/better-auth/better-auth.provider";

/**
 * A stand-in for the Better Auth server instance. Only `api.getSession` is
 * touched, which is the whole point of the adapter being thin.
 */
function serverResolving(session: unknown | (() => never)) {
	const getSession = vi.fn(async () => {
		if (typeof session === "function") session();
		return session;
	});
	return { server: { api: { getSession } } as never, getSession };
}

const user = { id: "u_1", email: "a@b.c", emailVerified: true };

describe("useBetterAuthProvider", () => {
	it("declares the provider id it is registered under", () => {
		const { server } = serverResolving(null);
		expect(useBetterAuthProvider(server).provider).toBe("better-auth");
	});

	it("resolves a session into a principal", async () => {
		const { server } = serverResolving({ user });
		const result = await useBetterAuthProvider(server).useResolve(new Request("https://app.test"));

		expect(result).toEqual({
			data: {
				subject: "u_1",
				provider: "better-auth",
				method: "session",
				email: "a@b.c",
				emailVerified: true,
			},
			error: null,
			ok: true,
		});
	});

	it("treats no session as an anonymous visitor", async () => {
		const { server } = serverResolving(null);
		const result = await useBetterAuthProvider(server).useResolve(new Request("https://app.test"));

		expect(result).toEqual({ data: null, error: null, ok: true });
	});

	it("derives the method from a bearer header", async () => {
		const { server } = serverResolving({ user });
		const request = new Request("https://app.test", {
			headers: { authorization: "Bearer tok" },
		});

		expect((await useBetterAuthProvider(server).useResolve(request)).data?.method).toBe("bearer");
	});

	it("derives the method from a cookie session", async () => {
		const { server } = serverResolving({ user });
		const request = new Request("https://app.test", {
			headers: { cookie: "better-auth.session=abc" },
		});

		expect((await useBetterAuthProvider(server).useResolve(request)).data?.method).toBe("cookie");
	});

	it("honours the fallback method when the request carries no credential", async () => {
		const { server } = serverResolving({ user });
		const provider = useBetterAuthProvider(server, { method: "custom" });

		expect((await provider.useResolve(new Request("https://app.test"))).data?.method).toBe("custom");
	});

	it("lets the deployment read a different subject claim", async () => {
		const { server } = serverResolving({
			user: { ...user, employeeNumber: "emp-77" },
		});
		const provider = useBetterAuthProvider(server, {
			// A directory keyed by employee number, not by the provider's user id.
			useSubject: (session) =>
				(session as { user?: { employeeNumber?: string } }).user?.employeeNumber,
		});

		expect((await provider.useResolve(new Request("https://app.test"))).data?.subject).toBe("emp-77");
	});

	it("falls back to the user id when the override yields nothing", async () => {
		const { server } = serverResolving({ user });
		const provider = useBetterAuthProvider(server, { useSubject: () => null });

		expect((await provider.useResolve(new Request("https://app.test"))).data?.subject).toBe("u_1");
	});

	it("reports a session that resolved without a user id", async () => {
		const { server } = serverResolving({ user: {} });
		const result = await useBetterAuthProvider(server).useResolve(new Request("https://app.test"));

		expect(result.ok).toBe(false);
		expect(result.error?.message).toContain("without a user id");
	});

	it("reports a provider failure rather than flattening it to anonymous", async () => {
		const { server } = serverResolving(() => {
			throw new Error("better-auth is down");
		});
		const result = await useBetterAuthProvider(server).useResolve(new Request("https://app.test"));

		expect(result.ok).toBe(false);
		expect(result.error?.message).toContain("could not resolve the session");
	});

	it("omits email fields when the session has none", async () => {
		const { server } = serverResolving({ user: { id: "u_1" } });
		const data = (await useBetterAuthProvider(server).useResolve(new Request("https://app.test")))
			.data;

		expect(data).not.toHaveProperty("email");
	});

	it("accepts a bare Headers object as well as a Request", async () => {
		const { server } = serverResolving({ user });

		expect((await useBetterAuthProvider(server).useResolve(new Headers())).ok).toBe(true);
	});
});
