[katanakit-js](../index.md) / IAiService

# Interface: IAiService

Defined in: [types/core/ai.ts:76](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L76)

Contract of the AI/agent facade.

## Methods

### onChat()

```ts
onChat(messages, options?): Promise<AiResult<string>>;
```

Defined in: [types/core/ai.ts:78](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L78)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] |
| `options?` | [`AiChatOptions`](AiChatOptions.md) |

#### Returns

`Promise`\<[`AiResult`](../type-aliases/AiResult.md)\<`string`\>\>

***

### onInitAgent()

```ts
onInitAgent(config): void;
```

Defined in: [types/core/ai.ts:77](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L77)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\> |

#### Returns

`void`

***

### onRunAgent()

```ts
onRunAgent(goal, options?): Promise<AgentResult>;
```

Defined in: [types/core/ai.ts:79](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L79)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `goal` | `string` |
| `options?` | [`AgentRunOptions`](AgentRunOptions.md) |

#### Returns

`Promise`\<[`AgentResult`](../type-aliases/AgentResult.md)\>
