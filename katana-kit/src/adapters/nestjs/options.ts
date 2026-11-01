import type { QueryClientConfig } from "@tanstack/query-core";

import type { ApisConfig } from "@/types/index.js";

/**
 * Injection token for the options passed to `KatanaKitModule.forRoot()`.
 * Exported so advanced setups can provide it manually.
 */
export const KATANA_KIT_OPTIONS = Symbol("KATANA_KIT_OPTIONS");

/** Options accepted by `KatanaKitModule.forRoot()`. */
export interface KatanaKitModuleOptions {
	/** APIs registered once during module initialization (same shape as `defineApiConfig`). */
	apis?: ApisConfig;
	/** Initializes the shared TanStack Query client with this configuration. */
	queryClient?: QueryClientConfig;
	/** Registers the module globally (default `true`). */
	global?: boolean;
}
