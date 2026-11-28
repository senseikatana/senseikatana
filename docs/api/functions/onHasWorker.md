[katanakit-js](../index.md) / onHasWorker

# Function: onHasWorker()

```ts
function onHasWorker(key): boolean;
```

Defined in: [infrastructure/worker/worker.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/worker/worker.service.ts#L280)

Checks whether a Worker pool with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to check. |

## Returns

`boolean`

`true` if the pool is registered.
