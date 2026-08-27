import axios, { type AxiosRequestConfig } from "axios";


export async function AXIOS_FETCH<T>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<T | null> {
	try {
		const response = await axios.request<T>({ url, ...config });
		return response.data;
	} catch (error) {
		console.error("Axios error:", error);
		return null;
	}
}
export function buildApiUrl(
	apiName: string,
	endpointName: string,
	options: UrlOptions = {},
): string {
	const api = _apis[apiName];
	if (!api) {
		throw new Error(
			`API "${apiName}" not found. Available: ${Object.keys(_apis).join(", ")}`,
		);
	}

	const template = api.endpoints[endpointName];
	if (!template) {
		throw new Error(
			`Endpoint "${endpointName}" not found in "${apiName}". Available: ${Object.keys(api.endpoints).join(", ")}`,
		);
	}

	let path = template;
	if (options.params) {
		for (const [k, v] of Object.entries(options.params)) {
			path = path.replace(
				new RegExp(`:${k}\\b`, "g"),
				encodeURIComponent(String(v)),
			);
		}
	}

	const defaults = api.defaultQueryParams?.[endpointName] ?? {};
	const merged: Record<string, string> = {};

	for (const [k, v] of Object.entries(defaults)) {
		merged[k] = String(v);
	}

	if (options.query) {
		for (const [k, v] of Object.entries(options.query)) {
			if (v === undefined || v === null) {
				delete merged[k];
			} else {
				merged[k] = String(v);
			}
		}
	}

	const url = new URL(`${api.baseUri}${path}`);
	for (const [k, v] of Object.entries(merged)) {
		url.searchParams.set(k, v);
	}

	return url.toString();
}
export async function useFetchRequest<T = unknown>(
	apiName: string,
	endpointName: string,
	options: FetchOptions = {},
): Promise<FetchResult<T>> {
	const { params, query, ...init } = options;
	const url = buildApiUrl(apiName, endpointName, { params, query });

	const res = await fetch(url, init);

	if (!res.ok) {
		throw new Error(
			`API Error [${apiName}/${endpointName}]: ${res.status} ${res.statusText}`,
		);
	}

	const data = (await res.json()) as T;

	return { data, url, status: res.status, ok: res.ok };
}


export function LOGGER(...args: unknown[]): void {
	const last = args[args.length - 1];
	let level: LogLevel = "log";

	if (
		args.length > 1 &&
		typeof last === "string" &&
		["log", "warn", "error", "info"].includes(last)
	) {
		level = last as LogLevel;
		args.pop();
	}

	console[level](...args);
}

export async function FETCH_REQUEST<T>(
	url: string,
	options: RequestInit = {},
): Promise<T | null> {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			console.error(`Fetch error: ${response.status}`);
			return null;
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error("Fetch network error:", error);
		return null;
	}
}

export async function POST<TResponse, TBody>(
	url: string,
	body: TBody,
): Promise<TResponse | null> {
	return FETCH_REQUEST<TResponse>(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

export function STRINGIFY_QUERY(
	params: Record<string, string | number | boolean>,
): string {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.append(key, String(value));
	});
	return searchParams.toString();
}
