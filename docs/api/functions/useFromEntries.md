[katanakit-js](../index.md) / useFromEntries

# Function: useFromEntries()

```ts
function useFromEntries<K, V>(entries): Record<K, V>;
```

Defined in: [core/services/array.service.ts:538](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L538)

Typed `Object.fromEntries`. See [ArrayService.useFromEntries](../classes/ArrayService.md#usefromentries).

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `PropertyKey` |
| `V` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | readonly readonly \[`K`, `V`\][] \| `null` \| `undefined` |

## Returns

`Record`\<`K`, `V`\>
