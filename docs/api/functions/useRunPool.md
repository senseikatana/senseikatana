[katanakit-js](../index.md) / useRunPool

# Function: useRunPool()

```ts
function useRunPool<TInput, TOutput>(key, data): Promise<TOutput>;
```

Defined in: [infrastructure/worker/worker.service.ts:185](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/worker/worker.service.ts#L185)

Runs a task on an existing Worker pool. Tasks are correlated by `__taskId`
so concurrent tasks do not stomp each other's handlers.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tinput"></a> `TInput` | Input data type. |
| <a id="type-parameter-toutput"></a> `TOutput` | Output data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key created via [useCreatePool](useCreatePool.md). |
| `data` | `TInput` | The input data to pass to the pool's function. |

## Returns

`Promise`\<`TOutput`\>

A Promise resolving to the function's output.

## Throws

If the pool does not exist.

## Example

```ts
useCreatePool("math", (n: number) => n * 10);
const result = await useRunPool("math", 5); // 50
```
