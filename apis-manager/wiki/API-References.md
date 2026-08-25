# Referencia de la API

Esta página documenta la firma, los parámetros y el retorno de cada función y tipo exportados por la librería. Usa las funciones del núcleo para construir URLs y hacer peticiones; usa el hook solo dentro de componentes de React.

## Funciones

### initApis(source)

`initApis(source: Record<string, unknown>): ApisConfig`

Reemplaza la configuración global y la devuelve. Llámala una vez al arrancar de tu aplicación, antes de usar `buildApiUrl` o `fetchApi`. El parámetro `source` acepta cualquier objeto con la forma de `data/apis.json`; la función normaliza claves, valores y barras finales del `baseUri`.

### getApis()

`getApis(): ApisConfig`

Devuelve la configuración global actual, tal como la dejó `initApis`.

### buildApiUrl(apiName, endpointName, options?)

`buildApiUrl(apiName: string, endpointName: string, options?: UrlOptions): string`

Construye la URL final de un endpoint y la devuelve como cadena:

- Sustituye cada `:parametro` del template con el valor correspondiente de `options.params`, codificado con `encodeURIComponent`.
- Fusiona los `defaultQueryParams` del endpoint con `options.query`. Un valor explícito sobrescribe el default; `null` o `undefined` lo eliminan.
- Lanza un error si la API o el endpoint no existen en la configuración.

### fetchApi(apiName, endpointName, options?)

`fetchApi<T>(apiName: string, endpointName: string, options?: FetchOptions): Promise<FetchResult<T>>`

Construye la URL con `buildApiUrl` y ejecuta `fetch` con el resto de opciones como `RequestInit`. Si la respuesta no es `ok`, lanza un error con el código y el texto del estado. Si es `ok`, parsea el cuerpo como JSON, lo tipa como `T` y lo devuelve dentro de un `FetchResult<T>`.

### useApiUrl(apiName, endpointName, options?)

`useApiUrl(apiName: string, endpointName: string, options?: UrlOptions): string`

Hook de React que envuelve `buildApiUrl` con `useMemo`. Las dependencias son el nombre de la API, el nombre del endpoint y la serialización de `options`, de modo que un objeto `options` nuevo en cada render no provoca recálculos si su contenido no cambió.

## Tipos

### ApiEntry

```ts
interface ApiEntry {
  baseUri: string
  endpoints: Record<string, string>
  defaultQueryParams?: Record<string, Record<string, string | number>>
}
```

Describe una API: su URL base, sus endpoints y los parámetros de consulta por defecto de cada endpoint.

### ApisConfig

```ts
type ApisConfig = Record<string, ApiEntry>
```

Mapa de nombre de API a su `ApiEntry`. Es la forma de `data/apis.json`.

### UrlOptions

```ts
interface UrlOptions {
  params?: Record<string, string | number>
  query?: Record<string, string | number | boolean>
}
```

Parámetros de ruta (`params`) y de consulta (`query`) para `buildApiUrl`.

### FetchOptions

```ts
interface FetchOptions<T = unknown> extends UrlOptions, Omit<RequestInit, 'body'> {
  body?: BodyInit | null
}
```

Opciones de `fetchApi`: `params` y `query` para la URL, más cualquier opción de `RequestInit` para `fetch`.

### FetchResult

```ts
interface FetchResult<T> {
  data: T
  url: string
  status: number
  ok: boolean
}
```

Resultado de `fetchApi`: los datos tipados, la URL final, el código de estado y el indicador `ok`.

## Formato de data/apis.json

Cada clave de nivel superior es el nombre de una API y cada valor es un `ApiEntry`:

```json
{
  "dummyjson": {
    "baseUri": "https://dummyjson.com",
    "endpoints": {
      "products": "/products",
      "productById": "/products/:id"
    },
    "defaultQueryParams": {
      "products": { "limit": 5 }
    }
  }
}
```

Reglas del formato:

- `baseUri`: raíz de la API, sin barra final (la normalización la elimina si existe).
- `endpoints`: mapa de nombre de endpoint a plantilla de ruta. Los segmentos dinámicos se escriben como `:nombre`.
- `defaultQueryParams`: mapa opcional de endpoint a parámetros de consulta que se aplican si la llamada no los sobrescribe.

El proyecto guarda esta configuración en `data/apis.json`. Cuando uses una API nueva, crea su propio archivo JSON dentro de `data/` con esta misma forma.
