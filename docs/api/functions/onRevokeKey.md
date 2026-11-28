[katanakit-js](../index.md) / onRevokeKey

# Function: onRevokeKey()

```ts
function onRevokeKey(record): {
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

Defined in: [core/services/keyvault.service.ts:259](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/keyvault.service.ts#L259)

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
note?: string;
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
