[katanakit-js](../index.md) / useRetry

# Function: useRetry()

```ts
function useRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [core/services/utils.service.ts:536](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/utils.service.ts#L536)

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
