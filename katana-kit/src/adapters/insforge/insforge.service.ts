import { createAdminClient, createClient, type InsForgeClient } from "@insforge/sdk";

import { useSplitConfig } from "@/core/services/utils.service.js";
import { useValidate } from "@/core/services/validation.service.js";
import {
	IfBucketSchema,
	IfConfigSchema,
	IfInsertRowsSchema,
	IfInvokeOptionsSchema,
	IfListOptionsSchema,
	IfRpcCallSchema,
	IfStorageRefSchema,
	IfTableNameSchema,
	IfTableQuerySchema,
	IfUpdatePatchSchema,
	IfWriteQuerySchema,
} from "@/schemas/insforge.schema.js";
import type {
	ApiError,
	ConfigFacade,
	FetchResult,
	IfConfig,
	IfInsertRows,
	IfInvokeOptions,
	IfListOptions,
	IfRpcCall,
	IfStorageRef,
	IfTableQuery,
	IfUpdatePatch,
	IfWriteQuery,
} from "@/types/index.js";

/** Outcome envelope returned by awaitable PostgREST builders. */
interface IfOutcome {
	data: unknown;
	error: unknown;
	count?: number | null;
}

/**
 * Minimal chainable PostgREST builder surface used by the wrappers.
 * The SDK's native generics are intentionally opaque here to keep the
 * chain helper readable and `any`-free.
 */
interface IfBuilder extends PromiseLike<IfOutcome> {
	select(columns?: string): IfBuilder;
	eq(column: string, value: string | number | boolean): IfBuilder;
	order(column: string, options: { ascending: boolean }): IfBuilder;
	limit(count: number): IfBuilder;
	range(from: number, to: number): IfBuilder;
}

/** Minimal database module surface (supports per-query schema scoping). */
interface IfDatabaseModule {
	from(table: string): {
		select(columns?: string): IfBuilder;
		insert(rows: unknown): IfBuilder;
		update(patch: Record<string, unknown>): IfBuilder;
		delete(): IfBuilder;
	};
	rpc(fn: string, args: Record<string, unknown>): PromiseLike<IfOutcome>;
	schema(name: string): IfDatabaseModule;
}

/**
 * Maps an SDK error (InsForgeError or unknown throw) to the shared `ApiError`.
 *
 * @param error - Error thrown or returned by the SDK.
 * @returns Normalized `ApiError`.
 */
function errorFrom(error: unknown): ApiError {
	if (error && typeof error === "object" && "message" in error) {
		const record = error as { message?: unknown; name?: unknown; statusCode?: unknown };
		const message = typeof record.message === "string" ? record.message : "InsForge error";
		const status = typeof record.statusCode === "number" ? record.statusCode : 0;
		// Never attach the live SDK error object (it can carry request/header internals).
		return {
			message,
			status,
			details: {
				name: typeof record.name === "string" ? record.name : "InsForgeError",
				message,
				statusCode: status,
			},
		};
	}
	return { message: String(error), status: 0, details: { message: String(error) } };
}

/**
 * Builds a failed Safe Result from an SDK error.
 *
 * @param error - Error to map.
 * @returns `FetchResult<T>` failure branch.
 */
function fail<T>(error: unknown): FetchResult<T> {
	const mapped = errorFrom(error);
	return { data: null, error: mapped, url: "", status: mapped.status, ok: false };
}

/**
 * Runs an InsForge operation, mapping thrown values and awaited SDK outcomes
 * into a `FetchResult`. This is the single `try/catch` for the adapter.
 *
 * @param operation - Operation returning the success value; throw SDK errors.
 * @param status - HTTP-like status for the success branch (default: `200`).
 * @returns Safe Result with the normalized error on failure.
 */
async function run<T>(operation: () => Promise<T>, status = 200): Promise<FetchResult<T>> {
	try {
		return { data: await operation(), error: null, url: "", status, ok: true };
	} catch (err: unknown) {
		return fail<T>(err);
	}
}

/**
 * Builds a 400 Safe Result from a failed input validation.
 *
 * @param parsed - Failed validation result.
 * @returns `FetchResult<T>` failure branch.
 */
