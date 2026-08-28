/**
 * Generic type that simulates the structure of an Astro collection entry
 * without importing Astro directly (keeps the module agnostic).
 */
export interface CollectionEntryLike<TData = unknown> {
	id: string;
	slug?: string;
	data?: TData;
	[key: string]: unknown;
}

/**
 * Configuration options for generating Astro static paths.
 */
export interface PathsOptions<T, TParam extends string = string, TProps = T> {
	/** Dynamic parameter name from the file: [slug], [id], [name]... Default: 'slug' */
	param?: TParam;
	/** Extracts the parameter value from each item. Default: item.slug ?? item.id */
	valueFrom?: (item: T) => string | number;
	/** Builds the props that each page receives via Astro.props. Default: the entire item */
	propsFrom?: (item: T) => TProps;
	/** Advanced: complete params object for multi-parameter routes ([category]/[slug].astro) */
	paramsFrom?: (item: T) => Record<string, string>;
}

/**
 * Structure of a single Astro static path with its associated props.
 */
export interface AstroPath<TParam extends string = string, TProps = unknown> {
	params: Record<TParam, string | undefined>;
	props: TProps;
}
