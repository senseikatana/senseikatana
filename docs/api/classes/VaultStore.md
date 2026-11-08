[katanakit-js](../index.md) / VaultStore

# Class: VaultStore

Defined in: [infrastructure/vault/vault.store.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L40)

Encrypted vault persistence: scrypt key derivation + AES-256-GCM, versioned
envelope, atomic writes.

This module owns all crypto and filesystem I/O for the key manager. Node
built-ins load through dynamic `import()` (the same idiom
`storage.service.ts` uses for `node:async_hooks`), so merely importing this
module stays browser- and SSR-safe and no key material exists outside the
two functions below.

The vault file never leaves the machine: `keys export` re-encrypts the same
payload for backups, so a stolen backup is useless without the passphrase.

## Example

```ts
import { useSaveVaultFile, useLoadVaultFile } from "katanakit-js/infrastructure";

await useSaveVaultFile(path, vault, passphrase);
const loaded = await useLoadVaultFile(path, passphrase);
```

## Methods

### useDecryptVault()

```ts
useDecryptVault(payload, passphrase): Promise<SafeResult<{
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

Defined in: [infrastructure/vault/vault.store.ts:147](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L147)

Opens an envelope with a passphrase. A wrong passphrase and a tampered
file both fail GCM authentication and are reported the same way — never
say which one it was.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `payload` | `string` | The serialized envelope. |
| `passphrase` | `string` | The passphrase to open it with. |

#### Returns

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

`{ data, error, ok }` with the decrypted payload.

***

### useEncryptVault()

```ts
useEncryptVault(data, passphrase): Promise<SafeResult<string>>;
```

Defined in: [infrastructure/vault/vault.store.ts:77](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L77)

Encrypts a vault payload into the on-disk envelope format.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The decrypted payload (validated before sealing). |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `passphrase` | `string` | The passphrase the vault is sealed with. |

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>\>

`{ data, error, ok }` with the serialized envelope.

***

### useLoadVaultFile()

```ts
useLoadVaultFile(path, passphrase): Promise<SafeResult<{
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

Defined in: [infrastructure/vault/vault.store.ts:265](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L265)

Reads and opens a vault file. A missing file resolves with
`error.status = 404` so callers can decide between "start fresh" and
"fail loudly" without parsing error strings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The vault file path. |
| `passphrase` | `string` | The passphrase to open it with. |

#### Returns

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

`{ data, error, ok }` with the decrypted payload.

***

### useSaveVaultFile()

```ts
useSaveVaultFile(
   path, 
   data, 
   passphrase
): Promise<SafeResult<string>>;
```

Defined in: [infrastructure/vault/vault.store.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L227)

Encrypts and writes the vault atomically (temp file + rename) with
owner-only permissions, creating the parent directory when needed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Target file path. |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The payload to persist. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `passphrase` | `string` | The passphrase to seal it with. |

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`string`\>\>

`{ data, error, ok }` with the written path.

***

### useVaultPath()

```ts
useVaultPath(): Promise<string>;
```

Defined in: [infrastructure/vault/vault.store.ts:61](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L61)

Resolves the vault file location: `KATANAKITAI_VAULT` when set,
otherwise `$XDG_CONFIG_HOME/katanakitai/vault.enc.json` (defaulting to
`~/.config`).

#### Returns

`Promise`\<`string`\>

The absolute vault file path.

***

### getInstance()

```ts
static getInstance(): VaultStore;
```

Defined in: [infrastructure/vault/vault.store.ts:47](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/vault/vault.store.ts#L47)

Returns the shared instance (Singleton).

#### Returns

`VaultStore`
