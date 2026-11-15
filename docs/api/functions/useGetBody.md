[katanakit-js](../index.md) / useGetBody

# Function: useGetBody()

```ts
function useGetBody(): HTMLBodyElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:57](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L57)

Returns the `<body>` element, or `null` outside a browser.

## Returns

`HTMLBodyElement` \| `null`

The `document.body` element cast as `HTMLBodyElement`.

## Example

```ts
const body = useGetBody();
body?.classList.add("loaded");
```
