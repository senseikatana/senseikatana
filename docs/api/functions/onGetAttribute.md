[katanakit-js](../index.md) / onGetAttribute

# Function: onGetAttribute()

```ts
function onGetAttribute(target, attr): string | null;
```

Defined in: [infrastructure/dom/dom.service.ts:231](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L231)

Gets the value of an attribute from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `attr` | `string` | The attribute name. |

## Returns

`string` \| `null`

The attribute value, or `null` if not present or element not found.

## Example

```ts
const href = onGetAttribute("a.link", "href");
```
