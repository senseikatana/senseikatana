[katanakit-js](../index.md) / AgentRunOptions

# Interface: AgentRunOptions

Defined in: [types/core/ai.ts:68](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L68)

Options for running the tool-calling agent loop.

## Extends

- [`AiChatOptions`](AiChatOptions.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="history"></a> `history?` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | Prior conversation (system messages are ignored; a system prompt is prepended). | - | [types/core/ai.ts:72](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L72) |
| <a id="maxsteps"></a> `maxSteps?` | `number` | - | - | [types/core/ai.ts:70](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L70) |
| <a id="maxtokens"></a> `maxTokens?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`maxTokens`](AiChatOptions.md#maxtokens) | [types/core/ai.ts:37](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L37) |
| <a id="signal"></a> `signal?` | `AbortSignal` | - | [`AiChatOptions`](AiChatOptions.md).[`signal`](AiChatOptions.md#signal) | [types/core/ai.ts:39](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L39) |
| <a id="systemprompt"></a> `systemPrompt?` | `string` | Overrides the provider `systemPrompt` for this request. | [`AiChatOptions`](AiChatOptions.md).[`systemPrompt`](AiChatOptions.md#systemprompt) | [types/core/ai.ts:41](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L41) |
| <a id="temperature"></a> `temperature?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`temperature`](AiChatOptions.md#temperature) | [types/core/ai.ts:36](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L36) |
| <a id="tools"></a> `tools?` | [`AiTool`](AiTool.md)[] | - | - | [types/core/ai.ts:69](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L69) |
| <a id="topp"></a> `topP?` | `number` | - | [`AiChatOptions`](AiChatOptions.md).[`topP`](AiChatOptions.md#topp) | [types/core/ai.ts:38](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L38) |
