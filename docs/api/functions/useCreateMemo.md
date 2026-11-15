[katanakit-js](../index.md) / useCreateMemo

# Function: useCreateMemo()

```ts
function useCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:400](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/reactive.service.ts#L400)

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