function invalidInput<T>(parsed: { error: ApiError }): FetchResult<T> {
	return { data: null, error: parsed.error, url: "", status: 400, ok: false };
}

/**
 * Builds the not-configured failure branch.
 *
 * @returns `FetchResult<T>` failure branch.
 */
function notConfigured<T>(): FetchResult<T> {
	return {
		data: null,
		error: { message: "[InsForge] Not configured. Call defineInsforgeConfig() first.", status: 0 },
		url: "",
		status: 0,
		ok: false,
	};
}

/**
 * Applies equality filters to a builder chain.
 *
 * @param builder - Awaitable PostgREST builder.
 * @param filters - Equality filters (`column: value`).
 * @returns The filtered builder.
 */
function applyFilters(
	builder: IfBuilder,
	filters?: Record<string, string | number | boolean>,
): IfBuilder {
	let current = builder;
	for (const [column, value] of Object.entries(filters ?? {})) {
		current = current.eq(column, value);
	}
	return current;
}

/**
 * Resolves the database module, honoring a per-query schema override.
 *
 * @param database - Base database module from the SDK client.
 * @param schema - Optional schema override.
 * @returns The database module to use.
 */
function scopedDatabase(database: unknown, schema?: string): IfDatabaseModule {
	if (schema) {
		return (database as IfDatabaseModule).schema(schema);
	}
	return database as IfDatabaseModule;
}

/**
 * InsForgeService - Singleton para el cliente InsForge (fallback de base de datos).
 *
 * Aplica el patrón Singleton: una única instancia mantiene el
 * {@link InsForgeClient} y centraliza las operaciones de tabla, RPC,
 * storage y edge functions, devolviendo siempre Safe Results.
 *
 * @example
 * ```ts
 * const insforge = InsForgeService.getInstance();
 * insforge.useInit({ baseUrl: "https://app.insforge.app", anonKey: "…" });
 * const result = await insforge.useSelect({ table: "posts" });
 * ```
 */
export class InsForgeService {
	private static instance: InsForgeService;

	/** InsForge client. InsForge is the database fallback, not the default. */
	private client: InsForgeClient | null = null;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del InsForgeService (Singleton).
	 *
	 * @returns La instancia única de {@link InsForgeService}.
	 */
	static getInstance(): InsForgeService {
		if (!InsForgeService.instance) {
			InsForgeService.instance = new InsForgeService();
		}
		return InsForgeService.instance;
	}

	/**
	 * Registers the InsForge client. Call once per app. Prefer `apiKey`
	 * (server-only, admin) or `anonKey` (browser-safe) depending on the runtime.
	 *
	 * @param config - Backend URL + credentials + optional schema.
	 * @throws {Error} If the config fails validation.
	 *
	 * @example
	 * ```ts
	 * InsForgeService.getInstance().useInit({ baseUrl: "https://app.insforge.app", anonKey: "…" });
	 * ```
	 */
	useInit(config: IfConfig): void {
		const parsed = useValidate(IfConfigSchema, config);
		if (!parsed.ok) {
			throw new Error(`[InsForge] Invalid config: ${parsed.error.message}`);
		}
		const { baseUrl, anonKey, apiKey, accessToken, schema } = parsed.data;
		this.client = apiKey
			? createAdminClient({ baseUrl, apiKey })
			: createClient({
					baseUrl,
					...(anonKey !== undefined ? { anonKey } : {}),
					...(accessToken !== undefined ? { accessToken } : {}),
					...(schema !== undefined ? { db: { schema } } : {}),
				});
	}

	/**
	 * Returns the initialized client (or `null` before `useInit`).
	 * Exposed for advanced use - the wrappers cover the supported surface.
	 *
	 * @returns The InsForge client or `null`.
	 */
	useGetClient(): InsForgeClient | null {
		return this.client;
	}

