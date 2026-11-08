[katanakit-js](../index.md) / AssistantInitConfig

# Interface: AssistantInitConfig

Defined in: [types/core/ai.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L98)

Configuration for the assistant facade.

## Extends

- `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\>

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="apikey"></a> `apiKey?` | `string` | - | `Partial.apiKey` | [schemas/ai.schema.ts:33](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L33) |
| <a id="baseurl"></a> `baseUrl?` | `string` | - | `Partial.baseUrl` | [schemas/ai.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L34) |
| <a id="maxsteps"></a> `maxSteps?` | `number` | - | - | [types/core/ai.ts:101](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L101) |
| <a id="model"></a> `model?` | `string` | - | `Partial.model` | [schemas/ai.schema.ts:35](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L35) |
| <a id="store"></a> `store?` | [`ConversationStore`](ConversationStore.md) | - | - | [types/core/ai.ts:99](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L99) |
| <a id="systemprompt"></a> `systemPrompt?` | `string` | Default system prompt. | `Partial.systemPrompt` | [schemas/ai.schema.ts:37](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/ai.schema.ts#L37) |
| <a id="tools"></a> `tools?` | [`AiTool`](AiTool.md)[] | - | - | [types/core/ai.ts:100](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L100) |
