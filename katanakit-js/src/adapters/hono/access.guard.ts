import type { Context, MiddlewareHandler } from "hono";

import { useCan } from "@/core/services/access.service.js";
import type { AccessCapability, AccessSubject } from "@/types/index.js";

/**
 * Builds a Hono middleware that requires an access capability, mirroring the
 * Express `useRequireCapability()` and Nest guard behavior.
 *
 * The project ships no auth provider, so the subject is resolved by the caller
 * (JWT, session, API key…) from the request context. Return `null` for
 * anonymous requests — they get a 401; authenticated but not allowed gets a
 * 403. Both bodies use the toolkit's `{ ok, data, error }` shape.
 *
 * @param capability - The capability required to reach the route.
 * @param resolveSubject - Resolves the access subject from the Hono context.
 * @returns A Hono middleware handler for `app.use()` / `app.get(..., mw)`.
 *
 * @example
 * ```ts
 * import { Hono } from "hono";
 * import { useRequireCapability } from "katanakit-js/adapters/hono";
 *
 * const app = new Hono();
 * const canPublish = useRequireCapability("content:publish", (c) => {
 *   const header = c.req.header("authorization");
 *   return header ? { id: 1, roles: ["owner"] } : null; // your auth lookup
 * });
 *
 * app.post("/articles/:id/publish", canPublish, (c) => c.json({ ok: true }));
 * ```
 */
export function useRequireCapability(
	capability: AccessCapability,
	resolveSubject: (context: Context) => AccessSubject | null,
): MiddlewareHandler {
	return async (context, next) => {
		const subject = resolveSubject(context);

		if (!subject) {
			return context.json(
				{ ok: false, data: null, error: { message: "Authentication required", status: 401 } },
				401,
			);
		}

		let allowed: boolean;
		try {
			allowed = useCan(subject, capability);
		} catch {
			// Malformed subject or unknown role: fail closed at the HTTP boundary.
			allowed = false;
		}

		if (!allowed) {
			return context.json(
				{
					ok: false,
					data: null,
					error: { message: `Missing capability: ${capability}`, status: 403 },
				},
				403,
			);
		}

		await next();
	};
}
