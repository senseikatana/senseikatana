import { type Request, type RequestHandler, type Response, Router } from "express";
import rateLimit from "express-rate-limit";

import { useExpressGetApp, useExpressStart } from "@/adapters/express/server.js";
import {
	useGetHistory,
	useReply,
	useResetSession,
	useSessionExists,
} from "@/core/services/assistant.service.js";

/** Options for the assistant HTTP router. */
export interface AssistantRouterOptions {
	/** Optional auth guard (e.g. Bearer token). Applied before every route. */
	guard?: RequestHandler;
	/** Optional rate limiter for POST /chat. Defaults to 20 req/min per IP. */
	rateLimit?: RequestHandler;
	/**
	 * Resolves the authenticated subject for a request, e.g. from a verified
	 * token or session cookie. Return `undefined` to reject the request with
	 * `401`.
	 *
	 * **Strongly recommended.** Session routes address conversations by id, and
	 * `POST /chat` hands the id back in its response body, so ids travel through
	 * client-side JS, URLs, referrers and access logs. Without a subject,
	 * `GET /sessions/:id` and `DELETE /sessions/:id` authorize nothing beyond
	 * the id existing: any caller who learns one can read another user's
	 * conversation or destroy it (OWASP A01 Broken Access Control).
	 *
	 * When supplied, a session may only be read or deleted by the subject that
	 * created it, and a subject may not continue someone else's session.
	 * Ownership is recorded when the session is first seen, so it survives the
	 * route that created it within this router's lifetime.
	 */
	resolveSubject?: (request: Request) => string | undefined;
}

/** Default rate limiter: 20 requests per minute per IP. */
const defaultChatRateLimit = rateLimit({
	windowMs: 60_000,
	max: 20,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { ok: false, data: null, error: { message: "Too many requests", status: 429 } },
});

/**
 * Default limiter for the session routes: 60 requests per minute per IP. These
 * are cheap lookups, but they are unauthenticated by default and were
 * previously unbounded.
 */
const defaultSessionRateLimit = rateLimit({
	windowMs: 60_000,
	max: 60,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { ok: false, data: null, error: { message: "Too many requests", status: 429 } },
});

/** Builds a fresh Express router exposing the assistant over HTTP. */
export function useCreateAssistantRouter(options: AssistantRouterOptions = {}): Router {
	const router = Router();

	if (options.guard) {
		router.use(options.guard);
	}

	/**
	 * Subject that owns each session. Router-scoped on purpose: it must never
	 * outlive the process that authenticated the subject, and it must not be
	 * written into the conversation store, whose shape is shared with any
	 * persistent backend.
	 */
	const owners = new Map<string, string>();

	/** Returns the request's subject, or sends `401` and returns `null`. */
	const useRequireSubject = (request: Request, response: Response): string | null => {
		const subject = options.resolveSubject?.(request);
		if (!subject) {
			response.status(401).json({
				ok: false,
				data: null,
				error: { message: "Unauthorized", status: 401 },
			});
			return null;
		}
		return subject;
	};

	/**
	 * Sends `404` unless `sessionId` is already owned by `subject`.
	 *
	 * Fails CLOSED on an unowned session. A session the router never minted —
	 * created through the core API, or before a restart — has no recorded
	 * owner, and "let the first requester claim it" is the vulnerability
	 * itself: whoever reaches an id first would take ownership of someone
	 * else's conversation. HTTP callers must create their sessions through
	 * `POST /chat`, which claims them.
	 */
	const useRejectForeignSession = (
		response: Response,
		sessionId: string,
		subject: string,
	): boolean => {
		if (owners.get(sessionId) === subject) return false;
		// Deliberately identical to a missing session: revealing that an id
		// exists but belongs to someone else is itself an information leak.
		response.status(404).json({ error: "Session not found" });
		return true;
	};

	router.post(
		"/chat",
		options.rateLimit ?? defaultChatRateLimit,
		async (request: Request, response: Response) => {
			const { sessionId, message } = (request.body ?? {}) as {
				sessionId?: string;
				message?: string;
			};

			if (typeof message !== "string" || message.trim() === "") {
				response.status(400).json({
					ok: false,
					data: null,
					error: { message: "Field `message` is required", status: 400 },
				});
				return;
			}

			// Authenticate before touching conversation state, then refuse to let
			// a subject continue a session they do not own.
			const subject = options.resolveSubject ? useRequireSubject(request, response) : null;
			if (options.resolveSubject && subject === null) return;

			// A session id supplied by the caller must already belong to this
			// subject.
			if (sessionId && subject !== null) {
				if (useRejectForeignSession(response, sessionId, subject)) return;
				owners.set(sessionId, subject);
			}

			const result = await useReply(sessionId, message);

			// `useReply` mints the id when none was supplied, so it is only known
			// afterwards. That session is ours by construction — claim it outright
			// rather than running the ownership check, which would reject it for
			// having no recorded owner.
			const nextId = result.ok ? result.data.sessionId : undefined;
			if (nextId && subject !== null && !owners.has(nextId)) {
				owners.set(nextId, subject);
			}

			response.status(result.ok ? 200 : (result.error?.status ?? 502)).json(result);
		},
	);

	router.get(
		"/sessions/:id",
		defaultSessionRateLimit,
		async (request: Request, response: Response) => {
			const id = String(request.params.id);
			const subject = options.resolveSubject ? useRequireSubject(request, response) : null;
			if (options.resolveSubject && subject === null) return;
			if (subject !== null && useRejectForeignSession(response, id, subject)) return;

			if (!(await useSessionExists(id))) {
				response.status(404).json({ error: "Session not found" });
				return;
			}
			const messages = await useGetHistory(id);
			response.json({ sessionId: id, messages });
		},
	);

	router.delete(
		"/sessions/:id",
		defaultSessionRateLimit,
		async (request: Request, response: Response) => {
			const id = String(request.params.id);
			const subject = options.resolveSubject ? useRequireSubject(request, response) : null;
			if (options.resolveSubject && subject === null) return;
			if (subject !== null && useRejectForeignSession(response, id, subject)) return;

			if (!(await useSessionExists(id))) {
				response.status(404).json({ error: "Session not found" });
				return;
			}
			await useResetSession(id);
			owners.delete(id);
			response.status(204).end();
		},
	);

	return router;
}

/** Module-level mount guard for the standalone assistant. */
let mounted = false;

/**
 * Mounts the assistant routes on the shared Express app and starts the server.
 * Idempotent — subsequent calls are no-ops.
 *
 * @param port - Port to listen on (default: 3000)
 * @param host - Host to bind to (default: "localhost")
 * @param mountPath - Base path for the assistant routes (default: "/assistant")
 * @param options - Router options (e.g. an auth `guard`)
 *
 * @example
 * ```ts
 * useStartAssistant(3000, "localhost", "/assistant", { guard: requireAuth });
 * // POST /assistant/chat
 * ```
 */
export function useStartAssistant(
	port = 3000,
	host = "localhost",
	mountPath = "/assistant",
	options: AssistantRouterOptions = {},
): void {
	if (mounted) return;
	mounted = true;

	useExpressGetApp().use(mountPath, useCreateAssistantRouter(options));
	useExpressStart(port, host);
}
