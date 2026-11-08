[katanakit-js](../index.md) / AiTool

# Interface: AiTool

Defined in: [types/core/ai.ts:57](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L57)

A tool the agent can invoke. `parameters` is a JSON Schema object
describing the expected input.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="description"></a> `description` | `string` | [types/core/ai.ts:59](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L59) |
| <a id="name"></a> `name` | `string` | [types/core/ai.ts:58](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L58) |
| <a id="parameters"></a> `parameters` | `Record`\<`string`, `unknown`\> | [types/core/ai.ts:60](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L60) |

## Methods

### execute()

```ts
execute(input): unknown;
```

Defined in: [types/core/ai.ts:61](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

#### Returns

`unknown`
