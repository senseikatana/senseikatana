import type { SocialProviders } from "better-auth/social-providers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSocialProviders } from "@/adapters/better-auth/social-providers";

/**
 * The catalog Better Auth exposes at runtime is faked so assertions do not
 * depend on which vendors the installed peer version ships; `missingPeer`
 * reproduces a project where `better-auth` is not installed at all.
 */
const catalog = vi.hoisted(() => ({ missingPeer: false }));

vi.mock("better-auth/social-providers", () => ({
	get socialProviderList(): readonly string[] {
		if (catalog.missingPeer) throw new Error("module exploded");
		return ["github", "google", "discord", "tiktok"];
	},
}));

const google = { clientId: "id", clientSecret: "secret" };

describe("useSocialProviders", () => {
	beforeEach(() => {
		catalog.missingPeer = false;
	});

	describe("valid configurations", () => {
		it("returns the configuration untouched", async () => {
			const providers = { google, github: { clientId: "id", clientSecret: "secret" } };

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(true);
			expect(result.data).toBe(providers);
			expect(result.error).toBeNull();
		});

		it("accepts vendors identified by a clientKey instead of a clientId", async () => {
			const providers = { tiktok: { clientKey: "key", clientSecret: "secret" } };

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(true);
			expect(result.data).toBe(providers);
		});

		it("passes a thunk through without inspecting its credentials", async () => {
			// The real values only exist once Better Auth calls the thunk.
			const providers = { google: () => ({ clientId: "", clientSecret: "" }) } as SocialProviders;

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(true);
		});

		it("skips providers that are switched off", async () => {
			// TS still requires credentials for the vendor, hence the cast: a
			// disabled provider legitimately carries no configuration.
			const providers = { google: { enabled: false } } as SocialProviders;

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(true);
		});
	});

	describe("invalid configurations", () => {
		it("reports an empty client id as an unset environment variable", async () => {
			const result = await useSocialProviders({ google: { ...google, clientId: "" } });

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("google");
				expect(result.error.message).toContain("clientId is empty");
				expect(result.error.message).toContain("environment variable");
				expect(result.error.details).toEqual([
					{ provider: "google", problem: "clientId is empty (is its environment variable set?)" },
				]);
			}
		});

		it("reports an empty client secret", async () => {
			const result = await useSocialProviders({ github: { ...google, clientSecret: "   " } });

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("clientSecret is empty");
		});

		it("reports an empty client id array", async () => {
			const result = await useSocialProviders({ google: { ...google, clientId: [] } });

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("clientId is an empty array");
		});

		it("reports a configuration with no client identifier at all", async () => {
			// Reachable from JavaScript callers and from spread-out env config.
			const providers = { discord: { scope: ["identify"] } } as unknown as SocialProviders;

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("missing a client identifier");
		});

		it("rejects a provider id the installed Better Auth does not know", async () => {
			const result = await useSocialProviders({ gogle: google } as unknown as SocialProviders);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("unknown provider");
				// The message lists the vendors that do exist, so a typo is fixable.
				expect(result.error.message).toContain("google");
			}
		});

		it("collects every problem into a single message", async () => {
			const providers = {
				google: { ...google, clientId: "" },
				github: { ...google, clientSecret: "" },
			};

			const result = await useSocialProviders(providers);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("google");
				expect(result.error.message).toContain("github");
			}
		});

		it("rejects a non-object configuration", async () => {
			const result = await useSocialProviders(null as unknown as SocialProviders);

			expect(result.ok).toBe(false);
			if (!result.ok) expect(result.error.message).toContain("must be an object");
		});

		it("turns a failed catalog import into an actionable error", async () => {
			catalog.missingPeer = true;

			const result = await useSocialProviders({ google });

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error.message).toContain("bun add better-auth");
				expect(result.error.details).toBeInstanceOf(Error);
			}
		});
	});
});
