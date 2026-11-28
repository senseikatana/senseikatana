[katanakit-js](../index.md) / onCreatePool

# Function: onCreatePool()

```ts
function onCreatePool<TInput, TOutput>(key, workerFunc): void;
```

Defined in: [infrastructure/worker/worker.service.ts:123](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/worker/worker.service.ts#L123)

Creates a reusable Worker pool under a unique key. If a pool with the same
key already exists, it is terminated first.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tinput"></a> `TInput` | Input data type. |
| <a id="type-parameter-toutput"></a> `TOutput` | Output data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | A unique identifier for this pool. |
| `workerFunc` | [`WorkerFunc`](../type-aliases/WorkerFunc.md)\<`TInput`, `TOutput`\> | The pure function the pool will execute. |

## Returns

`void`

## Example

```ts
onCreatePool("heavy", (n: number) => n ** 2);
const result = await onRunPool("heavy", 9); // 81
onTerminate("heavy");
```
