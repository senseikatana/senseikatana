[katanakit-js](../index.md) / useThrottleTrailing

# Function: useThrottleTrailing()

```ts
function useThrottleTrailing<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L490)

Throttle with a trailing invocation. See [TimingService.useThrottleTrailing](../classes/TimingService.md#usethrottletrailing).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* (...`args`) => `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `func` | `T` |
| `limitMs` | `number` |

## Returns

(...`args`) => `void`
