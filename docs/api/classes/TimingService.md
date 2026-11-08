[katanakit-js](../index.md) / TimingService

# Class: TimingService

Defined in: [core/services/timing.service.ts:37](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L37)

TimingService — Singleton facade for timers, intervals, debounce/throttle
and promise races.

Applies the **Singleton** pattern (one shared instance via
[TimingService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the `setTimeout` bookkeeping behind one call. The service holds
no shared state — every timer's state lives in the closure returned to the
caller — so the instance is safe to share across environments (Node, Bun,
browser, SSR).

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useSetTimeout } from "katanakit-js";

const { promise, cancel } = useSetTimeout(() => 42, 1000);
cancel(); // rejects the promise with "Timeout cancelled"
```

## Methods

### useDebounce()

```ts
useDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:204](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L204)

Returns a debounced version of `func` that delays invocation until
`delayMs` milliseconds of quiet.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `unknown` | The wrapped function type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `func` | `T` | Function to debounce. |
| `delayMs` | `number` | Debounce delay in milliseconds. |

#### Returns

A debounced function with the same signature.

(...`args`) => `void`

#### Example

```ts
const debouncedSearch = useDebounce(fetchResults, 300);
input.addEventListener("input", () => debouncedSearch(input.value));
```

***

### useDebounceImmediate()

```ts
useDebounceImmediate<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:245](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L245)

Leading-edge debounce: fires immediately on the first call, then ignores
calls until `delayMs` of quiet. Additional calls during the wait window
schedule a single trailing invocation with the latest arguments.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `unknown` | The wrapped function type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `func` | `T` | Function to debounce. |
| `delayMs` | `number` | Debounce delay in milliseconds. |

#### Returns

A debounced function with the same signature.

(...`args`) => `void`

#### Example

```ts
const save = useDebounceImmediate(submitForm, 500);
save("a"); // fires immediately
save("b"); // queued
save("c"); // queued (replaces "b")
// after 500ms of quiet: fires with "c"
```

***

### useInterval()

```ts
useInterval(
   callback, 
   ms, 
   immediate?
): IntervalControl;
```

Defined in: [core/services/timing.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L146)

Repeatedly executes a callback at `ms` intervals with pause/resume/stop
controls. Uses recursive `setTimeout` internally to avoid overlap.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `callback` | () => `void` \| `Promise`\<`void`\> | `undefined` | Function executed on each tick. |
| `ms` | `number` | `undefined` | Interval in milliseconds. |
| `immediate` | `boolean` | `false` | If `true`, fires the callback immediately before the first interval (defaults to `false`). |

#### Returns

[`IntervalControl`](../interfaces/IntervalControl.md)

An `IntervalControl` with `pause`, `resume`, `stop`, and
  `isRunning`.

#### Example

```ts
const timer = useInterval(() => console.log("tick"), 1000);
setTimeout(() => timer.pause(), 3000);
setTimeout(() => timer.resume(), 5000);
setTimeout(() => timer.stop(), 10000);
```

***

### useRace()

```ts
useRace<T>(
   promise, 
   timeoutMs, 
   errorMessage?
): Promise<T>;
```

Defined in: [core/services/timing.service.ts:424](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L424)

Races a promise against a timeout. Clears the timer when the promise
wins so the timeout rejection cannot become an unhandled rejection.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The promise's resolved type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `promise` | `Promise`\<`T`\> | `undefined` | The promise to race. |
| `timeoutMs` | `number` | `undefined` | Timeout in milliseconds. |
| `errorMessage` | `string` | `"Operation timed out"` | Error message on timeout (defaults to `"Operation timed out"`). |

#### Returns

`Promise`\<`T`\>

The resolved value of the promise.

#### Throws

If the timeout fires first.

#### Example

```ts
try {
  const data = await useRace(fetch("/api"), 5000);
} catch (e) {
  console.error(e); // "Operation timed out"
}
```

***

### useRepeat()

```ts
useRepeat(
   callback, 
   iterations, 
   delayMs?
): Promise<void>;
```

Defined in: [core/services/timing.service.ts:385](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L385)

Executes a callback `iterations` times with an optional delay between
each iteration.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `callback` | (`iteration`) => `void` \| `Promise`\<`void`\> | `undefined` | Function called on each iteration with the current index (0-based). |
| `iterations` | `number` | `undefined` | Number of times to repeat. |
| `delayMs` | `number` | `0` | Delay between iterations in milliseconds (defaults to `0`). |

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await useRepeat((i) => console.log(`Attempt ${i + 1}`), 3, 1000);
// Attempt 1 ... (1s) ... Attempt 2 ... (1s) ... Attempt 3
```

***

### useSetTimeout()

```ts
useSetTimeout<T>(callback, ms): TimeoutControl<T>;
```

Defined in: [core/services/timing.service.ts:66](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L66)

Executes a callback after `ms` milliseconds, returning a cancellable
promise that resolves with the callback's result.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The callback's return type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | () => `T` \| `Promise`\<`T`\> | Function to execute after the delay. |
| `ms` | `number` | Delay in milliseconds. |

#### Returns

[`TimeoutControl`](../interfaces/TimeoutControl.md)\<`T`\>

A `TimeoutControl` with `promise` and `cancel()`.

#### Example

```ts
const { promise, cancel } = useSetTimeout(() => 42, 1000);
cancel(); // rejects the promise with "Timeout cancelled"
```

***

### useThrottle()

```ts
useThrottle<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:300](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L300)

Returns a throttled version of `func` that fires at most once per
`limitMs` milliseconds (leading edge).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `unknown` | The wrapped function type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `func` | `T` | Function to throttle. |
| `limitMs` | `number` | Minimum interval between invocations in milliseconds. |

#### Returns

A throttled function with the same signature.

(...`args`) => `void`

#### Example

```ts
const throttledScroll = useThrottle(onScroll, 100);
window.addEventListener("scroll", throttledScroll);
```

***

### useThrottleTrailing()

```ts
useThrottleTrailing<T>(func, limitMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L336)

Throttle with trailing invocation: fires on the leading edge and also
fires once at the end of the throttle window with the latest arguments.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `unknown` | The wrapped function type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `func` | `T` | Function to throttle. |
| `limitMs` | `number` | Minimum interval between invocations in milliseconds. |

#### Returns

A throttled function with the same signature.

(...`args`) => `void`

#### Example

```ts
const throttledResize = useThrottleTrailing(onResize, 200);
window.addEventListener("resize", throttledResize);
```

***

### getInstance()

```ts
static getInstance(): TimingService;
```

Defined in: [core/services/timing.service.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L44)

Returns the shared instance (Singleton).

#### Returns

`TimingService`
