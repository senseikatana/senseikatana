[katanakit-js](../index.md) / useIsBrowser

# Function: useIsBrowser()

```ts
function useIsBrowser(): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L27)

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
