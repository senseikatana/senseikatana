[katanakit-js](../index.md) / useRegisterRole

# Function: useRegisterRole()

```ts
function useRegisterRole(definition): void;
```

Defined in: [core/services/access.service.ts:384](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L384)

Registers (or replaces) a role definition. Use it to extend a built-in
role's capabilities, e.g. grant `content:create` to `member`.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; \} |
| `definition.capabilities` | `string`[] |
| `definition.label` | `string` |
| `definition.rank` | `number` |
| `definition.slug` | `string` |

## Returns

`void`
