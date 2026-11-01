import type { Principal } from "@/schemas/identity.schema.js";
import type { AccessRole, AccessSubject, SafeResult } from "@/types/index.js";

/* -------------------------------------------------------------------------- */
/* Results                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Why a provider could not answer.
 *
 * `status` is the provider's own answer when it has one — InsForge reports 401
 * for a rejected token, a transport reports 503 when it is down — so a caller
 * can tell "this credential is bad" from "the backend is unreachable" without
 * parsing a message.
 */
export interface AuthError {
	message: string;
	status?: number;
	details?: unknown;
}

/** Safe result of an authentication step. */
export type AuthResult<T> = SafeResult<T, AuthError>;

/* -------------------------------------------------------------------------- */
/* Port                                                                       */
/* -------------------------------------------------------------------------- */

/** Anything that carries the headers of an inbound request. */
export type AuthRequestLike = Request | Headers | { headers: Headers };

/**
 * An identity provider the kit can ask *"who is this?"*.
 *
 * This is the whole authentication surface. The kit does not re-expose the
 * provider's API — signing in, refreshing tokens and revoking sessions belong
 * to the provider's own SDK, which already does them correctly for that
 * provider. What the kit needs is a single normalised answer so that
 * authorization never has to know which provider produced it.
 *
 * The contract has exactly two answers. A visitor is `{ ok: true, data: null }`
 * — not an error, because "nobody" is a legitimate answer. Only a real failure
 * (misconfigured provider, unreachable backend, malformed response) is
 * `ok: false`. Collapsing those two is how a broken provider starts reading as
 * "nobody is logged in" and silently opens a public route.
 *
 * Implement it for any IdP: the two shipped are Better Auth and InsForge.
 *
 * @example A deployment's own provider
 * ```ts
 * const nationalId: IAuthProvider = {
 *   provider: "dni",
 *   methods: ["password"],
 *   async useResolve(input) {
 *     const token = bearer(input);
 *     if (!token) return { data: null, error: null, ok: true };
 *     const person = await registry.lookup(token);
 *     return person
 *       ? { data: { subject: person.id, method: "password", provider: "dni" }, error: null, ok: true }
 *       : { data: null, error: null, ok: true };
 *   },
 * };
 * ```
 */
export interface IAuthProvider {
	/** Stable id used to select this provider, e.g. `"better-auth"`. */
	readonly provider: string;
	/**
	 * Methods this deployment enabled — `"password"`, `"oauth:google"`,
	 * `"otp"`, `"passkey"`. Informational: it describes the deployment's
	 * configuration, and never feeds into authorization.
	 */
	readonly methods?: readonly string[];
	/** Resolves the caller. Returns `null` data for an anonymous request. */
	useResolve(input: AuthRequestLike): Promise<AuthResult<Principal | null>>;
}

/* -------------------------------------------------------------------------- */
/* Registry                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Holds the providers a deployment has configured and routes a request to one.
 *
 * A registry rather than a single global provider because "which one" is
 * configuration: a municipality may resolve a national identity number while
 * a SaaS resolves an OAuth session, and both ship as the same kit. Nothing
 * here reaches the network — providers are injected, so the core stays pure
 * and testable with a stub.
 */
export class AuthService {
	private static instance: AuthService;

	private providers: Map<string, IAuthProvider>;

	private constructor() {
		this.providers = new Map();
	}

	/** The shared instance. */
	static getInstance(): AuthService {
		if (!AuthService.instance) AuthService.instance = new AuthService();
		return AuthService.instance;
	}

	/** A non-singleton instance, for tests or for isolating two deployments. */
	static create(): AuthService {
		return new AuthService();
	}

	/** Registers a provider, replacing any previous one with the same id. */
	useRegister(provider: IAuthProvider): void {
		this.providers.set(provider.provider, provider);
	}

	/** Whether a provider id is registered. */
	useHas(provider: string): boolean {
		return this.providers.has(provider);
	}

	/** Registered provider ids, in registration order. */
	useProviders(): string[] {
		return [...this.providers.keys()];
	}

	/** Removes a provider. Returns whether it was there. */
	useUnregister(provider: string): boolean {
		return this.providers.delete(provider);
	}

	/**
	 * Resolves the caller through the named provider.
	 *
	 * An unknown provider id is a configuration failure, not an anonymous
	 * visitor — it returns `ok: false` so a typo cannot quietly turn a guarded
	 * route into a public one.
	 */
	async useResolve(provider: string, input: AuthRequestLike): Promise<AuthResult<Principal | null>> {
		const found = this.providers.get(provider);
		if (!found) {
			return {
				data: null,
				error: {
					message: `[AuthService] unknown provider "${provider}" — registered: ${
						this.useProviders().join(", ") || "none"
					}`,
				},
				ok: false,
			};
		}
		return found.useResolve(input);
	}
}

/* -------------------------------------------------------------------------- */
/* The seam: principal -> subject                                             */
/* -------------------------------------------------------------------------- */

/**
 * Turns an authenticated principal into an access subject — the single point
 * where authentication hands over to authorization.
 *
 * The role lookup is injected because it *is* the deployment's: reading roles
 * means touching storage, which the core must not do. Returning `null` roles
 * is legitimate — an authenticated user with no role yet is a normal state
 * right after a first login, and a well-behaved route answers `403` for them
 * rather than pretending they are anonymous.
 *
 * @example
 * ```ts
 * const subject = await useResolveSubject(
 *   "better-auth",
 *   request,
 *   (principal) => directory.rolesFor(principal.subject),
 * );
 * if (!subject.ok) return response.status(500).end();
 * if (!subject.data) return response.status(401).end();
 * // subject.data is now an AccessSubject
 * ```
 */
export async function useResolveSubject(
	provider: string,
	input: AuthRequestLike,
	useRoles: (principal: Principal) => AccessRole[] | Promise<AccessRole[]>,
	auth?: AuthService,
): Promise<AuthResult<AccessSubject | null>> {
	const service = auth ?? AuthService.getInstance();

	const resolved = await service.useResolve(provider, input);
	if (!resolved.ok) return { data: null, error: resolved.error, ok: false };
	if (resolved.data === null) return { data: null, error: null, ok: true };

	try {
		const roles = await useRoles(resolved.data);
		return {
			data: {
				id: resolved.data.subject,
				roles,
				// Carried through untouched: the subject is loose, and a route may
				// want to know *how* the person proved who they are.
				provider: resolved.data.provider,
				method: resolved.data.method,
				email: resolved.data.email,
			},
			error: null,
			ok: true,
		};
	} catch (cause) {
		return {
			data: null,
			error: {
				message: `[AuthService] role lookup failed for "${resolved.data.subject}"`,
				details: cause,
			},
			ok: false,
		};
	}
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Reads the bearer token from anything carrying headers.
 *
 * Returns `null` for a missing *or malformed* header rather than an empty
 * string, so a caller cannot mistake "no credential" for "empty credential".
 */
export function useBearerToken(input: AuthRequestLike): string | null {
	const headers =
		input instanceof Headers
			? input
			: "headers" in input && input.headers instanceof Headers
				? input.headers
				: new Headers();

	const authorization = headers.get("authorization") ?? headers.get("Authorization");
	if (!authorization) return null;

	const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
	return match ? match[1]?.trim() || null : null;
}
