[katanakit-js](../index.md) / useRun

# Function: useRun()

```ts
function useRun<TInput, TOutput>(workerFunc, data): Promise<TOutput>;
```

Defined in: [infrastructure/worker/worker.service.ts:44](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/worker/worker.service.ts#L44)

Runs a pure function in a one-shot Worker and destroys it afterwards.
Falls back to running on the main thread when Workers are unavailable (SSR).
Async worker functions are awaited (Promise resolved before postMessage).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tinput"></a> `TInput` | Input data type. |
| <a id="type-parameter-toutput"></a> `TOutput` | Output data type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `workerFunc` | [`WorkerFunc`](../type-aliases/WorkerFunc.md)\<`TInput`, `TOutput`\> | The pure function to execute off the main thread. |
| `data` | `TInput` | The input data passed to the function. |

## Returns

`Promise`\<`TOutput`\>

A Promise resolving to the function's output.

## Example

```ts
const doubled = await useRun((n: number) => n * 2, 21);
console.log(doubled); // 42
```
