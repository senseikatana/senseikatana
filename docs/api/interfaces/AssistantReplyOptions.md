[katanakit-js](../index.md) / AssistantReplyOptions

# Interface: AssistantReplyOptions

Defined in: [types/core/ai.ts:105](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L105)

Options for a single assistant reply.

## Extends

- [`AiChatOptions`](AiChatOptions.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="maxsteps"></a> `maxSteps?` | `number` | - | - | [types/core/ai.ts:107](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L107) |
| <a id="maxtokens"></a> `maxTokens?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`maxTokens`](AiChatOptions.md#maxtokens) | [types/core/ai.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L40) |
| <a id="signal"></a> `signal?` | `AbortSignal` | - | [`AiChatOptions`](AiChatOptions.md).[`signal`](AiChatOptions.md#signal) | [types/core/ai.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L42) |
| <a id="systemprompt"></a> `systemPrompt?` | `string` | Overrides the provider `systemPrompt` for this request. | [`AiChatOptions`](AiChatOptions.md).[`systemPrompt`](AiChatOptions.md#systemprompt) | [types/core/ai.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L44) |
| <a id="temperature"></a> `temperature?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`temperature`](AiChatOptions.md#temperature) | [types/core/ai.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L39) |
| <a id="tools"></a> `tools?` | [`AiTool`](AiTool.md)[] | - | - | [types/core/ai.ts:106](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L106) |
| <a id="topp"></a> `topP?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`topP`](AiChatOptions.md#topp) | [types/core/ai.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L41) |