	/**
	 * Reads rows from a table with equality filters, ordering and pagination.
	 *
	 * @param query - Table, columns, filters, order, limit and offset.
	 * @returns Safe Result with the rows.
	 */
	async useSelect<T = Record<string, unknown>>(query: IfTableQuery): Promise<FetchResult<T[]>> {
		const parsed = useValidate(IfTableQuerySchema, query);
		if (!parsed.ok) return invalidInput<T[]>(parsed);
		if (!this.client) return notConfigured<T[]>();

		const db = this.client;
		return run<T[]>(async () => {
			const database = scopedDatabase(db.database, parsed.data.schema);
			let builder = database.from(parsed.data.table).select(parsed.data.columns ?? "*");
			builder = applyFilters(builder, parsed.data.filters);
			if (parsed.data.order) {
				builder = builder.order(parsed.data.order.column, {
					ascending: parsed.data.order.ascending ?? true,
				});
			}
			if (parsed.data.limit !== undefined) builder = builder.limit(parsed.data.limit);
			if (parsed.data.offset !== undefined) {
				const from = parsed.data.offset;
				builder = builder.range(from, from + (parsed.data.limit ?? 100) - 1);
			}
			const outcome = await builder;
			if (outcome.error) throw outcome.error;
			return (outcome.data ?? []) as T[];
		});
	}

	/**
	 * Inserts one or more rows and returns the created rows.
	 *
	 * @param table - Table name.
	 * @param rows - Rows to insert (at least one).
	 * @param schema - Optional schema override.
	 * @returns Safe Result with the inserted rows.
	 */
	async useInsert<T = Record<string, unknown>>(
		table: string,
		rows: IfInsertRows,
		schema?: string,
	): Promise<FetchResult<T[]>> {
		const tableParsed = useValidate(IfTableNameSchema, table);
		if (!tableParsed.ok) return invalidInput<T[]>(tableParsed);
		const rowsParsed = useValidate(IfInsertRowsSchema, rows);
		if (!rowsParsed.ok) return invalidInput<T[]>(rowsParsed);
		if (!this.client) return notConfigured<T[]>();

		const db = this.client;
		return run<T[]>(async () => {
			const database = scopedDatabase(db.database, schema);
			const builder = database.from(tableParsed.data).insert(rowsParsed.data);
			const outcome = await builder.select("*");
			if (outcome.error) throw outcome.error;
			return (outcome.data ?? []) as T[];
		}, 201);
	}

	/**
	 * Updates rows matching the filters and returns the updated rows.
	 * Filters are REQUIRED - mass updates are refused at validation time.
	 *
	 * @param query - Table + mandatory filters (+ optional schema).
	 * @param patch - Column patch (must not be empty).
	 * @returns Safe Result with the updated rows.
	 */
	async useUpdate<T = Record<string, unknown>>(
		query: IfWriteQuery,
		patch: IfUpdatePatch,
	): Promise<FetchResult<T[]>> {
		const queryParsed = useValidate(IfWriteQuerySchema, query);
		if (!queryParsed.ok) return invalidInput<T[]>(queryParsed);
		const patchParsed = useValidate(IfUpdatePatchSchema, patch);
		if (!patchParsed.ok) return invalidInput<T[]>(patchParsed);
		if (Object.keys(patchParsed.data).length === 0) {
			return {
				data: null,
				error: { message: "Validation Error: patch must not be empty", status: 400 },
				url: "",
				status: 400,
				ok: false,
			};
		}
		if (!this.client) return notConfigured<T[]>();

		const db = this.client;
		return run<T[]>(async () => {
			const database = scopedDatabase(db.database, queryParsed.data.schema);
			const updateBuilder = database.from(queryParsed.data.table).update(patchParsed.data);
			const filtered = applyFilters(updateBuilder, queryParsed.data.filters);
			const outcome = await filtered.select("*");
			if (outcome.error) throw outcome.error;
			return (outcome.data ?? []) as T[];
		});
	}

	/**
	 * Deletes rows matching the filters and returns the deleted rows.
	 * Filters are REQUIRED - mass deletes are refused at validation time.
	 *
	 * @param query - Table + mandatory filters (+ optional schema).
	 * @returns Safe Result with the deleted rows.
	 */
	async useDelete<T = Record<string, unknown>>(query: IfWriteQuery): Promise<FetchResult<T[]>> {
		const parsed = useValidate(IfWriteQuerySchema, query);
		if (!parsed.ok) return invalidInput<T[]>(parsed);
		if (!this.client) return notConfigured<T[]>();

		const db = this.client;
		return run<T[]>(async () => {
			const database = scopedDatabase(db.database, parsed.data.schema);
			const deleteBuilder = database.from(parsed.data.table).delete();
			const filtered = applyFilters(deleteBuilder, parsed.data.filters);
			const outcome = await filtered.select("*");
			if (outcome.error) throw outcome.error;
			return (outcome.data ?? []) as T[];
		});
	}

