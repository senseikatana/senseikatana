[katanakit-js](../index.md) / useQueryClient

# Function: useQueryClient()

```ts
function useQueryClient(): QueryClient;
```

Defined in: [core/services/query.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/query.service.ts#L193)

Returns the shared QueryClient singleton, creating one on first call.

This is a **process-global** instance: it is the right default in the browser,
but on the server it would leak cached data across requests. Use
[useCreateQueryClient](useCreateQueryClient.md) per request when running under SSR.

## Returns

`QueryClient`

The shared QueryClient.

## Example

```ts
import { useQueryClient } from "katanakit-js";

const client = useQueryClient();
await client.invalidateQueries({ queryKey: ["users"] });
```
