[katanakit-js](../index.md) / usePrefersColorScheme

# Function: usePrefersColorScheme()

```ts
function usePrefersColorScheme(): boolean;
```

Defined in: [infrastructure/theme/theme.service.ts:190](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/theme/theme.service.ts#L190)

Checks whether the user's OS is set to prefer a dark color scheme.

## Returns

`boolean`

`true` if the system prefers dark mode.

## Example

```ts
if (usePrefersColorScheme()) {
  // user prefers dark
}
```
