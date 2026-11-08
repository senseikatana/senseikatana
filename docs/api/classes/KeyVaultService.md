[katanakit-js](../index.md) / KeyVaultService

# Class: KeyVaultService

Defined in: [core/services/keyvault.service.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L48)

KeyVaultService — Singleton facade for API key record lifecycle.

Applies the **Singleton** pattern (one shared instance via
[KeyVaultService.getInstance](#getinstance)) and the **Facade** pattern: every public
method returns the `{ data, error, ok }` union from [SafeResult](../type-aliases/SafeResult.md) (or a
plain value when it cannot fail) and never throws.

The methods are pure: they take records and vault payloads as values and
return new ones. Persistence and encryption live in
`src/infrastructure/vault/vault.store.ts`, so this service stays free of
runtime I/O per `CONTRIBUTING.md` and is trivially testable.

Security posture: a secret is only ever returned in full by an explicit
reveal call site (the CLI's `keys reveal`). Everything else — lists, logs,
config previews — goes through [KeyVaultService.useMaskSecret](#usemasksecret).

## Example

```ts
import { useCreateKeyRecord, useMaskSecret } from "katanakit-js";

const result = useCreateKeyRecord({ provider: "openai", label: "ci", secret: "sk-…" });
if (result.ok) console.log(useMaskSecret(result.data.secret)); // sk-••••••••••••1234
```

## Methods

### useAddKey()

```ts
useAddKey(data, record): {
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
};
```

Defined in: [core/services/keyvault.service.ts:195](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L195)

Appends a record to the vault payload, touching `updatedAt`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The current vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} | The record to append. |
| `record.createdAt` | `string` | - |
| `record.id` | `string` | - |
| `record.label` | `string` | - |
| `record.note?` | `string` | - |
| `record.provider` | `string` | - |
| `record.secret` | `string` | - |
| `record.status` | `"active"` \| `"revoked"` | - |
| `record.updatedAt` | `string` | - |

#### Returns

```ts
{
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
}
```

The updated payload.

##### createdAt

```ts
createdAt: string;
```

##### keys

```ts
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
```

###### Type Declaration

##### mcpServers

```ts
mcpServers: {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

###### Type Declaration

##### updatedAt

```ts
updatedAt: string;
```

##### version

```ts
version: 1;
```

***

### useCreateKeyRecord()

```ts
useCreateKeyRecord(input): SafeResult<{
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}>;
```

Defined in: [core/services/keyvault.service.ts:68](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L68)

Creates a validated key record with a fresh id and timestamps.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`KeyRecordInput`](../interfaces/KeyRecordInput.md) | Provider, label and secret (plus an optional note). |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `createdAt`: `string`;
  `id`: `string`;
  `label`: `string`;
  `note?`: `string`;
  `provider`: `string`;
  `secret`: `string`;
  `status`: `"active"` \| `"revoked"`;
  `updatedAt`: `string`;
\}\>

`{ data, error, ok }` — `error.status = 400` on validation failure.

***

### useEmptyVault()

```ts
useEmptyVault(): {
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
};
```

Defined in: [core/services/keyvault.service.ts:219](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L219)

Returns an empty, schema-valid vault payload.

#### Returns

```ts
{
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
}
```

A fresh vault payload.

##### createdAt

```ts
createdAt: string;
```

##### keys

```ts
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
```

###### Type Declaration

##### mcpServers

```ts
mcpServers: {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

###### Type Declaration

##### updatedAt

```ts
updatedAt: string;
```

##### version

```ts
version: 1;
```

***

### useFindKey()

```ts
useFindKey(data, id): 
  | {
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}
  | undefined;
```

Defined in: [core/services/keyvault.service.ts:170](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L170)

Finds a key record by id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The vault payload to search. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `id` | `string` | The record id. |

#### Returns

  \| \{
  `createdAt`: `string`;
  `id`: `string`;
  `label`: `string`;
  `note?`: `string`;
  `provider`: `string`;
  `secret`: `string`;
  `status`: `"active"` \| `"revoked"`;
  `updatedAt`: `string`;
\}
  \| `undefined`

The record, or `undefined`.

***

### useListKeys()

```ts
useListKeys(data, options?): {
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}[];
```

Defined in: [core/services/keyvault.service.ts:181](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L181)

Lists key records, newest first.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `options` | \{ `includeRevoked?`: `boolean`; \} | `includeRevoked` also returns revoked records. |
| `options.includeRevoked?` | `boolean` | - |

#### Returns

\{
  `createdAt`: `string`;
  `id`: `string`;
  `label`: `string`;
  `note?`: `string`;
  `provider`: `string`;
  `secret`: `string`;
  `status`: `"active"` \| `"revoked"`;
  `updatedAt`: `string`;
\}[]

The matching records.

***

### useMaskSecret()

```ts
useMaskSecret(secret): string;
```

Defined in: [core/services/keyvault.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L156)

Masks a secret for display: the first 8 and last 4 characters survive on
long secrets (matching the `freellma••••••••••a8e9` style), short secrets
become bullets only. A mask must never leak enough to brute-force.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `secret` | `string` | The secret to mask. |

#### Returns

`string`

The masked form.

***

### useProviderEnvName()

```ts
useProviderEnvName(provider): string;
```

Defined in: [core/services/keyvault.service.ts:238](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L238)

Resolves the conventional environment variable name for a provider, e.g.
`openai` → `OPENAI_API_KEY`. Unknown providers get a stable
`KATANAKIT_KEY_<PROVIDER>` name so generated configs stay predictable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `provider` | `string` | The provider slug. |

#### Returns

`string`

The environment variable name.

***

### useReplaceKey()

```ts
useReplaceKey(data, record): {
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
};
```

Defined in: [core/services/keyvault.service.ts:207](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L207)

Replaces the record with the same id (or appends it when absent), touching
`updatedAt`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} | The current vault payload. |
| `data.createdAt` | `string` | - |
| `data.keys` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] | - |
| `data.mcpServers` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] | - |
| `data.updatedAt` | `string` | - |
| `data.version` | `1` | - |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} | The replacement record. |
| `record.createdAt` | `string` | - |
| `record.id` | `string` | - |
| `record.label` | `string` | - |
| `record.note?` | `string` | - |
| `record.provider` | `string` | - |
| `record.secret` | `string` | - |
| `record.status` | `"active"` \| `"revoked"` | - |
| `record.updatedAt` | `string` | - |

