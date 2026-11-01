import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import type { FetchResult } from "@/types/index.js";

/**
 * Maps a KatanaKit Safe Result to a Hono JSON response.
 *
 * On success returns the whole Safe Result (`{ ok: true, data, error: null }`)
 * with a 200. On failure it echoes the upstream HTTP status when the error
 * carries one between 400 and 599 (proxy-style endpoints keep 404/429/503
 * semantics); network and config errors (`status: 0`) fall back to
 * `fallbackStatus` (500 by default).
 *
 * @param context - The Hono context.
 * @param result - The Safe Result from any KatanaKit fetch method.
 * @param fallbackStatus - Status used when the error has none (default 500).
 * @returns A Hono JSON response.
 *
 * @example
 * ```ts
 * import { useSafeJson } from "katanakit-js/adapters/hono";
 * import { useGetApi } from "katanakit-js";
 *
 * app.get("/products/:id", async (c) => {
 *   const result = await useGetApi("shop", "productById", {
 *     params: { id: c.req.param("id") },
 *   });
 *   return useSafeJson(c, result); // 200, upstream 4xx/5xx, or 500
 * });
 * ```
 */
export function useSafeJson<T>(
	context: Context,
	result: FetchResult<T>,
	fallbackStatus: ContentfulStatusCode = 500,
): Response {
	if (result.ok) {
		return context.json(result, 200);
	}

	const status =
		result.error.status >= 400 && result.error.status <= 599
			? (result.error.status as ContentfulStatusCode)
			: fallbackStatus;

	return context.json(result, status);
}
