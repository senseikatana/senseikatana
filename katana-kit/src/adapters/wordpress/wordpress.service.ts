import type { z } from "zod";

import { AccessService } from "@/core/services/access.service.js";
import { useAttempt } from "@/core/services/result.service.js";
import { useSplitConfig } from "@/core/services/utils.service.js";
import { useValidate } from "@/core/services/validation.service.js";
import {
	WordPressConfigSchema,
	WpBatchOperationSchema,
	WpBatchResultSchema,
	WpCapabilitySchema,
	WpCategoryCreateSchema,
	WpCategoryListSchema,
	WpCategoryResponseSchema,
	WpCategoryUpdateSchema,
	WpCommentCreateSchema,
	WpCommentListSchema,
	WpCommentResponseSchema,
	WpCommentUpdateSchema,
	WpMediaListSchema,
	WpMediaMetaSchema,
	WpMediaResponseSchema,
	WpMediaUpdateSchema,
	WpPageCreateSchema,
	WpPageListSchema,
	WpPageResponseSchema,
	WpPageUpdateSchema,
	WpPostCreateSchema,
	WpPostListSchema,
	WpPostResponseSchema,
	WpPostUpdateSchema,
	WpRoleDefinitionSchema,
	WpRoleRegistrySchema,
	WpTagCreateSchema,
	WpTagListSchema,
	WpTagResponseSchema,
	WpTagUpdateSchema,
	WpUserCreateSchema,
	WpUserListSchema,
	WpUserResponseSchema,
	WpUserUpdateSchema,
} from "@/schemas/wordpress.schema.js";
import type {
	AccessRole,
	AccessSubject,
	ConfigFacade,
	FetchResult,
	WordPressConfig,
	WpBatchOperation,
	WpBatchResult,
	WpCategory,
	WpCategoryCreate,
	WpCategoryUpdate,
	WpComment,
	WpCommentCreate,
	WpCommentUpdate,
	WpMedia,
	WpMediaMeta,
	WpMediaUpdate,
	WpPage,
	WpPageCreate,
	WpPageUpdate,
	WpPost,
	WpPostCreate,
	WpPostUpdate,
	WpQueryParams,
	WpRoleAudit,
	WpRoleDefinition,
	WpTag,
	WpTagCreate,
	WpTagUpdate,
	WpUser,
	WpUserCreate,
	WpUserUpdate,
} from "@/types/index.js";

/** Default WordPress REST API namespace. */
const WP_API_NAMESPACE = "wp/v2";

/**
 * Context that unlocks `roles`, `capabilities` and `extra_capabilities` on the
 * users endpoint. Anything below reads those fields, so they all ask for it
 * explicitly instead of relying on the endpoint's default.
 */
const WP_USER_EDIT_FIELDS = "id,slug,name,roles,capabilities,extra_capabilities";

/**
 * HTTP status for a request WordPress accepted but did not honour — today only
 * one case: assigning a role the site does not know, which WordPress drops
 * without an error instead of rejecting.
 */
const WP_ROLE_NOT_APPLIED = 422;

/**
 * Converts query params to URL search params.
 * Handles _fields (string), _embed (boolean or string), and arrays.
 * @internal
 */
function buildQueryParams(options?: WpQueryParams): string {
	if (!options) return "";

	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(options)) {
		if (value === undefined || value === null) continue;

		if (key === "_embed") {
			// _embed can be: true (embed all), false (skip), or "author,wp:featuredmedia" (specific)
			if (value === true) {
				params.set("_embed", "");
			} else if (value === false) {
				continue;
			} else if (typeof value === "string" && value) {
				params.set("_embed", value);
			}
			continue;
		}

		if (key === "_fields") {
			// _fields is always a string: "id,title,link"
			if (typeof value === "string" && value) {
				params.set("_fields", value);
			}
			continue;
		}

		if (Array.isArray(value)) {
			params.set(key, value.join(","));
		} else {
			params.set(key, String(value));
		}
	}

	const qs = params.toString();
	return qs ? `?${qs}` : "";
}

/**
 * Maps a failed input validation into a 400 Safe Result without fetching.
 * @internal
 */
function invalidInput(parsed: FetchResult<unknown>): FetchResult<never> {
	if (parsed.ok) {
		return {
			data: null as never,
			error: { message: "Validation Error: invalid input", status: 400 },
			url: "",
			status: 400,
			ok: false,
		};
	}
	return {
		data: null as never,
		error: {
			message: parsed.error.message,
			status: 400,
			details: parsed.error.details,
		},
		url: "",
		status: 400,
		ok: false,
	};
}

/** Builds a throwable error carrying `status`/`details` for `useAttempt`. */
function apiError(message: string, status: number, details?: unknown): Error {
	return Object.assign(new Error(message), { status, details });
}

/**
 * WordPressService - Singleton para el cliente del WordPress REST API.
 *
 * Aplica el patrón Singleton: una única instancia mantiene la configuración
 * (URL base, auth, namespace) y centraliza todas las operaciones CRUD contra
 * la REST API de WordPress, devolviendo siempre Safe Results.
 *
 * @example
 * ```ts
 * const wp = WordPressService.getInstance();
 * wp.useInit({ baseUrl: "https://mysite.com", auth: { type: "jwt", token: "..." } });
 * const result = await wp.useGetPosts({ per_page: 5 });
 * ```
 */
export class WordPressService {
	private static instance: WordPressService;

	/** Registered WordPress configuration. */
	private config: WordPressConfig | null = null;

	/**
	 * Declared roles, keyed by slug.
	 *
	 * This is the PHP-free substitute for `add_role()`: the REST API cannot
	 * create a role, so the model is declared here and audited against the
	 * live site with {@link WordPressService.useAuditRole}.
	 */
	private roles: Map<string, WpRoleDefinition> = new Map();

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del WordPressService (Singleton).
	 *
	 * @returns La instancia única de {@link WordPressService}.
	 */
	static getInstance(): WordPressService {
		if (!WordPressService.instance) {
			WordPressService.instance = new WordPressService();
		}
		return WordPressService.instance;
	}

	/**
	 * Retrieves the registered WordPress config or throws.
	 * @internal
	 */
	private useGetConfig(): WordPressConfig {
		if (!this.config) {
			throw new Error("[WordPress] Not configured. Call defineWordPressConfig() first.");
		}
		return this.config;
	}

	/**
	 * Builds the base API URL from config.
	 * @internal
	 */
	private useGetApiBase(): string {
		const { baseUrl, apiNamespace } = this.useGetConfig();
		const ns = apiNamespace ?? WP_API_NAMESPACE;
		const cleanBase = baseUrl.replace(/\/+$/, "");
		return `${cleanBase}/wp-json/${ns}`;
	}

	/**
	 * Builds authentication headers from config.
	 * @internal
	 */
	private useGetAuthHeaders(): Record<string, string> {
		const { auth } = this.useGetConfig();
		if (!auth) return {};

		switch (auth.type) {
			case "application-passwords":
			case "basic": {
				const credentials = btoa(`${auth.username}:${auth.password}`);
				return { Authorization: `Basic ${credentials}` };
			}
			case "jwt":
				return { Authorization: `Bearer ${auth.token}` };
			case "nonce":
				return { "X-WP-Nonce": auth.nonce, Cookie: auth.cookie };
			default:
				return {};
		}
	}