	/**
	 * Calls a Postgres function (RPC).
	 *
	 * @param call - Function name, params and optional schema.
	 * @returns Safe Result with the function output.
	 */
	async useRpc<T = unknown>(call: IfRpcCall): Promise<FetchResult<T>> {
		const parsed = useValidate(IfRpcCallSchema, call);
		if (!parsed.ok) return invalidInput<T>(parsed);
		if (!this.client) return notConfigured<T>();

		const db = this.client;
		return run<T>(async () => {
			const database = scopedDatabase(db.database, parsed.data.schema);
			const outcome = await database.rpc(parsed.data.name, parsed.data.params ?? {});
			if (outcome.error) throw outcome.error;
			return outcome.data as T;
		});
	}

	/**
	 * Uploads a file to a bucket (standard PUT semantics: same key replaces).
	 *
	 * @param ref - Bucket + object key.
	 * @param file - File or Blob to upload.
	 * @returns Safe Result with the stored file metadata.
	 */
	async useUpload(
		ref: IfStorageRef,
		file: File | Blob,
	): Promise<FetchResult<Record<string, unknown>>> {
		const parsed = useValidate(IfStorageRefSchema, ref);
		if (!parsed.ok) return invalidInput<Record<string, unknown>>(parsed);
		if (!this.client) return notConfigured<Record<string, unknown>>();

		const db = this.client;
		return run<Record<string, unknown>>(async () => {
			const { data, error } = await db.storage.from(parsed.data.bucket).upload(parsed.data.path, file);
			if (error) throw error;
			return (data ?? {}) as unknown as Record<string, unknown>;
		});
	}

	/**
	 * Downloads a file from a bucket.
	 *
	 * @param ref - Bucket + object key.
	 * @returns Safe Result with the file as a Blob.
	 */
	async useDownload(ref: IfStorageRef): Promise<FetchResult<Blob>> {
		const parsed = useValidate(IfStorageRefSchema, ref);
		if (!parsed.ok) return invalidInput<Blob>(parsed);
		if (!this.client) return notConfigured<Blob>();

		const db = this.client;
		const result = await run<Blob | null>(async () => {
			const { data, error } = await db.storage.from(parsed.data.bucket).download(parsed.data.path);
			if (error) throw error;
			return data;
		});
		if (!result.ok) return result;
		if (!result.data) {
			return {
				data: null,
				error: { message: "InsForge Error: object not found", status: 404 },
				url: "",
				status: 404,
				ok: false,
			};
		}
		return { data: result.data, error: null, url: "", status: 200, ok: true };
	}

	/**
	 * Removes a file from a bucket.
	 *
	 * @param ref - Bucket + object key.
	 * @returns Safe Result with the deletion response.
	 */
	async useRemove(ref: IfStorageRef): Promise<FetchResult<Record<string, unknown>>> {
		const parsed = useValidate(IfStorageRefSchema, ref);
		if (!parsed.ok) return invalidInput<Record<string, unknown>>(parsed);
		if (!this.client) return notConfigured<Record<string, unknown>>();

		const db = this.client;
		return run<Record<string, unknown>>(async () => {
			const { data, error } = await db.storage.from(parsed.data.bucket).remove(parsed.data.path);
			if (error) throw error;
			return (data ?? {}) as unknown as Record<string, unknown>;
		});
	}

	/**
	 * Lists objects in a bucket.
	 *
	 * @param bucket - Bucket name.
	 * @param options - Prefix, search, limit and offset.
	 * @returns Safe Result with the listing.
	 */
	async useListObjects(
		bucket: string,
		options?: IfListOptions,
	): Promise<FetchResult<Record<string, unknown>>> {
		const bucketParsed = useValidate(IfBucketSchema, bucket);
		if (!bucketParsed.ok) return invalidInput<Record<string, unknown>>(bucketParsed);
		const optionsParsed = useValidate(IfListOptionsSchema, options ?? {});
		if (!optionsParsed.ok) return invalidInput<Record<string, unknown>>(optionsParsed);
		if (!this.client) return notConfigured<Record<string, unknown>>();

		const db = this.client;
		return run<Record<string, unknown>>(async () => {
			const { data, error } = await db.storage.from(bucketParsed.data).list(optionsParsed.data);
			if (error) throw error;
			return (data ?? {}) as unknown as Record<string, unknown>;
		});
	}

