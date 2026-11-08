[katanakit-js](../index.md) / ReactiveService

# Class: ReactiveService

Defined in: [core/services/reactive.service.ts:45](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L45)

ReactiveService — Singleton facade over fine-grained reactivity: signals,
effects, memos and batching.

Applies the **Singleton** pattern (one shared instance via
[ReactiveService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the subscription bookkeeping behind one call. The batching
state (`isBatching` and the deferred-notification queue) and the active
signal-read tracker used for dependency capture are private instance state —
never module-level mutable globals — so reactivity is safe to share across
environments (Node, Bun, browser, SSR).

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useCreateSignal } from "katanakit-js";

const [count, setCount] = useCreateSignal(0);
count(); // 0
setCount(1);
count(); // 1
```

## Implements

- [`IReactiveService`](../interfaces/IReactiveService.md)

## Methods

### useCreateBatch()

```ts
useCreateBatch(): (callback) => void;
```

Defined in: [core/services/reactive.service.ts:364](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L364)

Returns a batch function that defers signal notifications until the
callback completes. Nested calls are supported -- only the outermost
batch flushes the queue.

#### Returns

A `batch(callback)` function.

(`callback`) => `void`

#### Example

```ts
const batch = useCreateBatch();
const [a, setA] = useCreateSignal(0);
const [b, setB] = useCreateSignal(0);

batch(() => {
  setA(1);
  setB(2);
  // listeners fire only once here, not twice
});
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateBatch`](../interfaces/IReactiveService.md#usecreatebatch)

***

### useCreateDebouncedSignal()

```ts
useCreateDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  useCancel: () => void;
}];
```

Defined in: [core/services/reactive.service.ts:316](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L316)

Creates a signal whose setter debounces writes by `delayMs` milliseconds.
Useful for search inputs or any value that triggers expensive work.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The signal value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `initialValue` | `T` | `undefined` | The initial value. |
| `delayMs` | `number` | `300` | Debounce delay in milliseconds (defaults to `300`). |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\> & \{
  `useCancel`: () => `void`;
\}\]

A tuple of `[getter, debouncedSetter]`. The setter exposes a
  `useCancel()` method to abort a pending write.

#### Example

```ts
const [query, setQuery] = useCreateDebouncedSignal("", 250);
setQuery("hello"); // won't update until 250ms of quiet
setQuery.useCancel(); // abort pending write
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateDebouncedSignal`](../interfaces/IReactiveService.md#usecreatedebouncedsignal)

***

### useCreateEffect()

```ts
useCreateEffect(callback, signals?): () => void;
```

Defined in: [core/services/reactive.service.ts:214](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L214)

Creates a side effect that re-runs whenever a signal read by the callback
changes. Explicit dependencies can also be provided for compatibility.
An optional cleanup function returned from the callback is invoked before
each re-run and on disposal.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `callback` | () => `void` \| (() => `void`) | `undefined` | Effect body. May return a cleanup function. |
| `signals` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` | Optional explicit dependencies, in addition to tracked reads. |

#### Returns

A dispose function that tears down all subscriptions and runs
  the final cleanup.

() => `void`

#### Example

```ts
const [name, setName] = useCreateSignal("world");
const dispose = useCreateEffect(() => {
  console.log(`Hello, ${name()}!`);
  return () => console.log("cleaning up");
});

setName("Katana"); // logs "Hello, Katana!"
dispose();         // logs "cleaning up"
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateEffect`](../interfaces/IReactiveService.md#usecreateeffect)

***

### useCreateMemo()

```ts
useCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:266](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L266)

Creates a memoised signal whose value is derived from a computation.
The computation re-runs whenever a signal it reads changes. Explicit
dependencies can also be provided for compatibility.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The computed value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `computation` | () => `T` | `undefined` | Pure function that derives the value. |
| `signals` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` | Optional explicit dependencies, in addition to tracked reads. |

#### Returns

[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>

A read-only getter for the memoised value.

#### Example

```ts
const [a, setA] = useCreateSignal(2);
const [b, setB] = useCreateSignal(3);
const sum = useCreateMemo(() => a() + b());
sum(); // 5
setA(10);
sum(); // 13
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateMemo`](../interfaces/IReactiveService.md#usecreatememo)

***

### useCreateSignal()

```ts
useCreateSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [core/services/reactive.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L105)

Creates a reactive signal with a getter and setter.

The getter is callable and also exposes a `useSubscribe` method for
listening to value changes. The setter accepts either a direct value or
an updater function.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The signal value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `initialValue` | `T` | The initial value of the signal. |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]

A tuple of `[getter, setter]`.

#### Example

```ts
const [count, setCount] = useCreateSignal(0);
count(); // 0
setCount(1);
count(); // 1
setCount(prev => prev + 1);
count(); // 2

const unsub = count.useSubscribe((newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`);
});
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateSignal`](../interfaces/IReactiveService.md#usecreatesignal)

***

### useCreateToggle()

```ts
useCreateToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [core/services/reactive.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L292)

Creates a boolean toggle signal.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `initialValue` | `boolean` | `false` | Starting value (defaults to `false`). |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](../interfaces/ToggleSignalSetter.md)\]

A tuple of `[getter, { useSet, useToggle }]`.

#### Example

```ts
const [isOpen, { useSet, useToggle }] = useCreateToggle();
isOpen();    // false
useToggle();
isOpen();    // true
useSet(false);
isOpen();    // false
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`useCreateToggle`](../interfaces/IReactiveService.md#usecreatetoggle)

***

### getInstance()

```ts
static getInstance(): ReactiveService;
```

Defined in: [core/services/reactive.service.ts:59](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/reactive.service.ts#L59)

Returns the shared instance (Singleton).

#### Returns

`ReactiveService`
