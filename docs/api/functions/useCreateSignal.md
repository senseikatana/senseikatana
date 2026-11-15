[katanakit-js](../index.md) / useCreateSignal

# Function: useCreateSignal()

```ts
function useCreateSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [core/services/reactive.service.ts:387](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/reactive.service.ts#L387)

Creates a reactive signal. See [ReactiveService.useCreateSignal](../classes/ReactiveService.md#usecreatesignal).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]
