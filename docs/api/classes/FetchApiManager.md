[katanakit-js](../index.md) / FetchApiManager

# Class: FetchApiManager

Defined in: [core/services/http.service.ts:111](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L111)

FetchApiManager - Singleton para el registro de APIs y peticiones HTTP.

Aplica el patrón Singleton: una única instancia mantiene el registro de APIs
(`ApisConfig`) y centraliza la construcción de URLs y las peticiones fetch,
devolviendo siempre Safe Results (nunca lanza en rutas async).

## Example

```ts
const fetchApi = FetchApiManager.getInstance();
fetchApi.useInit({ pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } } });
const result = await fetchApi.useFetch("pokeapi", "byId", { params: { id: 25 } });
```

## Methods

### useAddRequestInterceptor()

```ts
useAddRequestInterceptor(interceptor): () => void;
```

Defined in: [core/services/http.service.ts:185](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L185)

Registers a request interceptor, which runs before `fetch` on every request.
Interceptors run sequentially in registration order and can mutate `url` or
`init`. The returned function unregisters this interceptor.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) | The function to run before the request is sent. |

#### Returns

A function that unregisters the interceptor.

() => `void`

***

### useBuildUrl()

```ts
useBuildUrl(
   apiName, 
   endpointName, 
   options?
): string;
```

Defined in: [core/services/http.service.ts:217](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L217)

Returns the URL of a registered endpoint **without calling `fetch`**.

It builds the same URL [useFetch](../functions/useFetch.md) would request - same registry,
same `:param` substitution, same `query` merge with `defaultQueryParams`,
same http(s) guard - then stops and hands you the string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | Registered API key (from `defineApiConfig`). |
| `endpointName` | `string` | Endpoint key inside that API. |
| `options` | [`UrlOptions`](../interfaces/UrlOptions.md) | `params` fills `:placeholders`, `query` becomes the search string. |

#### Returns

`string`

The fully built URL.

#### Throws

Unknown API, unknown endpoint, or a scheme that is not http(s).

#### Example

```ts
FetchApiManager.getInstance().useBuildUrl("pokeapi", "pokemonById", { params: { id: 25 } });
// → "https://pokeapi.co/api/v2/pokemon/25"
```

#### Remarks

Synchronous, so it **throws** instead of returning a Safe Result -
Safe Result covers fallible async work, and this never leaves the process.

***

### useDelete()

```ts
useDelete<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:496](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L496)

DELETE helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

***

### useFetch()

```ts
useFetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L280)

Fetches a registered endpoint and returns a Safe Result.

URL options sit at the top level, next to `method`/`headers`/`body` - no
nesting, same shape as `useGet` and Nuxt's `useFetch`.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `options` | [`FetchOptions`](../interfaces/FetchOptions.md)\<`T`\> | Fetch options: `params`, `query`, `transform` and any `RequestInit` field. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error. Never throws - a failing
  `transform` comes back as an error result too.

#### Example

```ts
const result = await FetchApiManager.getInstance().useFetch<{ results: unknown[] }>(
  "pokeapi",
  "pokemons",
  { method: "GET", query: { limit: 2 } },
);
if (result.ok) console.log(result.data.results);
```

***

### useGet()

```ts
useGet<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:411](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L411)

GET helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

***

### useGetApis()

```ts
useGetApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L173)

Returns a shallow copy of the registered APIs (safe to mutate locally).

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

***

### useInit()

```ts
useInit(apisConfig): void;
```

Defined in: [core/services/http.service.ts:164](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L164)

Registers (merges) API definitions into the client registry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apisConfig` | [`ApisConfig`](../type-aliases/ApisConfig.md) | The API definitions to merge into the registry. |

#### Returns

`void`

#### Example

```ts
FetchApiManager.getInstance().useInit({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { pokemonById: "/pokemon/:id/" } },
});
```

***

### usePatch()

```ts
usePatch<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:475](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L475)

PATCH helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `body?` | `unknown` | Optional request body (auto-serialized to JSON unless raw). |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

***

### usePost()

```ts
usePost<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:431](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L431)

POST helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `body?` | `unknown` | Optional request body (auto-serialized to JSON unless raw). |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

***

### usePut()

```ts
usePut<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:453](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L453)

PUT helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `body?` | `unknown` | Optional request body (auto-serialized to JSON unless raw). |
| `urlOptions?` | [`UrlOptions`](../interfaces/UrlOptions.md) | Optional URL building options. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error.

***

### getInstance()

```ts
static getInstance(): FetchApiManager;
```

Defined in: [core/services/http.service.ts:130](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L130)

Obtiene la instancia única del FetchApiManager (Singleton).

#### Returns

`FetchApiManager`

La instancia única de FetchApiManager.
