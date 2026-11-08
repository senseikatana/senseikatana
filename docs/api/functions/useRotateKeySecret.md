[katanakit-js](../index.md) / useRotateKeySecret

# Function: useRotateKeySecret()

```ts
function useRotateKeySecret(record, secret): SafeResult<{
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

Defined in: [core/services/keyvault.service.ts:257](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L257)

Rotates a key's secret. See [KeyVaultService.useRotateKeySecret](../classes/KeyVaultService.md#userotatekeysecret).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} |
| `record.createdAt` | `string` |
| `record.id` | `string` |
| `record.label` | `string` |
| `record.note?` | `string` |
| `record.provider` | `string` |
| `record.secret` | `string` |
| `record.status` | `"active"` \| `"revoked"` |
| `record.updatedAt` | `string` |
| `secret` | `string` |

## Returns

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
