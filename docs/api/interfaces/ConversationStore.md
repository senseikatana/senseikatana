[katanakit-js](../index.md) / ConversationStore

# Interface: ConversationStore

Defined in: [types/core/ai.ts:83](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L83)

Persistence contract for assistant conversations.

## Methods

### append()

```ts
append(sessionId, message): Promise<void>;
```

Defined in: [types/core/ai.ts:86](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L86)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |
| `message` | \{ `content`: `string` \| `null`; `name?`: `string`; `role`: `"system"` \| `"user"` \| `"assistant"` \| `"tool"`; `tool_call_id?`: `string`; `tool_calls?`: \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[]; \} |
| `message.content?` | `string` \| `null` |
| `message.name?` | `string` |
| `message.role?` | `"system"` \| `"user"` \| `"assistant"` \| `"tool"` |
| `message.tool_call_id?` | `string` |
| `message.tool_calls?` | \{ `function`: \{ `arguments`: `string`; `name`: `string`; \}; `id`: `string`; `type`: `"function"`; \}[] |

#### Returns

`Promise`\<`void`\>

***

### create()

```ts
create(channel?): Promise<string>;
```

Defined in: [types/core/ai.ts:84](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L84)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `channel?` | `string` |

#### Returns

`Promise`\<`string`\>

***

### exists()

```ts
exists(sessionId): Promise<boolean>;
```

Defined in: [types/core/ai.ts:85](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### getHistory()

```ts
getHistory(sessionId): Promise<{
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

Defined in: [types/core/ai.ts:87](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L87)

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

### reset()

```ts
reset(sessionId): Promise<void>;
```

Defined in: [types/core/ai.ts:88](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L88)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`void`\>
