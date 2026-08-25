/**
 * Tipo genérico que simula la estructura de una entrada de Astro
 * sin importar Astro directamente (mantiene el módulo agnóstico).
 */
export interface COLLECTION_ENTRY_LIKE<TData = any> {
  id: string;
  slug?: string;
  data?: TData;
  [key: string]: unknown;
}

export interface PATHS_OPTIONS<T, TParam extends string = string, TProps = T> {
  /** Nombre del parámetro dinámico del archivo: [slug], [id], [name]... Default: 'slug' */
  param?: TParam;
  /** Extrae el valor del parámetro de cada item. Default: item.slug ?? item.id */
  valueFrom?: (item: T) => string | number;
  /** Construye las props que recibe cada página vía Astro.props. Default: el item completo */
  propsFrom?: (item: T) => TProps;
  /** Avanzado: objeto params completo para rutas multi-parámetro ([category]/[slug].astro) */
  paramsFrom?: (item: T) => Record<string, string>;
}

export type ASTRO_PATH<TParam extends string = string, TProps = any> = {
  params: Record<TParam, string>;
  props: TProps;
};

// ─── Núcleo ──────────────────────────────────────────────────────────

/**
 * PATHS_FROM: Convierte CUALQUIER array (colecciones, APIs externas, JSON...)
 * al formato exacto que Astro exige en getStaticPaths.
 */
export function PATHS_FROM<T, TParam extends string = 'slug', TProps = T>(
  items: T[],
  options: PATHS_OPTIONS<T, TParam, TProps> = {}
): Array<ASTRO_PATH<TParam, TProps>> {
  const {
    param = 'slug' as TParam,
    valueFrom = (item: any) => item?.slug ?? item?.id,
    propsFrom = (item: T) => item as unknown as TProps,
    paramsFrom,
  } = options;

  return items.map((item) => ({
    params: (paramsFrom
      ? paramsFrom(item)
      : { [param]: String(valueFrom(item)) }) as Record<TParam, string>,
    props: propsFrom(item),
  }));
}

// ─── Wrapper para Colecciones de Astro ───────────────────────────────

/**
 * GET_STATIC_PATHS: Versión cómoda para astro:content (getCollection).
 */
export async function GET_STATIC_PATHS<
  TData = any,
  TParam extends string = 'slug',
  TProps = COLLECTION_ENTRY_LIKE<TData>
>(
  getCollectionFn: (collection: string) => Promise<Array<COLLECTION_ENTRY_LIKE<TData>>>,
  collectionName: string,
  options: PATHS_OPTIONS<COLLECTION_ENTRY_LIKE<TData>, TParam, TProps> = {}
): Promise<Array<ASTRO_PATH<TParam, TProps>>> {
  try {
    const entries = await getCollectionFn(collectionName);
    return PATHS_FROM(entries, options);
  } catch (error) {
    console.error(`[GET_STATIC_PATHS] Error generando rutas de "${collectionName}":`, error);
    return [];
  }
}

// ─── Helpers Genéricos ───────────────────────────────────────────────

/**
 * FIND_ENTRY: Busca un item por cualquier parámetro (slug, id, name...).
 * Reemplaza a FIND_ENTRY_BY_SLUG con una firma totalmente genérica.
 */
export function FIND_ENTRY<T>(
  items: T[],
  value: string,
  keyFrom?: (item: T) => string | number
): T | null {
  const getKey = keyFrom ?? ((item: any) => item?.slug ?? item?.id);
  return items.find((item) => String(getKey(item)) === value) ?? null;
}

/**
 * GENERATE_PAGINATION: Divide un array en páginas para rutas /lista/page/[page].
 */
export function GENERATE_PAGINATION<T, TParam extends string = 'page'>(
  items: T[],
  pageSize: number = 10,
  param: TParam = 'page' as TParam
): Array<{
  params: Record<TParam, string | undefined>;
  props: { items: T[]; currentPage: number; totalPages: number };
}> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  return Array.from({ length: totalPages }, (_, i) => {
    const currentPage = i + 1;
    return {
      // Página 1 sin param permite generar /posts directo (con [page] opcional)
      params: { [param]: currentPage === 1 ? undefined : String(currentPage) } as Record<TParam, string | undefined>,
      props: {
        items: items.slice(i * pageSize, (i + 1) * pageSize),
        currentPage,
        totalPages,
      },
    };
  });
}