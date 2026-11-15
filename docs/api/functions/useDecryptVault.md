[katanakit-js](../index.md) / useDecryptVault

# Function: useDecryptVault()

```ts
function useDecryptVault(payload, passphrase): Promise<SafeResult<{
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

Defined in: [infrastructure/vault/vault.store.ts:317](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/vault/vault.store.ts#L317)

Opens an encrypted envelope. See [VaultStore.useDecryptVault](../classes/VaultStore.md#usedecryptvault).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | `string` |
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
