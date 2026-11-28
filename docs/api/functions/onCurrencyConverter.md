[katanakit-js](../index.md) / onCurrencyConverter

# Function: onCurrencyConverter()

```ts
function onCurrencyConverter(options?): CurrencyConverterService;
```

Defined in: [infrastructure/currency/currency.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/currency/currency.service.ts#L36)

Wires the shared [CurrencyConverterService](../classes/CurrencyConverterService.md) with the default rate
source (Frankfurter) and returns it.

This is the composition point between the pure core service and the
infrastructure that performs the network I/O: the core only knows the
[ICurrencyRateProvider](../interfaces/ICurrencyRateProvider.md) port, so someone has to plug an implementation
in. Calling this once is that "someone" — and it is idempotent, so calling it
on every use is fine and a provider you injected yourself is never replaced.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`CurrencyConverterServiceOptions`](../interfaces/CurrencyConverterServiceOptions.md) | Provider and cache TTL. `ttlMs` is applied through `onSetTtlMs`, so it also works on the shared instance. |

## Returns

[`CurrencyConverterService`](../classes/CurrencyConverterService.md)

The shared [CurrencyConverterService](../classes/CurrencyConverterService.md) (Singleton).

## Example

```ts
import { onCurrencyConverter } from "katanakit-js";

const currency = onCurrencyConverter();
const unsubscribe = currency.subscribe({ onRatesUpdate: (s) => render(s) });
```
