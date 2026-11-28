[katanakit-js](../index.md) / useIsBrowser

# Function: useIsBrowser()

```ts
function useIsBrowser(): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L27)

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
