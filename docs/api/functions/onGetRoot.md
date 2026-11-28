[katanakit-js](../index.md) / onGetRoot

# Function: onGetRoot()

```ts
function onGetRoot(): HTMLElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:41](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L41)

Returns the root `<html>` element, or `null` outside a browser.

## Returns

`HTMLElement` \| `null`

The `document.documentElement` element.

## Example

```ts
const root = onGetRoot();
root?.setAttribute("lang", "en");
```
