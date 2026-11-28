[katanakit-js](../index.md) / onQueryClient

# Function: onQueryClient()

```ts
function onQueryClient(): QueryClient;
```

Defined in: [core/services/query.service.ts:191](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/query.service.ts#L191)

Returns the shared QueryClient singleton, creating one on first call.

This is a **process-global** instance: it is the right default in the browser,
but on the server it would leak cached data across requests. Use
[onCreateQueryClient](onCreateQueryClient.md) per request when running under SSR.

## Returns

`QueryClient`

The shared QueryClient.

## Example

```ts
import { onQueryClient } from "katanakit-js";

const client = onQueryClient();
await client.invalidateQueries({ queryKey: ["users"] });
```
