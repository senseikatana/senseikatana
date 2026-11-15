[katanakit-js](../index.md) / useRetry

# Function: useRetry()

```ts
function useRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [core/services/utils.service.ts:536](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L536)

Retries an async function with a fixed delay between attempts.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` |
| `retries?` | `number` | `3` |
| `delayMs?` | `number` | `1000` |

## Returns

`Promise`\<`T`\>

## Example

```ts
const data = await useRetry(() => fetch("/api"), 3, 500);
```
