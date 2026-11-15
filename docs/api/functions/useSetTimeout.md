[katanakit-js](../index.md) / useSetTimeout

# Function: useSetTimeout()

```ts
function useSetTimeout<T>(callback, ms): TimeoutControl<T>;
```

Defined in: [core/services/timing.service.ts:452](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/timing.service.ts#L452)

Cancellable delayed execution. See [TimingService.useSetTimeout](../classes/TimingService.md#usesettimeout).

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
