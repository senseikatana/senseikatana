import { useCan } from "@/core/services/access.service.js";
import type { AccessCapability, AccessSubject } from "@/types/index.js";

/**
 * The slice of Astro's `APIContext` the guard touches. Structural on purpose:
 * Astro is not a dependency of this package, and `APIContext` satisfies this
 * as-is.
 */
export interface AstroContextLike {
	locals: Record<string, unknown>;
	url: URL;
	redirect(path: string, status?: number): Response;
}

/** Astro middleware signature: `export const onRequest = defineMiddleware(...)`. */
export type AstroMiddlewareHandler = (
	context: AstroContextLike,
	next: () => Promise<Response> | Response,
) => Promise<Response> | Response;

/** Where a refusal is sent: a JSON envelope, or a redirect. */
export interface AstroGuardOptions {
	/** Where anonymous visitors go. Omit for the `401` JSON envelope. */
	redirectTo?: string;
	/** Where authenticated-but-unauthorized visitors go. Omit for the `403` envelope. */
	forbiddenTo?: string;
}

/**
 * Builds an Astro middleware that requires an access capability, mirroring the
 * Express, Hono and Nest guards.
 *
 * The project ships no auth provider, so the subject is resolved by the caller
 * (session cookie, JWT, WordPress user…). Return `null` for anonymous requests —
 * they get a `401`; authenticated but not allowed gets a `403`. Both bodies use
 * the toolkit's `{ ok, data, error }` shape.
 *
 * Defaults reproduce the server-guard semantics exactly. A **page** route is
 * the exception: returning a JSON body on a document navigation is a broken
 * experience, so pass `redirectTo` to send anonymous visitors to the sign-in
 * page instead. `forbiddenTo` is separate because a subject who *is* signed in
 * and lacks the capability must not be told to sign in again.
 *
 * @param capability - The capability required to reach the route.
 * @param resolveSubject - Resolves the access subject from the Astro context.
 * @param options - Optional redirect destinations for page routes.
 * @returns An Astro middleware for `src/middleware.ts`.
 *
 * @example
 * ```ts
 * // src/middleware.ts
 * import { defineMiddleware } from "astro:middleware";
 * import { useRequireCapability } from "katanakit-js/adapters/astro";
 * import { useWpAsSubject } from "katanakit-js/adapters/wordpress";
 *
 * const guard = useRequireCapability(
 *   "orders:read:any",
 *   (context) => useWpAsSubject(context.locals.user as never) ?? null,
 *   { redirectTo: "/login", forbiddenTo: "/403" },
 * );
 *
 * export const onRequest = defineMiddleware((context, next) =>
 *   context.url.pathname.startsWith("/admin") ? guard(context, next) : next(),
 * );
 * ```
 */
export function useRequireCapability(
	capability: AccessCapability,
	resolveSubject: (context: AstroContextLike) => AccessSubject | null,
	options: AstroGuardOptions = {},
): AstroMiddlewareHandler {
	return async (context, next) => {
		const subject = resolveSubject(context);

		if (!subject) {
			return options.redirectTo
				? context.redirect(options.redirectTo, 303)
				: jsonDenial(401, "Authentication required");
		}

		let allowed: boolean;
		try {
			allowed = useCan(subject, capability);
		} catch {
			// Malformed subject or unknown role: fail closed at the HTTP boundary.
			allowed = false;
		}

		if (!allowed) {
			return options.forbiddenTo
				? context.redirect(options.forbiddenTo, 303)
				: jsonDenial(403, `Missing capability: ${capability}`);
		}

		return await next();
	};
}

/** The `{ ok, data, error }` refusal the toolkit uses at every HTTP boundary. */
function jsonDenial(status: 401 | 403, message: string): Response {
	return Response.json({ ok: false, data: null, error: { message, status } }, { status });
}
