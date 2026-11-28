[katanakit-js](../index.md) / useSetThemeMode

# Function: useSetThemeMode()

```ts
function useSetThemeMode(newMode): void;
```

Defined in: [infrastructure/theme/theme.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/theme/theme.service.ts#L142)

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
