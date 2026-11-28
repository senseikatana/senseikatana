[katanakit-js](../index.md) / FetchApiManager

# Class: FetchApiManager

Defined in: [core/services/http.service.ts:122](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L122)

FetchApiManager - Singleton para el registro de APIs y peticiones HTTP.

Aplica el patrón Singleton: una única instancia mantiene el registro de APIs
(`ApisConfig`) y centraliza la construcción de URLs y las peticiones fetch,
devolviendo siempre Safe Results (nunca lanza en rutas async).

## Example

```ts
const fetchApi = FetchApiManager.getInstance();
fetchApi.init({ pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } } });
const result = await fetchApi.fetch("pokeapi", "byId", { params: { id: 25 } });
```

## Methods

### addRequestInterceptor()

```ts
addRequestInterceptor(interceptor): () => void;
```

Defined in: [core/services/http.service.ts:194](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L194)

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

### buildUrl()

```ts
buildUrl(
   apiName, 
   endpointName, 
   options?
): string;
```

Defined in: [core/services/http.service.ts:226](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L226)

Returns the URL of a registered endpoint **without calling `fetch`**.

It builds the same URL [fetch](#fetch) would request - same registry,
same `:param` substitution, same `query` merge with `defaultQueryParams`,
same http(s) guard - then stops and hands you the string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | Registered API key (from `defineApiConfig`). |
| `endpointName` | `string` | Endpoint key inside that API. |
| `options?` | [`UrlOptions`](../interfaces/UrlOptions.md) | `params` fills `:placeholders`, `query` becomes the search string. |

#### Returns

`string`

The fully built URL.

#### Throws

Unknown API, unknown endpoint, or a scheme that is not http(s).

#### Example

```ts
FetchApiManager.getInstance().buildUrl("pokeapi", "pokemonById", { params: { id: 25 } });
// → "https://pokeapi.co/api/v2/pokemon/25"
```

#### Remarks

Synchronous, so it **throws** instead of returning a Safe Result -
Safe Result covers fallible async work, and this never leaves the process.

***

### delete()

```ts
delete<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:505](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L505)

DELETE helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

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

### fetch()

```ts
fetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:289](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L289)

Fetches a registered endpoint and returns a Safe Result.

URL options sit at the top level, next to `method`/`headers`/`body` - no
nesting, same shape as `get` and Nuxt's `fetch`.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiName` | `string` | The registered API key. |
| `endpointName` | `string` | The endpoint key within the API. |
| `options?` | [`FetchOptions`](../interfaces/FetchOptions.md)\<`T`\> | Fetch options: `params`, `query`, `transform` and any `RequestInit` field. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

A `FetchResult` with data or error. Never throws - a failing
  `transform` comes back as an error result too.

#### Example

```ts
const result = await FetchApiManager.getInstance().fetch<{ results: unknown[] }>(
  "pokeapi",
  "pokemons",
  { method: "GET", query: { limit: 2 } },
);
if (result.ok) console.log(result.data.results);
```

***

### get()

```ts
get<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:420](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L420)

GET helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-2"></a> `T` | `unknown` |

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

### getApis()

```ts
getApis(): ApisConfig;
```

Defined in: [core/services/http.service.ts:182](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L182)

Returns a shallow copy of the registered APIs (safe to mutate locally).

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

A shallow copy of the current API registry.

***

### init()

```ts
init(apisConfig): void;
```

Defined in: [core/services/http.service.ts:173](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L173)

Registers (merges) API definitions into the client registry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apisConfig` | [`ApisConfig`](../type-aliases/ApisConfig.md) | The API definitions to merge into the registry. |

#### Returns

`void`

#### Example

```ts
FetchApiManager.getInstance().init({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { pokemonById: "/pokemon/:id/" } },
});
```

***

### patch()

```ts
patch<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:484](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L484)

PATCH helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-3"></a> `T` | `unknown` |

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

### post()

```ts
post<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:440](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L440)

POST helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-4"></a> `T` | `unknown` |

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

### put()

```ts
put<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [core/services/http.service.ts:462](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L462)

PUT helper over a registered API endpoint.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-5"></a> `T` | `unknown` |

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

Defined in: [core/services/http.service.ts:139](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/http.service.ts#L139)

Obtiene la instancia única del FetchApiManager (Singleton).

#### Returns

`FetchApiManager`

La instancia única de FetchApiManager.
