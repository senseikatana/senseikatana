[katanakit-js](../index.md) / useInitQueryClient

# Function: useInitQueryClient()

```ts
function useInitQueryClient(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:213](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/query.service.ts#L213)

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
import { useInitQueryClient } from "katanakit-js";

useInitQueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 2 } },
});
```
