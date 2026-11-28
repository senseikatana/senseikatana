[katanakit-js](../index.md) / useCreateQueryClient

# Function: useCreateQueryClient()

```ts
function useCreateQueryClient(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:172](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/query.service.ts#L172)

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
const client = useCreateQueryClient();
await client.prefetchQuery({ queryKey, queryFn });
const state = dehydrate(client);
```
