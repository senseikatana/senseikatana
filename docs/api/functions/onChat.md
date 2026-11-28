[katanakit-js](../index.md) / onChat

# Function: onChat()

```ts
function onChat(messages, options?): Promise<AiResult<string>>;
```

Defined in: [core/services/agent.service.ts:506](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/agent.service.ts#L506)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] |
| `options?` | [`AiChatOptions`](../interfaces/AiChatOptions.md) |

## Returns

`Promise`\<[`AiResult`](../type-aliases/AiResult.md)\<`string`\>\>
