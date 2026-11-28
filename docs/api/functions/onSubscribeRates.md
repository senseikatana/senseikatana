[katanakit-js](../index.md) / onSubscribeRates

# Function: onSubscribeRates()

```ts
function onSubscribeRates(events): () => void;
```

Defined in: [infrastructure/currency/currency.service.ts:131](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/currency/currency.service.ts#L131)

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
import { onSubscribeRates } from "katanakit-js";

const off = onSubscribeRates({ onRatesUpdate: (s) => render(s) });
off();
```
