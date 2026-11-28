[katanakit-js](../index.md) / onOpenCodeServersObject

# Function: onOpenCodeServersObject()

```ts
function onOpenCodeServersObject(servers): SafeResult<Record<string, OpenCodeMcpServer>>;
```

Defined in: [core/services/mcp.service.ts:218](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/mcp.service.ts#L218)

Projects entries into an OpenCode `mcp.servers` object. See [McpService.onOpenCodeServersObject](../classes/McpService.md#onopencodeserversobject).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`Record`\<`string`, [`OpenCodeMcpServer`](../interfaces/OpenCodeMcpServer.md)\>\>
