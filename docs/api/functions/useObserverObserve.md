[katanakit-js](../index.md) / useObserverObserve

# Function: useObserverObserve()

```ts
function useObserverObserve(key, element): void;
```

Defined in: [infrastructure/observer/observer.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L112)

Starts observing a single element under an existing observer key.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key created via [useObserverCreate](useObserverCreate.md). |
| `element` | [`ObserverTarget`](../type-aliases/ObserverTarget.md) | A CSS selector string or an HTMLElement to observe. |

## Returns

`void`

## Example

```ts
useObserverObserve("hero", "#hero-image");
```