#### Returns

```ts
{
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
}
```

The updated payload.

##### createdAt

```ts
createdAt: string;
```

##### keys

```ts
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
```

###### Type Declaration

##### mcpServers

```ts
mcpServers: {
  command?: string[];
  disabled?: boolean;
  environment?: Record<string, string>;
  headers?: Record<string, string>;
  name: string;
  type: "local" | "remote";
  url?: string;
}[];
```

###### Type Declaration

##### updatedAt

```ts
updatedAt: string;
```

##### version

```ts
version: 1;
```

***

### useRevokeKey()

```ts
useRevokeKey(record): {
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
};
```

Defined in: [core/services/keyvault.service.ts:144](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L144)

Marks a key as revoked. The record is kept for audit; revoking is
idempotent and cannot fail.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} | The record to revoke. |
| `record.createdAt` | `string` | - |
| `record.id` | `string` | - |
| `record.label` | `string` | - |
| `record.note?` | `string` | - |
| `record.provider` | `string` | - |
| `record.secret` | `string` | - |
| `record.status` | `"active"` \| `"revoked"` | - |
| `record.updatedAt` | `string` | - |

#### Returns

```ts
{
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}
```

The revoked record.

##### createdAt

```ts
createdAt: string;
```

##### id

```ts
id: string;
```

##### label

```ts
label: string;
```

##### note?

```ts
optional note?: string;
```

##### provider

```ts
provider: string = KeyProviderSchema;
```

##### secret

```ts
secret: string;
```

##### status

```ts
status: "active" | "revoked" = KeyStatusSchema;
```

##### updatedAt

```ts
updatedAt: string;
```

***

### useRotateKeySecret()

```ts
useRotateKeySecret(record, secret): SafeResult<{
  createdAt: string;
  id: string;
  label: string;
  note?: string;
  provider: string;
  secret: string;
  status: "active" | "revoked";
  updatedAt: string;
}>;
```

Defined in: [core/services/keyvault.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L105)

Rotates a key's secret, keeping the record (and its id) stable so every
config that references it stays valid. Revoked keys cannot rotate: the
caller must create a new record instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} | The record to rotate. |
| `record.createdAt` | `string` | - |
| `record.id` | `string` | - |
| `record.label` | `string` | - |
| `record.note?` | `string` | - |
| `record.provider` | `string` | - |
| `record.secret` | `string` | - |
| `record.status` | `"active"` \| `"revoked"` | - |
| `record.updatedAt` | `string` | - |
| `secret` | `string` | The replacement secret. |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<\{
  `createdAt`: `string`;
  `id`: `string`;
  `label`: `string`;
  `note?`: `string`;
  `provider`: `string`;
  `secret`: `string`;
  `status`: `"active"` \| `"revoked"`;
  `updatedAt`: `string`;
\}\>

`{ data, error, ok }` — `error.status = 409` when revoked.

***

### getInstance()

```ts
static getInstance(): KeyVaultService;
```

Defined in: [core/services/keyvault.service.ts:55](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L55)

Returns the shared instance (Singleton).

#### Returns

`KeyVaultService`
