[katanakit-js](../index.md) / onSetAttribute

# Function: onSetAttribute()

```ts
function onSetAttribute(
   target, 
   attr, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:250](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L250)

Sets an attribute on the target element with XSS protection.
Blocks event-handler attributes (`on*`) and `javascript:` URLs.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `attr` | `string` | The attribute name. |
| `value` | `string` | The value to set. |

## Returns

`void`

## Throws

If the attribute is an event handler or contains a `javascript:` URL.

## Example

```ts
onSetAttribute("img.hero", "src", "/photo.jpg");
onSetAttribute("a.link", "href", "https://example.com");
```
