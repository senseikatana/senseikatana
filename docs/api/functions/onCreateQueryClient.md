[katanakit-js](../index.md) / onCreateQueryClient

# Function: onCreateQueryClient()

```ts
function onCreateQueryClient(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:170](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/query.service.ts#L170)

Creates a **new** QueryClient. Use this on the server (SSR) to get one
client per request and avoid sharing a process-global cache across users.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `QueryClientConfig` | TanStack QueryClientConfig (caches, default options). |

## Returns

`QueryClient`

A fresh QueryClient.

## Example

```ts
// Server: one client per request, then dehydrate/hydrate.
const client = onCreateQueryClient();
await client.prefetchQuery({ queryKey, queryFn });
const state = dehydrate(client);
```
