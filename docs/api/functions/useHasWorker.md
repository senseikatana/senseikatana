[katanakit-js](../index.md) / useHasWorker

# Function: useHasWorker()

```ts
function useHasWorker(key): boolean;
```

Defined in: [infrastructure/worker/worker.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/worker/worker.service.ts#L280)

Checks whether a Worker pool with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to check. |

## Returns

`boolean`

`true` if the pool is registered.
