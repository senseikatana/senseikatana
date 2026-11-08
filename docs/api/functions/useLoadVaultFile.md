[katanakit-js](../index.md) / useLoadVaultFile

# Function: useLoadVaultFile()

```ts
function useLoadVaultFile(path, passphrase): Promise<SafeResult<{
  createdAt: string;
  keys: {
     createdAt: string;
     id: string;
     label: string;
     note?: string;
     provider: string;
     secret: string;
     status: "active" | "revoked";
     updatedAt: string;
  }[];
  mcpServers: {
     command?: string[];
     disabled?: boolean;
     environment?: Record<string, string>;
     headers?: Record<string, string>;
     name: string;
     type: "local" | "remote";
     url?: string;
  }[];
  updatedAt: string;
  version: 1;
}>>;
```

Defined in: [infrastructure/vault/vault.store.ts:334](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L334)

Reads and opens a vault file. See [VaultStore.useLoadVaultFile](../classes/VaultStore.md#useloadvaultfile).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `passphrase` | `string` |

## Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `createdAt`: `string`;
  `keys`: \{
     `createdAt`: `string`;
     `id`: `string`;
     `label`: `string`;
     `note?`: `string`;
     `provider`: `string`;
     `secret`: `string`;
     `status`: `"active"` \| `"revoked"`;
     `updatedAt`: `string`;
  \}[];
  `mcpServers`: \{
     `command?`: `string`[];
     `disabled?`: `boolean`;
     `environment?`: `Record`\<`string`, `string`\>;
     `headers?`: `Record`\<`string`, `string`\>;
     `name`: `string`;
     `type`: `"local"` \| `"remote"`;
     `url?`: `string`;
  \}[];
  `updatedAt`: `string`;
  `version`: `1`;
\}\>\>
