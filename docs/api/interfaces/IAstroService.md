[katanakit-js](../index.md) / IAstroService

# Interface: IAstroService

Defined in: [types/adapters/astro.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L39)

Contract of the Astro facade.

## Methods

### useExtractUniqueValues()

```ts
useExtractUniqueValues<T, V>(items, keyFrom): V[];
```

Defined in: [types/adapters/astro.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L63)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `V` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |
| `keyFrom` | (`item`) => `V` \| `V`[] |

#### Returns

`V`[]

***

### useFindEntry()

```ts
useFindEntry<T>(
   items, 
   value, 
   keyFrom?
): T | null;
```

Defined in: [types/adapters/astro.ts:53](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L53)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |
| `value` | `string` |
| `keyFrom?` | (`item`) => `string` \| `number` |

#### Returns

`T` \| `null`

***

### useGeneratePagination()

```ts
useGeneratePagination<T, TParam>(
   items, 
   pageSize?, 
   param?
): AstroPath<TParam, PaginationProps<T>>[];
```

Defined in: [types/adapters/astro.ts:54](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L54)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `TParam` *extends* `string` | `"page"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |
| `pageSize?` | `number` |
| `param?` | `TParam` |

#### Returns

[`AstroPath`](AstroPath.md)\<`TParam`, [`PaginationProps`](PaginationProps.md)\<`T`\>\>[]

***

### useGetStaticPaths()

```ts
useGetStaticPaths<TData, TParam, TProps>(
   getCollectionFn, 
   collectionName, 
   options?
): Promise<AstroServiceResult<AstroPath<TParam, TProps>[]>>;
```

Defined in: [types/adapters/astro.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L44)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | `unknown` |
| `TParam` *extends* `string` | `"slug"` |
| `TProps` | [`CollectionEntryLike`](CollectionEntryLike.md)\<`TData`\> |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `getCollectionFn` | (`collection`) => `Promise`\<[`CollectionEntryLike`](CollectionEntryLike.md)\<`TData`\>[]\> |
| `collectionName` | `string` |
| `options?` | [`PathsOptions`](PathsOptions.md)\<[`CollectionEntryLike`](CollectionEntryLike.md)\<`TData`\>, `TParam`, `TProps`\> |

#### Returns

`Promise`\<[`AstroServiceResult`](../type-aliases/AstroServiceResult.md)\<[`AstroPath`](AstroPath.md)\<`TParam`, `TProps`\>[]\>\>

***

### usePathsFrom()

```ts
usePathsFrom<T, TParam, TProps>(items, options?): AstroPath<TParam, TProps>[];
```

Defined in: [types/adapters/astro.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L40)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `TParam` *extends* `string` | `"slug"` |
| `TProps` | `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |
| `options?` | [`PathsOptions`](PathsOptions.md)\<`T`, `TParam`, `TProps`\> |

#### Returns

[`AstroPath`](AstroPath.md)\<`TParam`, `TProps`\>[]

***

### usePathsFromValues()

```ts
usePathsFromValues<TParam>(values, param?): AstroPath<TParam, string | number>[];
```

Defined in: [types/adapters/astro.ts:59](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/astro.ts#L59)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TParam` *extends* `string` | `"slug"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | (`string` \| `number`)[] |
| `param?` | `TParam` |

#### Returns

[`AstroPath`](AstroPath.md)\<`TParam`, `string` \| `number`\>[]
