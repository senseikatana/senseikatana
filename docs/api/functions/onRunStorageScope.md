[katanakit-js](../index.md) / onRunStorageScope

# Function: onRunStorageScope()

```ts
function onRunStorageScope<T>(fn): Promise<T>;
```

Defined in: [infrastructure/storage/storage.service.ts:320](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L320)

Runs `fn` with request-isolated in-memory storage (SSR).
Use this around a request handler so `onSetStorage` / `onGetStorage`
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
import { onRunStorageScope, onSetStorage, onGetStorage } from "katanakit-js";

export default defineEventHandler((event) => {
  return onRunStorageScope(() => {
    onSetStorage("req-id", event.context.id);
    return onGetStorage("req-id");
  });
});
```
