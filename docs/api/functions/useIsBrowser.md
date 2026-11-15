[katanakit-js](../index.md) / useIsBrowser

# Function: useIsBrowser()

```ts
function useIsBrowser(): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L27)

Checks whether the code is running in a browser environment.

## Returns

`boolean`

`true` if both `window` and `document` are defined.

## Example

```ts
if (useIsBrowser()) {
  // safe to access DOM APIs
}
```
