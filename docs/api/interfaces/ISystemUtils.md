[katanakit-js](../index.md) / ISystemUtils

# Interface: ISystemUtils

Defined in: [types/core/utils.ts:14](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L14)

Contract of the system utilities.

## Methods

### onAverage()

```ts
onAverage(numbers): number;
```

Defined in: [types/core/utils.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `numbers` | `number`[] |

#### Returns

`number`

***

### onCopyToClipboard()

```ts
onCopyToClipboard(text): Promise<boolean>;
```

Defined in: [types/core/utils.ts:17](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### onGetUrlParams()

```ts
onGetUrlParams(urlString): Record<string, string>;
```

Defined in: [types/core/utils.ts:18](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `urlString` | `string` |

#### Returns

`Record`\<`string`, `string`\>

***

### onRetry()

```ts
onRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [types/core/utils.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L16)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `Promise`\<`T`\> |
| `retries?` | `number` |
| `delayMs?` | `number` |

#### Returns

`Promise`\<`T`\>

***

### onRound()

```ts
onRound(value, decimals?): number;
```

Defined in: [types/core/utils.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `number` |
| `decimals?` | `number` |

#### Returns

`number`

***

### onSleep()

```ts
onSleep(ms): Promise<void>;
```

Defined in: [types/core/utils.ts:15](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/utils.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ms` | `number` |

#### Returns

`Promise`\<`void`\>
