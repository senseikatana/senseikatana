[katanakit-js](../index.md) / onCreateMemo

# Function: onCreateMemo()

```ts
function onCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:397](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L397)

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
