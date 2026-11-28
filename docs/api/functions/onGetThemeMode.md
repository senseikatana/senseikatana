[katanakit-js](../index.md) / onGetThemeMode

# Function: onGetThemeMode()

```ts
function onGetThemeMode(): "system" | "light" | "dark";
```

Defined in: [infrastructure/theme/theme.service.ts:155](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L155)

Returns the current theme mode (may be `"system"`).

## Returns

`"system"` \| `"light"` \| `"dark"`

The active [ThemeMode](../type-aliases/ThemeMode.md).

## Example

```ts
const current = onGetThemeMode(); // "light" | "dark" | "system"
```
