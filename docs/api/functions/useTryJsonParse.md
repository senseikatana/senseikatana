[katanakit-js](../index.md) / useTryJsonParse

# Function: useTryJsonParse()

```ts
function useTryJsonParse<T>(text): SafeResult<T>;
```

Defined in: [core/services/result.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/result.service.ts#L113)

Parses JSON without throwing. See [ResultService.useTryJsonParse](../classes/ResultService.md#usetryjsonparse).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>
