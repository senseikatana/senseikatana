[katanakit-js](../index.md) / useCreateDebouncedSignal

# Function: useCreateDebouncedSignal()

```ts
function useCreateDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  useCancel: () => void;
}];
```

Defined in: [core/services/reactive.service.ts:413](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/reactive.service.ts#L413)

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
