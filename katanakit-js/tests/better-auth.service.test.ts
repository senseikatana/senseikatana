import type { Auth } from "better-auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	useAstroAuthLocals,
	useAuthHandler,
	useAuthSession,
} from "@/adapters/better-auth/better-auth.service";
import { useAuthClient } from "@/adapters/better-auth/client";

vi.mock("better-auth/client", () => ({
	createAuthClient: vi.fn((options?: unknown) => ({ framework: "vanilla", options })),
}));
vi.mock("better-auth/vue", () => ({
	createAuthClient: vi.fn((options?: unknown) => ({ framework: "vue", options })),
}));

const user = { id: "user_1", email: "ada@example.com" } as never;
const session = { id: "sess_1", userId: "user_1" } as never;

function fakeAuth(getSession: () => unknown): Auth {
	return {
		api: { getSession },
		handler: async () => new Response("ok", { status: 200 }),
	} as unknown as Auth;
}

function tag(value: unknown): { framework?: string } {
	return value as { framework?: string };
}

describe("Better Auth adapter", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("useAuthSession", () => {
		it("returns the session for an authenticated request", async () => {
			const auth = fakeAuth(async () => ({ user, session }));
			const request = new Request("https://example.com/api/auth/get-session");

			const result = await useAuthSession(auth, request);

			expect(result.ok).toBe(true);
			expect(result.data?.user).toBe(user);
			expect(result.data?.session).toBe(session);
		});

		it("accepts bare Headers", async () => {
			const auth = fakeAuth(async () => null);
			const headers = new Headers({ cookie: "session=abc" });

			const result = await useAuthSession(auth, headers);

			expect(result.ok).toBe(true);
			expect(result.data).toBeNull();
		});

		it("treats an anonymous visitor as success, not an error", async () => {
			const auth = fakeAuth(async () => null);

			const result = await useAuthSession(auth, new Request("https://example.com"));

			expect(result).toEqual({ data: null, error: null, ok: true });
		});

		it("never throws when the API fails", async () => {
			const auth = fakeAuth(async () => {
				throw new Error("connection reset");
			});

			const result = await useAuthSession(auth, new Request("https://example.com"));

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("getSession failed");
				expect(result.error.message).toContain("connection reset");
			}
		});
	});

	describe("useAuthHandler", () => {
		it("returns the handler response", async () => {
			const auth = fakeAuth(async () => null);

			const result = await useAuthHandler(auth, new Request("https://example.com/api/auth"));

			expect(result.ok).toBe(true);
			expect(result.data?.status).toBe(200);
		});

		it("wraps handler failures", async () => {
			const auth = {
				handler: async () => {
					throw new Error("boom");
				},
			} as unknown as Auth;

			const result = await useAuthHandler(auth, new Request("https://example.com"));

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("handler failed");
		});
	});

	describe("useAstroAuthLocals", () => {
		it("maps a session to { user, session }", async () => {
			const auth = fakeAuth(async () => ({ user, session }));

			const result = await useAstroAuthLocals(auth, new Request("https://example.com"));

			expect(result.ok).toBe(true);
			expect(result.data).toEqual({ user, session });
		});

		it("nulls both fields for anonymous visitors", async () => {
			const auth = fakeAuth(async () => null);

			const result = await useAstroAuthLocals(auth, new Request("https://example.com"));

			expect(result.ok).toBe(true);
			expect(result.data).toEqual({ user: null, session: null });
		});

		it("propagates a failed session lookup", async () => {
			const auth = fakeAuth(async () => {
				throw new Error("nope");
			});

			const result = await useAstroAuthLocals(auth, new Request("https://example.com"));

			expect(result.ok).toBe(false);
		});
	});

	describe("useAuthClient", () => {
		it("creates the vanilla client by default", async () => {
			const result = await useAuthClient();

			expect(result.ok).toBe(true);
			expect(tag(result.data).framework).toBe("vanilla");
		});

		it("loads the requested framework entry", async () => {
			const result = await useAuthClient({ framework: "vue", baseURL: "https://auth.example.com" });

			expect(result.ok).toBe(true);
			expect(tag(result.data).framework).toBe("vue");
			expect(result.ok && (result.data as { options?: { baseURL?: string } }).options?.baseURL).toBe(
				"https://auth.example.com",
			);
		});

		it("turns a failed import into an actionable error", async () => {
			const vanilla = await import("better-auth/client");
			vi.mocked(vanilla.createAuthClient).mockImplementationOnce(() => {
				throw new Error("module exploded");
			});

			const result = await useAuthClient();

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("bun add better-auth");
				expect(result.error.details).toBeInstanceOf(Error);
			}
		});
	});
});
