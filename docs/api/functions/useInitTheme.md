[katanakit-js](../index.md) / useInitTheme

# Function: useInitTheme()

```ts
function useInitTheme(options?): void;
```

Defined in: [infrastructure/theme/theme.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/theme/theme.service.ts#L116)

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
useInitTheme({
  defaultMode: "dark",
  storageKey: "app-theme",
  onChange: (mode, resolved) => console.log(mode, resolved),
});
```
