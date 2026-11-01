import { useCan } from "@/core/services/access.service.js";
import type { AccessCapability, AccessSubject } from "@/types/index.js";

/**
 * A Next.js proxy handler — `proxy.ts` at the project root (Next.js 16+;
 * the file was called `middleware.ts` before that).
 *
 * Typed against the Web `Request`/`Response` standards rather than
 * `next/server` on purpose: `NextRequest` extends `Request` and
 * `NextResponse` extends `Response`, and a proxy that returns `undefined`
 * simply lets the request continue. Both facts mean this compiles and runs in
 * the Next proxy runtime — and any other edge runtime — without `next` being a
 * dependency of this package.
 */
export type NextProxyHandler = (request: Request) => Promise<Response | void> | Response | void;

/** Where a refusal is sent: a JSON envelope, or a redirect. */
export interface NextGuardOptions {
	/** Where anonymous visitors go. Omit for the `401` JSON envelope. */
	redirectTo?: string;
	/** Where authenticated-but-unauthorized visitors go. Omit for the `403` envelope. */
	forbiddenTo?: string;
	/**
	 * Status used for redirects. `303` turns a POST into a GET, which is what
	 * you want after a form submission; `307` preserves the method.
	 */
	redirectStatus?: 303 | 307;
}

/**
 * Builds a Next.js proxy handler that requires an access capability, mirroring
 * the Express, Hono and Nest guards.
 *
 * The project ships no auth provider, so the subject is resolved by the caller
 * (session cookie, JWT, WordPress user…). Return `null` for anonymous requests —
 * they get a `401`; authenticated but not allowed gets a `403`. Both bodies use
 * the toolkit's `{ ok, data, error }` shape.
 *
 * When the subject holds the capability the handler returns `undefined`, which
 * is how a Next proxy says "continue to the route". Returning a `Response`
 * would replace it instead.
 *
 * Defaults reproduce the server-guard semantics exactly. A **page** route is
 * the exception: returning a JSON body on a document navigation is a broken
 * experience, so pass `redirectTo` to send anonymous visitors to the sign-in
 * page instead. `forbiddenTo` is separate because a subject who *is* signed in
 * and lacks the capability must not be told to sign in again.
 *
 * @param capability - The capability required to reach the route.
 * @param resolveSubject - Resolves the access subject from the request.
 * @param options - Optional redirect destinations for page routes.
 * @returns A proxy handler for `proxy.ts`.
 *
 * @example
 * ```ts
 * // proxy.ts  (Next.js 16+; use middleware.ts on 15 and earlier)
 * import { useRequireCapability } from "katanakit-js/adapters/next";
 * import { useWpAsSubject } from "katanakit-js/adapters/wordpress";
 *
 * export const proxy = useRequireCapability(
 *   "orders:read:any",
 *   (request) => {
 *     const user = readUserFromCookie(request.headers.get("cookie"));
 *     return user ? useWpAsSubject(user) : null;
 *   },
 *   { redirectTo: "/login", forbiddenTo: "/403" },
 * );
 *
 * export const config = { matcher: ["/admin/:path*"] };
 * ```
 */
export function useRequireCapability(
	capability: AccessCapability,
	resolveSubject: (request: Request) => AccessSubject | null,
	options: NextGuardOptions = {},
): NextProxyHandler {
	const redirectStatus = options.redirectStatus ?? 303;

	return (request) => {
		const subject = resolveSubject(request);

		if (!subject) {
			return options.redirectTo
				? redirect(options.redirectTo, redirectStatus)
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
				? redirect(options.forbiddenTo, redirectStatus)
				: jsonDenial(403, `Missing capability: ${capability}`);
		}

		// No return value: the request continues to the route.
	};
}

/** The `{ ok, data, error }` refusal the toolkit uses at every HTTP boundary. */
function jsonDenial(status: 401 | 403, message: string): Response {
	return Response.json({ ok: false, data: null, error: { message, status } }, { status });
}

/** A redirect response built from Web primitives only. */
function redirect(location: string, status: 303 | 307): Response {
	return new Response(null, { status, headers: { Location: location } });
}
