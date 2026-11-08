[katanakit-js](../index.md) / useSaveVaultFile

# Function: useSaveVaultFile()

```ts
function useSaveVaultFile(
   path, 
   data, 
   passphrase
): Promise<SafeResult<string>>;
```

Defined in: [infrastructure/vault/vault.store.ts:325](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L325)

Encrypts and writes the vault atomically. See [VaultStore.useSaveVaultFile](../classes/VaultStore.md#usesavevaultfile).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} |
| `data.createdAt` | `string` |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |
| `data.updatedAt` | `string` |
| `data.version` | `1` |
| `passphrase` | `string` |

## Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>\>
