import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { QueryClient } from "@tanstack/query-core";

import { FetchApiManager } from "@/core/services/http.service.js";
import { useInitQueryClient, useQueryClient } from "@/core/services/query.service.js";
import type { ApisConfig, FetchOptions, FetchResult, UrlOptions } from "@/types/index.js";

import { KATANA_KIT_OPTIONS, type KatanaKitModuleOptions } from "./options.js";

/**
 * Injectable facade over the KatanaKit HTTP client for NestJS providers.
 *
 * It exists so backend services never reach for module-level singletons
 * directly: inject `KatanaKitService` and call the same `use*` methods you use
 * anywhere else. Every call returns a Safe Result (`{ data, error, ok }`), so
 * Nest exception filters stay in charge of mapping failures to HTTP responses.
 *
 * `onModuleInit()` registers the APIs and the optional query client passed to
 * {@link KatanaKitModuleOptions}; calling those setters stays idempotent.
 *
 * @example
 * ```ts
 * import { Injectable } from "@nestjs/common";
 * import { KatanaKitService } from "katanakit-js/adapters/nestjs";
 *
 * @Injectable()
 * export class PokemonService {
 *   constructor(private readonly kit: KatanaKitService) {}
 *
 *   findById(id: number) {
 *     return this.kit.useGet<{ name: string }>("pokeapi", "pokemonById", { params: { id } });
 *   }
 * }
 * ```
 */
@Injectable()
export class KatanaKitService implements OnModuleInit {
	private initialized = false;

	constructor(
		@Inject(KATANA_KIT_OPTIONS)
		private readonly options: KatanaKitModuleOptions = {},
	) {}

	/** Registers `apis` and `queryClient` (when provided) exactly once. */
	onModuleInit(): void {
		if (this.initialized) return;
		if (this.options.apis) FetchApiManager.getInstance().useInit(this.options.apis);
		if (this.options.queryClient) useInitQueryClient(this.options.queryClient);
		this.initialized = true;
	}

	/** Registers APIs without going through the module (idempotent per entry). */
	useInit(apisConfig: ApisConfig): void {
		FetchApiManager.getInstance().useInit(apisConfig);
	}

	/** Returns the registered API map (base URIs, endpoints, default query). */
	useGetApis(): ApisConfig {
		return FetchApiManager.getInstance().useGetApis();
	}

	/** Builds a full URL for a registered endpoint without performing a request. */
	useBuildUrl(apiName: string, endpointName: string, options?: UrlOptions): string {
		return FetchApiManager.getInstance().useBuildUrl(apiName, endpointName, options);
	}

	/** Performs a request with any HTTP method and returns a Safe Result. */
	useFetch<T = unknown>(
		apiName: string,
		endpointName: string,
		options?: FetchOptions<T>,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().useFetch<T>(apiName, endpointName, options);
	}

	/** GET helper over a registered endpoint. */
	useGet<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().useGet<T>(apiName, endpointName, urlOptions);
	}

	/** POST helper; the body is JSON-serialized unless it is already raw. */
	usePost<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().usePost<T>(apiName, endpointName, body, urlOptions);
	}

	/** PUT helper; the body is JSON-serialized unless it is already raw. */
	usePut<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().usePut<T>(apiName, endpointName, body, urlOptions);
	}

	/** PATCH helper; the body is JSON-serialized unless it is already raw. */
	usePatch<T = unknown>(
		apiName: string,
		endpointName: string,
		body?: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().usePatch<T>(apiName, endpointName, body, urlOptions);
	}

	/** DELETE helper over a registered endpoint. */
	useDelete<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return FetchApiManager.getInstance().useDelete<T>(apiName, endpointName, urlOptions);
	}

	/** The shared TanStack Query client (created on first access when not initialized). */
	useQueryClient(): QueryClient {
		return useQueryClient();
	}
}
