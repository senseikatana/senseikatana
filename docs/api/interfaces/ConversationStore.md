[katanakit-js](../index.md) / ConversationStore

# Interface: ConversationStore

Defined in: [types/core/ai.ts:89](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L89)

Persistence contract for assistant conversations.

## Methods

### useAppend()

```ts
useAppend(sessionId, message): Promise<void>;
```

Defined in: [types/core/ai.ts:92](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L92)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |
| `message` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \} |
| `message.content` | `string` \| `null` |
| `message.name?` | `string` |
| `message.role` | `"system"` \| `"user"` \| `"assistant"` \| `"tool"` |
| `message.tool_call_id?` | `string` |
| `message.tool_calls?` | \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[] |

#### Returns

`Promise`\<`void`\>

***

### useCreate()

```ts
useCreate(channel?): Promise<string>;
```

Defined in: [types/core/ai.ts:90](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L90)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `channel?` | `string` |

#### Returns

`Promise`\<`string`\>

***

### useExists()

```ts
useExists(sessionId): Promise<boolean>;
```

Defined in: [types/core/ai.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L91)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### useGetHistory()

```ts
useGetHistory(sessionId): Promise<{
  content: string | null;
  name?: string;
  role: "system" | "user" | "assistant" | "tool";
  tool_call_id?: string;
  tool_calls?: {
     function: {
        arguments: string;
        name: string;
     };
     id: string;
     type: "function";
  }[];
}[]>;
```

Defined in: [types/core/ai.ts:93](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<\{
  `content`: `string` \| `null`;
  `name?`: `string`;
  `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`;
  `tool_call_id?`: `string`;
  `tool_calls?`: \{
     `function`: \{
        `arguments`: `string`;
        `name`: `string`;
     \};
     `id`: `string`;
     `type`: `"function"`;
  \}[];
\}[]\>

***

### useReset()

```ts
useReset(sessionId): Promise<void>;
```

Defined in: [types/core/ai.ts:94](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L94)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`void`\>
