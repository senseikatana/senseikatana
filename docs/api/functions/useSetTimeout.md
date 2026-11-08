[katanakit-js](../index.md) / useSetTimeout

# Function: useSetTimeout()

```ts
function useSetTimeout<T>(callback, ms): TimeoutControl<T>;
```

Defined in: [core/services/timing.service.ts:452](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L452)

Cancellable delayed execution. See [TimingService.useSetTimeout](../classes/TimingService.md#usesettimeout).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `T` \| `Promise`\<`T`\> |
| `ms` | `number` |

## Returns

[`TimeoutControl`](../interfaces/TimeoutControl.md)\<`T`\>
