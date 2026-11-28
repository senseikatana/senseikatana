[katanakit-js](../index.md) / AiTool

# Interface: AiTool

Defined in: [types/core/ai.ts:51](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L51)

A tool the agent can invoke. `parameters` is a JSON Schema object describing the expected input.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="description"></a> `description` | `string` | [types/core/ai.ts:53](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L53) |
| <a id="name"></a> `name` | `string` | [types/core/ai.ts:52](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L52) |
| <a id="parameters"></a> `parameters` | `Record`\<`string`, `unknown`\> | [types/core/ai.ts:54](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L54) |

## Methods

### execute()

```ts
execute(input): unknown;
```

Defined in: [types/core/ai.ts:55](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L55)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

#### Returns

`unknown`
