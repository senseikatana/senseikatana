[katanakit-js](../index.md) / IThemeService

# Interface: IThemeService

Defined in: [types/core/theme.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L16)

Contract of the theme facade.

## Methods

### useDestroyTheme()

```ts
useDestroyTheme(): void;
```

Defined in: [types/core/theme.ts:24](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L24)

#### Returns

`void`

***

### useGetResolved()

```ts
useGetResolved(): "light" | "dark";
```

Defined in: [types/core/theme.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L20)

#### Returns

`"light"` \| `"dark"`

***

### useGetThemeMode()

```ts
useGetThemeMode(): "system" | "light" | "dark";
```

Defined in: [types/core/theme.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L19)

#### Returns

`"system"` \| `"light"` \| `"dark"`

***

### useInitTheme()

```ts
useInitTheme(options?): void;
```

Defined in: [types/core/theme.ts:17](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`ThemeOptions`](ThemeOptions.md) |

#### Returns

`void`

***

### usePrefersColorScheme()

```ts
usePrefersColorScheme(): boolean;
```

Defined in: [types/core/theme.ts:21](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L21)

#### Returns

`boolean`

***

### useResetTheme()

```ts
useResetTheme(): void;
```

Defined in: [types/core/theme.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L23)

#### Returns

`void`

***

### useSetThemeMode()

```ts
useSetThemeMode(mode): void;
```

Defined in: [types/core/theme.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mode` | `"system"` \| `"light"` \| `"dark"` |

#### Returns

`void`

***

### useToggleTheme()

```ts
useToggleTheme(): void;
```

Defined in: [types/core/theme.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/theme.ts#L22)

#### Returns

`void`
