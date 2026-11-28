[katanakit-js](../index.md) / AssistantInitConfig

# Interface: AssistantInitConfig

Defined in: [types/core/ai.ts:92](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L92)

Configuration for the assistant facade.

## Extends

- `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\>

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="apikey"></a> `apiKey?` | `string` | - | `Partial.apiKey` | [schemas/ai.schema.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L30) |
| <a id="baseurl"></a> `baseUrl?` | `string` | - | `Partial.baseUrl` | [schemas/ai.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L31) |
| <a id="maxsteps"></a> `maxSteps?` | `number` | - | - | [types/core/ai.ts:95](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L95) |
| <a id="model"></a> `model?` | `string` | - | `Partial.model` | [schemas/ai.schema.ts:32](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L32) |
| <a id="store"></a> `store?` | [`ConversationStore`](ConversationStore.md) | - | - | [types/core/ai.ts:93](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L93) |
| <a id="systemprompt"></a> `systemPrompt?` | `string` | Default system prompt. | `Partial.systemPrompt` | [schemas/ai.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/ai.schema.ts#L34) |
| <a id="tools"></a> `tools?` | [`AiTool`](AiTool.md)[] | - | - | [types/core/ai.ts:94](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L94) |
