[katanakit-js](../index.md) / onFindKey

# Function: onFindKey()

```ts
function onFindKey(data, id): 
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

Defined in: [core/services/keyvault.service.ts:267](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/keyvault.service.ts#L267)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ `createdAt`: `string`; `keys`: \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[]; `mcpServers`: \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[]; `updatedAt`: `string`; `version`: `1`; \} |
| `data.createdAt?` | `string` |
| `data.keys?` | \{ `createdAt`: `string`; `id`: `string`; `label`: `string`; `note?`: `string`; `provider`: `string`; `secret`: `string`; `status`: `"active"` \| `"revoked"`; `updatedAt`: `string`; \}[] |
| `data.mcpServers?` | \{ `command?`: `string`[]; `disabled?`: `boolean`; `environment?`: `Record`\<`string`, `string`\>; `headers?`: `Record`\<`string`, `string`\>; `name`: `string`; `type`: `"local"` \| `"remote"`; `url?`: `string`; \}[] |
| `data.updatedAt?` | `string` |
| `data.version?` | `1` |
| `id` | `string` |

## Returns

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
