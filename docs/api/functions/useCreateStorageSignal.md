[katanakit-js](../index.md) / useCreateStorageSignal

# Function: useCreateStorageSignal()

```ts
function useCreateStorageSignal<T>(
   key, 
   fallbackValue, 
   target?
): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [infrastructure/storage/storage-signal.service.ts:32](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/storage/storage-signal.service.ts#L32)

Creates a signal that persists its value to a storage backend
(localStorage, sessionStorage, etc.). Reads the initial value from
storage on creation.

This lives in the infrastructure layer, not in `core`, because it is the one
reactive helper that performs real I/O. Core stays free of runtime I/O; the
pure signal primitives (`useCreateSignal`, `useCreateEffect`,
`useCreateMemo`, …) remain in `core/services/reactive.service.ts`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The signal value type. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `undefined` | Storage key. |
| `fallbackValue` | `T` | `undefined` | Value used when the key is not in storage. |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Storage backend (defaults to `"localStorage"`). |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]

A tuple of `[getter, setter]`. The setter writes through to
  storage.

## Example

```ts
import { useCreateStorageSignal } from "katanakit-js";

const [theme, setTheme] = useCreateStorageSignal("theme", "dark");
theme(); // "dark" (or whatever was stored)
setTheme("light"); // persists to localStorage
```
