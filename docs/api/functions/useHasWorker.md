[katanakit-js](../index.md) / useHasWorker

# Function: useHasWorker()

```ts
function useHasWorker(key): boolean;
```

Defined in: [infrastructure/worker/worker.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/worker/worker.service.ts#L280)

Checks whether a Worker pool with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to check. |

## Returns

`boolean`

`true` if the pool is registered.
