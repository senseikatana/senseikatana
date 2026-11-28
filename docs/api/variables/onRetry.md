[katanakit-js](../index.md) / onRetry

# Variable: onRetry

```ts
onRetry: <T>(fn, retries, delayMs) => Promise<T>;
```

Defined in: [core/services/utils.service.ts:411](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L411)

Retries an async function with a fixed delay between attempts.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | The resolved value type. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` | The async function to retry. |
| `retries?` | `number` | `3` | Maximum number of retries (defaults to `3`). |
| `delayMs?` | `number` | `1000` | Delay between retries in milliseconds (defaults to `1000`). |

## Returns

`Promise`\<`T`\>

The resolved value of `fn`.

## Throws

The last error if all retries are exhausted.

## Example

```ts
const data = await retry(() => fetch("/api").then(r => r.json()), 3, 500);
```
