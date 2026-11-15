[katanakit-js](../index.md) / useDebounce

# Function: useDebounce()

```ts
function useDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L466)

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
