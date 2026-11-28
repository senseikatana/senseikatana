[katanakit-js](../index.md) / onCreateSignal

# Function: onCreateSignal()

```ts
function onCreateSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [core/services/reactive.service.ts:386](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L386)

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
