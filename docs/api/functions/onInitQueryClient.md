[katanakit-js](../index.md) / onInitQueryClient

# Function: onInitQueryClient()

```ts
function onInitQueryClient(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:211](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/query.service.ts#L211)

Replaces the shared QueryClient singleton with a configured instance.
The previous client's caches are cleared before swapping.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `QueryClientConfig` | TanStack QueryClientConfig (caches, default options). |

## Returns

`QueryClient`

The newly created QueryClient.

## Example

```ts
import { onInitQueryClient } from "katanakit-js";

onInitQueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 2 } },
});
```
