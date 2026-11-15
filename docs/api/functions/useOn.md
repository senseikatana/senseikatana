[katanakit-js](../index.md) / useOn

# Function: useOn()

```ts
function useOn<K>(
   target, 
   event, 
   callback, 
   options?
): (() => void) | null;
```

Defined in: [infrastructure/dom/dom.service.ts:362](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L362)

Attaches an event listener to the target element and returns a cleanup function.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-k"></a> `K` *extends* keyof `HTMLElementEventMap` | The event type key from `HTMLElementEventMap`. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `EventTarget` | An EventTarget instance or a CSS selector string. |
| `event` | `K` | The event name to listen for. |
| `callback` | (`event`) => `void` | The event handler. |
| `options?` | `boolean` \| `AddEventListenerOptions` | Optional `addEventListener` options. |

## Returns

(() => `void`) \| `null`

A function that removes the listener, or `null` if not in a browser.

## Example

```ts
const off = useOn("#btn", "click", (e) => console.log("clicked", e));
// later:
off?.();
```
