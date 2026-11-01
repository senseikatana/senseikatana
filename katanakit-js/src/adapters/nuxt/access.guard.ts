import { useCan } from "@/core/services/access.service.js";
import type { AccessCapability, AccessSubject } from "@/types/index.js";

/**
 * The slice of a Nuxt route the guard touches. Structural on purpose: Nuxt is
 * not a dependency of this package, and `RouteLocationNormalized` satisfies
 * this as-is.
 */
export interface NuxtRouteLike {
	path: string;
	fullPath: string;
}

/**
 * What a Nuxt route middleware may return. A route location navigates, `false`
 * aborts the navigation, `void` continues it.
 */
export type NuxtRouteGuardResult = void | false | { path: string };

/** Nuxt route middleware signature: `defineNuxtRouteMiddleware((to, from) => …)`. */
export type NuxtRouteMiddleware = (to: NuxtRouteLike, from: NuxtRouteLike) => NuxtRouteGuardResult;

/** Where a refusal is sent. */
export interface NuxtGuardOptions {
	/** Where anonymous visitors go. Omit to abort the navigation. */
	redirectTo?: string;
	/** Where authenticated-but-unauthorized visitors go. Omit to abort. */
	forbiddenTo?: string;
}

/**
 * Builds a Nuxt route middleware that requires an access capability, mirroring
 * the Express, Hono and Nest guards.
 *
 * The project ships no auth provider, so the subject is resolved by the caller
 * (session cookie, JWT, WordPress user…). Return `null` for anonymous requests.
 *
 * **Nuxt's route layer has no HTTP status.** A route middleware either
 * navigates or aborts, so there is no `401`/`403` envelope to return here — the
 * two refusals are expressed as destinations instead. That is why
 * `redirectTo` and `forbiddenTo` are separate: a subject who *is* signed in and
 * lacks the capability must not be sent back to the sign-in page. Give both a
 * destination; omitting one aborts the navigation with no error page, which is
 * a blank screen rather than a refusal.
 *
 * Server routes are a different story — `useUnwrap()` and `useSafeResponse()`
 * on an H3 event already carry the status code, so guard those with
 * `useRequireCapability` from `katanakit-js/adapters/express` on the server
 * side, or check `useCan()` directly.
 *
 * @param capability - The capability required to reach the route.
 * @param resolveSubject - Resolves the access subject from the target route.
 * @param options - Redirect destinations for the two refusals.
 * @returns A Nuxt route middleware for `middleware/`.
 *
 * @example
 * ```ts
 * // middleware/admin.ts
 * import { useRequireCapability } from "katanakit-js/adapters/nuxt";
 * import { useWpAsSubject } from "katanakit-js/adapters/wordpress";
 *
 * export default defineNuxtRouteMiddleware(
 *   useRequireCapability(
 *     "orders:read:any",
 *     (to) => {
 *       const user = useCookie("wp_user").value as { id: number; roles: string[] } | null;
 *       return user ? useWpAsSubject(user as never) : null;
 *     },
 *     { redirectTo: "/login", forbiddenTo: "/403" },
 *   ),
 * );
 * ```
 */
export function useRequireCapability(
	capability: AccessCapability,
	resolveSubject: (to: NuxtRouteLike) => AccessSubject | null,
	options: NuxtGuardOptions = {},
): NuxtRouteMiddleware {
	return (to) => {
		const subject = resolveSubject(to);

		if (!subject) {
			return options.redirectTo ? { path: options.redirectTo } : false;
		}

		let allowed: boolean;
		try {
			allowed = useCan(subject, capability);
		} catch {
			// Malformed subject or unknown role: fail closed at the route boundary.
			allowed = false;
		}

		if (!allowed) {
			return options.forbiddenTo ? { path: options.forbiddenTo } : false;
		}
	};
}
