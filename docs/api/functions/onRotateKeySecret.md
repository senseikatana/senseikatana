[katanakit-js](../index.md) / onRotateKeySecret

# Function: onRotateKeySecret()

```ts
function onRotateKeySecret(record, secret): SafeResult<{
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

Defined in: [core/services/keyvault.service.ts:255](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/keyvault.service.ts#L255)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `record` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \} |
| `record.createdAt?` | `string` |
| `record.id?` | `string` |
| `record.label?` | `string` |
| `record.note?` | `string` |
| `record.provider?` | `string` |
| `record.secret?` | `string` |
| `record.status?` | `"active"` \| `"revoked"` |
| `record.updatedAt?` | `string` |
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
