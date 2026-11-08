[katanakit-js](../index.md) / IDataUtils

# Interface: IDataUtils

Defined in: [types/core/utils.ts:2](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L2)

Contract of the data utilities.

## Methods

### useChunk()

```ts
useChunk<T>(array, size): T[][];
```

Defined in: [types/core/utils.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L4)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `size` | `number` |

#### Returns

`T`[][]

***

### useDeepClone()

```ts
useDeepClone<T>(value): T;
```

Defined in: [types/core/utils.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L7)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`T`

***

### useDeepMerge()

```ts
useDeepMerge<T>(target, source): T;
```

Defined in: [types/core/utils.ts:8](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L8)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Record`\<`string`, `unknown`\> |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `T` |
| `source` | `Record`\<`string`, `unknown`\> |

#### Returns

`T`

***

### useGroupBy()

```ts
useGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [types/core/utils.ts:5](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L5)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `key` | keyof `T` \| ((`item`) => `string`) |

#### Returns

`Record`\<`string`, `T`[]\>

***

### useIsObject()

```ts
useIsObject(item): item is Record<string, unknown>;
```

Defined in: [types/core/utils.ts:6](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L6)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `unknown` |

#### Returns

`item is Record<string, unknown>`

***

### useOmit()

```ts
useOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [types/core/utils.ts:10](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L10)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |
| `K` *extends* `string` \| `number` \| `symbol` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

#### Returns

`Omit`\<`T`, `K`\>

***

### usePick()

```ts
usePick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [types/core/utils.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L9)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |
| `K` *extends* `string` \| `number` \| `symbol` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |
| `keys` | `K`[] |

#### Returns

`Pick`\<`T`, `K`\>

***

### useUnique()

```ts
useUnique<T>(array): T[];
```

Defined in: [types/core/utils.ts:3](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L3)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |

#### Returns

`T`[]
