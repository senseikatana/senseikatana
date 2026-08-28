// utils/env.utils.ts
import { LOGGER } from "../services/logger.service";

/**
 * Declared Vite environment variables.
 * Extend this interface in your project to add type-safe access to your env vars.
 *
 * @example
 * ```typescript
 * // In your project's env.d.ts or similar
 * declare module "./env.utils" {
 *   interface ViteEnvVars {
 *     VITE_API_URL: string;
 *     VITE_APP_TITLE: string;
 *   }
 * }
 * ```
 */
export interface ViteEnvVars {
	DEV: boolean;
	PROD: boolean;
	MODE: string;
	BASE_URL: string;
	SSR: boolean;
	[key: string]: unknown;
}

/**
 * Declared Node environment variables.
 */
export interface NodeEnvVars {
	NODE_ENV?: "development" | "production" | "test";
	[key: string]: string | undefined;
}

/**
 * Utility class for accessing environment variables safely in both Vite and Node environments.
 * Provides type-safe access with fallback values.
 *
 * @example
 * ```typescript
 * // In Vite project
 * const apiUrl = EnvUtils.vite('VITE_API_URL', 'http://localhost:3000');
 * const isDev = EnvUtils.isDev();
 *
 * // In Node project
 * const port = EnvUtils.node('PORT', '3000');
 * ```
 */
export class EnvUtils {
	private constructor() {}

	/**
	 * Checks if running in a Vite environment.
	 */
	static isVite(): boolean {
		return typeof import.meta !== "undefined" && "env" in import.meta;
	}

	/**
	 * Checks if running in a Node/Bun environment.
	 */
	static isNode(): boolean {
		return typeof process !== "undefined" && typeof process.env === "object";
	}

	/**
	 * Checks if the app is running in browser (not SSR).
	 */
	static isBrowser(): boolean {
		return typeof window !== "undefined";
	}

	/**
	 * Checks if running in development mode.
	 */
	static isDev(): boolean {
		if (this.isVite()) {
			return (import.meta as unknown as { env: ViteEnvVars }).env.DEV === true;
		}
		if (this.isNode()) {
			return process.env.NODE_ENV === "development";
		}
		return false;
	}

	/**
	 * Checks if running in production mode.
	 */
	static isProd(): boolean {
		if (this.isVite()) {
			return (import.meta as unknown as { env: ViteEnvVars }).env.PROD === true;
		}
		if (this.isNode()) {
			return process.env.NODE_ENV === "production";
		}
		return false;
	}

	/**
	 * Checks if running in test mode.
	 */
	static isTest(): boolean {
		if (this.isNode()) {
			return process.env.NODE_ENV === "test";
		}
		return false;
	}

	/**
	 * Gets a Vite environment variable with optional fallback.
	 * Only works in Vite projects (import.meta.env).
	 *
	 * @param key - Environment variable name
	 * @param fallback - Fallback value if not defined
	 * @returns The value, fallback, or undefined
	 *
	 * @example
	 * ```typescript
	 * const apiUrl = EnvUtils.vite('VITE_API_URL', 'http://localhost:3000');
	 * const mode = EnvUtils.vite('MODE'); // may be undefined
	 * ```
	 */
	static vite<K extends keyof ViteEnvVars>(
		key: K,
		fallback?: ViteEnvVars[K],
	): ViteEnvVars[K] | undefined;
	static vite(key: string, fallback?: unknown): unknown {
		if (!this.isVite()) {
			LOGGER("[EnvUtils.vite] Not in Vite environment", "warn");
			return fallback;
		}

		const value = (import.meta as unknown as { env: Record<string, unknown> }).env[key];
		return value !== undefined ? value : fallback;
	}

	/**
	 * Gets a Node environment variable with optional fallback.
	 * Only works in Node/Bun projects (process.env).
	 *
	 * @param key - Environment variable name
	 * @param fallback - Fallback value if not defined
	 * @returns The value, fallback, or undefined
	 *
	 * @example
	 * ```typescript
	 * const port = EnvUtils.node('PORT', '3000');
	 * const dbUrl = EnvUtils.node('DATABASE_URL');
	 * ```
	 */
	static node(key: string, fallback?: string): string | undefined {
		if (!this.isNode()) {
			LOGGER("[EnvUtils.node] Not in Node environment", "warn");
			return fallback;
		}

		const value = process.env[key];
		return value !== undefined ? value : fallback;
	}

	/**
	 * Gets an environment variable from any available source (Vite or Node).
	 * Tries Vite first, then Node.
	 *
	 * @param key - Environment variable name
	 * @param fallback - Fallback value
	 */
	static get(key: string, fallback?: string): string | undefined {
		if (this.isVite()) {
			const value = this.vite(key);
			if (value !== undefined) return String(value);
		}
		if (this.isNode()) {
			const value = this.node(key);
			if (value !== undefined) return value;
		}
		return fallback;
	}

	/**
	 * Requires an environment variable - throws if not defined.
	 * Use for critical configuration that must be present.
	 *
	 * @param key - Environment variable name
	 * @param source - Source to check: 'vite', 'node', or 'auto'
	 * @throws Error if variable is not defined
	 *
	 * @example
	 * ```typescript
	 * const apiKey = EnvUtils.require('VITE_API_KEY', 'vite');
	 * const dbUrl = EnvUtils.require('DATABASE_URL', 'node');
	 * ```
	 */
	static require(
		key: string,
		source: "vite" | "node" | "auto" = "auto",
	): string {
		let value: unknown;

		if (source === "vite" || source === "auto") {
			value = this.vite(key);
		}
		if ((source === "node" || source === "auto") && value === undefined) {
			value = this.node(key);
		}

		if (value === undefined || value === "") {
			const error = new Error(`Required environment variable "${key}" is not defined`);
			LOGGER(`[EnvUtils.require] ${error.message}`, "error");
			throw error;
		}

		return String(value);
	}

	/**
	 * Gets the current mode string.
	 */
	static getMode(): string {
		if (this.isVite()) {
			return String(this.vite("MODE") ?? "development");
		}
		if (this.isNode()) {
			return process.env.NODE_ENV ?? "development";
		}
		return "unknown";
	}

	/**
	 * Gets all Vite env variables (only in Vite environment).
	 */
	static allVite(): Partial<ViteEnvVars> {
		if (!this.isVite()) return {};
		return { ...(import.meta as unknown as { env: ViteEnvVars }).env };
	}

	/**
	 * Gets all Node env variables (only in Node environment).
	 */
	static allNode(): NodeEnvVars {
		if (!this.isNode()) return {};
		return { ...process.env };
	}
}

// Export convenience aliases
export const {
	isVite,
	isNode,
	isBrowser,
	isDev,
	isProd,
	isTest,
	vite,
	node,
	get,
	require,
	getMode,
} = EnvUtils;