[katanakit-js](../index.md) / useThrottle

# Function: useThrottle()

```ts
function useThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:482](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L482)

Leading-edge throttle. See [TimingService.useThrottle](../classes/TimingService.md#usethrottle).

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
