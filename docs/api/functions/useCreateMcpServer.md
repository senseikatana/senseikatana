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

Defined in: [core/services/mcp.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/mcp.service.ts#L193)

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
