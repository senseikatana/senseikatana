[katanakit-js](../index.md) / useSafeQueryFn

# Function: useSafeQueryFn()

```ts
function useSafeQueryFn<T>(fn): (context) => Promise<T>;
```

Defined in: [core/services/query.service.ts:246](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L246)

Bridges a KatanaKit Safe Result fetcher into a TanStack `queryFn`.

TanStack expects `queryFn` to resolve with data and **throw** on failure;
KatanaKit returns `{ data, error, ok }`. This adapter unwraps the Safe Result
so the two fit together. Throws a real `Error` (with `status`) so `instanceof`
checks and error boundaries work; the upstream response body is **not** placed
on the thrown error.

Receives TanStack's QueryFunctionContext, so you can forward
`signal` for real request cancellation.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The resolved data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`context`) => `Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\> | A function returning a Safe Result (e.g. `() => useGetApi(...)`). |

## Returns

A `queryFn` that throws on error.

(`context`) => `Promise`\<`T`\>

## Example

```ts
import { useSafeQueryFn, useGetApi, useFetch } from "katanakit-js";

// Simple: the Safe Result gate.
queryFn: useSafeQueryFn(() => useGetApi("pokeapi", "pokemonById", { params: { id } }))

// With cancellation: forward TanStack's AbortSignal into the request.
queryFn: useSafeQueryFn(({ signal }) =>
  useFetch("pokeapi", "pokemonById", { method: "GET", params: { id }, signal }),
)
```
