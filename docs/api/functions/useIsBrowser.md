[katanakit-js](../index.md) / useIsBrowser

# Function: useIsBrowser()

```ts
function useIsBrowser(): boolean;
```

Defined in: [infrastructure/dom/dom.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L27)

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
