import type { IncomingMessage } from "node:http";

import cors from "cors";
import express, { type Application, type NextFunction, type Request, type Response } from "express";

import { useLogger } from "@/core/services/logger.service.js";

import router from "./router.js";

/** An HTTP request augmented with the raw JSON body captured during parsing. */
type RequestWithRawBody = IncomingMessage & { rawBody?: Buffer };

/**
 * ExpressService - Singleton para el servidor Express.
 *
 * Aplica el patrón Singleton: una única instancia centraliza la creación,
 * configuración de middlewares, rutas, manejo de errores y ciclo de vida del
 * servidor HTTP (start/stop). Idempotente: crear, finalizar y arrancar son
 * operaciones seguras de repetir.
 *
 * @example
 * ```ts
 * const app = ExpressService.getInstance().useCreate();
 * app.use("/assistant", useCreateAssistantRouter());
 * ExpressService.getInstance().useStart(3000, "localhost");
 * ```
 */
export class ExpressService {
	private static instance: ExpressService;

	/** Express application instance. */
	private app: Application | null = null;
	/** Whether the HTTP server has been started. */
	private started = false;
	/** Whether the error handler / 404 catch-all has been registered. */
	private finalized = false;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del ExpressService (Singleton).
	 *
	 * @returns La instancia única de {@link ExpressService}.
	 */
	static getInstance(): ExpressService {
		if (!ExpressService.instance) {
			ExpressService.instance = new ExpressService();
		}
		return ExpressService.instance;
	}

	/**
	 * Returns the raw request body buffer captured by the JSON parser, if any.
	 * Needed to verify webhook signatures (e.g. `X-Hub-Signature-256`).
	 *
	 * @param request - The Express request.
	 * @returns The raw body buffer, or `undefined` when not available.
	 */
	useGetRawBody(request: Request): Buffer | undefined {
		return (request as unknown as RequestWithRawBody).rawBody;
	}

	/**
	 * Set up CORS, JSON body parser and URL-encoded middleware.
	 * The JSON parser also captures the raw body for signature verification.
	 *
	 * @param expressApp - Express application instance
	 *
	 * @example
	 * ```ts
	 * const expressApp = express();
	 * useExpressSetupMiddlewares(expressApp);
	 * ```
	 */
	private useSetupMiddlewares(expressApp: Application): void {
		const origins = (process.env.CORS_ORIGINS?.split(",") ?? ["http://localhost:3000"])
			.map((origin) => origin.trim())
			.filter(Boolean);

		expressApp.use(
			cors({
				origin: origins,
				methods: ["GET", "POST", "PUT", "DELETE"],
			}),
		);
		expressApp.disable("x-powered-by");
		expressApp.use(
			express.json({
				limit: "100kb",
				verify: (req, _res, buf) => {
					(req as RequestWithRawBody).rawBody = buf;
				},
			}),
		);
		expressApp.use(express.urlencoded({ extended: true, limit: "100kb" }));
	}

	/**
	 * Set up health check and application routes.
	 *
	 * @param expressApp - Express application instance
	 *
	 * @example
	 * ```ts
	 * useExpressSetupRoutes(expressApp);
	 * // GET /health returns { status: "ok", timestamp: "..." }
	 * ```
	 */
	private useSetupRoutes(expressApp: Application): void {
		expressApp.get("/health", (_request: Request, response: Response) => {
			return response.json({
				status: "ok",
				timestamp: new Date().toISOString(),
			});
		});

		expressApp.use("/", router);
	}

