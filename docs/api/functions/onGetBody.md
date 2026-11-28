[katanakit-js](../index.md) / onGetBody

# Function: onGetBody()

```ts
function onGetBody(): HTMLBodyElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:57](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L57)

Returns the `<body>` element, or `null` outside a browser.

## Returns

`HTMLBodyElement` \| `null`

The `document.body` element cast as `HTMLBodyElement`.

## Example

```ts
const body = onGetBody();
body?.classList.add("loaded");
```
