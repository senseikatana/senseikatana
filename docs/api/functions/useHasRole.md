[katanakit-js](../index.md) / useHasRole

# Function: useHasRole()

```ts
function useHasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/access.service.ts#L399)

Exact role membership - no hierarchy involved.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id?` | `string` \| `number` |
| `subject.roles?` | `string`[] |
| `role` | `string` |

## Returns

`boolean`
