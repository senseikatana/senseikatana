[katanakit-js](../index.md) / useHasWorker

# Function: useHasWorker()

```ts
function useHasWorker(key): boolean;
```

Defined in: [infrastructure/worker/worker.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/worker/worker.service.ts#L280)

Checks whether a Worker pool with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to check. |

## Returns

`boolean`

`true` if the pool is registered.
