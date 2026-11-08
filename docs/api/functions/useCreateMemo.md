[katanakit-js](../index.md) / useCreateMemo

# Function: useCreateMemo()

```ts
function useCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:400](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L400)

Creates a memoised signal. See [ReactiveService.useCreateMemo](../classes/ReactiveService.md#usecreatememo).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `computation` | () => `T` | `undefined` |
| `signals` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` |

## Returns

[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>
