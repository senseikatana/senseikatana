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
