[katanakit-js](../index.md) / OpenCodeMcpServer

# Interface: OpenCodeMcpServer

Defined in: [core/services/mcp.service.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L9)

The `mcp.servers` value shape OpenCode accepts for one server. Only the
fields this kit stores are emitted; every field is optional except `type`
because local and remote servers use disjoint keys.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="command"></a> `command?` | `string`[] | [core/services/mcp.service.ts:11](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L11) |
| <a id="disabled"></a> `disabled?` | `boolean` | [core/services/mcp.service.ts:15](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L15) |
| <a id="environment"></a> `environment?` | `Record`\<`string`, `string`\> | [core/services/mcp.service.ts:13](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L13) |
| <a id="headers"></a> `headers?` | `Record`\<`string`, `string`\> | [core/services/mcp.service.ts:14](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L14) |
| <a id="type"></a> `type` | `"local"` \| `"remote"` | [core/services/mcp.service.ts:10](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L10) |
| <a id="url"></a> `url?` | `string` | [core/services/mcp.service.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/mcp.service.ts#L12) |
