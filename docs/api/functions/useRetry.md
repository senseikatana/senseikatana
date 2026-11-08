[katanakit-js](../index.md) / useRetry

# Function: useRetry()

```ts
function useRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [core/services/utils.service.ts:536](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L536)

Retries an async function with a fixed delay between attempts.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` |
| `retries` | `number` | `3` |
| `delayMs` | `number` | `1000` |

## Returns

`Promise`\<`T`\>

## Example

```ts
const data = await useRetry(() => fetch("/api"), 3, 500);
```
