[katanakit-js](../index.md) / useThrottle

# Function: useThrottle()

```ts
function useThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:482](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/timing.service.ts#L482)

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
