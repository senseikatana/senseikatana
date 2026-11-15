[katanakit-js](../index.md) / useDeepClone

# Function: useDeepClone()

```ts
function useDeepClone<T>(value): T;
```

Defined in: [core/services/utils.service.ts:473](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L473)

Deep clones a value using `structuredClone` with a JSON fallback.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

## Returns

`T`

## Example

```ts
const copy = useDeepClone(original);
```
