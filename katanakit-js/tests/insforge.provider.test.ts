import { describe, expect, it, vi } from "vitest";

import type { InsforgeAuthClientLike } from "@/adapters/insforge/insforge.provider";
import { useInsforgeAuthProvider } from "@/adapters/insforge/insforge.provider";

const options = { baseUrl: "https://demo.insforge.app", anonKey: "anon" };

function clientReturning(
	user: { id: string; email?: string; emailVerified?: boolean; providers?: string[] } | null,
	error: unknown = null,
) {
	const setAccessToken = vi.fn();
	const client: InsforgeAuthClientLike = {
		setAccessToken,
		auth: {
			getCurrentUser: vi.fn(async () => ({ data: user ? { user } : null, error })),
		},
	};
	return { client, setAccessToken };
}

function providerFor(client: InsforgeAuthClientLike) {
	return useInsforgeAuthProvider({
		...options,
		useClientFor: () => client,
	});
}

const withToken = () =>
	new Request("https://app.test/api", { headers: { authorization: "Bearer tok_1" } });

describe("useInsforgeAuthProvider", () => {
	it("declares the provider id it is registered under", () => {
		expect(providerFor(clientReturning(null).client).provider).toBe("insforge");
	});

	it("resolves a user from the bearer token", async () => {
		const { client } = clientReturning({
			id: "u_9",
			email: "a@b.c",
			emailVerified: true,
			providers: ["google"],
		});

		const result = await providerFor(client).useResolve(withToken());

		expect(result).toEqual({
			data: {
				subject: "u_9",
				provider: "insforge",
				method: "google",
				email: "a@b.c",
				emailVerified: true,
			},
			error: null,
			ok: true,
		});
	});

	it("reports the method InsForge recorded rather than guessing it", async () => {
		const { client } = clientReturning({ id: "u_9", providers: ["password"] });

		expect((await providerFor(client).useResolve(withToken())).data?.method).toBe("password");
	});

	it("falls back to 'session' when InsForge records no provider", async () => {
		const { client } = clientReturning({ id: "u_9" });

		expect((await providerFor(client).useResolve(withToken())).data?.method).toBe("session");
	});

	it("treats an unauthenticated request as anonymous without calling the backend", async () => {
		const { client, setAccessToken } = clientReturning({ id: "u_9" });
		const result = await providerFor(client).useResolve(new Request("https://app.test/api"));

		expect(result).toEqual({ data: null, error: null, ok: true });
		expect(setAccessToken).not.toHaveBeenCalled();
	});

	it("treats a rejected token as anonymous, not as a failure", async () => {
		const { client } = clientReturning(null, { message: "Unauthorized" });
		const result = await providerFor(client).useResolve(withToken());

		expect(result).toEqual({ data: null, error: null, ok: true });
	});

	it("treats a 200 with no user as anonymous", async () => {
		const { client } = clientReturning(null);

		expect((await providerFor(client).useResolve(withToken())).data).toBeNull();
	});

	it("reports a backend failure so it is not mistaken for anonymous", async () => {
		const client: InsforgeAuthClientLike = {
			setAccessToken: vi.fn(),
			auth: {
				getCurrentUser: vi.fn(async () => {
					throw new Error("ECONNREFUSED");
				}),
			},
		};

		const result = await providerFor(client).useResolve(withToken());

		expect(result.ok).toBe(false);
		expect(result.error?.message).toContain("getCurrentUser failed");
	});

	it("reports a failure to build the client instead of leaking the peer error", async () => {
		const provider = useInsforgeAuthProvider({
			...options,
			useClientFor: () => {
				throw new Error("@insforge/sdk is not installed");
			},
		});

		const result = await provider.useResolve(withToken());

		expect(result.ok).toBe(false);
		expect(result.error?.message).toContain("could not build an auth client");
	});

	it("gives every request its own client so one token cannot overwrite another", async () => {
		const seen: InsforgeAuthClientLike[] = [];
		const provider = useInsforgeAuthProvider({
			...options,
			useClientFor: () => {
				const client = clientReturning({ id: "u_9" }).client;
				seen.push(client);
				return client;
			},
		});

		await provider.useResolve(withToken());
		await provider.useResolve(withToken());

		// Two clients, not one mutated twice — the reason `useClientFor` exists.
		expect(seen).toHaveLength(2);
		expect(seen[0]).not.toBe(seen[1]);
	});

	it("omits email fields entirely when InsForge has none", async () => {
		const { client } = clientReturning({ id: "u_9" });
		const data = (await providerFor(client).useResolve(withToken())).data;

		expect(data).not.toHaveProperty("email");
		expect(data).not.toHaveProperty("emailVerified");
	});
});
