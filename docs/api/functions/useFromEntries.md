[katanakit-js](../index.md) / useFromEntries

# Function: useFromEntries()

```ts
function useFromEntries<K, V>(entries): Record<K, V>;
```

Defined in: [core/services/array.service.ts:538](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L538)

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
