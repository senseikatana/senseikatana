[katanakit-js](../index.md) / onCreateDebouncedSignal

# Function: onCreateDebouncedSignal()

```ts
function onCreateDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  onCancel: () => void;
}];
```

Defined in: [core/services/reactive.service.ts:408](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L408)

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
  `onCancel`: () => `void`;
\}\]
