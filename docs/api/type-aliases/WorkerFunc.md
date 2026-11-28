[katanakit-js](../index.md) / WorkerFunc

# Type Alias: WorkerFunc\<TInput, TOutput\>

```ts
type WorkerFunc<TInput, TOutput> = (data) => TOutput | Promise<TOutput>;
```

Defined in: [types/core/workers.ts:1](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/workers.ts#L1)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tinput"></a> `TInput` | `unknown` |
| <a id="type-parameter-toutput"></a> `TOutput` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `TInput` |

## Returns

`TOutput` \| `Promise`\<`TOutput`\>
