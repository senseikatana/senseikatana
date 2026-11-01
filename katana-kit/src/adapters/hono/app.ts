import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

import { useLogger } from "@/core/services/logger.service.js";

/** Options accepted by {@link useCreateApp}. */
export interface HonoAppOptions {
	/**
	 * Allowed CORS origins. Defaults to the `CORS_ORIGINS` env variable
	 * (comma-separated) or `http://localhost:3000`.
	 */
	corsOrigins?: string[];
	/** Registers `GET /health` (default `true`). */
	health?: boolean;
}

/** Resolves the CORS allow-list from options or the environment. */
function resolveCorsOrigins(options: HonoAppOptions): string[] {
	if (options.corsOrigins) return options.corsOrigins;
	return (process.env.CORS_ORIGINS?.split(",") ?? ["http://localhost:3000"])
		.map((origin) => origin.trim())
		.filter(Boolean);
}

/**
 * Creates a Hono app pre-configured for KatanaKit services.
 *
 * The factory is runtime-agnostic — the same app runs on Node
 * (`@hono/node-server`), Bun (`Bun.serve`), Deno and Cloudflare Workers
 * (`export default app`). It mounts `secureHeaders()`, CORS from the same
 * `CORS_ORIGINS` convention as the Express adapter, an optional `/health`
 * probe and JSON error bodies in the toolkit's `{ ok, data, error }` shape.
 *
 * @param options - CORS origins and health-check toggle.
 * @returns A configured Hono application, ready to mount routes on.
 *
 * @example
 * ```ts
 * import { useCreateApp, useRequireCapability, useSafeJson } from "katanakit-js/adapters/hono";
 * import { useGetApi } from "katanakit-js";
 *
 * const app = useCreateApp();
 *
 * app.get("/pokemon/:id", async (c) => {
 *   const result = await useGetApi("pokeapi", "pokemonById", {
 *     params: { id: c.req.param("id") },
 *   });
 *   return useSafeJson(c, result);
 * });
 *
 * export default app; // Cloudflare Workers / Deno
 * ```
 */
export function useCreateApp(options: HonoAppOptions = {}): Hono {
	const app = new Hono();

	app.use("*", secureHeaders());
	app.use(
		"*",
		cors({
			origin: resolveCorsOrigins(options),
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		}),
	);

	if (options.health ?? true) {
		app.get("/health", (context) =>
			context.json({ status: "ok", timestamp: new Date().toISOString() }),
		);
	}

	app.notFound((context) =>
		context.json({ ok: false, data: null, error: { message: "Not Found", status: 404 } }, 404),
	);

	app.onError((error, context) => {
		useLogger("Unhandled error:", error, "error");
		return context.json(
			{ ok: false, data: null, error: { message: "Internal Server Error", status: 500 } },
			500,
		);
	});

	return app;
}
