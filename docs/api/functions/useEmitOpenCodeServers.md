[katanakit-js](../index.md) / useEmitOpenCodeServers

# Function: useEmitOpenCodeServers()

```ts
function useEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/mcp.service.ts#L225)

Renders entries as a `mcp.servers` JSON fragment. See [McpService.useEmitOpenCodeServers](../classes/McpService.md#useemitopencodeservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>
