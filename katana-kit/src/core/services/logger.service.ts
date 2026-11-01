import type { LogLevel } from "@/types/index.js";

/**
 * LoggerService - Singleton para logging
 * Aplica el patrón Singleton para garantizar una única instancia de logger.
 */
export class LoggerService {
	private static instance: LoggerService;
	/** Optional prefix prepended to every message. Empty = no prefix (default). */
	private context: string;

	/**
	 * Constructor privado - enforce singleton
	 */
	private constructor() {
		this.context = "";
	}

	/**
	 * Obtiene la instancia única del LoggerService (Singleton)
	 */
	static getInstance(): LoggerService {
		if (!LoggerService.instance) {
			LoggerService.instance = new LoggerService();
		}
		return LoggerService.instance;
	}

	/**
	 * Configura el prefijo de contexto. Vacío ("") lo elimina.
	 */
	useSetContext(context: string): void {
		this.context = context;
	}

	/** Builds the effective message: `[context] message` only when a context is set. */
	private useFormat(message: string): string {
		return this.context ? `[${this.context}] ${message}` : message;
	}

	/**
	 * Logs a message with optional data and level.
	 * Maps directly onto the native `console` methods (`log`, `warn`, `error`).
	 *
	 * @param message - The message to log.
	 * @param data - Optional data to attach to the log.
	 * @param level - The log level. Defaults to `"log"`.
	 *
	 * @example
	 * ```ts
	 * import { useLogger } from "katanakit-js";
	 *
	 * useLogger("Application started");
	 * useLogger("Cache miss", undefined, "warn");
	 * useLogger("Database timeout", { query: "SELECT 1" }, "error");
	 * ```
	 */
	useLog(message: string, data?: unknown, level: LogLevel = "log"): void {
		if (data !== undefined) {
			console[level](this.useFormat(message), data);
			return;
		}
		console[level](this.useFormat(message));
	}

	/**
	 * Logs a message at the "warn" level.
	 *
	 * @param message - The message to log.
	 * @param data - Optional data to attach to the log.
	 *
	 * @example
	 * ```ts
	 * useLogWarn("Cache miss", { key: "user:123" });
	 * ```
	 */
	useLogWarn(message: string, data?: unknown): void {
		this.useLog(message, data, "warn");
	}

	/**
	 * Logs a message at the "error" level.
	 *
	 * @param message - The message to log.
	 * @param data - Optional error data to attach to the log.
	 *
	 * @example
	 * ```ts
	 * useLogError("Database timeout", { query: "SELECT 1", duration: 5000 });
	 * ```
	 */
	useLogError(message: string, data?: unknown): void {
		this.useLog(message, data, "error");
	}

	/**
	 * Clears the console.
	 *
	 * @example
	 * ```ts
	 * useLoggerClear();
	 * ```
	 */
	useClear(): void {
		console.clear();
	}

	/**
	 * Displays tabular data in the console.
	 *
	 * @param data - The data to display as a table.
	 *
	 * @example
	 * ```ts
	 * useLoggerTable([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
	 * ```
	 */
	useTable(data: unknown): void {
		console.table(data);
	}
}

/**
 * Wrapper para LoggerService - mantiene backward compatibility
 */
export function useLogger(message: string, data?: unknown, level: LogLevel = "log"): void {
	LoggerService.getInstance().useLog(message, data, level);
}

/**
 * Wrapper para LoggerService - mantiene backward compatibility
 */
export function useLoggerWarn(message: string, data?: unknown): void {
	LoggerService.getInstance().useLogWarn(message, data);
}

/**
 * Wrapper para LoggerService - mantiene backward compatibility
 */
export function useLoggerError(message: string, data?: unknown): void {
	LoggerService.getInstance().useLogError(message, data);
}

/**
 * Wrapper para LoggerService - mantiene backward compatibility
 */
export function useLoggerClear(): void {
	LoggerService.getInstance().useClear();
}

/**
 * Wrapper para LoggerService - mantiene backward compatibility
 */
export function useLoggerTable(data: unknown): void {
	LoggerService.getInstance().useTable(data);
}
