[katanakit-js](../index.md) / usePrefersColorScheme

# Function: usePrefersColorScheme()

```ts
function usePrefersColorScheme(): boolean;
```

Defined in: [infrastructure/theme/theme.service.ts:190](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/theme/theme.service.ts#L190)

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
