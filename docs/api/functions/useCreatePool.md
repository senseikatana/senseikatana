[katanakit-js](../index.md) / useCreatePool

# Function: useCreatePool()

```ts
function useCreatePool<TInput, TOutput>(key, workerFunc): void;
```

Defined in: [infrastructure/worker/worker.service.ts:123](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/worker/worker.service.ts#L123)

Creates a reusable Worker pool under a unique key. If a pool with the same
key already exists, it is terminated first.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` | Input data type. |
| `TOutput` | Output data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | A unique identifier for this pool. |
| `workerFunc` | [`WorkerFunc`](../type-aliases/WorkerFunc.md)\<`TInput`, `TOutput`\> | The pure function the pool will execute. |

## Returns

`void`

## Example

```ts
useCreatePool("heavy", (n: number) => n ** 2);
const result = await useRunPool("heavy", 9); // 81
useTerminate("heavy");
```
