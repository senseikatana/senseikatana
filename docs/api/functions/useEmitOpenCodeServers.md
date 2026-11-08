[katanakit-js](../index.md) / useEmitOpenCodeServers

# Function: useEmitOpenCodeServers()

```ts
function useEmitOpenCodeServers(servers): SafeResult<string>;
```

Defined in: [core/services/mcp.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L225)

Renders entries as a `mcp.servers` JSON fragment. See [McpService.useEmitOpenCodeServers](../classes/McpService.md#useemitopencodeservers).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `servers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |

## Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>
