[katanakit-js](../index.md) / onSetTimeout

# Function: onSetTimeout()

```ts
function onSetTimeout<T>(callback, ms): TimeoutControl<T>;
```

Defined in: [core/services/timing.service.ts:452](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L452)

Cancellable delayed execution. See [TimingService.onSetTimeout](../classes/TimingService.md#onsettimeout).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `T` \| `Promise`\<`T`\> |
| `ms` | `number` |

## Returns

[`TimeoutControl`](../interfaces/TimeoutControl.md)\<`T`\>
