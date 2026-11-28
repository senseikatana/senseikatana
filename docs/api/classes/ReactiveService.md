[katanakit-js](../index.md) / ReactiveService

# Class: ReactiveService

Defined in: [core/services/reactive.service.ts:45](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L45)

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
import { createSignal } from "katanakit-js";

const [count, setCount] = createSignal(0);
count(); // 0
setCount(1);
count(); // 1
```

## Implements

- [`IReactiveService`](../interfaces/IReactiveService.md)

## Methods

### createBatch()

```ts
createBatch(): (callback) => void;
```

Defined in: [core/services/reactive.service.ts:364](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L364)

Returns a batch function that defers signal notifications until the
callback completes. Nested calls are supported -- only the outermost
batch flushes the queue.

#### Returns

A `batch(callback)` function.

(`callback`) => `void`

#### Example

```ts
const batch = createBatch();
const [a, setA] = createSignal(0);
const [b, setB] = createSignal(0);

batch(() => {
  setA(1);
  setB(2);
  // listeners fire only once here, not twice
});
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createBatch`](../interfaces/IReactiveService.md#createbatch)

***

### createDebouncedSignal()

```ts
createDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  onCancel: () => void;
}];
```

Defined in: [core/services/reactive.service.ts:316](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L316)

Creates a signal whose setter debounces writes by `delayMs` milliseconds.
Useful for search inputs or any value that triggers expensive work.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The signal value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `initialValue` | `T` | `undefined` | The initial value. |
| `delayMs?` | `number` | `300` | Debounce delay in milliseconds (defaults to `300`). |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\> & \{
  `onCancel`: () => `void`;
\}\]

A tuple of `[getter, debouncedSetter]`. The setter exposes a
  `onCancel()` method to abort a pending write.

#### Example

```ts
const [query, setQuery] = createDebouncedSignal("", 250);
setQuery("hello"); // won't update until 250ms of quiet
setQuery.onCancel(); // abort pending write
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createDebouncedSignal`](../interfaces/IReactiveService.md#createdebouncedsignal)

***

### createEffect()

```ts
createEffect(callback, signals?): () => void;
```

Defined in: [core/services/reactive.service.ts:214](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L214)

Creates a side effect that re-runs whenever a signal read by the callback
changes. Explicit dependencies can also be provided for compatibility.
An optional cleanup function returned from the callback is invoked before
each re-run and on disposal.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `callback` | () => `void` \| (() => `void`) | `undefined` | Effect body. May return a cleanup function. |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` | Optional explicit dependencies, in addition to tracked reads. |

#### Returns

A dispose function that tears down all subscriptions and runs
  the final cleanup.

() => `void`

#### Example

```ts
const [name, setName] = createSignal("world");
const dispose = createEffect(() => {
  console.log(`Hello, ${name()}!`);
  return () => console.log("cleaning up");
});

setName("Katana"); // logs "Hello, Katana!"
dispose();         // logs "cleaning up"
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createEffect`](../interfaces/IReactiveService.md#createeffect)

***

### createMemo()

```ts
createMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [core/services/reactive.service.ts:266](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L266)

Creates a memoised signal whose value is derived from a computation.
The computation re-runs whenever a signal it reads changes. Explicit
dependencies can also be provided for compatibility.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | The computed value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `computation` | () => `T` | `undefined` | Pure function that derives the value. |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` | Optional explicit dependencies, in addition to tracked reads. |

#### Returns

[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>

A read-only getter for the memoised value.

#### Example

```ts
const [a, setA] = createSignal(2);
const [b, setB] = createSignal(3);
const sum = createMemo(() => a() + b());
sum(); // 5
setA(10);
sum(); // 13
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createMemo`](../interfaces/IReactiveService.md#creatememo)

***

### createSignal()

```ts
createSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [core/services/reactive.service.ts:105](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L105)

Creates a reactive signal with a getter and setter.

The getter is callable and also exposes a `onSubscribe` method for
listening to value changes. The setter accepts either a direct value or
an updater function.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-2"></a> `T` | The signal value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `initialValue` | `T` | The initial value of the signal. |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]

A tuple of `[getter, setter]`.

#### Example

```ts
const [count, setCount] = createSignal(0);
count(); // 0
setCount(1);
count(); // 1
setCount(prev => prev + 1);
count(); // 2

const unsub = count.onSubscribe((newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`);
});
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createSignal`](../interfaces/IReactiveService.md#createsignal)

***

### createToggle()

```ts
createToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [core/services/reactive.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L292)

Creates a boolean toggle signal.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `initialValue?` | `boolean` | `false` | Starting value (defaults to `false`). |

#### Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](../interfaces/ToggleSignalSetter.md)\]

A tuple of `[getter, { onSet, onToggle }]`.

#### Example

```ts
const [isOpen, { onSet, onToggle }] = createToggle();
isOpen();    // false
onToggle();
isOpen();    // true
onSet(false);
isOpen();    // false
```

#### Implementation of

[`IReactiveService`](../interfaces/IReactiveService.md).[`createToggle`](../interfaces/IReactiveService.md#createtoggle)

***

### getInstance()

```ts
static getInstance(): ReactiveService;
```

Defined in: [core/services/reactive.service.ts:59](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L59)

Returns the shared instance (Singleton).

#### Returns

`ReactiveService`
