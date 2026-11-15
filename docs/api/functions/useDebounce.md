[katanakit-js](../index.md) / useDebounce

# Function: useDebounce()

```ts
function useDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/timing.service.ts#L466)

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
