[katanakit-js](../index.md) / useCan

# Function: useCan()

```ts
function useCan(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:415](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/access.service.ts#L415)

Whether the subject may perform a capability. Any of the subject's roles
granting the capability (directly or by inheritance) is enough.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id?` | `string` \| `number` |
| `subject.roles?` | `string`[] |
| `capability` | `string` |

## Returns

`boolean`

## Example

```ts
useCan({ id: 1, roles: ["author"] }, "content:publish"); // false
useCan({ id: 1, roles: ["author"] }, "content:create");  // true
useCan({ id: 2, roles: ["editor"] }, "content:create");  // true (inherits author)
useCan({ id: 3, roles: [] }, "conversations:use");       // false
```
