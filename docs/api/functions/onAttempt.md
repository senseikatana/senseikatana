[katanakit-js](../index.md) / onAttempt

# Function: onAttempt()

```ts
function onAttempt<T>(operation, mapError?): Promise<SafeResult<T>>;
```

Defined in: [core/services/result.service.ts:104](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/result.service.ts#L104)

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `operation` | () => `T` \| `Promise`\<`T`\> | `undefined` |
| `mapError?` | (`error`) => \{ `details?`: `unknown`; `message`: `string`; `status`: `number`; \} | `onErrorNormalize` |

## Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>\>
