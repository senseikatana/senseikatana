import type { AuthClient, BetterAuthClientOptions } from "better-auth/client";
import type { ReactAuthClient } from "better-auth/react";
import type { SolidAuthClient } from "better-auth/solid";
import type { SvelteAuthClient } from "better-auth/svelte";
import type { VueAuthClient } from "better-auth/vue";

import type { SafeResult } from "@/types/index.js";

/** Framework clients shipped by Better Auth — one `createAuthClient` per entry. */
export type AuthFramework = "vanilla" | "react" | "vue" | "svelte" | "solid";

export type { AuthClient, BetterAuthClientOptions };

/** Client type the requested framework's `createAuthClient` returns. */
export type AuthClientFor<
	F extends AuthFramework,
	O extends BetterAuthClientOptions = BetterAuthClientOptions,
> = F extends "vue"
	? VueAuthClient<O>
	: F extends "react"
		? ReactAuthClient<O>
		: F extends "svelte"
			? SvelteAuthClient<O>
			: F extends "solid"
				? SolidAuthClient<O>
				: AuthClient<O>;

export interface AuthClientOptions<
	F extends AuthFramework = "vanilla",
> extends BetterAuthClientOptions {
	/**
	 * Which Better Auth client entry to load.
	 *
	 * @defaultValue `"vanilla"`
	 */
	framework?: F;
}

export type AuthError = { message: string; details?: unknown };
export type AuthResult<T> = SafeResult<T, AuthError>;

/**
 * Creates the Better Auth client for the requested framework, importing only
 * that entry — the other four never reach the bundle.
 *
 * @param options - `BetterAuthClientOptions` (`baseURL`, `plugins`, …) plus `framework`
 * @returns Safe result with the framework's typed client; never throws
 *
 * @example Vue / Nuxt — `lib/auth-client.ts`
 * ```ts
 * import { useAuthClient } from "katanakit-js/adapters/better-auth";
 *
 * export const authClient = await useAuthClient({ framework: "vue" });
 * export const { signIn, signUp, signOut, useSession } = authClient;
 * ```
 *
 * @example React
 * ```ts
 * const authClient = await useAuthClient({ framework: "react", baseURL: "https://auth.example.com" });
 * ```
 *
 * @example Vanilla (Astro island-free pages, plain `<script>`)
 * ```ts
 * const authClient = await useAuthClient();
 * ```
 */
export async function useAuthClient<F extends AuthFramework = "vanilla">(
	options?: AuthClientOptions<F>,
): Promise<AuthResult<AuthClientFor<F>>> {
	const { framework, ...clientOptions } = (options ?? {}) as AuthClientOptions<F> & {
		framework?: F;
	};

	try {
		switch (framework) {
			case "vue": {
				const { createAuthClient } = await import("better-auth/vue");
				return ok(createAuthClient(clientOptions) as AuthClientFor<F>);
			}
			case "react": {
				const { createAuthClient } = await import("better-auth/react");
				return ok(createAuthClient(clientOptions) as AuthClientFor<F>);
			}
			case "svelte": {
				const { createAuthClient } = await import("better-auth/svelte");
				return ok(createAuthClient(clientOptions) as AuthClientFor<F>);
			}
			case "solid": {
				const { createAuthClient } = await import("better-auth/solid");
				return ok(createAuthClient(clientOptions) as AuthClientFor<F>);
			}
			default: {
				const { createAuthClient } = await import("better-auth/client");
				return ok(createAuthClient(clientOptions) as AuthClientFor<F>);
			}
		}
	} catch (cause) {
		return {
			data: null,
			error: {
				message:
					`[BetterAuth] cannot load the "${framework ?? "vanilla"}" client — ` +
					"install it with `bun add better-auth`.",
				details: cause,
			},
			ok: false,
		};
	}
}

function ok<T>(data: T): AuthResult<T> {
	return { data, error: null, ok: true };
}
