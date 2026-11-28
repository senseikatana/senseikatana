[katanakit-js](../index.md) / onPrefersColorScheme

# Function: onPrefersColorScheme()

```ts
function onPrefersColorScheme(): boolean;
```

Defined in: [infrastructure/theme/theme.service.ts:185](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L185)

Checks whether the user's OS is set to prefer a dark color scheme.

## Returns

`boolean`

`true` if the system prefers dark mode.

## Example

```ts
if (onPrefersColorScheme()) {
  // user prefers dark
}
```
