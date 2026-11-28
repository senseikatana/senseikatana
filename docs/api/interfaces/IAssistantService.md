[katanakit-js](../index.md) / IAssistantService

# Interface: IAssistantService

Defined in: [types/core/ai.ts:111](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L111)

Contract of the assistant facade.

## Methods

### createSession()

```ts
createSession(channel?): Promise<string>;
```

Defined in: [types/core/ai.ts:118](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L118)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `channel?` | `string` |

#### Returns

`Promise`\<`string`\>

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

Defined in: [types/core/ai.ts:120](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L120)

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

### initAssistant()

```ts
initAssistant(config?): void;
```

Defined in: [types/core/ai.ts:112](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L112)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | [`AssistantInitConfig`](AssistantInitConfig.md) |

#### Returns

`void`

***

### reply()

```ts
reply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [types/core/ai.ts:113](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L113)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` \| `undefined` |
| `text` | `string` |
| `options?` | [`AssistantReplyOptions`](AssistantReplyOptions.md) |

#### Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>

***

### resetSession()

```ts
resetSession(sessionId): Promise<void>;
```

Defined in: [types/core/ai.ts:121](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L121)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`void`\>

***

### sessionExists()

```ts
sessionExists(sessionId): Promise<boolean>;
```

Defined in: [types/core/ai.ts:119](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/ai.ts#L119)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`boolean`\>
