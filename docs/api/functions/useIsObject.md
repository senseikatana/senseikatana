[katanakit-js](../index.md) / useIsObject

# Function: useIsObject()

```ts
function useIsObject(item): item is Record<string, unknown>;
```

Defined in: [core/services/utils.service.ts:461](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L461)

Type guard that checks whether a value is a plain object (not null, not an array).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `unknown` |

## Returns

`item is Record<string, unknown>`

## Example

```ts
useIsObject({ a: 1 }); // true
```
