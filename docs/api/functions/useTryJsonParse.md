[katanakit-js](../index.md) / useTryJsonParse

# Function: useTryJsonParse()

```ts
function useTryJsonParse<T>(text): SafeResult<T>;
```

Defined in: [core/services/result.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L113)

Parses JSON without throwing. See [ResultService.useTryJsonParse](../classes/ResultService.md#usetryjsonparse).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>
