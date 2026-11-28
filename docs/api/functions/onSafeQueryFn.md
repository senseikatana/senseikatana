[katanakit-js](../index.md) / onSafeQueryFn

# Function: onSafeQueryFn()

```ts
function onSafeQueryFn<T>(fn): (context) => Promise<T>;
```

Defined in: [core/services/query.service.ts:244](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/query.service.ts#L244)

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
| <a id="type-parameter-t"></a> `T` | The resolved data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | (`context`) => `Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\> | A function returning a Safe Result (e.g. `() => onGetApi(...)`). |

## Returns

A `queryFn` that throws on error.

(`context`) => `Promise`\<`T`\>

## Example

```ts
import { onSafeQueryFn, onGetApi, onFetch } from "katanakit-js";

// Simple: the Safe Result gate.
queryFn: onSafeQueryFn(() => onGetApi("pokeapi", "pokemonById", { params: { id } }))

// With cancellation: forward TanStack's AbortSignal into the request.
queryFn: onSafeQueryFn(({ signal }) =>
  onFetch("pokeapi", "pokemonById", { method: "GET", params: { id }, signal }),
)
```
