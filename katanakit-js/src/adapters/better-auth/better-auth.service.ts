import type { Auth, Session, User } from "better-auth";

import type { AuthResult } from "./client.js";

/** What `auth.api.getSession()` resolves to when a session exists. */
export interface AuthSessionData {
	user: User;
	session: Session;
	/** Plugins append their own fields (organization, roles, …). */
	[key: string]: unknown;
}

/** The shape `Astro.locals` (or any framework's request context) ends up with. */
export interface AuthLocals {
	user: User | null;
	session: Session | null;
}

/** Anything that carries request headers: a `Request`, `Headers` or `{ headers }`. */
export type HeadersLike = Headers | Request | { headers: Headers };

function toHeaders(input: HeadersLike): Headers {
	if (input instanceof Headers) return input;
	if (input && typeof input === "object" && "headers" in input) return input.headers;
	return new Headers();
}

/**
 * Reads the current session server-side without throwing.
 *
 * Returns `data: null` with `ok: true` for an anonymous visitor — only a real
 * failure (bad config, network, malformed response) turns into `ok: false`.
 *
 * @param auth - The `betterAuth()` server instance
 * @param request - A `Request`, its `Headers`, or any object exposing `headers`
 * @returns Safe result with the session (or `null`)
 *
 * @example
 * ```ts
 * const session = await useAuthSession(auth, request);
 * if (session.ok && session.data) console.log(session.data.user.email);
 * ```
 */
export async function useAuthSession(
	auth: Auth,
	request: HeadersLike,
): Promise<AuthResult<AuthSessionData | null>> {
	try {
		const data = (await auth.api.getSession({
			headers: toHeaders(request),
		})) as AuthSessionData | null;
		return { data, error: null, ok: true };
	} catch (cause) {
		return {
			data: null,
			error: { message: `[BetterAuth] getSession failed: ${toMessage(cause)}`, details: cause },
			ok: false,
		};
	}
}

/**
 * Runs Better Auth's request handler (`auth.handler`) for a catch-all route.
 *
 * @param auth - The `betterAuth()` server instance
 * @param request - The incoming `Request`
 * @returns Safe result with the handler's `Response`
 *
 * @example Astro — `src/pages/api/auth/[...all].ts`
 * ```ts
 * import type { APIRoute } from "astro";
 * import { auth } from "~/auth";
 * import { useAuthHandler } from "katanakit-js/adapters/better-auth";
 *
 * export const ALL: APIRoute = async ({ request }) => {
 *   const result = await useAuthHandler(auth, request);
 *   return result.ok ? result.data : new Response("Auth unavailable", { status: 500 });
 * };
 * ```
 */
export async function useAuthHandler(auth: Auth, request: Request): Promise<AuthResult<Response>> {
	try {
		const response = await auth.handler(request);
		return { data: response, error: null, ok: true };
	} catch (cause) {
		return {
			data: null,
			error: { message: `[BetterAuth] handler failed: ${toMessage(cause)}`, details: cause },
			ok: false,
		};
	}
}

/**
 * Builds the `user` / `session` pair middleware puts into the request context.
 *
 * Mirrors Better Auth's Astro middleware: anonymous visitors get `null` for
 * both fields instead of an error, so a page can branch on `locals.user`.
 *
 * @param auth - The `betterAuth()` server instance
 * @param request - The incoming `Request` (or anything carrying its headers)
 * @returns Safe result with `{ user, session }`
 *
 * @example Astro — `src/middleware.ts`
 * ```ts
 * import { defineMiddleware } from "astro:middleware";
 * import { auth } from "~/auth";
 * import { useAstroAuthLocals } from "katanakit-js/adapters/better-auth";
 *
 * export const onRequest = defineMiddleware(async (context, next) => {
 *   const locals = await useAstroAuthLocals(auth, context.request);
 *   if (locals.ok) {
 *     context.locals.user = locals.data.user;
 *     context.locals.session = locals.data.session;
 *   }
 *   return next();
 * });
 * ```
 */
export async function useAstroAuthLocals(
	auth: Auth,
	request: HeadersLike,
): Promise<AuthResult<AuthLocals>> {
	const session = await useAuthSession(auth, request);
	if (!session.ok) return session;

	return {
		data: { user: session.data?.user ?? null, session: session.data?.session ?? null },
		error: null,
		ok: true,
	};
}

function toMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
