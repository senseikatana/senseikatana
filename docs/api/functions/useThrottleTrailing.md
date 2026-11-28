[katanakit-js](../index.md) / useThrottleTrailing

# Function: useThrottleTrailing()

```ts
function useThrottleTrailing<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/timing.service.ts#L490)

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
