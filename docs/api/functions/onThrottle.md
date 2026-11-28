[katanakit-js](../index.md) / onThrottle

# Function: onThrottle()

```ts
function onThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:482](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L482)

Leading-edge throttle. See [TimingService.onThrottle](../classes/TimingService.md#onthrottle).

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
