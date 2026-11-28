[katanakit-js](../index.md) / useObserverCreate

# Function: useObserverCreate()

```ts
function useObserverCreate(
   key, 
   callback, 
   options?, 
   autoUnobserve?
): void;
```

Defined in: [infrastructure/observer/observer.service.ts:70](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/observer/observer.service.ts#L70)

Creates an IntersectionObserver under the given key.
If an observer with the same key already exists, it is disconnected first.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `undefined` | A unique identifier for this observer. |
| `callback` | [`ObserverCallback`](../type-aliases/ObserverCallback.md) | `undefined` | Invoked when an observed element enters the viewport. |
| `options?` | `IntersectionObserverInit` | `...` | IntersectionObserver options (default: `{ threshold: 0.1 }`). |
| `autoUnobserve?` | `boolean` | `true` | Whether to automatically unobserve after first intersection (default: `true`). |

## Returns

`void`

## Example

```ts
useObserverCreate("hero", (entry) => {
  console.log("Hero is visible!", entry.target);
}, { threshold: 0.5 });
```
