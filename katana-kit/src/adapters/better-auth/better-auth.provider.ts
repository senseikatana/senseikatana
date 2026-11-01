import type { Auth } from "better-auth";

import type { AuthRequestLike, AuthResult, IAuthProvider } from "@/core/services/auth.service.js";
import { useBearerToken } from "@/core/services/auth.service.js";
import type { Principal } from "@/schemas/identity.schema.js";

/* -------------------------------------------------------------------------- */
/* Options                                                                    */
/* -------------------------------------------------------------------------- */

export interface BetterAuthProviderOptions {
	/**
	 * How a session that carries no cookie or header reached the user.
	 *
	 * Better Auth can authenticate four ways — cookie session, bearer token,
	 * API key, or a custom header — and this provider normalises all of them
	 * to the same `Principal`. Overriding `method` is only for providers whose
	 * flow you know and Better Auth does not report.
	 */
	method?: string;
	/**
	 * The id Better Auth reports in `session.user.id` is an internal one. Set
	 * this to read a different claim instead — an employee number, a national
	 * identity document — when your `Account.id` is not the key your directory
	 * stores. Return `null` to fall back to the user id.
	 */
	useSubject?: (session: unknown) => string | null | undefined;
	/** Methods this deployment enabled. Informational only. */
	methods?: readonly string[];
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function toHeaders(input: AuthRequestLike): Headers {
	if (input instanceof Headers) return input;
	if (input && typeof input === "object" && "headers" in input) return input.headers;
	return new Headers();
}

/**
 * How the session was actually presented, read from what the request carried.
 *
 * Worth deriving rather than hardcoding, because the credential lifecycle
 * differs per method: a bearer token is revoked by dropping it, while a cookie
 * session is ended server-side. A caller enforcing a credential policy needs
 * to know which one it is looking at.
 */
function useMethodFor(input: AuthRequestLike, fallback: string): string {
	const headers = toHeaders(input);
	if (useBearerToken(input)) return "bearer";
	if (headers.get("cookie")) return "cookie";
	if (headers.get("x-api-key")) return "api-key";
	return fallback;
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * A {@link IAuthProvider} backed by a Better Auth server instance.
 *
 * Thin by design. Signing in, refreshing and revoking sessions belong to
 * Better Auth's own client, which already knows how to do it for the flow in
 * use. This only answers the one question the authorization layer asks.
 *
 * @param auth - The `betterAuth()` server instance
 * @param options - Subject selection and the fallback method label
 *
 * @example
 * ```ts
 * import { AuthService } from "katanakit-js";
 * import { useBetterAuthProvider } from "katanakit-js/adapters/better-auth";
 *
 * AuthService.getInstance().useRegister(useBetterAuthProvider(auth));
 * ```
 */
export function useBetterAuthProvider(
	auth: Auth,
	options: BetterAuthProviderOptions = {},
): IAuthProvider {
	const { method = "session", useSubject, methods } = options;

	return {
		provider: "better-auth",
		...(methods ? { methods } : {}),

		async useResolve(input: AuthRequestLike): Promise<AuthResult<Principal | null>> {
			let session: unknown;
			try {
				session = await auth.api.getSession({ headers: toHeaders(input) });
			} catch (cause) {
				return {
					data: null,
					error: {
						message: `[BetterAuth] could not resolve the session`,
						details: cause,
					},
					ok: false,
				};
			}

			if (!session) return { data: null, error: null, ok: true };

			const user = (session as { user?: { id?: unknown; email?: string } }).user;
			const id = typeof user?.id === "string" ? user.id : null;
			if (!id) {
				return {
					data: null,
					error: { message: "[BetterAuth] the session resolved without a user id" },
					ok: false,
				};
			}

			const overridden = useSubject?.(session);
			const principal: Principal = {
				subject: overridden ?? id,
				provider: "better-auth",
				method: useMethodFor(input, method),
			};

			if (typeof user?.email === "string") {
				principal.email = user.email;
				principal.emailVerified = Boolean(
					(session as { user?: { emailVerified?: unknown } }).user?.emailVerified,
				);
			}

			return { data: principal, error: null, ok: true };
		},
	};
}
