[katanakit-js](../index.md) / onGetDataAttribute

# Function: onGetDataAttribute()

```ts
function onGetDataAttribute(target, key): string | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L317)

Gets a `data-*` attribute value from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | A CSS selector string or an HTMLElement instance. |
| `key` | `string` | The data key (without the `data-` prefix). |

## Returns

`string` \| `undefined`

The data attribute value, or `undefined`.

## Example

```ts
const id = onGetDataAttribute("tr.row", "userId");
```
