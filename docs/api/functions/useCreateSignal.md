[katanakit-js](../index.md) / useCreateSignal

# Function: useCreateSignal()

```ts
function useCreateSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [core/services/reactive.service.ts:387](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L387)

Creates a reactive signal. See [ReactiveService.useCreateSignal](../classes/ReactiveService.md#usecreatesignal).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]
