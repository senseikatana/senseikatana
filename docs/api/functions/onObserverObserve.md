[katanakit-js](../index.md) / onObserverObserve

# Function: onObserverObserve()

```ts
function onObserverObserve(key, element): void;
```

Defined in: [infrastructure/observer/observer.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/observer/observer.service.ts#L112)

Starts observing a single element under an existing observer key.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key created via [onObserverCreate](onObserverCreate.md). |
| `element` | [`ObserverTarget`](../type-aliases/ObserverTarget.md) | A CSS selector string or an HTMLElement to observe. |

## Returns

`void`

## Example

```ts
onObserverObserve("hero", "#hero-image");
```
