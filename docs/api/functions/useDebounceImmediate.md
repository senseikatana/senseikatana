[katanakit-js](../index.md) / useDebounceImmediate

# Function: useDebounceImmediate()

```ts
function useDebounceImmediate<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:474](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L474)

Leading-edge debounce. See [TimingService.useDebounceImmediate](../classes/TimingService.md#usedebounceimmediate).

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
