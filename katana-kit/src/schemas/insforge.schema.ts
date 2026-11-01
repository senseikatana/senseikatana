import { z } from "zod";

/**
 * Config for the InsForge adapter. InsForge is the database fallback
 * (primary data layer is Cloudflare); storage and edge functions
 * are also available through the same client.
 */
export const IfConfigSchema = z.object({
	/** InsForge backend URL (e.g. `https://appKey.region.insforge.app`). */
	baseUrl: z.string().min(1),
	/** Public anon key (browser-safe client). */
	anonKey: z.string().optional(),
	/** Project-admin key — server-only, use `createAdminClient` under the hood. */
	apiKey: z.string().optional(),
	/** User JWT to run requests as that user (RLS applies). */
	accessToken: z.string().optional(),
	/** Default PostgREST schema (default: `public`). */
	schema: z.string().optional(),
});

/** Table name (bare; schema comes from config or query options). */
export const IfTableNameSchema = z.string().min(1);

/** Bucket name. */
export const IfBucketSchema = z.string().min(1);

/** Sort clause for table queries. */
export const IfOrderSchema = z.object({
	column: z.string().min(1),
	ascending: z.boolean().optional(),
});

/** Options for a table read. Filters map to equality clauses. */
export const IfTableQuerySchema = z.object({
	/** Table name (bare; schema comes from config or `schema`). */
	table: z.string().min(1),
	/** Columns selector (default: `*`). */
	columns: z.string().optional(),
	/** Equality filters (`column: value`). */
	filters: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
	/** Sort clause. */
	order: IfOrderSchema.optional(),
	/** Max rows. */
	limit: z.number().int().positive().optional(),
	/** First row (zero-based). */
	offset: z.number().int().nonnegative().optional(),
	/** Override the PostgREST schema for this query. */
	schema: z.string().optional(),
});

/** Rows for insert (one or many). */
export const IfInsertRowsSchema = z.array(z.record(z.string(), z.unknown())).min(1);

/** Patch for update (must be paired with filters — mass updates are refused). */
export const IfUpdatePatchSchema = z.record(z.string(), z.unknown());

/** Options for an update or delete. Filters are REQUIRED (no mass writes). */
export const IfWriteQuerySchema = z.object({
	table: z.string().min(1),
	filters: z
		.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
		.refine((filters) => Object.keys(filters).length > 0, {
			message: "filters must not be empty (mass writes are refused)",
		}),
	schema: z.string().optional(),
});

/** Postgres function (RPC) call. */
export const IfRpcCallSchema = z.object({
	name: z.string().min(1),
	params: z.record(z.string(), z.unknown()).optional(),
	schema: z.string().optional(),
});

/** Bucket + object key reference for storage operations. */
export const IfStorageRefSchema = z.object({
	bucket: z.string().min(1),
	path: z.string().min(1),
});

/** Options for listing bucket objects. */
export const IfListOptionsSchema = z.object({
	prefix: z.string().optional(),
	search: z.string().optional(),
	limit: z.number().int().positive().max(1000).optional(),
	offset: z.number().int().nonnegative().optional(),
});

/** Edge function invocation. */
export const IfInvokeOptionsSchema = z.object({
	name: z.string().min(1),
	body: z.record(z.string(), z.unknown()).optional(),
});
