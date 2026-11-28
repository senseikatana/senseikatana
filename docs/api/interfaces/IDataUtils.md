[katanakit-js](../index.md) / IDataUtils

# Interface: IDataUtils

Defined in: [types/core/utils.ts:2](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L2)

Contract of the data utilities.

## Methods

### onChunk()

```ts
onChunk<T>(array, size): T[][];
```

Defined in: [types/core/utils.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L4)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `size` | `number` |

#### Returns

`T`[][]

***

### onDeepClone()

```ts
onDeepClone<T>(value): T;
```

Defined in: [types/core/utils.ts:7](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L7)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`T`

***

### onDeepMerge()

```ts
onDeepMerge<T>(target, source): T;
```

Defined in: [types/core/utils.ts:8](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L8)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-2"></a> `T` *extends* `Record`\<`string`, `unknown`\> |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `T` |
| `source` | `Record`\<`string`, `unknown`\> |

#### Returns

`T`

***

### onGroupBy()

```ts
onGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [types/core/utils.ts:5](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L5)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-3"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `key` | keyof `T` \| ((`item`) => `string`) |

#### Returns

`Record`\<`string`, `T`[]\>

***

### onIsObject()

```ts
onIsObject(item): item is Record<string, unknown>;
```

Defined in: [types/core/utils.ts:6](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L6)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `unknown` |

#### Returns

`item is Record<string, unknown>`

***

### onOmit()

```ts
onOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [types/core/utils.ts:10](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L10)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-4"></a> `T` *extends* `object` |
| <a id="type-parameter-k"></a> `K` *extends* `string` \| `number` \| `symbol` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

#### Returns

`Omit`\<`T`, `K`\>

***

### onPick()

```ts
onPick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [types/core/utils.ts:9](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L9)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-5"></a> `T` *extends* `object` |
| <a id="type-parameter-k-1"></a> `K` *extends* `string` \| `number` \| `symbol` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

#### Returns

`Pick`\<`T`, `K`\>

***

### onUnique()

```ts
onUnique<T>(array): T[];
```

Defined in: [types/core/utils.ts:3](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L3)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-6"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |

#### Returns

`T`[]
