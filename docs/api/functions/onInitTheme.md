[katanakit-js](../index.md) / onInitTheme

# Function: onInitTheme()

```ts
function onInitTheme(options?): void;
```

Defined in: [infrastructure/theme/theme.service.ts:111](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L111)

Initializes the theme system. Reads the stored preference (or falls back
to `defaultMode`), applies the theme, and registers a system color-scheme
listener for `"system"` mode.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ThemeOptions`](../interfaces/ThemeOptions.md) | Configuration for the theme system. |

## Returns

`void`

## Example

```ts
onInitTheme({
  defaultMode: "dark",
  storageKey: "app-theme",
  onChange: (mode, resolved) => console.log(mode, resolved),
});
```
