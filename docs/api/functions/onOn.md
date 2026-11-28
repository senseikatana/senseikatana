[katanakit-js](../index.md) / onOn

# Function: onOn()

```ts
function onOn<K>(
   target, 
   event, 
   callback, 
   options?
): (() => void) | null;
```

Defined in: [infrastructure/dom/dom.service.ts:362](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L362)

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
const off = onOn("#btn", "click", (e) => console.log("clicked", e));
// later:
off?.();
```
