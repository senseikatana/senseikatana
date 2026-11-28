[katanakit-js](../index.md) / onThrottleTrailing

# Function: onThrottleTrailing()

```ts
function onThrottleTrailing<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L490)

Throttle with a trailing invocation. See [TimingService.onThrottleTrailing](../classes/TimingService.md#onthrottletrailing).

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
