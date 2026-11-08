[katanakit-js](../index.md) / IAiService

# Interface: IAiService

Defined in: [types/core/ai.ts:82](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L82)

Contract of the AI/agent facade.

## Methods

### useChat()

```ts
useChat(messages, options?): Promise<AiResult<string>>;
```

Defined in: [types/core/ai.ts:84](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L84)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `messages` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \}[] |
| `options?` | [`AiChatOptions`](AiChatOptions.md) |

#### Returns

`Promise`\<[`AiResult`](../type-aliases/AiResult.md)\<`string`\>\>

***

### useInitAgent()

```ts
useInitAgent(config): void;
```

Defined in: [types/core/ai.ts:83](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L83)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `Partial`\<[`AiProviderConfig`](../type-aliases/AiProviderConfig.md)\> |

#### Returns

`void`

***

### useRunAgent()

```ts
useRunAgent(goal, options?): Promise<AgentResult>;
```

Defined in: [types/core/ai.ts:85](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `goal` | `string` |
| `options?` | [`AgentRunOptions`](AgentRunOptions.md) |

#### Returns

`Promise`\<[`AgentResult`](../type-aliases/AgentResult.md)\>
