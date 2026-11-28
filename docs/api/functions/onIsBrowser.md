[katanakit-js](../index.md) / onIsBrowser

# Function: onIsBrowser()

```ts
function onIsBrowser(): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L27)

Checks whether the code is running in a browser environment.

## Returns

`boolean`

`true` if both `window` and `document` are defined.

## Example

```ts
if (onIsBrowser()) {
  // safe to access DOM APIs
}
```
