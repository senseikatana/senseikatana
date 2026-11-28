[katanakit-js](../index.md) / onReplaceKey

# Function: onReplaceKey()

```ts
function onReplaceKey(data, record): {
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

Defined in: [core/services/keyvault.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/keyvault.service.ts#L282)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} |
| `data.createdAt?` | `string` |
| `data.keys?` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] |
| `data.mcpServers?` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |
| `data.updatedAt?` | `string` |
| `data.version?` | `1` |
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

### createdAt

```ts
createdAt: string;
```

### keys

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

#### Type Declaration

### mcpServers

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

#### Type Declaration

### updatedAt

```ts
updatedAt: string;
```

### version

```ts
version: 1;
```
