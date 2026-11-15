[katanakit-js](../index.md) / useThrottle

# Function: useThrottle()

```ts
function useThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:482](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L482)

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
