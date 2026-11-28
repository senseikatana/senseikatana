[katanakit-js](../index.md) / onDestroyTheme

# Function: onDestroyTheme()

```ts
function onDestroyTheme(): void;
```

Defined in: [infrastructure/theme/theme.service.ts:227](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L227)

Cleans up the media-query listener. Call this when the theme system is
no longer needed (e.g. during teardown in tests).

## Returns

`void`

## Example

```ts
onDestroyTheme();
```
