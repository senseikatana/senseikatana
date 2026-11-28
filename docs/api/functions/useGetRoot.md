[katanakit-js](../index.md) / useGetRoot

# Function: useGetRoot()

```ts
function useGetRoot(): HTMLElement | null;
```

Defined in: [infrastructure/dom/dom.service.ts:41](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L41)

Returns the root `<html>` element, or `null` outside a browser.

## Returns

`HTMLElement` \| `null`

The `document.documentElement` element.

## Example

```ts
const root = useGetRoot();
root?.setAttribute("lang", "en");
```
