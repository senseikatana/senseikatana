[katanakit-js](../index.md) / QueryService

# Class: QueryService

Defined in: [core/services/query.service.ts:80](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L80)

QueryService - Singleton para el QueryClient compartido.

Aplica el patrón Singleton: una única instancia mantiene el
QueryClient global que comparten todos los adaptadores de
framework (browser). En SSR, usa [QueryClientFactory.create](QueryClientFactory.md#create) para
un cliente por petición.

## Example

```ts
const client = QueryService.getInstance().useGetClient();
await client.invalidateQueries({ queryKey: ["users"] });
```

## Methods

### useGetClient()

```ts
useGetClient(): QueryClient;
```

Defined in: [core/services/query.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L112)

Returns the shared QueryClient, creating one on first call.

This is a **process-global** instance: it is the right default in the browser,
but on the server it would leak cached data across requests. Use
[QueryClientFactory.create](QueryClientFactory.md#create) per request when running under SSR.

#### Returns

`QueryClient`

The shared QueryClient.

***

### useInit()

```ts
useInit(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:124](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L124)

Replaces the shared QueryClient with a configured instance.
The previous client's caches are cleared before swapping.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `QueryClientConfig` | TanStack QueryClientConfig (caches, default options). |

#### Returns

`QueryClient`

The newly created QueryClient.

***

### useSafeQueryFn()

```ts
useSafeQueryFn<T>(fn): (context) => Promise<T>;
```

Defined in: [core/services/query.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L142)

Bridges a KatanaKit Safe Result fetcher into a TanStack `queryFn`.

TanStack expects `queryFn` to resolve with data and **throw** on failure;
KatanaKit returns `{ data, error, ok }`. This adapter unwraps the Safe Result
so the two fit together. Throws a real `Error` (with `status`) so `instanceof`
checks and error boundaries work.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The resolved data type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`context`) => `Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\> | A function returning a Safe Result (e.g. `() => useGetApi(...)`). |

#### Returns

A `queryFn` that throws on error.

(`context`) => `Promise`\<`T`\>

***

### getInstance()

```ts
static getInstance(): QueryService;
```

Defined in: [core/services/query.service.ts:96](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L96)

Obtiene la instancia única del QueryService (Singleton).

#### Returns

`QueryService`

La instancia única de QueryService.
