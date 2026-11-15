[katanakit-js](../index.md) / useCreateMcpServer

# Function: useCreateMcpServer()

```ts
function useCreateMcpServer(input): SafeResult<{
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}>;
```

Defined in: [core/services/mcp.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/mcp.service.ts#L193)

Creates a validated MCP server entry. See [McpService.useCreateMcpServer](../classes/McpService.md#usecreatemcpserver).

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
