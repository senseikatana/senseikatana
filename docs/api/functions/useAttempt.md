[katanakit-js](../index.md) / useAttempt

# Function: useAttempt()

```ts
function useAttempt<T>(operation, mapError?): Promise<SafeResult<T>>;
```

Defined in: [core/services/result.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L105)

Runs an operation and captures any throw as a Safe Result. See [ResultService.useAttempt](../classes/ResultService.md#useattempt).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `operation` | () => `T` \| `Promise`\<`T`\> | `undefined` |
| `mapError` | (`error`) => \{ `details?`: `unknown`; `message`: `string`; `status`: `number`; \} | `useErrorNormalize` |

## Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>\>
