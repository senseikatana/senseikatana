[katanakit-js](../index.md) / useThrottleTrailing

# Function: useThrottleTrailing()

```ts
function useThrottleTrailing<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L490)

Throttle with a trailing invocation. See [TimingService.useThrottleTrailing](../classes/TimingService.md#usethrottletrailing).

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* (...`args`) => `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `func` | `T` |
| `limitMs` | `number` |

## Returns

(...`args`) => `void`
