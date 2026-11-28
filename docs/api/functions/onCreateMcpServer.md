[katanakit-js](../index.md) / onCreateMcpServer

# Function: onCreateMcpServer()

```ts
function onCreateMcpServer(input): SafeResult<{
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}>;
```

Defined in: [core/services/mcp.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/mcp.service.ts#L193)

Creates a validated MCP server entry. See [McpService.onCreateMcpServer](../classes/McpService.md#oncreatemcpserver).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \} |
| `input.command?` | `string`[] |
| `input.disabled?` | `boolean` |
| `input.environment?` | `Record`\<`string`, `string`\> |
| `input.headers?` | `Record`\<`string`, `string`\> |
| `input.name?` | `string` |
| `input.type?` | `"local"` \| `"remote"` |
| `input.url?` | `string` |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `command?`: `string`[];
  `disabled?`: `boolean`;
  `environment?`: `Record`\<`string`, `string`\>;
  `headers?`: `Record`\<`string`, `string`\>;
  `name`: `string`;
  `type`: `"local"` \| `"remote"`;
  `url?`: `string`;
\}\>
