[katanakit-js](../index.md) / useDebounce

# Function: useDebounce()

```ts
function useDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L466)

Trailing-edge debounce. See [TimingService.useDebounce](../classes/TimingService.md#usedebounce).

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* (...`args`) => `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `func` | `T` |
| `delayMs` | `number` |

## Returns

(...`args`) => `void`
