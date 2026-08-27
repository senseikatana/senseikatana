import { LOGGER } from "./logger.utils";
import type {
	ApiEntry,
	ApisConfig,
	FetchOptions,
	FetchResult,
	UrlOptions,
	Users,
	UsersResponse,
} from "./types";

export default class FetchApiManager {
	private static instance: FetchApiManager;
	private apis: ApisConfig = {};

	static getInstance(): FetchApiManager {
		if (!FetchApiManager.instance)
			FetchApiManager.instance = new FetchApiManager();
		return FetchApiManager.instance;
	}

	// Aceptamos la config ya tipada, eliminando validaciones redundantes
	init(apis: ApisConfig): void {
		this.apis = apis;
	}

	buildUrl(
		apiName: string,
		endpointName: string,
		{ params, query }: UrlOptions = {},
	): string {
		const api: ApiEntry = this.getApiEntry(apiName);
		let path: string = api.endpoints?.[endpointName] ?? "";

		if (!path)
			throw new Error(`Endpoint "${endpointName}" not found in "${apiName}"`);

		// Reemplazo de path params
		if (params) {
			path = Object.entries(params).reduce(
				(acc, [k, v]) =>
					acc.replace(
						new RegExp(`:${k}\\b`, "g"),
						encodeURIComponent(String(v)),
					),
				path,
			);
		}

		const url = new URL(`${api.baseUri}${path}`);

		// Merge simple de defaults + query params
		const mergedQuery = { ...api.defaultQueryParams?.[endpointName], ...query };
		Object.entries(mergedQuery).forEach(([k, v]) => {
			if (v != null) url.searchParams.set(k, String(v));
		});

		return url.toString();
	}

	async fetch<T = unknown>(
		apiName: string,
		endpointName: string,
		{ urlOptions, ...init }: FetchOptions = {},
	): Promise<FetchResult<T>> {
		const url: string = this.buildUrl(apiName, endpointName, urlOptions);
		const response = await fetch(url, init);

		if (!response.ok) {
			throw new Error(
				`API Error [${apiName}/${endpointName}]: ${response.status} ${response.statusText}`,
			);
		}

		return {
			data: (await response.json()) as T,
			url: response.url,
			status: response.status,
			ok: response.ok,
		};
	}

	private getApiEntry(apiName: string): ApiEntry {
		const api = this.apis[apiName];
		if (!api) throw new Error(`API "${apiName}" not found`);
		return api;
	}
}

// ============================================================
// * DEMO USAGE:
// ============================================================
// 1. Obtener instancia y configurar la API
const api: FetchApiManager = FetchApiManager.getInstance();

// TODO: Esta es la clave para todas las API RESTFULL :
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
			// Query params por defecto que siempre se incluyen
			list: { limit: 10, skip: 0 },
			search: { limit: 10 },
		},
	},
});

// 2. GET - Listar usuarios (con paginación)
export const getAllUsers: FetchResult<UsersResponse> =
	await api.fetch<UsersResponse>("dummyJsonUsers", "list", {
		urlOptions: { query: { limit: 4, skip: 10 } },
	});

export const {
	users = {} as Users[],
	limit = 0,
	skip = 0,
	total = 50,
} = getAllUsers.data;
export const userId: string | number = users[0].id ?? "";

// URL: https://dummyjson.com/users?limit=5&skip=10
LOGGER("Usuarios: ", users);

// 3. GET - Obtener usuario por ID (path params)
export const findOneUserById: FetchResult<number | string> = await api.fetch<
	Users["id"]
>("dummyJsonUser", "findOneById", {
	urlOptions: { params: { id: userId ?? 1 } },
});

// URL: https://dummyjson.com/users/1
LOGGER("Usuario by ID: ", findOneUserById.data);

// 4. GET - Buscar usuarios (query params)
export const searchUsers = await api.fetch("dummuJsonUsers", "search", {
	urlOptions: { query: { q: "Emma", select: "firstName,lastName,email" } },
});

// URL: https://dummyjson.com/users/search?q=John&select=firstName,lastName,email&limit=10
LOGGER("Búsqueda: ", searchUsers.data);

// 5. GET - Filtrar usuarios (query params complejos)
export const filteredUsers: FetchResult<UsersResponse> =
	await api.fetch<UsersResponse>("dummyJsonUsers", "filter", {
		urlOptions: { query: { key: "age", value: "25", limitUsers: limit ?? 10 } },
	});

// URL: https://dummyjson.com/users/filter?key=age&value=25&limit=10
LOGGER("Filtrados usuarios: ", filteredUsers.data);

// 6. POST - Crear usuario (con body)
export const createdUser = await api.fetch<Users>("dummyJsonUsers", "add", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		firstName: "Carlos",
		lastName: "López Piñeiro",
		email: "mallorcabaleares2015@gmail.com",
		age: 44,
		username: "cbd",
	}),
});

// URL: https://dummyjson.com/users/add
LOGGER("Nuevo usuario Creado: ", createdUser.data);

// 7. PUT - Actualizar usuario (path params + body)
export const updatedUser = await api.fetch<Users[]>(
	"dummyJsonUsers",
	"updateUserById",
	{
		method: "PUT",
		urlOptions: { params: { id: userId ?? 1 } },
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ age: 48 }),
	},
);

// URL: https://dummyjson.com/users/1
LOGGER("Actualizado: ", updatedUser.data);

// 8. DELETE - Eliminar usuario (path params)
const deletedUser = await api.fetch<Users["id"]>(
	"dummyJsonUsers",
	"deleteUserById",
	{
		method: "DELETE",
		urlOptions: { params: { id: userId ?? 1 } },
	},
);

// URL: https://dummyjson.com/users/1
LOGGER(`Usuario con id: ${userId} eliminado exitosamente: `, deletedUser.data);
