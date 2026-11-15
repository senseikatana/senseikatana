[katanakit-js](../index.md) / useGetRoot

# Function: useGetRoot()

```ts
function useGetRoot(): HTMLElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:41](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L41)

Returns the root `<html>` element, or `null` outside a browser.

## Returns

`HTMLElement` \| `null`

The `document.documentElement` element.

## Example

```ts
const root = useGetRoot();
root?.setAttribute("lang", "en");
```
