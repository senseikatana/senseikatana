[katanakit-js](../index.md) / useEmitOpenCodeServers

# Function: useEmitOpenCodeServers()

```ts
function useEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/mcp.service.ts#L225)

Renders entries as a `mcp.servers` JSON fragment. See [McpService.useEmitOpenCodeServers](../classes/McpService.md#useemitopencodeservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>
