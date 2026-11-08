[katanakit-js](../index.md) / useDeepClone

# Function: useDeepClone()

```ts
function useDeepClone<T>(value): T;
```

Defined in: [core/services/utils.service.ts:473](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L473)

Deep clones a value using `structuredClone` with a JSON fallback.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

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
