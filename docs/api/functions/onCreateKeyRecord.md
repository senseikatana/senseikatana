[katanakit-js](../index.md) / onCreateKeyRecord

# Function: onCreateKeyRecord()

```ts
function onCreateKeyRecord(input): SafeResult<{
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

Defined in: [core/services/keyvault.service.ts:251](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/keyvault.service.ts#L251)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`KeyRecordInput`](../interfaces/KeyRecordInput.md) |

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