	/**
	 * Builds the public URL for an object in a public bucket (no network call).
	 *
	 * @param ref - Bucket + object key.
	 * @returns Safe Result with `{ publicUrl }`.
	 */
	useGetPublicUrl(ref: IfStorageRef): FetchResult<{ publicUrl: string }> {
		const parsed = useValidate(IfStorageRefSchema, ref);
		if (!parsed.ok) return invalidInput<{ publicUrl: string }>(parsed);
		if (!this.client) return notConfigured<{ publicUrl: string }>();

		const { data, error } = this.client.storage
			.from(parsed.data.bucket)
			.getPublicUrl(parsed.data.path);
		if (error) return fail<{ publicUrl: string }>(error);
		if (!data) {
			return {
				data: null,
				error: { message: "InsForge Error: public URL unavailable", status: 404 },
				url: "",
				status: 404,
				ok: false,
			};
		}
		return { data, error: null, url: "", status: 200, ok: true };
	}

	/**
	 * Invokes an edge function.
	 *
	 * @param options - Function slug + optional JSON body.
	 * @returns Safe Result with the function response.
	 */
	async useInvokeFunction<T = unknown>(options: IfInvokeOptions): Promise<FetchResult<T>> {
		const parsed = useValidate(IfInvokeOptionsSchema, options);
		if (!parsed.ok) return invalidInput<T>(parsed);
		if (!this.client) return notConfigured<T>();

		const db = this.client;
		return run<T>(async () => {
			const { data, error } = await db.functions.invoke<T>(parsed.data.name, {
				body: parsed.data.body,
			});
			if (error) throw error;
			return data as T;
		});
	}
}

/* -------------------------------------------------------------------------- */
/* Initialization                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Registers the InsForge client and returns your methods alongside it - the
 * config-file entry point. One call is the whole setup: no separate
 * `useInitInsforge(...)` step.
 *
 * Prefer `apiKey` (server-only, admin) or `anonKey` (browser-safe) depending
 * on the runtime. Declare methods with `function` (never arrows) so
 * `this.config` resolves to the config you declared.
 *
 * @typeParam T - The literal passed in: InsForge config plus any methods.
 * @param input - Backend URL + credentials + optional schema, plus your methods.
 * @returns The declared config plus your methods (see {@link ConfigFacade}).
 * @throws {Error} If the config fails validation.
 *
 * @example
 * ```ts
 * import { defineInsforgeConfig } from "katanakit-js/adapters/insforge";
 *
 * export default defineInsforgeConfig({
 *   baseUrl: "https://app.insforge.app",
 *   anonKey: "…",
 *   listUsers: async function () {
 *     return useIfSelect("users");
 *   },
 * });
 * ```
 */
export function defineInsforgeConfig<T extends IfConfig>(
	input: T & ThisType<ConfigFacade<T>>,
): ConfigFacade<T> {
	const { config, methods } = useSplitConfig(input);
	// Zod strips the method entries, so the whole literal is safe to validate.
	InsForgeService.getInstance().useInit(input as never);
	return { config, ...methods } as ConfigFacade<T>;
}

/**
 * Returns the initialized client (or `null` before init).
 * Exposed for advanced use - the wrappers cover the supported surface.
 *
 * @returns The InsForge client or `null`.
 */
