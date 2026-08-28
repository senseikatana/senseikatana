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