	/**
	 * Set up global error handling and 404 fallback. Register this AFTER all
	 * channel routers are mounted so it does not shadow them.
	 *
	 * @param expressApp - Express application instance
	 *
	 * @example
	 * ```ts
	 * useExpressSetupErrorHandling(expressApp);
	 * // Unhandled errors return 500, unknown routes return 404
	 * ```
	 */
	private useSetupErrorHandling(expressApp: Application): void {
		expressApp.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
			useLogger("Unhandled error:", err, "error");
			res.status(500).json({ error: "Internal Server Error" });
		});

		expressApp.use((_req: Request, res: Response) => {
			res.status(404).json({ error: "Not Found" });
		});
	}

	/**
	 * Create and configure the Express application. Mount channel routers on the
	 * returned app BEFORE calling {@link useFinalize} / {@link useStart},
	 * otherwise the 404 catch-all will shadow them.
	 *
	 * @returns Configured Express Application instance
	 *
	 * @example
	 * ```ts
	 * const expressApp = ExpressService.getInstance().useCreate();
	 * expressApp.use("/assistant", useCreateAssistantRouter());
	 * ```
	 */
	useCreate(): Application {
		if (this.app) return this.app;

		this.app = express();
		this.useSetupMiddlewares(this.app);
		this.useSetupRoutes(this.app);

		return this.app;
	}

	/**
	 * Registers the error handler and 404 catch-all. Idempotent. Call this after
	 * mounting every channel router so it runs last. {@link useStart}
	 * invokes it automatically.
	 *
	 * @example
	 * ```ts
	 * ExpressService.getInstance().useGetApp().use("/assistant", useCreateAssistantRouter());
	 * ExpressService.getInstance().useFinalize();
	 * ```
	 */
	useFinalize(): void {
		if (this.finalized) return;
		this.finalized = true;
		this.useSetupErrorHandling(this.useCreate());
	}

	/**
	 * Start the Express HTTP server. Idempotent - subsequent calls are no-ops.
	 * Finalizes error handling before listening.
	 *
	 * @param port - Port to listen on (default: 3000)
	 * @param host - Host to bind to (default: "localhost")
	 *
	 * @example
	 * ```ts
	 * ExpressService.getInstance().useStart(3000, "localhost");
	 * // Server running on http://localhost:3000
	 * ```
	 */
	useStart(port = 3000, host = "localhost"): void {
		if (this.started) return;
		this.started = true;

		this.useFinalize();
		const expressApp = this.useCreate();

		expressApp.listen(port, host, () => {
			useLogger(`Server running on http://${host}:${port}`);
		});
	}

	/**
	 * Get the Express application instance. Creates it if it doesn't exist.
	 *
	 * @returns Express Application instance
	 *
	 * @example
	 * ```ts
	 * const expressApp = ExpressService.getInstance().useGetApp();
	 * expressApp.get("/custom", (req, res) => res.json({ ok: true }));
	 * ```
	 */
	useGetApp(): Application {
		return this.useCreate();
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Returns the raw request body buffer captured by the JSON parser, if any.
 * Needed to verify webhook signatures (e.g. `X-Hub-Signature-256`).
 *
 * @param request - The Express request.
 * @returns The raw body buffer, or `undefined` when not available.
 */
export function useGetRawBody(request: Request): Buffer | undefined {
	return ExpressService.getInstance().useGetRawBody(request);
}

/**
 * Create and configure the Express application. Mount channel routers on the
 * returned app BEFORE calling {@link useExpressFinalize} / {@link useExpressStart},
 * otherwise the 404 catch-all will shadow them.
 *
 * @returns Configured Express Application instance
 *
 * @example
 * ```ts
 * const expressApp = useExpressCreate();
 * expressApp.use("/assistant", useCreateAssistantRouter());
 * useExpressStart();
 * ```
 */
export const useExpressCreate = (): Application => ExpressService.getInstance().useCreate();

/**
 * Registers the error handler and 404 catch-all. Idempotent. Call this after
 * mounting every channel router so it runs last. {@link useExpressStart}
 * invokes it automatically.
 *
 * @example
 * ```ts
 * useExpressGetApp().use("/assistant", useCreateAssistantRouter());
 * useExpressFinalize();
 * ```
 */
export const useExpressFinalize = (): void => ExpressService.getInstance().useFinalize();

/**
 * Start the Express HTTP server. Idempotent - subsequent calls are no-ops.
 * Finalizes error handling before listening.
 *
 * @param port - Port to listen on (default: 3000)
 * @param host - Host to bind to (default: "localhost")
 *
 * @example
 * ```ts
 * useExpressStart(3000, "localhost");
 * // Server running on http://localhost:3000
 * ```
 */
export const useExpressStart = (port = 3000, host = "localhost"): void =>
	ExpressService.getInstance().useStart(port, host);

/**
 * Get the Express application instance. Creates it if it doesn't exist.
 *
 * @returns Express Application instance
 *
 * @example
 * ```ts
 * const expressApp = useExpressGetApp();
 * expressApp.get("/custom", (req, res) => res.json({ ok: true }));
 * ```
 */
export const useExpressGetApp = (): Application => ExpressService.getInstance().useGetApp();
