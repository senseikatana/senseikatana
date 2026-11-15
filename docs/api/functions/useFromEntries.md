[katanakit-js](../index.md) / useFromEntries

# Function: useFromEntries()

```ts
function useFromEntries<K, V>(entries): Record<K, V>;
```

Defined in: [core/services/array.service.ts:538](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L538)

Typed `Object.fromEntries`. See [ArrayService.useFromEntries](../classes/ArrayService.md#usefromentries).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-k"></a> `K` *extends* `PropertyKey` |
| <a id="type-parameter-v"></a> `V` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `entries` | readonly (readonly \[`K`, `V`\])[] \| `null` \| `undefined` |

## Returns

`Record`\<`K`, `V`\>
