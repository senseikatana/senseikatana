[katanakit-js](../index.md) / useCreateDebouncedSignal

# Function: useCreateDebouncedSignal()

```ts
function useCreateDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  useCancel: () => void;
}];
```

Defined in: [core/services/reactive.service.ts:413](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/reactive.service.ts#L413)

Creates a signal with a debounced setter. See [ReactiveService.useCreateDebouncedSignal](../classes/ReactiveService.md#usecreatedebouncedsignal).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `initialValue` | `T` | `undefined` |
| `delayMs?` | `number` | `300` |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\> & \{
  `useCancel`: () => `void`;
\}\]
