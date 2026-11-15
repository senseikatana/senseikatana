[katanakit-js](../index.md) / useCapabilitiesFor

# Function: useCapabilitiesFor()

```ts
function useCapabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:376](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/access.service.ts#L376)

Effective capabilities of a role: its own plus every less-privileged role's.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

## Returns

`string`[]

## Example

```ts
useCapabilitiesFor("author"); // content:create, content:edit:own, ..., conversations:use
useCapabilitiesFor("guest");  // []
```
