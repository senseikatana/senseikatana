[katanakit-js](../index.md) / useOpenCodeServersObject

# Function: useOpenCodeServersObject()

```ts
function useOpenCodeServersObject(servers): SafeResult<Record<string, OpenCodeMcpServer>>;
```

Defined in: [core/services/mcp.service.ts:218](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/mcp.service.ts#L218)

Projects entries into an OpenCode `mcp.servers` object. See [McpService.useOpenCodeServersObject](../classes/McpService.md#useopencodeserversobject).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`Record`\<`string`, [`OpenCodeMcpServer`](../interfaces/OpenCodeMcpServer.md)\>\>
