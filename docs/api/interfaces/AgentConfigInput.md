[katanakit-js](../index.md) / AgentConfigInput

# Interface: AgentConfigInput

Defined in: [types/cli/keyvault.ts:47](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L47)

Input accepted when emitting agent configuration.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="apikeyenv"></a> `apiKeyEnv?` | `string` | Environment variable name the tool should read; defaults per provider. | [types/cli/keyvault.ts:51](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L51) |
| <a id="baseurl"></a> `baseUrl?` | `string` | Optional gateway/proxy endpoint. | [types/cli/keyvault.ts:53](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L53) |
| <a id="mcpservers"></a> `mcpServers?` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | MCP servers to embed in the generated config. | [types/cli/keyvault.ts:55](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L55) |
| <a id="provider"></a> `provider` | `string` | - | [types/cli/keyvault.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L48) |
| <a id="reveal"></a> `reveal?` | `boolean` | Emit real secret values; when omitted every printed value is masked. | [types/cli/keyvault.ts:57](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L57) |
| <a id="secret"></a> `secret` | `string` | - | [types/cli/keyvault.ts:49](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/cli/keyvault.ts#L49) |
