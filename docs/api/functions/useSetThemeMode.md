[katanakit-js](../index.md) / useSetThemeMode

# Function: useSetThemeMode()

```ts
function useSetThemeMode(newMode): void;
```

Defined in: [infrastructure/theme/theme.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/theme/theme.service.ts#L142)

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