	/**
	 * Internal helper to make requests to the WordPress REST API.
	 * @internal
	 */
	private async useRequest<T>(
		endpoint: string,
		options: RequestInit = {},
		schema?: z.ZodType<unknown>,
	): Promise<FetchResult<T>> {
		let url = "";

		const attempt = await useAttempt(async () => {
			url = `${this.useGetApiBase()}${endpoint}`;
			const response = await fetch(url, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...this.useGetAuthHeaders(),
					...options.headers,
				},
			});

			if (!response.ok) {
				const errorBody = await response.text().catch(() => null);
				throw apiError(`WordPress API Error: ${response.statusText}`, response.status, errorBody);
			}

			if (response.status === 204) {
				return { data: null as T, status: 204 };
			}

			const raw = (await response.json()) as unknown;
			if (schema) {
				const parsed = useValidate(schema, raw);
				if (!parsed.ok) {
					throw apiError(
						"WordPress Validation Error: " + parsed.error.message,
						502,
						parsed.error.details,
					);
				}
				// WP may return partials via `_fields`, so the schema guarantees present fields are well-typed.
				return { data: parsed.data as T, status: response.status };
			}
			return { data: raw as T, status: response.status };
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

	/**
	 * Internal helper for multipart file uploads.
	 * @internal
	 */
	private async useUpload<T>(
		endpoint: string,
		file: File | Blob | Buffer,
		meta?: Record<string, unknown>,
		schema?: z.ZodType<unknown>,
	): Promise<FetchResult<T>> {
		let url = "";

		const attempt = await useAttempt(async () => {
			url = `${this.useGetApiBase()}${endpoint}`;
			const formData = new FormData();

			// Add the file
			if (typeof Buffer !== "undefined" && file instanceof Buffer) {
				const blob = new Blob([new Uint8Array(file)]);
				formData.append("file", blob, "upload");
			} else {
				formData.append("file", file as Blob, (file as File).name ?? "upload");
			}

			// Add metadata
			if (meta) {
				for (const [key, value] of Object.entries(meta)) {
					if (value !== undefined && value !== null) {
						formData.append(key, String(value));
					}
				}
			}

			const response = await fetch(url, {
				method: "POST",
				headers: {
					...this.useGetAuthHeaders(),
					// Don't set Content-Type — browser sets multipart boundary
				},
				body: formData,
			});

			if (!response.ok) {
				const errorBody = await response.text().catch(() => null);
				throw apiError(`WordPress Upload Error: ${response.statusText}`, response.status, errorBody);
			}

			const raw = (await response.json()) as unknown;
			if (schema) {
				const parsed = useValidate(schema, raw);
				if (!parsed.ok) {
					throw apiError(
						"WordPress Validation Error: " + parsed.error.message,
						502,
						parsed.error.details,
					);
				}
				return { data: parsed.data as T, status: response.status };
			}
			return { data: raw as T, status: response.status };
		});

		if (!attempt.ok) {
			const { message, status, details } = attempt.error;
			return {
				data: null,
				error: { message: status === 0 ? `Upload Error: ${message}` : message, status, details },
				url,
				status,
				ok: false,
			};
		}
		return { data: attempt.data.data, error: null, url, status: attempt.data.status, ok: true };
	}

	/**
	 * Registers the WordPress REST API configuration.
	 *
	 * Supports multiple auth methods: Application Passwords, JWT tokens,
	 * Basic Auth, and nonce-based auth for themes.
	 *
	 * @param cfg - Site URL, authentication method, and optional API namespace.
	 * @throws {Error} If the config fails Zod validation.
	 *
	 * @example
	 * ```ts
	 * WordPressService.getInstance().useInit({
	 *   baseUrl: "https://mysite.com",
	 *   auth: { type: "application-passwords", username: "admin", password: "xxxx xxxx xxxx" },
	 * });
	 * ```
	 */
	useInit(cfg: WordPressConfig): void {
		const parsed = useValidate(WordPressConfigSchema, cfg);
		if (!parsed.ok) {
			throw new Error("[WordPress] Invalid config: " + parsed.error.message);
		}
		this.config = { ...parsed.data };
	}

	/* ---------------------------------------------------------------------- */
	/* Posts                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress posts with optional filtering and pagination. */
	async useGetPosts(options?: WpQueryParams): Promise<FetchResult<WpPost[]>> {
		return this.useRequest<WpPost[]>(`/posts${buildQueryParams(options)}`, {}, WpPostListSchema);
	}

	/** Retrieves a single WordPress post by ID. */
	async useGetPost(id: number, options?: WpQueryParams): Promise<FetchResult<WpPost>> {
		return this.useRequest<WpPost>(
			`/posts/${id}${buildQueryParams(options)}`,
			{},
			WpPostResponseSchema,
		);
	}

	/** Creates a new WordPress post. */
	async useCreatePost(data: WpPostCreate): Promise<FetchResult<WpPost>> {
		const parsed = useValidate(WpPostCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpPost>(
			"/posts",
			{ method: "POST", body: JSON.stringify(data) },
			WpPostResponseSchema,
		);
	}

	/** Updates an existing WordPress post. */
	async useUpdatePost(id: number, data: WpPostUpdate): Promise<FetchResult<WpPost>> {
		const parsed = useValidate(WpPostUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpPost>(
			`/posts/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpPostResponseSchema,
		);
	}

	/** Deletes a WordPress post (trash by default, permanent with `force`). */
	async useDeletePost(id: number, force = false): Promise<FetchResult<WpPost>> {
		return this.useRequest<WpPost>(
			`/posts/${id}?force=${force}`,
			{ method: "DELETE" },
			WpPostResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Pages                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress pages. */
	async useGetPages(options?: WpQueryParams): Promise<FetchResult<WpPage[]>> {
		return this.useRequest<WpPage[]>(`/pages${buildQueryParams(options)}`, {}, WpPageListSchema);
	}

	/** Retrieves a single WordPress page by ID. */
	async useGetPage(id: number, options?: WpQueryParams): Promise<FetchResult<WpPage>> {
		return this.useRequest<WpPage>(
			`/pages/${id}${buildQueryParams(options)}`,
			{},
			WpPageResponseSchema,
		);
	}

	/** Creates a new WordPress page. */
	async useCreatePage(data: WpPageCreate): Promise<FetchResult<WpPage>> {
		const parsed = useValidate(WpPageCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpPage>(
			"/pages",
			{ method: "POST", body: JSON.stringify(data) },
			WpPageResponseSchema,
		);
	}

	/** Updates an existing WordPress page. */
	async useUpdatePage(id: number, data: WpPageUpdate): Promise<FetchResult<WpPage>> {
		const parsed = useValidate(WpPageUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpPage>(
			`/pages/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpPageResponseSchema,
		);
	}

	/** Deletes a WordPress page (trash by default, permanent with `force`). */
	async useDeletePage(id: number, force = false): Promise<FetchResult<WpPage>> {
		return this.useRequest<WpPage>(
			`/pages/${id}?force=${force}`,
			{ method: "DELETE" },
			WpPageResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Media                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress media items. */
	async useGetMedia(options?: WpQueryParams): Promise<FetchResult<WpMedia[]>> {
		return this.useRequest<WpMedia[]>(`/media${buildQueryParams(options)}`, {}, WpMediaListSchema);
	}

	/** Retrieves a single WordPress media item by ID. */
	async useGetMediaItem(id: number): Promise<FetchResult<WpMedia>> {
		return this.useRequest<WpMedia>(`/media/${id}`, {}, WpMediaResponseSchema);
	}

	/** Uploads a file to the WordPress media library. */
	async useUploadMedia(
		file: File | Blob | Buffer,
		meta?: WpMediaMeta,
	): Promise<FetchResult<WpMedia>> {
		if (meta !== undefined) {
			const parsed = useValidate(WpMediaMetaSchema, meta);
			if (!parsed.ok) return invalidInput(parsed);
		}
		return this.useUpload<WpMedia>(
			"/media",
			file,
			meta as Record<string, unknown>,
			WpMediaResponseSchema,
		);
	}

	/** Updates metadata of a WordPress media item. */
	async useUpdateMedia(id: number, data: WpMediaUpdate): Promise<FetchResult<WpMedia>> {
		const parsed = useValidate(WpMediaUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpMedia>(
			`/media/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpMediaResponseSchema,
		);
	}

	/** Deletes a WordPress media item. */
	async useDeleteMedia(id: number, force = false): Promise<FetchResult<WpMedia>> {
		return this.useRequest<WpMedia>(
			`/media/${id}?force=${force}`,
			{ method: "DELETE" },
			WpMediaResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Categories                                                               */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress categories. */
	async useGetCategories(options?: WpQueryParams): Promise<FetchResult<WpCategory[]>> {
		return this.useRequest<WpCategory[]>(
			`/categories${buildQueryParams(options)}`,
			{},
			WpCategoryListSchema,
		);
	}

	/** Retrieves a single WordPress category by ID. */
	async useGetCategory(id: number): Promise<FetchResult<WpCategory>> {
		return this.useRequest<WpCategory>(`/categories/${id}`, {}, WpCategoryResponseSchema);
	}

	/** Creates a new WordPress category. */
	async useCreateCategory(data: WpCategoryCreate): Promise<FetchResult<WpCategory>> {
		const parsed = useValidate(WpCategoryCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpCategory>(
			"/categories",
			{ method: "POST", body: JSON.stringify(data) },
			WpCategoryResponseSchema,
		);
	}

	/** Updates an existing WordPress category. */
	async useUpdateCategory(id: number, data: WpCategoryUpdate): Promise<FetchResult<WpCategory>> {
		const parsed = useValidate(WpCategoryUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpCategory>(
			`/categories/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpCategoryResponseSchema,
		);
	}

	/** Deletes a WordPress category. */
	async useDeleteCategory(id: number, force = false): Promise<FetchResult<WpCategory>> {
		return this.useRequest<WpCategory>(
			`/categories/${id}?force=${force}`,
			{ method: "DELETE" },
			WpCategoryResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Tags                                                                     */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress tags. */
	async useGetTags(options?: WpQueryParams): Promise<FetchResult<WpTag[]>> {
		return this.useRequest<WpTag[]>(`/tags${buildQueryParams(options)}`, {}, WpTagListSchema);
	}

	/** Retrieves a single WordPress tag by ID. */
	async useGetTag(id: number): Promise<FetchResult<WpTag>> {
		return this.useRequest<WpTag>(`/tags/${id}`, {}, WpTagResponseSchema);
	}

	/** Creates a new WordPress tag. */
	async useCreateTag(data: WpTagCreate): Promise<FetchResult<WpTag>> {
		const parsed = useValidate(WpTagCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpTag>(
			"/tags",
			{ method: "POST", body: JSON.stringify(data) },
			WpTagResponseSchema,
		);
	}

	/** Updates an existing WordPress tag. */
	async useUpdateTag(id: number, data: WpTagUpdate): Promise<FetchResult<WpTag>> {
		const parsed = useValidate(WpTagUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpTag>(
			`/tags/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpTagResponseSchema,
		);
	}

	/** Deletes a WordPress tag. */
	async useDeleteTag(id: number, force = false): Promise<FetchResult<WpTag>> {
		return this.useRequest<WpTag>(
			`/tags/${id}?force=${force}`,
			{ method: "DELETE" },
			WpTagResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Comments                                                                 */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress comments. */
	async useGetComments(options?: WpQueryParams): Promise<FetchResult<WpComment[]>> {
		return this.useRequest<WpComment[]>(
			`/comments${buildQueryParams(options)}`,
			{},
			WpCommentListSchema,
		);
	}

	/** Retrieves a single WordPress comment by ID. */
	async useGetComment(id: number): Promise<FetchResult<WpComment>> {
		return this.useRequest<WpComment>(`/comments/${id}`, {}, WpCommentResponseSchema);
	}

	/** Creates a new WordPress comment. */
	async useCreateComment(data: WpCommentCreate): Promise<FetchResult<WpComment>> {
		const parsed = useValidate(WpCommentCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpComment>(
			"/comments",
			{ method: "POST", body: JSON.stringify(data) },
			WpCommentResponseSchema,
		);
	}

	/** Updates an existing WordPress comment. */
	async useUpdateComment(id: number, data: WpCommentUpdate): Promise<FetchResult<WpComment>> {
		const parsed = useValidate(WpCommentUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpComment>(
			`/comments/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpCommentResponseSchema,
		);
	}

	/** Deletes a WordPress comment. */
	async useDeleteComment(id: number, force = false): Promise<FetchResult<WpComment>> {
		return this.useRequest<WpComment>(
			`/comments/${id}?force=${force}`,
			{ method: "DELETE" },
			WpCommentResponseSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Users                                                                    */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of WordPress users. */
	async useGetUsers(options?: WpQueryParams): Promise<FetchResult<WpUser[]>> {
		return this.useRequest<WpUser[]>(`/users${buildQueryParams(options)}`, {}, WpUserListSchema);
	}

	/** Retrieves a single WordPress user by ID. */
	async useGetUser(id: number): Promise<FetchResult<WpUser>> {
		return this.useRequest<WpUser>(`/users/${id}`, {}, WpUserResponseSchema);
	}

	/** Retrieves the currently authenticated WordPress user. */
	async useGetCurrentUser(): Promise<FetchResult<WpUser>> {
		return this.useRequest<WpUser>("/users/me", {}, WpUserResponseSchema);
	}

	/** Creates a new WordPress user. */
	async useCreateUser(data: WpUserCreate): Promise<FetchResult<WpUser>> {
		const parsed = useValidate(WpUserCreateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpUser>(
			"/users",
			{ method: "POST", body: JSON.stringify(data) },
			WpUserResponseSchema,
		);
	}

	/** Updates an existing WordPress user. */
	async useUpdateUser(id: number, data: WpUserUpdate): Promise<FetchResult<WpUser>> {
		const parsed = useValidate(WpUserUpdateSchema, data);
		if (!parsed.ok) return invalidInput(parsed);
		return this.useRequest<WpUser>(
			`/users/${id}`,
			{ method: "POST", body: JSON.stringify(data) },
			WpUserResponseSchema,
		);
	}

	/** Deletes a WordPress user, optionally reassigning their content. */
	async useDeleteUser(id: number, reassign?: number): Promise<FetchResult<WpUser>> {
		const qs = reassign ? `?reassign=${reassign}` : "";
		return this.useRequest<WpUser>(`/users/${id}${qs}`, { method: "DELETE" }, WpUserResponseSchema);
	}

	/* ---------------------------------------------------------------------- */
	/* Roles & Capabilities                                                    */
	/* ---------------------------------------------------------------------- */

	/**
	 * Declares a set of roles, replacing any previous declaration for the same
	 * slugs.
	 *
	 * All definitions are validated before any is stored: a registry left half
	 * registered after a typo is worse than one that failed loudly.
	 *
	 * @param definitions - Role declarations to register.
	 * @throws {Error} If any definition is invalid.
	 *
	 * @example
	 * ```ts
	 * useWpDefineRoles([
	 *   {
	 *     slug: "store_customer",
	 *     label: "Store Customer",
	 *     rank: 5,
	 *     capabilities: ["orders:read:own", "orders:update:own"],
	 *     wpCapabilities: ["read", "read_order", "edit_order"],
	 *   },
	 * ]);
	 * ```
	 */
	useDefineRoles(definitions: WpRoleDefinition[]): void {
		const parsed = useValidate(WpRoleRegistrySchema, definitions);
		if (!parsed.ok) {
			throw new Error("[WordPress] Invalid role definitions: " + parsed.error.message);
		}
		const entries = parsed.data.map((definition) => this.useFreezeRole(definition));
		for (const entry of entries) {
			this.roles.set(entry.slug, entry);
		}
	}

	/** Declares or replaces a single role. */
	useRegisterRole(definition: WpRoleDefinition): void {
		const parsed = useValidate(WpRoleDefinitionSchema, definition);
		if (!parsed.ok) {
			throw new Error("[WordPress] Invalid role definition: " + parsed.error.message);
		}
		this.roles.set(parsed.data.slug, this.useFreezeRole(parsed.data));
	}

	/** Lists every declared role, ordered from most to least privileged. */
	useRoles(): WpRoleDefinition[] {
		return [...this.roles.values()]
			.sort((a, b) => a.rank - b.rank)
			.map((definition) => this.useCopyRole(definition));
	}

	/** Returns a declared role, or `undefined` when the slug was never declared. */
	useGetRole(slug: AccessRole): WpRoleDefinition | undefined {
		const found = this.roles.get(slug);
		return found ? this.useCopyRole(found) : undefined;
	}

	/** Clears the declared roles. Does not touch the access-service registry. */
	useResetRoles(): void {
		this.roles.clear();
	}

	/**
	 * Publishes every declared role to the access service, so `useCan()` and the
	 * framework guards understand WordPress role slugs.
	 *
	 * Declaring a role is not enough: until it is synced, `useCan()` throws on
	 * the unknown slug. Call this once at boot, right after the declarations.
	 *
	 * @example
	 * ```ts
	 * defineWordPressConfig({ baseUrl: "https://mysite.com" });
	 * useWpDefineRoles([/* … *\/]);
	 * useWpSyncRoles();
	 * ```
	 */
	useSyncRoles(): void {
		const access = AccessService.getInstance();
		for (const definition of this.roles.values()) {
			access.useRegisterRole({
				slug: definition.slug,
				label: definition.label,
				rank: definition.rank,
				capabilities: [...definition.capabilities],
			});
		}
	}

	/**
	 * Turns a WordPress user into an access subject.
	 *
	 * Mirrors the roles verbatim instead of filtering unknown ones: a subject
	 * quietly stripped of its roles fails closed and looks like a missing
	 * grant. Pair it with {@link WordPressService.useSyncRoles}.
	 *
	 * @example
	 * ```ts
	 * const me = await useWpGetCurrentUser();
	 * if (me.ok) useCan(useWpAsSubject(me.data), "orders:read:own");
	 * ```
	 */
	useAsSubject(user: WpUser): AccessSubject {
		return { id: user.id, roles: [...user.roles] as AccessRole[] };
	}

	/**
	 * Adds a role to a user and confirms WordPress applied it.
	 *
	 * WordPress silently drops a role slug it does not know — the response is a
	 * `200` with the user unchanged — so a plain update would report success for
	 * a grant that never happened. This verifies the returned `roles` and
	 * fails with `422` when the role is missing, which means the site has no
	 * such role and it must be created by a plugin, an mu-plugin or `wp-cli`.
	 */
	async useAssignRole(userId: number, role: string): Promise<FetchResult<WpUser>> {
		return this.useApplyRole(userId, role, true);
	}

	/**
	 * Removes a role from a user.
	 *
	 * Idempotent by design: removing a role the user does not hold is already
	 * the requested state, so it succeeds instead of raising. Unlike assignment,
	 * nothing here can be silently ignored by WordPress.
	 */
	async useUnassignRole(userId: number, role: string): Promise<FetchResult<WpUser>> {
		return this.useApplyRole(userId, role, false);
	}

	/**
	 * Lists the users holding a role.
	 *
	 * Requests `context=edit` because `roles` is not part of the default
	 * `context=view` payload.
	 */
	async useGetUsersByRole(role: string, options?: WpQueryParams): Promise<FetchResult<WpUser[]>> {
		return this.useRequest<WpUser[]>(
			`/users${buildQueryParams({
				...options,
				roles: role,
				context: "edit",
				_fields: options?._fields ?? WP_USER_EDIT_FIELDS,
			})}`,
			{},
			WpUserListSchema,
		);
	}

	/**
	 * Compares a declared role against what the live site reports.
	 *
	 * `granted` is the intersection across holders: a capability only one
	 * holder has is not a capability the role grants. With no holders there is
	 * nothing to compare against, so the status is `unverifiable` — never
	 * `verified`.
	 *
	 * @param slug - Role slug to audit.
	 * @param maxHolders - Cap on the holders inspected (default `100`).
	 */
	async useAuditRole(slug: string, maxHolders = 100): Promise<FetchResult<WpRoleAudit>> {
		const declared = this.roles.get(slug);
		const declaredWp = declared?.wpCapabilities ?? [];
		const holders: WpUser[] = [];
		let page = 1;

		// Roles and capabilities only appear with `context=edit`; without it the
		// audit would compare an empty map and report every capability missing.
		while (holders.length < maxHolders) {
			const perPage = Math.min(100, maxHolders - holders.length);
			const batch = await this.useGetUsersByRole(slug, { page, per_page: perPage });
			if (!batch.ok) return batch;
			holders.push(...batch.data);
			if (batch.data.length < perPage) break;
			page++;
		}

		const common = holders.length > 0 ? this.useCommonCapabilities(holders) : new Set<string>();
		const granted = declaredWp.filter((capability) => common.has(capability));
		const declaredSet = new Set(declaredWp);

		return {
			data: {
				slug: declared?.slug ?? (slug as AccessRole),
				status:
					holders.length === 0
						? "unverifiable"
						: granted.length === declaredWp.length
							? "verified"
							: "partial",
				holders: holders.length,
				declared: [...declaredWp],
				granted,
				missing: declaredWp.filter((capability) => !common.has(capability)),
				undeclared: [...common].filter((capability) => !declaredSet.has(capability)).sort(),
			},
			error: null,
			url: "",
			status: 200,
			ok: true,
		};
	}

	/**
	 * Capability names every holder has, role caps and per-user extras alike.
	 * @internal
	 */
	private useCommonCapabilities(holders: WpUser[]): Set<string> {
		let common: Set<string> | null = null;
		for (const holder of holders) {
			// `extra_capabilities` are per-user overrides, so they win over the
			// role caps in `capabilities` — including a deliberate `false`.
			const effective = { ...holder.capabilities, ...holder.extra_capabilities };
			const own = new Set(
				Object.keys(effective).filter((capability) => effective[capability] === true),
			);
			const previous: Set<string> = common ?? own;
			common = new Set([...previous].filter((capability) => own.has(capability)));
		}
		return common ?? new Set<string>();
	}

	/**
	 * Rewrites a user's role list with or without `role`.
	 * @internal
	 */
	private async useApplyRole(
		userId: number,
		role: string,
		add: boolean,
	): Promise<FetchResult<WpUser>> {
		const parsedRole = useValidate(WpCapabilitySchema, role);
		if (!parsedRole.ok) return invalidInput(parsedRole);

		const current = await this.useRequest<WpUser>(
			`/users/${userId}?context=edit&_fields=${WP_USER_EDIT_FIELDS}`,
			{},
			WpUserResponseSchema,
		);
		if (!current.ok) return current;

		const held = current.data.roles ?? [];
		const next = add
			? held.includes(role)
				? held
				: [...held, role]
			: held.filter((entry) => entry !== role);

		// Already in the requested state: no request needed, and no chance of
		// WordPress rewriting the rest of the profile.
		if (next.length === held.length) {
			return { ...current, data: current.data };
		}

		const updated = await this.useUpdateUser(userId, { roles: next });
		if (!updated.ok) return updated;

		// A `200` here does not mean the grant landed. WordPress drops slugs it
		// does not know, so the only proof is the roles on the response.
		const applied = add && !(updated.data.roles ?? []).includes(role);
		if (applied) {
			return {
				data: null as never,
				error: {
					message:
						`WordPress did not apply the role "${role}": the site has no such role. ` +
						"Create it in WordPress (plugin, mu-plugin or wp-cli role add) — the REST API cannot.",
					status: WP_ROLE_NOT_APPLIED,
					details: { requested: role, applied: updated.data.roles ?? [] },
				},
				url: updated.url,
				status: WP_ROLE_NOT_APPLIED,
				ok: false,
			};
		}

		return updated;
	}

	/** Freezes a validated definition so the registry cannot be mutated in place. */
	private useFreezeRole(definition: WpRoleDefinition): WpRoleDefinition {
		return Object.freeze({
			...definition,
			capabilities: [...definition.capabilities],
			wpCapabilities: [...definition.wpCapabilities],
		});
	}

	/** Copies a definition so callers never hold live registry state. */
	private useCopyRole(definition: WpRoleDefinition): WpRoleDefinition {
		return {
			...definition,
			capabilities: [...definition.capabilities],
			wpCapabilities: [...definition.wpCapabilities],
		};
	}

	/* ---------------------------------------------------------------------- */
	/* Custom Post Types                                                        */
	/* ---------------------------------------------------------------------- */

	/** Retrieves a list of custom post type entries. */
	async useGetCustomPosts(
		postType: string,
		options?: WpQueryParams,
	): Promise<FetchResult<unknown[]>> {
		return this.useRequest<unknown[]>(`/${postType}${buildQueryParams(options)}`);
	}

	/** Retrieves a single custom post type entry by ID. */
	async useGetCustomPost(
		postType: string,
		id: number,
		options?: WpQueryParams,
	): Promise<FetchResult<unknown>> {
		return this.useRequest<unknown>(`/${postType}/${id}${buildQueryParams(options)}`);
	}

	/** Creates a new custom post type entry. */
	async useCreateCustomPost(
		postType: string,
		data: Record<string, unknown>,
	): Promise<FetchResult<unknown>> {
		return this.useRequest<unknown>(`/${postType}`, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	/** Updates a custom post type entry. */
	async useUpdateCustomPost(
		postType: string,
		id: number,
		data: Record<string, unknown>,
	): Promise<FetchResult<unknown>> {
		return this.useRequest<unknown>(`/${postType}/${id}`, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	/** Deletes a custom post type entry. */
	async useDeleteCustomPost(
		postType: string,
		id: number,
		force = false,
	): Promise<FetchResult<unknown>> {
		return this.useRequest<unknown>(`/${postType}/${id}?force=${force}`, {
			method: "DELETE",
		});
	}

	/* ---------------------------------------------------------------------- */
	/* Batch Operations                                                         */
	/* ---------------------------------------------------------------------- */

	/** Executes multiple WordPress REST API requests in a single batch. */
	async useBatch(operations: WpBatchOperation[]): Promise<FetchResult<WpBatchResult>> {
		for (const operation of operations) {
			const parsed = useValidate(WpBatchOperationSchema, operation);
			if (!parsed.ok) return invalidInput(parsed);
		}
		return this.useRequest<WpBatchResult>(
			"/batch/v1",
			{ method: "POST", body: JSON.stringify({ requests: operations }) },
			WpBatchResultSchema,
		);
	}

	/* ---------------------------------------------------------------------- */
	/* Pagination Helpers                                                       */
	/* ---------------------------------------------------------------------- */

	/**
	 * Fetches ALL posts matching the criteria, automatically handling pagination.
	 *
	 * @param options - Query params for filtering. Do NOT pass `page` or `per_page`.
	 * @param maxItems - Cap on the total number of posts to fetch (default `1000`).
	 */
	async useListAllPosts(options?: WpQueryParams, maxItems = 1000): Promise<FetchResult<WpPost[]>> {
		const allPosts: WpPost[] = [];
		let page = 1;

		while (true) {
			const result = await this.useGetPosts({ ...options, page, per_page: 100 });
			if (!result.ok) return result;

			allPosts.push(...result.data);

			if (maxItems && allPosts.length >= maxItems) break;
			if (result.data.length < 100) break;
			page++;
		}

		return {
			data: allPosts.slice(0, maxItems),
			error: null,
			url: "",
			status: 200,
			ok: true,
		};
	}

	/** Searches ALL posts by keyword, automatically handling pagination. */
	async useSearchAllPosts(query: string, options?: WpQueryParams): Promise<FetchResult<WpPost[]>> {
		return this.useListAllPosts({ ...options, search: query });
	}

	/** Finds a single post by its URL slug. Returns `null` if not found. */
	async useFindPostBySlug(slug: string): Promise<FetchResult<WpPost | null>> {
		const result = await this.useGetPosts({ slug, per_page: 1 });
		if (!result.ok) return result;

		return {
			data: result.data[0] ?? null,
			error: null,
			url: result.url,
			status: result.status,
			ok: true,
		};
	}
}

/* -------------------------------------------------------------------------- */
/* Initialization                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Registers the WordPress configuration and returns your methods alongside it —
 * the config-file entry point. One call is the whole setup: no separate
 * `useInitWordPress(...)` step.
 *
 * Supports multiple auth methods: Application Passwords (recommended for
 * plugins), JWT tokens, Basic Auth, and nonce-based auth for themes.
 *
 * Declare methods with `function` (never arrows) so `this.config` resolves to
 * the registered config.
 *
 * @typeParam T - The literal passed in: WordPress config plus any methods.
 * @param input - Site URL, auth method and optional namespace, plus your methods.
 * @returns The registered config plus your methods (see {@link ConfigFacade}).
 * @throws {Error} If the config fails Zod validation.
 *
 * @example
 * ```ts
 * import { defineWordPressConfig } from "katanakit-js/adapters/wordpress";
 *
 * export default defineWordPressConfig({
 *   baseUrl: "https://mysite.com",
 *   auth: { type: "application-passwords", username: "admin", password: "xxxx xxxx xxxx" },
 *   getLatest: async function () {
 *     return useWpGetPosts({ per_page: 5 });
 *   },
 * });
 * ```
 */
export function defineWordPressConfig<T extends WordPressConfig>(
	input: T & ThisType<ConfigFacade<T>>,
): ConfigFacade<T> {
	const { config: cfg, methods } = useSplitConfig(input);
	// Zod strips the method entries, so the whole literal is safe to validate.
	WordPressService.getInstance().useInit(input as never);
	return { config: cfg, ...methods } as ConfigFacade<T>;
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Retrieves a list of WordPress posts with optional filtering and pagination.
 *
 * @param options - Query params: `per_page`, `page`, `search`, `categories`, etc.
 * @returns Array of posts.
 *
 * @example
 * ```ts
 * const result = await useWpGetPosts({ per_page: 5, status: "publish" });
 * ```
 */
export async function useWpGetPosts(options?: WpQueryParams): Promise<FetchResult<WpPost[]>> {
	return WordPressService.getInstance().useGetPosts(options);
}

/**
 * Retrieves a single WordPress post by ID.
 *
 * @param id - The post ID.
 * @param options - Optional query params (e.g. _embed for featured media).
 * @returns The post object.
 *
 * @example
 * ```ts
 * const result = await useWpGetPost(42, { _embed: true });
 * ```
 */
export async function useWpGetPost(
	id: number,
	options?: WpQueryParams,
): Promise<FetchResult<WpPost>> {
	return WordPressService.getInstance().useGetPost(id, options);
}

/**
 * Creates a new WordPress post.
 *
 * @param data - Post data: `title`, `content`, `status`, `categories`, etc.
 * @returns The created post.
 *
 * @example
 * ```ts
 * const result = await useWpCreatePost({ title: "My New Post", content: "<p>Hello</p>", status: "publish" });
 * ```
 */
export async function useWpCreatePost(data: WpPostCreate): Promise<FetchResult<WpPost>> {
	return WordPressService.getInstance().useCreatePost(data);
}

/**
 * Updates an existing WordPress post.
 *
 * @param id - The post ID to update.
 * @param data - Fields to update.
 * @returns The updated post.
 *
 * @example
 * ```ts
 * await useWpUpdatePost(42, { title: "Updated Title" });
 * ```
 */
export async function useWpUpdatePost(
	id: number,
	data: WpPostUpdate,
): Promise<FetchResult<WpPost>> {
	return WordPressService.getInstance().useUpdatePost(id, data);
}

/**
 * Deletes a WordPress post.
 *
 * @param id - The post ID to delete.
 * @param force - If true, permanently deletes. If false, moves to trash.
 * @returns The deleted post.
 *
 * @example
 * ```ts
 * await useWpDeletePost(42, true);
 * ```
 */
export async function useWpDeletePost(id: number, force = false): Promise<FetchResult<WpPost>> {
	return WordPressService.getInstance().useDeletePost(id, force);
}

/**
 * Retrieves a list of WordPress pages.
 *
 * @param options - Query params for filtering, sorting, and pagination.
 * @returns Array of pages.
 *
 * @example
 * ```ts
 * const result = await useWpGetPages({ per_page: 20 });
 * ```
 */
export async function useWpGetPages(options?: WpQueryParams): Promise<FetchResult<WpPage[]>> {
	return WordPressService.getInstance().useGetPages(options);
}

/**
 * Retrieves a single WordPress page by ID.
 *
 * @param id - The page ID.
 * @param options - Optional query params.
 * @returns The page object.
 *
 * @example
 * ```ts
 * const result = await useWpGetPage(10);
 * ```
 */
export async function useWpGetPage(
	id: number,
	options?: WpQueryParams,
): Promise<FetchResult<WpPage>> {
	return WordPressService.getInstance().useGetPage(id, options);
}

/**
 * Creates a new WordPress page.
 *
 * @param data - Page data (title, content, parent, etc.).
 * @returns The created page.
 *
 * @example
 * ```ts
 * await useWpCreatePage({ title: "About Us", content: "<p>Welcome</p>", status: "publish" });
 * ```
 */
export async function useWpCreatePage(data: WpPageCreate): Promise<FetchResult<WpPage>> {
	return WordPressService.getInstance().useCreatePage(data);
}

/**
 * Updates an existing WordPress page.
 *
 * @param id - The page ID to update.
 * @param data - Fields to update.
 * @returns The updated page.
 *
 * @example
 * ```ts
 * await useWpUpdatePage(10, { title: "Updated About" });
 * ```
 */
export async function useWpUpdatePage(
	id: number,
	data: WpPageUpdate,
): Promise<FetchResult<WpPage>> {
	return WordPressService.getInstance().useUpdatePage(id, data);
}

/**
 * Deletes a WordPress page.
 *
 * @param id - The page ID to delete.
 * @param force - If true, permanently deletes. If false, moves to trash.
 * @returns The deleted page.
 *
 * @example
 * ```ts
 * await useWpDeletePage(10);
 * ```
 */
export async function useWpDeletePage(id: number, force = false): Promise<FetchResult<WpPage>> {
	return WordPressService.getInstance().useDeletePage(id, force);
}

/**
 * Retrieves a list of WordPress media items.
 *
 * @param options - Query params for filtering and pagination.
 * @returns Array of media items.
 *
 * @example
 * ```ts
 * const result = await useWpGetMedia({ per_page: 20 });
 * ```
 */
export async function useWpGetMedia(options?: WpQueryParams): Promise<FetchResult<WpMedia[]>> {
	return WordPressService.getInstance().useGetMedia(options);
}

/**
 * Retrieves a single WordPress media item by ID.
 *
 * @param id - The media item ID.
 * @returns The media object.
 *
 * @example
 * ```ts
 * const result = await useWpGetMediaItem(42);
 * ```
 */
export async function useWpGetMediaItem(id: number): Promise<FetchResult<WpMedia>> {
	return WordPressService.getInstance().useGetMediaItem(id);
}

/**
 * Uploads a file to the WordPress media library.
 *
 * @param file - File (browser), Blob, or Buffer (Node.js) to upload.
 * @param meta - Optional metadata: `title`, `alt_text`, `caption`, etc.
 * @returns The created media item with `source_url`.
 *
 * @example
 * ```ts
 * const result = await useWpUploadMedia(file, { title: "My Image" });
 * ```
 */
export async function useWpUploadMedia(
	file: File | Blob | Buffer,
	meta?: WpMediaMeta,
): Promise<FetchResult<WpMedia>> {
	return WordPressService.getInstance().useUploadMedia(file, meta);
}

/**
 * Updates metadata of a WordPress media item.
 *
 * @param id - The media item ID.
 * @param data - Fields to update.
 * @returns The updated media item.
 *
 * @example
 * ```ts
 * await useWpUpdateMedia(42, { alt_text: "New alt text" });
 * ```
 */
export async function useWpUpdateMedia(
	id: number,
	data: WpMediaUpdate,
): Promise<FetchResult<WpMedia>> {
	return WordPressService.getInstance().useUpdateMedia(id, data);
}

/**
 * Deletes a WordPress media item.
 *
 * @param id - The media item ID.
 * @param force - If true, permanently deletes.
 * @returns The deleted media item.
 *
 * @example
 * ```ts
 * await useWpDeleteMedia(42, true);
 * ```
 */
export async function useWpDeleteMedia(id: number, force = false): Promise<FetchResult<WpMedia>> {
	return WordPressService.getInstance().useDeleteMedia(id, force);
}

/**
 * Retrieves a list of WordPress categories.
 *
 * @param options - Query params for filtering and pagination.
 * @returns Array of categories.
 *
 * @example
 * ```ts
 * const result = await useWpGetCategories({ per_page: 50 });
 * ```
 */
export async function useWpGetCategories(
	options?: WpQueryParams,
): Promise<FetchResult<WpCategory[]>> {
	return WordPressService.getInstance().useGetCategories(options);
}

/**
 * Retrieves a single WordPress category by ID.
 *
 * @param id - The category ID.
 * @returns The category object.
 *
 * @example
 * ```ts
 * const result = await useWpGetCategory(5);
 * ```
 */
export async function useWpGetCategory(id: number): Promise<FetchResult<WpCategory>> {
	return WordPressService.getInstance().useGetCategory(id);
}

/**
 * Creates a new WordPress category.
 *
 * @param data - Category data (name, slug, parent, etc.).
 * @returns The created category.
 *
 * @example
 * ```ts
 * await useWpCreateCategory({ name: "Technology", slug: "tech" });
 * ```
 */
export async function useWpCreateCategory(
	data: WpCategoryCreate,
): Promise<FetchResult<WpCategory>> {
	return WordPressService.getInstance().useCreateCategory(data);
}

/**
 * Updates an existing WordPress category.
 *
 * @param id - The category ID to update.
 * @param data - Fields to update.
 * @returns The updated category.
 *
 * @example
 * ```ts
 * await useWpUpdateCategory(5, { name: "Tech News" });
 * ```
 */
export async function useWpUpdateCategory(
	id: number,
	data: WpCategoryUpdate,
): Promise<FetchResult<WpCategory>> {
	return WordPressService.getInstance().useUpdateCategory(id, data);
}

/**
 * Deletes a WordPress category.
 *
 * @param id - The category ID to delete.
 * @param force - If true, permanently deletes.
 * @returns The deleted category.
 *
 * @example
 * ```ts
 * await useWpDeleteCategory(5);
 * ```
 */
export async function useWpDeleteCategory(
	id: number,
	force = false,
): Promise<FetchResult<WpCategory>> {
	return WordPressService.getInstance().useDeleteCategory(id, force);
}

/**
 * Retrieves a list of WordPress tags.
 *
 * @param options - Query params for filtering and pagination.
 * @returns Array of tags.
 *
 * @example
 * ```ts
 * const result = await useWpGetTags({ search: "javascript" });
 * ```
 */
export async function useWpGetTags(options?: WpQueryParams): Promise<FetchResult<WpTag[]>> {
	return WordPressService.getInstance().useGetTags(options);
}

/**
 * Retrieves a single WordPress tag by ID.
 *
 * @param id - The tag ID.
 * @returns The tag object.
 *
 * @example
 * ```ts
 * const result = await useWpGetTag(12);
 * ```
 */
export async function useWpGetTag(id: number): Promise<FetchResult<WpTag>> {
	return WordPressService.getInstance().useGetTag(id);
}

/**
 * Creates a new WordPress tag.
 *
 * @param data - Tag data (name, slug, etc.).
 * @returns The created tag.
 *
 * @example
 * ```ts
 * await useWpCreateTag({ name: "TypeScript", slug: "typescript" });
 * ```
 */
export async function useWpCreateTag(data: WpTagCreate): Promise<FetchResult<WpTag>> {
	return WordPressService.getInstance().useCreateTag(data);
}

/**
 * Updates an existing WordPress tag.
 *
 * @param id - The tag ID to update.
 * @param data - Fields to update.
 * @returns The updated tag.
 *
 * @example
 * ```ts
 * await useWpUpdateTag(12, { name: "TS" });
 * ```
 */
export async function useWpUpdateTag(id: number, data: WpTagUpdate): Promise<FetchResult<WpTag>> {
	return WordPressService.getInstance().useUpdateTag(id, data);
}

/**
 * Deletes a WordPress tag.
 *
 * @param id - The tag ID to delete.
 * @param force - If true, permanently deletes.
 * @returns The deleted tag.
 *
 * @example
 * ```ts
 * await useWpDeleteTag(12);
 * ```
 */
export async function useWpDeleteTag(id: number, force = false): Promise<FetchResult<WpTag>> {
	return WordPressService.getInstance().useDeleteTag(id, force);
}

/**
 * Retrieves a list of WordPress comments.
 *
 * @param options - Query params for filtering and pagination.
 * @returns Array of comments.
 *
 * @example
 * ```ts
 * const result = await useWpGetComments({ post: 42 });
 * ```
 */
export async function useWpGetComments(options?: WpQueryParams): Promise<FetchResult<WpComment[]>> {
	return WordPressService.getInstance().useGetComments(options);
}

/**
 * Retrieves a single WordPress comment by ID.
 *
 * @param id - The comment ID.
 * @returns The comment object.
 *
 * @example
 * ```ts
 * const result = await useWpGetComment(7);
 * ```
 */
export async function useWpGetComment(id: number): Promise<FetchResult<WpComment>> {
	return WordPressService.getInstance().useGetComment(id);
}

/**
 * Creates a new WordPress comment.
 *
 * @param data - Comment data (post ID, content, author, etc.).
 * @returns The created comment.
 *
 * @example
 * ```ts
 * await useWpCreateComment({ post: 42, content: "Great article!" });
 * ```
 */
export async function useWpCreateComment(data: WpCommentCreate): Promise<FetchResult<WpComment>> {
	return WordPressService.getInstance().useCreateComment(data);
}

/**
 * Updates an existing WordPress comment.
 *
 * @param id - The comment ID to update.
 * @param data - Fields to update.
 * @returns The updated comment.
 *
 * @example
 * ```ts
 * await useWpUpdateComment(7, { content: "Updated comment" });
 * ```
 */
export async function useWpUpdateComment(
	id: number,
	data: WpCommentUpdate,
): Promise<FetchResult<WpComment>> {
	return WordPressService.getInstance().useUpdateComment(id, data);
}

/**
 * Deletes a WordPress comment.
 *
 * @param id - The comment ID to delete.
 * @param force - If true, permanently deletes.
 * @returns The deleted comment.
 *
 * @example
 * ```ts
 * await useWpDeleteComment(7);
 * ```
 */
export async function useWpDeleteComment(
	id: number,
	force = false,
): Promise<FetchResult<WpComment>> {
	return WordPressService.getInstance().useDeleteComment(id, force);
}

/**
 * Retrieves a list of WordPress users.
 *
 * @param options - Query params for filtering and pagination.
 * @returns Array of users.
 *
 * @example
 * ```ts
 * const result = await useWpGetUsers({ roles: "editor" });
 * ```
 */
export async function useWpGetUsers(options?: WpQueryParams): Promise<FetchResult<WpUser[]>> {
	return WordPressService.getInstance().useGetUsers(options);
}

/**
 * Retrieves a single WordPress user by ID.
 *
 * @param id - The user ID.
 * @returns The user object.
 *
 * @example
 * ```ts
 * const result = await useWpGetUser(1);
 * ```
 */
export async function useWpGetUser(id: number): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useGetUser(id);
}

/**
 * Retrieves the currently authenticated WordPress user.
 *
 * @returns The current user object.
 *
 * @example
 * ```ts
 * const result = await useWpGetCurrentUser();
 * ```
 */
export async function useWpGetCurrentUser(): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useGetCurrentUser();
}

/**
 * Creates a new WordPress user.
 *
 * @param data - User data (username, email, password, etc.).
 * @returns The created user.
 *
 * @example
 * ```ts
 * await useWpCreateUser({ username: "johndoe", email: "john@example.com", password: "..." });
 * ```
 */
export async function useWpCreateUser(data: WpUserCreate): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useCreateUser(data);
}

/**
 * Updates an existing WordPress user.
 *
 * @param id - The user ID to update.
 * @param data - Fields to update.
 * @returns The updated user.
 *
 * @example
 * ```ts
 * await useWpUpdateUser(2, { name: "John Smith" });
 * ```
 */
export async function useWpUpdateUser(
	id: number,
	data: WpUserUpdate,
): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useUpdateUser(id, data);
}

/**
 * Deletes a WordPress user.
 *
 * @param id - The user ID to delete.
 * @param reassign - User ID to reassign content to (required for non-admin).
 * @returns The deleted user.
 *
 * @example
 * ```ts
 * await useWpDeleteUser(2, 1);
 * ```
 */
export async function useWpDeleteUser(id: number, reassign?: number): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useDeleteUser(id, reassign);
}

/* -------------------------------------------------------------------------- */
/* Roles & Capabilities wrappers                                               */
/* -------------------------------------------------------------------------- */

/**
 * Declares the site's roles, replacing any previous declaration for the same
 * slugs. Validates the whole registry before storing any of it.
 *
 * @param definitions - Role declarations to register.
 * @throws {Error} If any definition is invalid.
 *
 * @example
 * ```ts
 * useWpDefineRoles([
 *   {
 *     slug: "store_customer",
 *     label: "Store Customer",
 *     rank: 5,
 *     capabilities: ["orders:read:own", "orders:update:own"],
 *     wpCapabilities: ["read", "read_order", "edit_order"],
 *   },
 * ]);
 * ```
 */
export function useWpDefineRoles(definitions: WpRoleDefinition[]): void {
	WordPressService.getInstance().useDefineRoles(definitions);
}

/** Declares or replaces a single role. */
export function useWpRegisterRole(definition: WpRoleDefinition): void {
	WordPressService.getInstance().useRegisterRole(definition);
}

/** Lists every declared role, ordered from most to least privileged. */
export function useWpRoles(): WpRoleDefinition[] {
	return WordPressService.getInstance().useRoles();
}

/** Returns a declared role, or `undefined` when the slug was never declared. */
export function useWpGetRole(slug: AccessRole): WpRoleDefinition | undefined {
	return WordPressService.getInstance().useGetRole(slug);
}

/** Clears the declared roles. Does not touch the access-service registry. */
export function useWpResetRoles(): void {
	WordPressService.getInstance().useResetRoles();
}

/**
 * Publishes every declared role to the access service so `useCan()` and the
 * framework guards understand WordPress role slugs. Call once at boot.
 */
export function useWpSyncRoles(): void {
	WordPressService.getInstance().useSyncRoles();
}

/**
 * Turns a WordPress user into an access subject for `useCan()` and the guards.
 *
 * @example
 * ```ts
 * const me = await useWpGetCurrentUser();
 * if (me.ok) useCan(useWpAsSubject(me.data), "orders:read:own");
 * ```
 */
export function useWpAsSubject(user: WpUser): AccessSubject {
	return WordPressService.getInstance().useAsSubject(user);
}

/**
 * Adds a role to a user and confirms WordPress applied it.
 *
 * Fails with `422` when the site does not know the role: WordPress drops unknown
 * slugs silently, so the response is the only place that can catch it.
 *
 * @example
 * ```ts
 * const result = await useWpAssignRole(42, "store_customer");
 * if (!result.ok && result.status === 422) {
 *   console.error("Create the role in WordPress first");
 * }
 * ```
 */
export async function useWpAssignRole(userId: number, role: string): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useAssignRole(userId, role);
}

/** Removes a role from a user. Idempotent. */
export async function useWpUnassignRole(
	userId: number,
	role: string,
): Promise<FetchResult<WpUser>> {
	return WordPressService.getInstance().useUnassignRole(userId, role);
}

/**
 * Lists the users holding a role (`context=edit`, so `roles` is included).
 *
 * @example
 * ```ts
 * const result = await useWpGetUsersByRole("store_customer", { per_page: 50 });
 * ```
 */
export async function useWpGetUsersByRole(
	role: string,
	options?: WpQueryParams,
): Promise<FetchResult<WpUser[]>> {
	return WordPressService.getInstance().useGetUsersByRole(role, options);
}

/**
 * Compares a declared role against what the live site reports for its holders.
 *
 * @param slug - Role slug to audit.
 * @param maxHolders - Cap on the holders inspected (default `100`).
 *
 * @example
 * ```ts
 * const audit = await useWpAuditRole("store_customer");
 * if (audit.ok) console.log(audit.data.status, audit.data.missing);
 * ```
 */
export async function useWpAuditRole(
	slug: string,
	maxHolders = 100,
): Promise<FetchResult<WpRoleAudit>> {
	return WordPressService.getInstance().useAuditRole(slug, maxHolders);
}

/**
 * Retrieves a list of custom post type entries.
 *
 * @param postType - The custom post type slug (e.g. "product", "portfolio").
 * @param options - Query params for filtering and pagination.
 * @returns Array of custom post entries.
 *
 * @example
 * ```ts
 * const result = await useWpGetCustomPosts("product", { per_page: 10 });
 * ```
 */
export async function useWpGetCustomPosts(
	postType: string,
	options?: WpQueryParams,
): Promise<FetchResult<unknown[]>> {
	return WordPressService.getInstance().useGetCustomPosts(postType, options);
}

/**
 * Retrieves a single custom post type entry by ID.
 *
 * @param postType - The custom post type slug.
 * @param id - The entry ID.
 * @param options - Optional query params.
 * @returns The custom post entry.
 *
 * @example
 * ```ts
 * const result = await useWpGetCustomPost("product", 15);
 * ```
 */
export async function useWpGetCustomPost(
	postType: string,
	id: number,
	options?: WpQueryParams,
): Promise<FetchResult<unknown>> {
	return WordPressService.getInstance().useGetCustomPost(postType, id, options);
}

/**
 * Creates a new custom post type entry.
 *
 * @param postType - The custom post type slug.
 * @param data - Entry data.
 * @returns The created entry.
 *
 * @example
 * ```ts
 * await useWpCreateCustomPost("product", { title: "Widget", status: "publish" });
 * ```
 */
export async function useWpCreateCustomPost(
	postType: string,
	data: Record<string, unknown>,
): Promise<FetchResult<unknown>> {
	return WordPressService.getInstance().useCreateCustomPost(postType, data);
}

/**
 * Updates a custom post type entry.
 *
 * @param postType - The custom post type slug.
 * @param id - The entry ID.
 * @param data - Fields to update.
 * @returns The updated entry.
 *
 * @example
 * ```ts
 * await useWpUpdateCustomPost("product", 15, { title: "Updated Widget" });
 * ```
 */
export async function useWpUpdateCustomPost(
	postType: string,
	id: number,
	data: Record<string, unknown>,
): Promise<FetchResult<unknown>> {
	return WordPressService.getInstance().useUpdateCustomPost(postType, id, data);
}

/**
 * Deletes a custom post type entry.
 *
 * @param postType - The custom post type slug.
 * @param id - The entry ID.
 * @param force - If true, permanently deletes.
 * @returns The deleted entry.
 *
 * @example
 * ```ts
 * await useWpDeleteCustomPost("product", 15, true);
 * ```
 */
export async function useWpDeleteCustomPost(
	postType: string,
	id: number,
	force = false,
): Promise<FetchResult<unknown>> {
	return WordPressService.getInstance().useDeleteCustomPost(postType, id, force);
}

/**
 * Executes multiple WordPress REST API requests in a single batch.
 *
 * @param operations - Array of batch operations to execute.
 * @returns Combined results from all operations.
 *
 * @example
 * ```ts
 * const result = await useWpBatch([
 *   { method: "GET", path: "/wp/v2/posts/1" },
 * ]);
 * ```
 */
export async function useWpBatch(
	operations: WpBatchOperation[],
): Promise<FetchResult<WpBatchResult>> {
	return WordPressService.getInstance().useBatch(operations);
}

/**
 * Fetches ALL posts matching the criteria, automatically handling pagination.
 *
 * @param options - Query params for filtering. Do NOT pass `page` or `per_page`.
 * @param maxItems - Cap on the total number of posts to fetch (default `1000`).
 * @returns All posts as a flat array.
 *
 * @example
 * ```ts
 * const result = await useWpListAllPosts({ status: "publish" });
 * ```
 */
export async function useWpListAllPosts(
	options?: WpQueryParams,
	maxItems = 1000,
): Promise<FetchResult<WpPost[]>> {
	return WordPressService.getInstance().useListAllPosts(options, maxItems);
}

/**
 * Searches ALL posts by keyword, automatically handling pagination.
 *
 * @param query - Search term (searches title and content).
 * @param options - Additional filters (`status`, `categories`, etc.).
 * @returns All posts matching the search.
 *
 * @example
 * ```ts
 * const result = await useWpSearchAllPosts("tutorial");
 * ```
 */
export async function useWpSearchAllPosts(
	query: string,
	options?: WpQueryParams,
): Promise<FetchResult<WpPost[]>> {
	return WordPressService.getInstance().useSearchAllPosts(query, options);
}

/**
 * Finds a single post by its URL slug. Returns `null` if not found.
 *
 * @param slug - The post slug (e.g. "hello-world").
 * @returns The post or `null` if not found.
 *
 * @example
 * ```ts
 * const result = await useWpFindPostBySlug("hello-world");
 * ```
 */
export async function useWpFindPostBySlug(slug: string): Promise<FetchResult<WpPost | null>> {
	return WordPressService.getInstance().useFindPostBySlug(slug);
}
