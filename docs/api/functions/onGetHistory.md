[katanakit-js](../index.md) / onGetHistory

# Function: onGetHistory()

```ts
function onGetHistory(sessionId): Promise<{
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

Defined in: [core/services/assistant.service.ts:272](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/assistant.service.ts#L272)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `sessionId` | `string` |

## Returns

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
