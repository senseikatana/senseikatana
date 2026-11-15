[katanakit-js](../index.md) / useHasRole

# Function: useHasRole()

```ts
function useHasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/access.service.ts#L399)

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
