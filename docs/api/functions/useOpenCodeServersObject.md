[katanakit-js](../index.md) / useOpenCodeServersObject

# Function: useOpenCodeServersObject()

```ts
function useOpenCodeServersObject(servers): SafeResult<Record<string, OpenCodeMcpServer>>;
```

Defined in: [core/services/mcp.service.ts:218](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L218)

Projects entries into an OpenCode `mcp.servers` object. See [McpService.useOpenCodeServersObject](../classes/McpService.md#useopencodeserversobject).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`Record`\<`string`, [`OpenCodeMcpServer`](../interfaces/OpenCodeMcpServer.md)\>\>
