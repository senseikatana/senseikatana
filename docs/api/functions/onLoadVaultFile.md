[katanakit-js](../index.md) / onLoadVaultFile

# Function: onLoadVaultFile()

```ts
function onLoadVaultFile(path, passphrase): Promise<SafeResult<{
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

Defined in: [infrastructure/vault/vault.store.ts:334](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/vault/vault.store.ts#L334)

Reads and opens a vault file. See [VaultStore.onLoadVaultFile](../classes/VaultStore.md#onloadvaultfile).

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
