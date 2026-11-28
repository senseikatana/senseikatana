[katanakit-js](../index.md) / useDebounce

# Function: useDebounce()

```ts
function useDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/timing.service.ts#L466)

Trailing-edge debounce. See [TimingService.useDebounce](../classes/TimingService.md#usedebounce).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* (...`args`) => `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `func` | `T` |
| `delayMs` | `number` |

## Returns

(...`args`) => `void`
