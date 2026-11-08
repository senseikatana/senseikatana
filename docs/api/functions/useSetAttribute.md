[katanakit-js](../index.md) / useSetAttribute

# Function: useSetAttribute()

```ts
function useSetAttribute(
   target, 
   attr, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:250](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L250)

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
useSetAttribute("img.hero", "src", "/photo.jpg");
useSetAttribute("a.link", "href", "https://example.com");
```
