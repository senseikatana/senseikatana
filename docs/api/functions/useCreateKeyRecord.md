[katanakit-js](../index.md) / useCreateKeyRecord

# Function: useCreateKeyRecord()

```ts
function useCreateKeyRecord(input): SafeResult<{
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

Defined in: [core/services/keyvault.service.ts:252](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L252)

Creates a validated key record. See [KeyVaultService.useCreateKeyRecord](../classes/KeyVaultService.md#usecreatekeyrecord).

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
