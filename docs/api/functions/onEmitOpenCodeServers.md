[katanakit-js](../index.md) / onEmitOpenCodeServers

# Function: onEmitOpenCodeServers()

```ts
function onEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/mcp.service.ts#L225)

Renders entries as a `mcp.servers` JSON fragment. See [McpService.onEmitOpenCodeServers](../classes/McpService.md#onemitopencodeservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>
