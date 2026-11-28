[katanakit-js](../index.md) / useRegisterRole

# Function: useRegisterRole()

```ts
function useRegisterRole(definition): void;
```

Defined in: [core/services/access.service.ts:384](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/access.service.ts#L384)

Registers (or replaces) a role definition. Use it to extend a built-in
role's capabilities, e.g. grant `content:create` to `member`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; \} |
| `definition.capabilities?` | `string`[] |
| `definition.label?` | `string` |
| `definition.rank?` | `number` |
| `definition.slug?` | `string` |

## Returns

`void`
