[katanakit-js](../index.md) / useThrottle

# Function: useThrottle()

```ts
function useThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:482](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/timing.service.ts#L482)

Leading-edge throttle. See [TimingService.useThrottle](../classes/TimingService.md#usethrottle).

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
