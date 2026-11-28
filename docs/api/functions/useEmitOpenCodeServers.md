[katanakit-js](../index.md) / useEmitOpenCodeServers

# Function: useEmitOpenCodeServers()

```ts
function useEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/mcp.service.ts#L225)

Renders entries as a `mcp.servers` JSON fragment. See [McpService.useEmitOpenCodeServers](../classes/McpService.md#useemitopencodeservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>
