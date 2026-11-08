[katanakit-js](../index.md) / useRevokeKey

# Function: useRevokeKey()

```ts
function useRevokeKey(record): {
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

Defined in: [core/services/keyvault.service.ts:262](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/keyvault.service.ts#L262)

Marks a key as revoked. See [KeyVaultService.useRevokeKey](../classes/KeyVaultService.md#userevokekey).

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

## Returns

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

### createdAt

```ts
createdAt: string;
```

### id

```ts
id: string;
```

### label

```ts
label: string;
```

### note?

```ts
optional note?: string;
```

### provider

```ts
provider: string = KeyProviderSchema;
```

### secret

```ts
secret: string;
```

### status

```ts
status: "active" | "revoked" = KeyStatusSchema;
```

### updatedAt

```ts
updatedAt: string;
```
