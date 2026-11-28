[katanakit-js](../index.md) / IThemeService

# Interface: IThemeService

Defined in: [types/core/theme.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L16)

Contract of the theme facade.

## Methods

### onDestroyTheme()

```ts
onDestroyTheme(): void;
```

Defined in: [types/core/theme.ts:24](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L24)

#### Returns

`void`

***

### onGetResolved()

```ts
onGetResolved(): "light" | "dark";
```

Defined in: [types/core/theme.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L20)

#### Returns

`"light"` \| `"dark"`

***

### onGetThemeMode()

```ts
onGetThemeMode(): "system" | "light" | "dark";
```

Defined in: [types/core/theme.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L19)

#### Returns

`"system"` \| `"light"` \| `"dark"`

***

### onInitTheme()

```ts
onInitTheme(options?): void;
```

Defined in: [types/core/theme.ts:17](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`ThemeOptions`](ThemeOptions.md) |

#### Returns

`void`

***

### onPrefersColorScheme()

```ts
onPrefersColorScheme(): boolean;
```

Defined in: [types/core/theme.ts:21](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L21)

#### Returns

`boolean`

***

### onResetTheme()

```ts
onResetTheme(): void;
```

Defined in: [types/core/theme.ts:23](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L23)

#### Returns

`void`

***

### onSetThemeMode()

```ts
onSetThemeMode(mode): void;
```

Defined in: [types/core/theme.ts:18](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mode` | `"system"` \| `"light"` \| `"dark"` |

#### Returns

`void`

***

### onToggleTheme()

```ts
onToggleTheme(): void;
```

Defined in: [types/core/theme.ts:22](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/theme.ts#L22)

#### Returns

`void`
