// utils/astro.utils.ts


/**
 * Utility class for Astro-related operations like generating static paths,
 * finding collection entries, and handling pagination.
 */
export class AstroUtils {
	private static instance: AstroUtils;

	private constructor() {}

	/**
	 * Returns the singleton instance of AstroUtils.
	 */
	static getInstance(): AstroUtils {
		if (!AstroUtils.instance) {
			AstroUtils.instance = new AstroUtils();
		}
		return AstroUtils.instance;
	}

	/**
	 * Converts ANY array (collections, external APIs, JSON...) to the exact
	 * format that Astro requires in getStaticPaths.
	 *
	 * @param items - Array of items to convert
	 * @param options - Configuration options for path generation
	 * @returns Array of Astro paths with params and props
	 *
	 * @example
	 * ```typescript
	 * const posts = [{ slug: 'hello', title: 'Hello World' }];
	 * const paths = AstroUtils.pathsFrom(posts, { param: 'slug' });
	 * // Returns: [{ params: { slug: 'hello' }, props: { slug: 'hello', title: 'Hello World' } }]
	 * ```
	 */
	pathsFrom<T, TParam extends string = "slug", TProps = T>(
		items: T[],
		options: PathsOptions<T, TParam, TProps> = {},
	): AstroPath<TParam, TProps>[] {
		const {
			param = "slug" as TParam,
			valueFrom = (item: T & { slug?: string; id?: string }) => item?.slug ?? item?.id ?? "",
			propsFrom = (item: T) => item as unknown as TProps,
			paramsFrom,
		} = options;

		return items.map((item) => ({
			params: (paramsFrom
				? paramsFrom(item)
				: { [param]: String(valueFrom(item)) }) as Record<TParam, string | undefined>,
			props: propsFrom(item),
		}));
	}

	/**
	 * Convenient wrapper for Astro content collections (getCollection).
	 * Fetches a collection and generates static paths from it.
	 *
	 * @param getCollectionFn - Function to fetch the collection (e.g., Astro's getCollection)
	 * @param collectionName - Name of the collection to fetch
	 * @param options - Configuration options for path generation
	 * @returns Promise resolving to array of Astro paths
	 *
	 * @example
	 * ```typescript
	 * // In [slug].astro
	 * export async function getStaticPaths() {
	 *   return AstroUtils.getStaticPaths(getCollection, 'blog');
	 * }
	 * ```
	 */
	async getStaticPaths<TData = unknown, TParam extends string = "slug", TProps = CollectionEntryLike<TData>>(
		getCollectionFn: (collection: string) => Promise<CollectionEntryLike<TData>[]>,
		collectionName: string,
		options: PathsOptions<CollectionEntryLike<TData>, TParam, TProps> = {},
	): Promise<AstroPath<TParam, TProps>[]> {
		try {
			const entries = await getCollectionFn(collectionName);
			return this.pathsFrom(entries, options);
		} catch (error) {
			LOGGER(`[getStaticPaths] Error generating routes for "${collectionName}":`, error, "error");
			return [];
		}
	}

	/**
	 * Finds an item by any parameter (slug, id, name...).
	 * Replaces FIND_ENTRY_BY_SLUG with a fully generic signature.
	 *
	 * @param items - Array to search in
	 * @param value - Value to search for
	 * @param keyFrom - Function to extract the key from each item. Default: item.slug ?? item.id
	 * @returns The found item or null if not found
	 *
	 * @example
	 * ```typescript
	 * const posts = [{ slug: 'hello', title: 'Hello' }];
	 * const post = AstroUtils.findEntry(posts, 'hello');
	 * // Returns: { slug: 'hello', title: 'Hello' }
	 * ```
	 */
	findEntry<T>(
		items: T[],
		value: string,
		keyFrom?: (item: T) => string | number,
	): T | null {
		const getKey = keyFrom ?? ((item: T & { slug?: string; id?: string }) => item?.slug ?? item?.id ?? "");
		return items.find((item) => String(getKey(item)) === value) ?? null;
	}

	/**
	 * Divides an array into pages for routes like /list/page/[page].
	 *
	 * @param items - Array to paginate
	 * @param pageSize - Number of items per page. Default: 10
	 * @param param - Parameter name for the page number. Default: 'page'
	 * @returns Array of paginated paths with props containing items, currentPage, and totalPages
	 *
	 * @example
	 * ```typescript
	 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	 * const pages = AstroUtils.generatePagination(items, 5);
	 * // Returns 3 pages: page 1 (items 1-5), page 2 (items 6-10), page 3 (item 11)
	 * ```
	 */
	generatePagination<T, TParam extends string = "page">(
		items: T[],
		pageSize: number = 10,
		param: TParam = "page" as TParam,
	): AstroPath<TParam, { items: T[]; currentPage: number; totalPages: number }>[] {
		const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

		return Array.from({ length: totalPages }, (_, i) => {
			const currentPage = i + 1;
			return {
				// Page 1 without param allows generating /posts directly (with optional [page])
				params: { [param]: currentPage === 1 ? undefined : String(currentPage) } as Record<
					TParam,
					string | undefined
				>,
				props: {
					items: items.slice(i * pageSize, (i + 1) * pageSize),
					currentPage,
					totalPages,
				},
			};
		});
	}

	/**
	 * Helper to generate paths from a simple array of strings or numbers.
	 * Useful for tag pages, category pages, etc.
	 *
	 * @param values - Array of values to convert to paths
	 * @param param - Parameter name. Default: 'slug'
	 * @returns Array of Astro paths
	 *
	 * @example
	 * ```typescript
	 * const tags = ['javascript', 'typescript', 'astro'];
	 * const paths = AstroUtils.pathsFromValues(tags, 'tag');
	 * // Returns: [{ params: { tag: 'javascript' }, props: 'javascript' }, ...]
	 * ```
	 */
	pathsFromValues<TParam extends string = "slug">(
		values: (string | number)[],
		param: TParam = "slug" as TParam,
	): AstroPath<TParam, string | number>[] {
		return values.map((value) => ({
			params: { [param]: String(value) } as Record<TParam, string | undefined>,
			props: value,
		}));
	}

	/**
	 * Extracts unique values from a collection based on a key function.
	 * Useful for generating tag/category pages.
	 *
	 * @param items - Array of items
	 * @param keyFrom - Function to extract the value from each item
	 * @returns Array of unique values
	 *
	 * @example
	 * ```typescript
	 * const posts = [{ tags: ['js', 'ts'] }, { tags: ['ts', 'astro'] }];
	 * const tags = AstroUtils.extractUniqueValues(posts, item => item.tags).flat();
	 * // Returns: ['js', 'ts', 'astro']
	 * ```
	 */
	extractUniqueValues<T, V>(items: T[], keyFrom: (item: T) => V | V[]): V[] {
		const values = items.flatMap(keyFrom);
		return [...new Set(values)];
	}
}

// Export singleton instance for convenience
export const {getStaticPaths, generatePagination}: AstroUtils = AstroUtils.getInstance();

