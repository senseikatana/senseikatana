import type { z } from "zod";

import { useAttempt } from "@/core/services/result.service.js";
import { useSplitConfig } from "@/core/services/utils.service.js";
import { useValidate } from "@/core/services/validation.service.js";
import {
	NotionBlockListSchema,
	NotionBlockResponseSchema,
	NotionConfigSchema,
	NotionDatabaseQuerySchema,
	NotionDatabaseResponseSchema,
	NotionPageListSchema,
	NotionPageResponseSchema,
	NotionSearchQuerySchema,
	NotionSearchResultSchema,
	NotionUserListSchema,
	NotionUserResponseSchema,
} from "@/schemas/notion.schema.js";
import type {
	ConfigFacade,
	FetchResult,
	NotionBlock,
	NotionBlockList,
	NotionConfig,
	NotionDatabase,
	NotionDatabaseQuery,
	NotionFilter,
	NotionPage,
	NotionPageList,
	NotionParent,
	NotionPropertySchema,
	NotionRichText,
	NotionSearchQuery,
	NotionSearchResult,
	NotionSort,
	NotionUser,
	NotionUserList,
} from "@/types/index.js";

/** Default Notion API base URL. */
const NOTION_API_BASE = "https://api.notion.com/v1";

/** Default Notion API version. */
const NOTION_API_VERSION = "2022-06-28";

/** Builds a throwable error carrying `status`/`details` for `useAttempt`. */
function apiError(message: string, status: number, details?: unknown): Error {
	return Object.assign(new Error(message), { status, details });
}

/**
 * NotionService - Singleton para el cliente de la Notion API.
 *
 * Aplica el patrón Singleton: una única instancia mantiene la configuración
 * (token, versión, base URL) y centraliza las operaciones sobre páginas,
 * bloques, bases de datos, usuarios y búsqueda, devolviendo siempre Safe Results.
 *
 * @example
 * ```ts
 * const notion = NotionService.getInstance();
 * notion.useInit({ token: process.env.NOTION_TOKEN });
 * const result = await notion.useGetPage("page-id");
 * ```
 */
export class NotionService {
	private static instance: NotionService;

	/** Registered Notion configuration. */
	private config: NotionConfig | null = null;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del NotionService (Singleton).
	 *
	 * @returns La instancia única de {@link NotionService}.
	 */
	static getInstance(): NotionService {
		if (!NotionService.instance) {
			NotionService.instance = new NotionService();
		}
		return NotionService.instance;
	}

	/**
	 * Registers the Notion API configuration.
	 *
	 * @param cfg - Integration token (starts with "ntn_" or "secret_"), optional
	 *   API version and base URL.
	 * @throws {Error} If the config fails Zod validation.
	 *
	 * @example
	 * ```ts
	 * NotionService.getInstance().useInit({ token: process.env.NOTION_TOKEN });
	 * ```
	 */
	useInit(cfg: NotionConfig): void {
		const parsed = useValidate(NotionConfigSchema, cfg);
		if (!parsed.ok) {
			throw new Error("[Notion] Invalid config: " + parsed.error.message);
		}
		this.config = { ...parsed.data };
	}

