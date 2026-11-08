[katanakit-js](../index.md) / useDeepMerge

# Function: useDeepMerge()

```ts
function useDeepMerge<T>(target, source): T;
```

Defined in: [core/services/utils.service.ts:485](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L485)

Deep merges `source` into a shallow copy of `target`.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Record`\<`string`, `unknown`\> |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `T` |
| `source` | `Record`\<`string`, `unknown`\> |

## Returns

`T`

## Example

```ts
useDeepMerge(base, override);
```
