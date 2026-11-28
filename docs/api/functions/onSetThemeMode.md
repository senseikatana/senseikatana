[katanakit-js](../index.md) / onSetThemeMode

# Function: onSetThemeMode()

```ts
function onSetThemeMode(newMode): void;
```

Defined in: [infrastructure/theme/theme.service.ts:137](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/theme/theme.service.ts#L137)

Sets the theme mode and persists it to storage.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newMode` | `"system"` \| `"light"` \| `"dark"` | The desired theme mode (`"light"`, `"dark"`, or `"system"`). |

## Returns

`void`

## Example

```ts
onSetThemeMode("dark");
```
