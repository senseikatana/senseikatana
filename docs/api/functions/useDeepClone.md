[katanakit-js](../index.md) / useDeepClone

# Function: useDeepClone()

```ts
function useDeepClone<T>(value): T;
```

Defined in: [core/services/utils.service.ts:473](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L473)

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