export function useGetInsforgeClient(): InsForgeClient | null {
	return InsForgeService.getInstance().useGetClient();
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Reads rows from a table with equality filters, ordering and pagination.
 *
 * @param query - Table, columns, filters, order, limit and offset.
 * @returns Safe Result with the rows.
 *
 * @example
 * ```ts
 * const result = await useIfSelect<Post>({ table: "posts", filters: { author_id: 7 } });
 * ```
 */
export async function useIfSelect<T = Record<string, unknown>>(
	query: IfTableQuery,
): Promise<FetchResult<T[]>> {
	return InsForgeService.getInstance().useSelect<T>(query);
}

/**
 * Inserts one or more rows and returns the created rows.
 *
 * @param table - Table name.
 * @param rows - Rows to insert (at least one).
 * @param schema - Optional schema override.
 * @returns Safe Result with the inserted rows.
 */
export async function useIfInsert<T = Record<string, unknown>>(
	table: string,
	rows: IfInsertRows,
	schema?: string,
): Promise<FetchResult<T[]>> {
	return InsForgeService.getInstance().useInsert<T>(table, rows, schema);
}

/**
 * Updates rows matching the filters and returns the updated rows.
 * Filters are REQUIRED - mass updates are refused at validation time.
 *
 * @param query - Table + mandatory filters (+ optional schema).
 * @param patch - Column patch (must not be empty).
 * @returns Safe Result with the updated rows.
 */
export async function useIfUpdate<T = Record<string, unknown>>(
	query: IfWriteQuery,
	patch: IfUpdatePatch,
): Promise<FetchResult<T[]>> {
	return InsForgeService.getInstance().useUpdate<T>(query, patch);
}

/**
 * Deletes rows matching the filters and returns the deleted rows.
 * Filters are REQUIRED - mass deletes are refused at validation time.
 *
 * @param query - Table + mandatory filters (+ optional schema).
 * @returns Safe Result with the deleted rows.
 */
export async function useIfDelete<T = Record<string, unknown>>(
	query: IfWriteQuery,
): Promise<FetchResult<T[]>> {
	return InsForgeService.getInstance().useDelete<T>(query);
}

/**
 * Calls a Postgres function (RPC).
 *
 * @param call - Function name, params and optional schema.
 * @returns Safe Result with the function output.
 */
export async function useIfRpc<T = unknown>(call: IfRpcCall): Promise<FetchResult<T>> {
	return InsForgeService.getInstance().useRpc<T>(call);
}

/**
 * Uploads a file to a bucket (standard PUT semantics: same key replaces).
 *
 * @param ref - Bucket + object key.
 * @param file - File or Blob to upload.
 * @returns Safe Result with the stored file metadata.
 */
export async function useIfUpload(
	ref: IfStorageRef,
	file: File | Blob,
): Promise<FetchResult<Record<string, unknown>>> {
	return InsForgeService.getInstance().useUpload(ref, file);
}

/**
 * Downloads a file from a bucket.
 *
 * @param ref - Bucket + object key.
 * @returns Safe Result with the file as a Blob.
 */
export async function useIfDownload(ref: IfStorageRef): Promise<FetchResult<Blob>> {
	return InsForgeService.getInstance().useDownload(ref);
}

/**
 * Removes a file from a bucket.
 *
 * @param ref - Bucket + object key.
 * @returns Safe Result with the deletion response.
 */
export async function useIfRemove(
	ref: IfStorageRef,
): Promise<FetchResult<Record<string, unknown>>> {
	return InsForgeService.getInstance().useRemove(ref);
}

/**
 * Lists objects in a bucket.
 *
 * @param bucket - Bucket name.
 * @param options - Prefix, search, limit and offset.
 * @returns Safe Result with the listing.
 */
export async function useIfListObjects(
	bucket: string,
	options?: IfListOptions,
): Promise<FetchResult<Record<string, unknown>>> {
	return InsForgeService.getInstance().useListObjects(bucket, options);
}

/**
 * Builds the public URL for an object in a public bucket (no network call).
 *
 * @param ref - Bucket + object key.
 * @returns Safe Result with `{ publicUrl }`.
 */
export function useIfGetPublicUrl(ref: IfStorageRef): FetchResult<{ publicUrl: string }> {
	return InsForgeService.getInstance().useGetPublicUrl(ref);
}

/**
 * Invokes an edge function.
 *
 * @param options - Function slug + optional JSON body.
 * @returns Safe Result with the function response.
 */
export async function useIfInvokeFunction<T = unknown>(
	options: IfInvokeOptions,
): Promise<FetchResult<T>> {
	return InsForgeService.getInstance().useInvokeFunction<T>(options);
}
