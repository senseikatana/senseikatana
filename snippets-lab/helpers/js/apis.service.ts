// services/api-manager.service.ts
import { LOGGER } from "../logs/logger.service";
import type {
	ApiEntry,
	ApisConfig,
	FetchOptions,
	FetchResult,
	UrlOptions,
} from "../../types";
import { ErrorService } from "./error.service";

export default class FetchApiManager {
	private static instance: FetchApiManager;
	private apis: ApisConfig = {};

	private constructor() {}

	static getInstance(): FetchApiManager {
		if (!FetchApiManager.instance) {
			FetchApiManager.instance = new FetchApiManager();
		}
		return FetchApiManager.instance;
	}

	init(apis: ApisConfig): void {
		this.apis = apis;
	}

	getApis(): ApisConfig {
		return this.apis;
	}

	// Construcción de URL final con parámetros
	buildUrl(
		apiName: string,
		endpointName: string,
		{ params, query }: UrlOptions = {},
	): string {
		const api = this.getApiEntry(apiName);
		let path = api.endpoints?.[endpointName] ?? "";

		if (!path) {
			throw ErrorService.notFound(
				`Endpoint "${endpointName}" not found in "${apiName}"`,
			);
		}

		// Reemplazo de path params (:id, :userId, etc.)
		if (params) {
			path = Object.entries(params).reduce(
				(acc, [key, value]) =>
					acc.replace(
						new RegExp(`:${key}\\b`, "g"),
						encodeURIComponent(String(value)),
					),
				path,
			);
		}

		const url = new URL(`${api.baseUri}${path}`);

		// Merge de defaults + query params (null/undefined se ignoran)
		const mergedQuery = { ...api.defaultQueryParams?.[endpointName], ...query };
		for (const [key, value] of Object.entries(mergedQuery)) {
			if (value != null) url.searchParams.set(key, String(value));
		}

		return url.toString();
	}

	// Método principal (genérico)
	async fetch<T = unknown>(
		apiName: string,
		endpointName: string,
		{ urlOptions, ...init }: FetchOptions = {},
	): Promise<FetchResult<T>> {
		const url = this.buildUrl(apiName, endpointName, urlOptions);

		try {
			const response = await fetch(url, init);

			if (!response.ok) {
				throw ErrorService.custom(
					`API Error [${apiName}/${endpointName}]: ${response.status} ${response.statusText}`,
					response.status,
				);
			}

			const data = (await response.json()) as T;

			return {
				data,
				url: response.url,
				status: response.status,
				ok: response.ok,
			};
		} catch (error) {
			if (error instanceof ErrorService) throw error;
			throw ErrorService.internal(
				`Network error: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	// Shortcuts HTTP para mayor claridad
	async get<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return this.fetch<T>(apiName, endpointName, { method: "GET", urlOptions });
	}

	async post<T = unknown>(
		apiName: string,
		endpointName: string,
		body: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return this.fetch<T>(apiName, endpointName, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			urlOptions,
		});
	}

	async put<T = unknown>(
		apiName: string,
		endpointName: string,
		body: unknown,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return this.fetch<T>(apiName, endpointName, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			urlOptions,
		});
	}

	async delete<T = unknown>(
		apiName: string,
		endpointName: string,
		urlOptions?: UrlOptions,
	): Promise<FetchResult<T>> {
		return this.fetch<T>(apiName, endpointName, { method: "DELETE", urlOptions });
	}

	private getApiEntry(apiName: string): ApiEntry {
		const api = this.apis[apiName];
		if (!api) {
			throw ErrorService.notFound(`API "${apiName}" not found`);
		}
		return api;
	}
}

// ============================================================
// TODO: demo/api.service.ts demo
// ============================================================

// demo/api-demo.ts (Uso)
import FetchApiManager from "../services/api-manager.service";
import type { User, UsersResponse } from "../../types";

const api = FetchApiManager.getInstance();

// Inicialización (una sola vez al arrancar la app)
api.init({
	dummyJsonUsers: {
		baseUri: "https://dummyjson.com",
		endpoints: {
			findAll: "/users",
			findOneById: "/users/:id",
			add: "/users/add",
			updateUserById: "/users/:id",
			deleteUserById: "/users/:id",
			search: "/users/search",
			filter: "/users/filter",
		},
		defaultQueryParams: {
			findAll: { limit: 10, skip: 0 },
			search: { limit: 10 },
		},
	},
});

export async function runApiDemo(): Promise<void> {
	// 1. GET - Listar (usando shortcut)
	const allUsers = await api.get<UsersResponse>("dummyJsonUsers", "findAll", {
		query: { limit: 4, skip: 0 },
	});
	LOGGER("Usuarios:", allUsers.data.users, "info");

	const getUserId: User['id'] = allUsers.data.users[0]?.id ?? 1;

	// 2. GET - Por ID
	const oneUser = await api.get<User>("dummyJsonUsers", "findOneById", {
		params: { id: getUserId },
	});
	LOGGER("Usuario por ID:", oneUser.data, "info");

	// 3. GET - Búsqueda
	const searched = await api.get<UsersResponse>("dummyJsonUsers", "search", {
		query: { q: "Emma", select: "firstName,lastName,email" },
	});
	LOGGER("Búsqueda:", searched.data.users, "info");

	// 4. GET - Filtro
	const filtered = await api.get<UsersResponse>("dummyJsonUsers", "filter", {
		query: { key: "age", value: 25 },
	});
	LOGGER("Filtrados:", filtered.data.users, "info");

	// 5. POST - Crear (con shortcut que gestiona body + headers)
	const created = await api.post<User>(
		"dummyJsonUsers",
		"add",
		{
			firstName: "Carlos",
			lastName: "López",
			email: "carlos@example.com",
			age: 44,
			username: "cbd",
		},
	);
	LOGGER("Creado:", created.data, "info");

	// 6. PUT - Actualizar
	const updated = await api.put<User>(
		"dummyJsonUsers",
		"updateUserById",
		{ age: 48 },
		{ params: { id: userId } },
	);
	LOGGER("Actualizado:", updated.data, "info");

	// 7. DELETE - Eliminar
	const deleted = await api.delete<User>(
		"dummyJsonUsers",
		"deleteUserById",
		{ params: { id: userId } },
	);
	LOGGER("Eliminado:", deleted.data, "info");
}
