[katanakit-js](../index.md) / useChat

# Function: useChat()

```ts
function useChat(messages, options?): Promise<AiResult<string>>;
```

Defined in: [core/services/agent.service.ts:537](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/agent.service.ts#L537)

Sends a single chat completion and returns the assistant text as a Safe Result.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] | Conversation messages (a system prompt is prepended if absent). |
| `options` | [`AiChatOptions`](../interfaces/AiChatOptions.md) | Optional completion options. |

## Returns

`Promise`\<[`AiResult`](../type-aliases/AiResult.md)\<`string`\>\>

An `AiResult` with the assistant text.

## Example

```ts
import { useChat } from "katanakit-js";

const result = await useChat([{ role: "user", content: "Hello" }]);
if (result.ok) console.log(result.data);
```
