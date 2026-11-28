[katanakit-js](../index.md) / useGetBody

# Function: useGetBody()

```ts
function useGetBody(): HTMLBodyElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:57](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L57)

Returns the `<body>` element, or `null` outside a browser.

## Returns

`HTMLBodyElement` \| `null`

The `document.body` element cast as `HTMLBodyElement`.

## Example

```ts
const body = useGetBody();
body?.classList.add("loaded");
```
