[katanakit-js](../index.md) / useReply

# Function: useReply()

```ts
function useReply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [core/services/assistant.service.ts:349](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/assistant.service.ts#L349)

Sends a user message within a conversation and returns the assistant reply.
If no `sessionId` is provided, a new session is created. The user message and
the assistant reply are persisted only on success.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sessionId` | `string` \| `undefined` | Existing session id, or `undefined` to start a new one. |
| `text` | `string` | The user's message. |
| `options` | [`AssistantReplyOptions`](../interfaces/AssistantReplyOptions.md) | Optional completion options. |

## Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>

An [AssistantResult](../type-aliases/AssistantResult.md) with the reply and session id.

## Example

```ts
import { useReply } from "katanakit-js";

const result = await useReply(undefined, "How do I reset my password?");
if (result.ok) console.log(result.data.reply);
```
