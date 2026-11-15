[katanakit-js](../index.md) / useDeepMerge

# Function: useDeepMerge()

```ts
function useDeepMerge<T>(target, source): T;
```

Defined in: [core/services/utils.service.ts:485](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/utils.service.ts#L485)

Deep merges `source` into a shallow copy of `target`.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* `Record`\<`string`, `unknown`\> |

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
