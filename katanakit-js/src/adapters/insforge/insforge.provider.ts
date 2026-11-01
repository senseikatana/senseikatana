import type { AuthRequestLike, AuthResult, IAuthProvider } from "@/core/services/auth.service.js";
import { useBearerToken } from "@/core/services/auth.service.js";
import type { Principal } from "@/schemas/identity.schema.js";

/* -------------------------------------------------------------------------- */
/* Structural minimum                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The slice of the InsForge client this provider actually touches.
 *
 * Declared structurally rather than importing the SDK type so that `@insforge/sdk`
 * stays an optional peer: a deployment that does not use InsForge never has to
 * install it, and the provider is testable with a plain object.
 */
export interface InsforgeAuthClientLike {
	setAccessToken(token: string): void;
	auth: {
		getCurrentUser(): Promise<{
			data: { user: InsforgeUserLike | null } | null;
			error: unknown;
		}>;
	};
}

/** The user fields InsForge returns. Mirrors `UserSchema`. */
export interface InsforgeUserLike {
	id: string;
	email?: string | null;
	emailVerified?: boolean | null;
	/** How the account was proven, e.g. `["google"]` or `["password"]`. */
	providers?: string[] | null;
}

/* -------------------------------------------------------------------------- */
/* Options                                                                    */
/* -------------------------------------------------------------------------- */

export interface InsforgeProviderOptions {
	/** InsForge project URL. */
	baseUrl: string;
	/** Public anon key. Never the admin key — this runs before authorization. */
	anonKey: string;
	/** Methods this deployment enabled. Informational only. */
	methods?: readonly string[];
	/**
	 * Builds the client a single request will use.
	 *
	 * **Override this in a server process.** InsForge keeps the access token on
	 * the client instance, so calling `setAccessToken` on a client shared across
	 * concurrent requests lets one visitor's token overwrite another's — and the
	 * second request resolves as the first. The default creates a client per
	 * request, which is correct and costs one object per call. Supply your own
	 * factory if your transport is cheaper.
	 */
	useClientFor?: (token: string | null) => Promise<InsforgeAuthClientLike> | InsforgeAuthClientLike;
}

/* -------------------------------------------------------------------------- */
/* Default client factory                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Creates a request-scoped client from the optional peer dependency.
 *
 * `@insforge/sdk` is loaded lazily: a deployment that resolves sessions through
 * another provider never pays for the import, and never has to install it.
 */
async function useDefaultClient(options: InsforgeProviderOptions): Promise<InsforgeAuthClientLike> {
	try {
		const { createClient } = await import("@insforge/sdk");
		return createClient({
			baseUrl: options.baseUrl,
			anonKey: options.anonKey,
		}) as unknown as InsforgeAuthClientLike;
	} catch (cause) {
		throw new Error(
			"[InsForge] cannot load @insforge/sdk — install it with `bun add @insforge/sdk`, or pass `useClientFor`.",
			{ cause },
		);
	}
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * A {@link IAuthProvider} backed by InsForge.
 *
 * Resolves the bearer token on the request, hands it to a request-scoped
 * client, and asks InsForge who it belongs to. An absent or rejected token is
 * an anonymous visitor, not an error — the route answers `401`, and the
 * difference between "nobody" and "InsForge is down" stays observable.
 *
 * @param options - Connection details and the per-request client factory
 *
 * @example
 * ```ts
 * import { AuthService } from "katanakit-js";
 * import { useInsforgeAuthProvider } from "katanakit-js/adapters/insforge";
 *
 * AuthService.getInstance().useRegister(
 *   useInsforgeAuthProvider({
 *     baseUrl: process.env.INSFORGE_URL!,
 *     anonKey: process.env.INSFORGE_ANON_KEY!,
 *   }),
 * );
 * ```
 */
export function useInsforgeAuthProvider(options: InsforgeProviderOptions): IAuthProvider {
	const { methods } = options;
	const useClientFor =
		options.useClientFor ?? ((_token: string | null) => useDefaultClient(options));

	return {
		provider: "insforge",
		...(methods ? { methods } : {}),

		async useResolve(input: AuthRequestLike): Promise<AuthResult<Principal | null>> {
			let client: InsforgeAuthClientLike;
			let token: string | null;
			try {
				token = useBearerToken(input);
				client = await useClientFor(token);
			} catch (cause) {
				return {
					data: null,
					error: { message: "[InsForge] could not build an auth client", details: cause },
					ok: false,
				};
			}

			// No credential at all: nobody is asking, so there is nothing to fail.
			if (!token) return { data: null, error: null, ok: true };

			let user: InsforgeUserLike | null;
			try {
				client.setAccessToken(token);
				const response = await client.auth.getCurrentUser();
				if (response.error) {
					// A rejected token is an anonymous visitor. InsForge answered;
					// it just did not recognise this credential.
					return { data: null, error: null, ok: true };
				}
				user = response.data?.user ?? null;
			} catch (cause) {
				return {
					data: null,
					error: { message: "[InsForge] getCurrentUser failed", details: cause },
					ok: false,
				};
			}

			if (!user || typeof user.id !== "string" || user.id === "") {
				return { data: null, error: null, ok: true };
			}

			const principal: Principal = {
				subject: user.id,
				provider: "insforge",
				// InsForge records how the account proved itself, so the method is
				// reported rather than guessed.
				method: user.providers?.[0] ?? "session",
			};

			if (typeof user.email === "string") {
				principal.email = user.email;
				principal.emailVerified = Boolean(user.emailVerified);
			}

			return { data: principal, error: null, ok: true };
		},
	};
}
