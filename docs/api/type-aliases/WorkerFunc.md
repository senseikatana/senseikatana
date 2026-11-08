[katanakit-js](../index.md) / WorkerFunc

# Type Alias: WorkerFunc\<TInput, TOutput\>

```ts
type WorkerFunc<TInput, TOutput> = (data) => TOutput | Promise<TOutput>;
```

Defined in: [types/core/workers.ts:1](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/workers.ts#L1)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TInput` | `unknown` |
| `TOutput` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `TInput` |

## Returns

`TOutput` \| `Promise`\<`TOutput`\>
