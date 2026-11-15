[katanakit-js](../index.md) / useCreateMemo

# Function: useCreateMemo()

```ts
function useCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:400](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/reactive.service.ts#L400)

Creates a memoised signal. See [ReactiveService.useCreateMemo](../classes/ReactiveService.md#usecreatememo).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `computation` | () => `T` | `undefined` |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` |

## Returns

[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>