	/**
	 * Internal helper to make authenticated requests to the Notion API.
	 * Handles Authorization header, Notion-Version, and JSON serialization.
	 * @internal
	 */
	private async useRequest<T>(
		endpoint: string,
		options: RequestInit = {},
		schema?: z.ZodType<unknown>,
	): Promise<FetchResult<T>> {
		const cfg = this.config;
		if (!cfg) {
			return {
				data: null,
				error: {
					message: "[Notion] Not configured. Call defineNotionConfig() first.",
					status: 0,
				},
				url: "",
				status: 0,
				ok: false,
			};
		}

		const { token, apiVersion, apiBaseUrl } = cfg;
		const base = apiBaseUrl ?? NOTION_API_BASE;
		const version = apiVersion ?? NOTION_API_VERSION;
		const url = `${base}${endpoint}`;

		const attempt = await useAttempt(async () => {
			const response = await fetch(url, {
				...options,
				headers: {
					Authorization: `Bearer ${token}`,
					"Notion-Version": version,
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			if (!response.ok) {
				const errorBody = await response.text().catch(() => null);
				throw apiError(`Notion API Error: ${response.statusText}`, response.status, errorBody);
			}

			if (response.status === 204) {
				return { data: null as T, status: 204 };
			}

			const data = (await response.json()) as unknown;
			if (schema) {
				const parsed = useValidate(schema, data);
				if (!parsed.ok) {
					throw apiError("Notion Validation Error: " + parsed.error.message, 502, parsed.error.details);
				}
				return { data: parsed.data as T, status: response.status };
			}
			return { data: data as T, status: response.status };
		});

		if (!attempt.ok) {
			const { message, status, details } = attempt.error;
			return {
				data: null,
				error: {
					message: status === 0 ? `Network Error: ${message}` : message,
					status,
					details,
				},
				url,
				status,
				ok: false,
			};
		}
		return { data: attempt.data.data, error: null, url, status: attempt.data.status, ok: true };
	}

	/* ---------------------------------------------------------------------- */
	/* Pages                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a single Notion page by its ID. */
	async useGetPage(pageId: string): Promise<FetchResult<NotionPage>> {
		return this.useRequest<NotionPage>(`/pages/${pageId}`, {}, NotionPageResponseSchema);
	}

	/** Creates a new Notion page inside a database or as a child of another page. */
	async useCreatePage(
		parent: NotionParent,
		properties: Record<string, unknown>,
		children?: unknown[],
	): Promise<FetchResult<NotionPage>> {
		// Payload is Record<string, unknown>: no strict shape possible, skip input validation.
		return this.useRequest<NotionPage>(
			"/pages",
			{ method: "POST", body: JSON.stringify({ parent, properties, children }) },
			NotionPageResponseSchema,
		);
	}

	/** Updates properties of an existing Notion page. */
	async useUpdatePage(
		pageId: string,
		properties: Record<string, unknown>,
	): Promise<FetchResult<NotionPage>> {
		// Payload is Record<string, unknown>: no strict shape possible, skip input validation.
		return this.useRequest<NotionPage>(
			`/pages/${pageId}`,
			{ method: "PATCH", body: JSON.stringify({ properties }) },
			NotionPageResponseSchema,
		);
	}

	/** Archives (soft-deletes) a Notion page. */
	async useArchivePage(pageId: string): Promise<FetchResult<NotionPage>> {
		return this.useRequest<NotionPage>(
			`/pages/${pageId}`,
			{ method: "PATCH", body: JSON.stringify({ archived: true }) },
			NotionPageResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Blocks                                                                   */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a single Notion block by its ID. */
	async useGetBlock(blockId: string): Promise<FetchResult<NotionBlock>> {
		return this.useRequest<NotionBlock>(`/blocks/${blockId}`, {}, NotionBlockResponseSchema);
	}

	/**
	 * Retrieves the direct children blocks of a block (single page).
	 *
	 * Use for manual pagination. For most cases, prefer
	 * {@link useListAllBlockChildren} which handles pagination automatically.
	 *
	 * @param blockId - The parent block ID (usually a page ID).
	 * @param options - Pagination: `start_cursor` for next page, `page_size` (max 100).
	 */
	async useGetBlockChildren(
		blockId: string,
		options?: { start_cursor?: string; page_size?: number },
	): Promise<FetchResult<NotionBlockList>> {
		const params = new URLSearchParams();
		if (options?.start_cursor) params.set("start_cursor", options.start_cursor);
		if (options?.page_size) params.set("page_size", String(options.page_size));
		const qs = params.toString();
		return this.useRequest<NotionBlockList>(
			`/blocks/${blockId}/children${qs ? `?${qs}` : ""}`,
			{},
			NotionBlockListSchema,
		);
	}

	/** Appends new child blocks to a parent block. */
	async useAppendBlocks(blockId: string, children: unknown[]): Promise<FetchResult<NotionBlock>> {
		// Payload is unknown[]: no strict shape possible, skip input validation.
		return this.useRequest<NotionBlock>(
			`/blocks/${blockId}/children`,
			{ method: "PATCH", body: JSON.stringify({ children }) },
			NotionBlockResponseSchema,
		);
	}

	/** Updates the content of an existing block. */
	async useUpdateBlock(
		blockId: string,
		content: Record<string, unknown>,
	): Promise<FetchResult<NotionBlock>> {
		// Payload is Record<string, unknown>: no strict shape possible, skip input validation.
		return this.useRequest<NotionBlock>(
			`/blocks/${blockId}`,
			{ method: "PATCH", body: JSON.stringify(content) },
			NotionBlockResponseSchema,
		);
	}

	/** Deletes (archives) a Notion block. The block is soft-deleted. */
	async useDeleteBlock(blockId: string): Promise<FetchResult<NotionBlock>> {
		return this.useRequest<NotionBlock>(
			`/blocks/${blockId}`,
			{ method: "DELETE" },
			NotionBlockResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Databases                                                                */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a Notion database schema by its ID. */
	async useGetDatabase(databaseId: string): Promise<FetchResult<NotionDatabase>> {
		return this.useRequest<NotionDatabase>(
			`/databases/${databaseId}`,
			{},
			NotionDatabaseResponseSchema,
		);
	}

	/**
	 * Queries a Notion database with filters and sorts (single page).
	 *
	 * For most cases, prefer {@link useListAllDatabasePages} which handles
	 * pagination automatically.
	 */
	async useQueryDatabase(
		databaseId: string,
		query?: NotionDatabaseQuery,
	): Promise<FetchResult<NotionPageList>> {
		if (query !== undefined) {
			const parsed = useValidate(NotionDatabaseQuerySchema, query);
			if (!parsed.ok) {
				return { data: null, error: parsed.error, url: "", status: parsed.status, ok: false };
			}
		}
		return this.useRequest<NotionPageList>(
			`/databases/${databaseId}/query`,
			{ method: "POST", body: JSON.stringify(query ?? {}) },
			NotionPageListSchema,
		);
	}

	/** Creates a new Notion database inside a page. */
	async useCreateDatabase(
		parent: NotionParent,
		title: NotionRichText[],
		properties: Record<string, NotionPropertySchema>,
	): Promise<FetchResult<NotionDatabase>> {
		// Payload properties are Record<string, NotionPropertySchema>: free-form, skip input validation.
		return this.useRequest<NotionDatabase>(
			"/databases",
			{ method: "POST", body: JSON.stringify({ parent, title, properties }) },
			NotionDatabaseResponseSchema,
		);
	}

	/** Updates a Notion database title and/or property schemas. */
	async useUpdateDatabase(
		databaseId: string,
		title: NotionRichText[],
		properties?: Record<string, NotionPropertySchema>,
	): Promise<FetchResult<NotionDatabase>> {
		const body: Record<string, unknown> = { title };
		if (properties) body.properties = properties;
		// Payload properties are Record<string, NotionPropertySchema>: free-form, skip input validation.
		return this.useRequest<NotionDatabase>(
			`/databases/${databaseId}`,
			{ method: "PATCH", body: JSON.stringify(body) },
			NotionDatabaseResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Users                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a Notion workspace member or bot by their user ID. */
	async useGetUser(userId: string): Promise<FetchResult<NotionUser>> {
		return this.useRequest<NotionUser>(`/users/${userId}`, {}, NotionUserResponseSchema);
	}

	/** Lists all users (members + bots) in the workspace (paginated). */
	async useListUsers(options?: {
		start_cursor?: string;
		page_size?: number;
	}): Promise<FetchResult<NotionUserList>> {
		const params = new URLSearchParams();
		if (options?.start_cursor) params.set("start_cursor", options.start_cursor);
		if (options?.page_size) params.set("page_size", String(options.page_size));
		const qs = params.toString();
		return this.useRequest<NotionUserList>(`/users${qs ? `?${qs}` : ""}`, {}, NotionUserListSchema);
	}

	/* ---------------------------------------------------------------------- */
	/* Search                                                                   */
	/* ---------------------------------------------------------------------- */

	/** Searches across all pages and databases the integration has access to. */
	async useSearchContent(query: NotionSearchQuery): Promise<FetchResult<NotionSearchResult>> {
		const parsed = useValidate(NotionSearchQuerySchema, query);
		if (!parsed.ok) {
			return { data: null, error: parsed.error, url: "", status: parsed.status, ok: false };
		}
		return this.useRequest<NotionSearchResult>(
			"/search",
			{ method: "POST", body: JSON.stringify(query) },
			NotionSearchResultSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Pagination Helpers                                                       */
	/* ---------------------------------------------------------------------- */

	/**
	 * Fetches ALL child blocks of a block, automatically handling cursor pagination.
	 *
	 * @param blockId - The parent block ID (usually a page ID).
	 * @param maxItems - Cap on the total number of blocks to fetch (default `1000`).
	 * @returns All child blocks as a flat array.
	 */
	async useListAllBlockChildren(
		blockId: string,
		maxItems = 1000,
	): Promise<FetchResult<NotionBlock[]>> {
		const allBlocks: NotionBlock[] = [];
		let cursor: string | undefined;

		do {
			const result = await this.useGetBlockChildren(blockId, {
				start_cursor: cursor,
				page_size: 100,
			});

			if (!result.ok) return result;

			allBlocks.push(...result.data.results);
			if (maxItems && allBlocks.length >= maxItems) break;
			cursor = result.data.has_more ? (result.data.next_cursor ?? undefined) : undefined;
		} while (cursor);

		return {
			data: allBlocks.slice(0, maxItems),
			error: null,
			url: "",
			status: 200,
			ok: true,
		};
	}

	/**
	 * Fetches ALL pages in a database, automatically handling cursor pagination.
	 *
	 * @param databaseId - The database UUID.
	 * @param filter - Optional filter to apply (same syntax as Notion API).
	 * @param sorts - Optional sort options.
	 * @param maxItems - Cap on the total number of pages to fetch (default `1000`).
	 * @returns All pages matching the filter as a flat array.
	 */
	async useListAllDatabasePages(
		databaseId: string,
		filter?: NotionFilter,
		sorts?: NotionSort[],
		maxItems = 1000,
	): Promise<FetchResult<NotionPage[]>> {
		const allPages: NotionPage[] = [];
		let cursor: string | undefined;

		do {
			const result = await this.useQueryDatabase(databaseId, {
				filter,
				sorts,
				start_cursor: cursor,
				page_size: 100,
			});

			if (!result.ok) return result;

			allPages.push(...result.data.results);
			if (maxItems && allPages.length >= maxItems) break;
			cursor = result.data.has_more ? (result.data.next_cursor ?? undefined) : undefined;
		} while (cursor);

		return {
			data: allPages.slice(0, maxItems),
			error: null,
			url: "",
			status: 200,
			ok: true,
		};
	}
}

/* -------------------------------------------------------------------------- */
/* Initialization                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Registers the Notion configuration and returns your methods alongside it -
 * the config-file entry point. One call is the whole setup: no separate
 * `useInitNotion(...)` step.
 *
 * Declare methods with `function` (never arrows) so `this.config` resolves to
 * the registered config.
 *
 * @typeParam T - The literal passed in: Notion config plus any methods.
 * @param input - Notion config plus the methods you want on the facade.
 * @returns The registered config plus your methods (see {@link ConfigFacade}).
 * @throws {Error} If the config fails Zod validation.
 *
 * @example
 * ```ts
 * import { defineNotionConfig } from "katanakit-js/adapters/notion";
 *
 * export default defineNotionConfig({
 *   token: process.env.NOTION_TOKEN,
 *   getPage: async function (pageId: string) {
 *     return useNotionGetPage(pageId);
 *   },
 * });
 * ```
 */
export function defineNotionConfig<T extends NotionConfig>(
	input: T & ThisType<ConfigFacade<T>>,
): ConfigFacade<T> {
	const { config: cfg, methods } = useSplitConfig(input);
	// Zod strips the method entries, so the whole literal is safe to validate.
	NotionService.getInstance().useInit(input as never);
	return { config: cfg, ...methods } as ConfigFacade<T>;
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Retrieves a single Notion page by its ID.
 *
 * @param pageId - The page UUID.
 * @returns The page object with all its properties.
 *
 * @example
 * ```ts
 * const result = await useNotionGetPage("page-id");
 * if (result.ok) console.log(result.data.properties);
 * ```
 */
export async function useNotionGetPage(pageId: string): Promise<FetchResult<NotionPage>> {
	return NotionService.getInstance().useGetPage(pageId);
}

/**
 * Creates a new Notion page inside a database or as a child of another page.
 *
 * @param parent - Where to create the page (`database_id` or `page_id`).
 * @param properties - Page properties matching the parent database schema.
 * @param children - Optional block children to populate the page content.
 * @returns The created page.
 *
 * @example
 * ```ts
 * const result = await useNotionCreatePage(
 *   { type: "database_id", database_id: "db-id" },
 *   { Name: { title: [{ type: "text", text: { content: "My Task" } }] } },
 * );
 * ```
 */
export async function useNotionCreatePage(
	parent: NotionParent,
	properties: Record<string, unknown>,
	children?: unknown[],
): Promise<FetchResult<NotionPage>> {
	return NotionService.getInstance().useCreatePage(parent, properties, children);
}

/**
 * Updates properties of an existing Notion page.
 *
 * @param pageId - The page UUID to update.
 * @param properties - Properties to update (only changed properties).
 * @returns The updated page.
 *
 * @example
 * ```ts
 * await useNotionUpdatePage("page-id", { Status: { select: { name: "Done" } } });
 * ```
 */
export async function useNotionUpdatePage(
	pageId: string,
	properties: Record<string, unknown>,
): Promise<FetchResult<NotionPage>> {
	return NotionService.getInstance().useUpdatePage(pageId, properties);
}

/**
 * Archives (soft-deletes) a Notion page.
 *
 * @param pageId - The page UUID to archive.
 * @returns The archived page.
 *
 * @example
 * ```ts
 * await useNotionArchivePage("page-id");
 * ```
 */
export async function useNotionArchivePage(pageId: string): Promise<FetchResult<NotionPage>> {
	return NotionService.getInstance().useArchivePage(pageId);
}

/**
 * Retrieves a single Notion block by its ID.
 *
 * @param blockId - The block UUID.
 * @returns The block object with its type-specific content.
 *
 * @example
 * ```ts
 * const result = await useNotionGetBlock("block-id");
 * ```
 */
export async function useNotionGetBlock(blockId: string): Promise<FetchResult<NotionBlock>> {
	return NotionService.getInstance().useGetBlock(blockId);
}

/**
 * Retrieves the direct children blocks of a block (single page).
 *
 * @param blockId - The parent block ID (usually a page ID).
 * @param options - Pagination: `start_cursor`, `page_size` (max 100).
 * @returns Paginated list of child blocks.
 *
 * @example
 * ```ts
 * const result = await useNotionGetBlockChildren("page-id");
 * ```
 */
export async function useNotionGetBlockChildren(
	blockId: string,
	options?: { start_cursor?: string; page_size?: number },
): Promise<FetchResult<NotionBlockList>> {
	return NotionService.getInstance().useGetBlockChildren(blockId, options);
}

/**
 * Appends new child blocks to a parent block.
 *
 * @param blockId - The parent block ID (usually a page ID).
 * @param children - Array of block objects to append.
 * @returns The parent block.
 *
 * @example
 * ```ts
 * await useNotionAppendBlocks("page-id", [
 *   { type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "Hi" } }] } },
 * ]);
 * ```
 */
export async function useNotionAppendBlocks(
	blockId: string,
	children: unknown[],
): Promise<FetchResult<NotionBlock>> {
	return NotionService.getInstance().useAppendBlocks(blockId, children);
}

/**
 * Updates the content of an existing block.
 *
 * @param blockId - The block UUID to update.
 * @param content - The new content for the block type.
 * @returns The updated block.
 *
 * @example
 * ```ts
 * await useNotionUpdateBlock("block-id", {
 *   paragraph: { rich_text: [{ type: "text", text: { content: "Updated text" } }] },
 * });
 * ```
 */
export async function useNotionUpdateBlock(
	blockId: string,
	content: Record<string, unknown>,
): Promise<FetchResult<NotionBlock>> {
	return NotionService.getInstance().useUpdateBlock(blockId, content);
}

/**
 * Deletes (archives) a Notion block.
 *
 * @param blockId - The block UUID to delete.
 * @returns The deleted block.
 *
 * @example
 * ```ts
 * await useNotionDeleteBlock("block-id");
 * ```
 */
export async function useNotionDeleteBlock(blockId: string): Promise<FetchResult<NotionBlock>> {
	return NotionService.getInstance().useDeleteBlock(blockId);
}

/**
 * Retrieves a Notion database schema by its ID.
 *
 * @param databaseId - The database UUID.
 * @returns The database object with its full property schema.
 *
 * @example
 * ```ts
 * const result = await useNotionGetDatabase("db-id");
 * ```
 */
export async function useNotionGetDatabase(
	databaseId: string,
): Promise<FetchResult<NotionDatabase>> {
	return NotionService.getInstance().useGetDatabase(databaseId);
}

/**
 * Queries a Notion database with filters and sorts (single page).
 *
 * @param databaseId - The database UUID to query.
 * @param query - Filter, sort, and pagination options.
 * @returns Paginated list of pages matching the query.
 *
 * @example
 * ```ts
 * const filtered = await useNotionQueryDatabase("db-id", {
 *   filter: { property: "Status", select: { equals: "Done" } },
 * });
 * ```
 */
export async function useNotionQueryDatabase(
	databaseId: string,
	query?: NotionDatabaseQuery,
): Promise<FetchResult<NotionPageList>> {
	return NotionService.getInstance().useQueryDatabase(databaseId, query);
}

/**
 * Creates a new Notion database inside a page.
 *
 * @param parent - The parent page (`{ type: "page_id", page_id }`).
 * @param title - Database title as rich text array.
 * @param properties - Property schema definitions.
 * @returns The created database.
 *
 * @example
 * ```ts
 * await useNotionCreateDatabase(
 *   { type: "page_id", page_id: "parent-id" },
 *   [{ type: "text", text: { content: "My Tasks" } }],
 *   { Name: { title: {} } },
 * );
 * ```
 */
export async function useNotionCreateDatabase(
	parent: NotionParent,
	title: NotionRichText[],
	properties: Record<string, NotionPropertySchema>,
): Promise<FetchResult<NotionDatabase>> {
	return NotionService.getInstance().useCreateDatabase(parent, title, properties);
}

/**
 * Updates a Notion database title and/or property schemas.
 *
 * @param databaseId - The database UUID to update.
 * @param title - New title as rich text array.
 * @param properties - Optional property schema updates to merge.
 * @returns The updated database.
 *
 * @example
 * ```ts
 * await useNotionUpdateDatabase("db-id", [{ type: "text", text: { content: "Renamed" } }]);
 * ```
 */
export async function useNotionUpdateDatabase(
	databaseId: string,
	title: NotionRichText[],
	properties?: Record<string, NotionPropertySchema>,
): Promise<FetchResult<NotionDatabase>> {
	return NotionService.getInstance().useUpdateDatabase(databaseId, title, properties);
}

/**
 * Retrieves a Notion workspace member or bot by their user ID.
 *
 * @param userId - The user UUID.
 * @returns The user object.
 *
 * @example
 * ```ts
 * const result = await useNotionGetUser("user-id");
 * ```
 */
export async function useNotionGetUser(userId: string): Promise<FetchResult<NotionUser>> {
	return NotionService.getInstance().useGetUser(userId);
}

/**
 * Lists all users (members + bots) in the workspace (paginated).
 *
 * @param options - Pagination: `start_cursor`, `page_size` (max 100).
 * @returns Paginated list of users.
 *
 * @example
 * ```ts
 * const result = await useNotionListUsers();
 * ```
 */
export async function useNotionListUsers(options?: {
	start_cursor?: string;
	page_size?: number;
}): Promise<FetchResult<NotionUserList>> {
	return NotionService.getInstance().useListUsers(options);
}

/**
 * Searches across all pages and databases the integration has access to.
 *
 * @param query - Search options: text query, object type filter, sort direction.
 * @returns Paginated search results (mixed pages and databases).
 *
 * @example
 * ```ts
 * const result = await useNotionSearchContent({ query: "meeting notes" });
 * ```
 */
export async function useNotionSearchContent(
	query: NotionSearchQuery,
): Promise<FetchResult<NotionSearchResult>> {
	return NotionService.getInstance().useSearchContent(query);
}

/**
 * Fetches ALL child blocks of a block, automatically handling cursor pagination.
 *
 * @param blockId - The parent block ID (usually a page ID).
 * @param maxItems - Cap on the total number of blocks to fetch (default `1000`).
 * @returns All child blocks as a flat array.
 *
 * @example
 * ```ts
 * const result = await useNotionListAllBlockChildren("page-id");
 * ```
 */
export async function useNotionListAllBlockChildren(
	blockId: string,
	maxItems = 1000,
): Promise<FetchResult<NotionBlock[]>> {
	return NotionService.getInstance().useListAllBlockChildren(blockId, maxItems);
}

/**
 * Fetches ALL pages in a database, automatically handling cursor pagination.
 *
 * @param databaseId - The database UUID.
 * @param filter - Optional filter to apply (same syntax as Notion API).
 * @param sorts - Optional sort options.
 * @param maxItems - Cap on the total number of pages to fetch (default `1000`).
 * @returns All pages matching the filter as a flat array.
 *
 * @example
 * ```ts
 * const result = await useNotionListAllDatabasePages("db-id");
 * ```
 */
export async function useNotionListAllDatabasePages(
	databaseId: string,
	filter?: NotionFilter,
	sorts?: NotionSort[],
	maxItems = 1000,
): Promise<FetchResult<NotionPage[]>> {
	return NotionService.getInstance().useListAllDatabasePages(databaseId, filter, sorts, maxItems);
}
