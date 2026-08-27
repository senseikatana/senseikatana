
export type LogLevel = "log" | "warn" | "error" | "info";
export type ApisConfig = Record<string, ApiEntry>;

export interface FetchApis<T = RequestInit | unknown> extends UrlOptions {
	url: string | URLPattern;
	data?: T;
	options: RequestInit & {
		body: RequestInit["body"];
		methodName: RequestInit["method"];
	};
}

export interface ApiEntry {
	baseUri: string;
	endpoints?: Record<string, string>;
	defaultQueryParams?: Record<string, Record<string, string | number>>;
}

export interface UrlOptions {
	params?: Record<string, string | number>;
	query?: Record<string, string | number | boolean>;
}

export interface FetchResult<T> {
	data: T;
	url: string;
	status: number;
	ok: boolean;
}
