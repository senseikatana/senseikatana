[katanakit-js](../index.md) / AgentRunOptions

# Interface: AgentRunOptions

Defined in: [types/core/ai.ts:74](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L74)

Options for running the tool-calling agent loop.

## Extends

- [`AiChatOptions`](AiChatOptions.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="history"></a> `history?` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | Prior conversation (system messages are ignored; a system prompt is prepended). | - | [types/core/ai.ts:78](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L78) |
| <a id="maxsteps"></a> `maxSteps?` | `number` | - | - | [types/core/ai.ts:76](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L76) |
| <a id="maxtokens"></a> `maxTokens?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`maxTokens`](AiChatOptions.md#maxtokens) | [types/core/ai.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L40) |
| <a id="signal"></a> `signal?` | `AbortSignal` | - | [`AiChatOptions`](AiChatOptions.md).[`signal`](AiChatOptions.md#signal) | [types/core/ai.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L42) |
| <a id="systemprompt"></a> `systemPrompt?` | `string` | Overrides the provider `systemPrompt` for this request. | [`AiChatOptions`](AiChatOptions.md).[`systemPrompt`](AiChatOptions.md#systemprompt) | [types/core/ai.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L44) |
| <a id="temperature"></a> `temperature?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`temperature`](AiChatOptions.md#temperature) | [types/core/ai.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L39) |
| <a id="tools"></a> `tools?` | [`AiTool`](AiTool.md)[] | - | - | [types/core/ai.ts:75](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L75) |
| <a id="topp"></a> `topP?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`topP`](AiChatOptions.md#topp) | [types/core/ai.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L41) |
