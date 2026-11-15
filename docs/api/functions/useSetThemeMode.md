[katanakit-js](../index.md) / useSetThemeMode

# Function: useSetThemeMode()

```ts
function useSetThemeMode(newMode): void;
```

Defined in: [infrastructure/theme/theme.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/theme/theme.service.ts#L142)

Sets the theme mode and persists it to storage.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newMode` | `"system"` \| `"light"` \| `"dark"` | The desired theme mode (`"light"`, `"dark"`, or `"system"`). |

## Returns

`void`

## Example

```ts
useSetThemeMode("dark");
```
