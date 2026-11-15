[katanakit-js](../index.md) / useRunStorageScope

# Function: useRunStorageScope()

```ts
function useRunStorageScope<T>(fn): Promise<T>;
```

Defined in: [infrastructure/storage/storage.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/storage/storage.service.ts#L327)

Runs `fn` with request-isolated in-memory storage (SSR).
Use this around a request handler so `useSetStorage` / `useGetStorage`
share state within the request but not across requests.

In browser environments, this simply calls `fn()` directly (no ALS needed).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Return type of `fn`. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `T` \| `Promise`\<`T`\> | The function to run within the storage scope. |

## Returns

`Promise`\<`T`\>

The return value of `fn`.

## Example

```ts
import { useRunStorageScope, useSetStorage, useGetStorage } from "katanakit-js";

export default defineEventHandler((event) => {
  return useRunStorageScope(() => {
    useSetStorage("req-id", event.context.id);
    return useGetStorage("req-id");
  });
});
```
