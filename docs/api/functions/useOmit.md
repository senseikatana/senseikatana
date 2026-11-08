[katanakit-js](../index.md) / useOmit

# Function: useOmit()

```ts
function useOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [core/services/utils.service.ts:512](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L512)

Omits the listed keys from an object, returning a shallow copy without them.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |
| `K` *extends* `string` \| `number` \| `symbol` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

## Returns

`Omit`\<`T`, `K`\>

## Example

```ts
useOmit(user, ["password"]);
```
