[katanakit-js](../index.md) / useSubscribeRates

# Function: useSubscribeRates()

```ts
function useSubscribeRates(events): () => void;
```

Defined in: [infrastructure/currency/currency.service.ts:131](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/currency/currency.service.ts#L131)

Subscribes to rate events (Observer).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | [`CurrencyRateEvents`](../interfaces/CurrencyRateEvents.md) | Handlers, `onRatesUpdate` and/or `onRatesError`. |

## Returns

An unsubscribe function.

() => `void`

## Example

```ts
import { useSubscribeRates } from "katanakit-js";

const off = useSubscribeRates({ onRatesUpdate: (s) => render(s) });
off();
```
