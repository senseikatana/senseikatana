[katanakit-js](../index.md) / IAssistantService

# Interface: IAssistantService

Defined in: [types/core/ai.ts:117](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L117)

Contract of the assistant facade.

## Methods

### useCreateSession()

```ts
useCreateSession(channel?): Promise<string>;
```

Defined in: [types/core/ai.ts:124](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L124)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `channel?` | `string` |

#### Returns

`Promise`\<`string`\>

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

Defined in: [types/core/ai.ts:126](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L126)

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

### useInitAssistant()

```ts
useInitAssistant(config?): void;
```

Defined in: [types/core/ai.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L118)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | [`AssistantInitConfig`](AssistantInitConfig.md) |

#### Returns

`void`

***

### useReply()

```ts
useReply(
   sessionId, 
   text, 
   options?
): Promise<AssistantResult>;
```

Defined in: [types/core/ai.ts:119](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L119)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` \| `undefined` |
| `text` | `string` |
| `options?` | [`AssistantReplyOptions`](AssistantReplyOptions.md) |

#### Returns

`Promise`\<[`AssistantResult`](../type-aliases/AssistantResult.md)\>

***

### useResetSession()

```ts
useResetSession(sessionId): Promise<void>;
```

Defined in: [types/core/ai.ts:127](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L127)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`void`\>

***

### useSessionExists()

```ts
useSessionExists(sessionId): Promise<boolean>;
```

Defined in: [types/core/ai.ts:125](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/ai.ts#L125)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

#### Returns

`Promise`\<`boolean`\>
