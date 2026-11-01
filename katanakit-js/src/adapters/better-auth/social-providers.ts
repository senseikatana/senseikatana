import type { SocialProviderList, SocialProviders } from "better-auth/social-providers";

import type { AuthResult } from "./client.js";

export type { SocialProviderList, SocialProviders };

/**
 * Ids Better Auth ships a social provider for — `"google"`, `"github"`,
 * `"discord"`, … whatever the installed version of `better-auth` supports.
 * Derived from Better Auth's own catalog, so it grows when the peer does.
 */
export type SocialProviderId = SocialProviderList[number];

/** One rejected provider, kept in `error.details` for structured reporting. */
interface ProviderIssue {
	provider: string;
	problem: string;
}

/**
 * Validates a `socialProviders` configuration before it reaches `betterAuth()`.
 *
 * Better Auth resolves social providers lazily, so a wrong credential normally
 * surfaces as an opaque `invalid_client` while a visitor clicks "sign in with
 * Google". This helper moves that failure to startup: an empty environment
 * variable, a provider id the installed Better Auth does not know, or a config
 * that is not an object at all becomes a Safe Result you can branch on.
 *
 * What is checked per provider:
 *
 * - the id must exist in Better Auth's catalog (catches typos and vendors a
 *   `better-auth` upgrade removed);
 * - a **client identifier** must be present — `clientId`, or `clientKey` for
 *   the vendors that use it (TikTok) — and must not be empty, `[]` or `[""]`;
 * - `clientSecret` / `clientKey` are validated for emptiness **when present**
 *   but never required: TikTok has no `clientId`, and public PKCE clients have
 *   no secret, so demanding both would reject valid configurations;
 * - a thunk (`() => ({…})`) and `enabled: false` are passed through untouched —
 *   the credentials resolve later, inside Better Auth.
 *
 * Every problem is reported at once, so one run of the config shows everything
 * that is wrong.
 *
 * @param providers - The `socialProviders` object destined for `betterAuth()`
 * @returns Safe result with the same object (ready to spread), or the issues found
 *
 * @example `auth.ts` (module scope — top-level `await` is fine in ESM)
 * ```ts
 * import { betterAuth } from "better-auth";
 * import { useSocialProviders } from "katanakit-js/adapters/better-auth";
 *
 * const social = await useSocialProviders({
 *   google: { clientId: process.env.GOOGLE_CLIENT_ID ?? "", clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "" },
 *   github: { clientId: process.env.GITHUB_CLIENT_ID ?? "", clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "" },
 * });
 * if (!social.ok) throw new Error(social.error.message); // names the provider and the field
 *
 * export const auth = betterAuth({ socialProviders: social.data });
 * ```
 */
export async function useSocialProviders(
	providers: SocialProviders,
): Promise<AuthResult<SocialProviders>> {
	if (!isRecord(providers)) {
		return {
			data: null,
			error: {
				message: "[BetterAuth] socialProviders must be an object (got a non-object value)",
				details: providers,
			},
			ok: false,
		};
	}

	const known = await knownProviderIds();
	if (!known.ok) return { data: null, error: known.error, ok: false };

	const issues: ProviderIssue[] = [];
	for (const [provider, config] of Object.entries(providers)) {
		if (!known.data.includes(provider)) {
			issues.push({
				provider,
				problem: `unknown provider — this better-auth version supports: ${known.data.join(", ")}`,
			});
			continue;
		}
		// A thunk resolves inside Better Auth, where the real values live.
		if (typeof config === "function") continue;
		if (!isRecord(config)) {
			issues.push({ provider, problem: "expected an options object or a () => options thunk" });
			continue;
		}
		// Explicitly switched off: nothing has to be configured for it.
		if (config.enabled === false) continue;

		const identifier = [config.clientId, config.clientKey].find(
			(value) => value !== undefined && value !== null,
		);
		if (identifier === undefined) {
			issues.push({
				provider,
				problem: "missing a client identifier (clientId — or clientKey for vendors like TikTok)",
			});
			continue;
		}

		for (const field of ["clientId", "clientSecret", "clientKey"] as const) {
			for (const problem of check(field, config[field])) issues.push({ provider, problem });
		}
	}

	if (issues.length > 0) {
		return {
			data: null,
			error: {
				message:
					`[BetterAuth] socialProviders rejected — ` +
					issues.map((issue) => `${issue.provider}: ${issue.problem}`).join("; "),
				details: issues,
			},
			ok: false,
		};
	}

	return { data: providers, error: null, ok: true };
}

/**
 * Credential rules, applied only to values that are actually present:
 * an empty string is almost always an unset environment variable, and an
 * array of client ids may not be `[]` or contain blanks.
 */
function check(field: string, value: unknown): string[] {
	if (value === undefined || value === null) return [];

	if (typeof value === "string") {
		return value.trim() === "" ? [`${field} is empty (is its environment variable set?)`] : [];
	}

	if (Array.isArray(value)) {
		if (value.length === 0) return [`${field} is an empty array`];
		return value.some((entry) => typeof entry !== "string" || entry.trim() === "")
			? [`${field} contains an empty entry`]
			: [];
	}

	return [`${field} must be a string or an array of strings`];
}

/** Loads Better Auth's provider catalog, with a hint when the peer is absent. */
async function knownProviderIds(): Promise<AuthResult<readonly string[]>> {
	try {
		const { socialProviderList } = await import("better-auth/social-providers");
		return { data: socialProviderList as readonly string[], error: null, ok: true };
	} catch (cause) {
		return {
			data: null,
			error: {
				message:
					"[BetterAuth] cannot load the social provider catalog — install it with `bun add better-auth`.",
				details: cause,
			},
			ok: false,
		};
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
