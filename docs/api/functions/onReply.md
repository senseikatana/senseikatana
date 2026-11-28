[katanakit-js](../index.md) / onReply

# Function: onReply()

```ts
function onReply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [core/services/assistant.service.ts:256](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L256)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` \| `undefined` |
| `text` | `string` |
| `options?` | [`AssistantReplyOptions`](../interfaces/AssistantReplyOptions.md) |

## Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>
