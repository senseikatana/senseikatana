export type ApisConfig = Record<string, ApiEntry>;

export interface ApiEntry {
	baseUri: string;
	endpoints?: Record<string, string>;
	defaultQueryParams?: Record<string, Record<string, string | number>>;
}

export interface UrlOptions {
	params?: Record<string, string | number>;
	query?: Record<string, string | number | boolean | null | undefined>;
}

export interface FetchOptions extends Omit<RequestInit, "body"> {
	urlOptions?: UrlOptions;
	body?: BodyInit | null;
}

export interface FetchResult<T> {
	data: T;
	url: string;
	status: number;
	ok: boolean;
}

export default abstract class FetchApiManager {
	private static instance: FetchApiManager;
	private apis: ApisConfig = {};

	// Singleton para acceso global consistente
	static getInstance(): FetchApiManager {
		if (!FetchApiManager.instance) {
			FetchApiManager.instance = new FetchApiManager();
		}
		return FetchApiManager.instance;
	}

	// Inicializa y normaliza la configuración
	init(source: Record<string, unknown>): void {
		this.apis = this.normalize(source);
	}

	// Construye la URL final con parámetros y query strings
	buildUrl(
		apiName: string,
		endpointName: string,
		options: UrlOptions = {},
	): string {
		const api = this.getApiEntry(apiName);
		const path = this.resolvePath(api, endpointName, options.params);
		const url = new URL(`${api.baseUri}${path}`);

		// Fusionar defaults con query params proporcionados
		const defaults = api.defaultQueryParams?.[endpointName] ?? {};
		const mergedQuery: Record<string, string> = {};

		for (const [k, v] of Object.entries(defaults)) {
			mergedQuery[k] = String(v);
		}

		if (options.query) {
			for (const [k, v] of Object.entries(options.query)) {
				if (v != null) mergedQuery[k] = String(v);
				else delete mergedQuery[k];
			}
		}

		for (const [k, v] of Object.entries(mergedQuery)) {
			url.searchParams.set(k, v);
		}

		return url.toString();
	}

	// Ejecuta la petición usando fetch nativo
	async fetch<T = unknown>(
		apiName: string,
		endpointName: string,
		options: FetchOptions = {},
	): Promise<FetchResult<T>> {
		const { urlOptions, ...requestInit } = options;
		const url = this.buildUrl(apiName, endpointName, urlOptions);

		const response = await fetch(url, requestInit);

		if (!response.ok) {
			throw new Error(
				`API Error [${apiName}/${endpointName}]: ${response.status} ${response.statusText}`,
			);
		}

		const data = (await response.json()) as T;

		return {
			data,
			url,
			status: response.status,
			ok: response.ok,
		};
	}

	// Obtiene entrada de API o lanza error descriptivo
	private getApiEntry(apiName: string): ApiEntry {
		const api = this.apis[apiName];
		if (!api) {
			throw new Error(
				`API "${apiName}" not found. Available: ${Object.keys(this.apis).join(", ")}`,
			);
		}
		return api;
	}

	// Resuelve template de ruta con params
	private resolvePath(
		api: ApiEntry,
		endpointName: string,
		params?: Record<string, string | number>,
	): string {
		const template = api.endpoints?.[endpointName];
		if (!template) {
			throw new Error(
				`Endpoint "${endpointName}" not found in "${api.baseUri}". Available: ${Object.keys(api.endpoints ?? {}).join(", ")}`,
			);
		}

		if (!params) return template;

		return Object.entries(params).reduce((acc, [key, value]) => {
			return acc.replace(
				new RegExp(`:${key}\\b`, "g"),
				encodeURIComponent(String(value)),
			);
		}, template);
	}

	// Normaliza configuración cruda limpiando espacios y claves
	private normalize(raw: Record<string, unknown>): ApisConfig {
		const config: ApisConfig = {};

		for (const [key, val] of Object.entries(raw)) {
			const entry = val as Record<string, unknown>;
			const baseUri = String(entry.baseUri ?? entry.baseUrl ?? "")
				.trim()
				.replace(/\/+$/, "");
			const endpoints = (entry.endpoints ?? entry.routes ?? {}) as Record<
				string,
				string
			>;
			const rawDefaults = (entry.defaultQueryParams ?? {}) as Record<
				string,
				Record<string, unknown>
			>;

			const defaultQueryParams: Record<
				string,
				Record<string, string | number>
			> = {};
			for (const [ep, qs] of Object.entries(rawDefaults)) {
				defaultQueryParams[ep.trim()] = {};
				for (const [qk, qv] of Object.entries(qs)) {
					defaultQueryParams[ep.trim()][qk.trim()] = qv as string | number;
				}
			}

			config[key.trim()] = {
				baseUri,
				endpoints: Object.fromEntries(
					Object.entries(endpoints).map(([k, p]) => [k.trim(), p.trim()]),
				),
				defaultQueryParams,
			};
		}

		return config;
	}
}


