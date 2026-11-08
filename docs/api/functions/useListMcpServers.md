[katanakit-js](../index.md) / useListMcpServers

# Function: useListMcpServers()

```ts
function useListMcpServers(data): {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

Defined in: [core/services/mcp.service.ts:208](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L208)

Lists registered servers. See [McpService.useListMcpServers](../classes/McpService.md#uselistmcpservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} |
| `data.createdAt` | `string` |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |
| `data.updatedAt` | `string` |
| `data.version` | `1` |

## Returns

\{
  `command?`: `string`[];
  `disabled?`: `boolean`;
  `environment?`: `Record`\<`string`, `string`\>;
  `headers?`: `Record`\<`string`, `string`\>;
  `name`: `string`;
  `type`: `"local"` \| `"remote"`;
  `url?`: `string`;
\}[]
