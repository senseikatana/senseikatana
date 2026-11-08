[katanakit-js](../index.md) / ISystemUtils

# Interface: ISystemUtils

Defined in: [types/core/utils.ts:14](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L14)

Contract of the system utilities.

## Methods

### useAverage()

```ts
useAverage(numbers): number;
```

Defined in: [types/core/utils.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `numbers` | `number`[] |

#### Returns

`number`

***

### useCopyToClipboard()

```ts
useCopyToClipboard(text): Promise<boolean>;
```

Defined in: [types/core/utils.ts:17](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### useGetUrlParams()

```ts
useGetUrlParams(urlString): Record<string, string>;
```

Defined in: [types/core/utils.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `urlString` | `string` |

#### Returns

`Record`\<`string`, `string`\>

***

### useRetry()

```ts
useRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [types/core/utils.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L16)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `Promise`\<`T`\> |
| `retries?` | `number` |
| `delayMs?` | `number` |

#### Returns

`Promise`\<`T`\>

***

### useRound()

```ts
useRound(value, decimals?): number;
```

Defined in: [types/core/utils.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `number` |
| `decimals?` | `number` |

#### Returns

`number`

***

### useSleep()

```ts
useSleep(ms): Promise<void>;
```

Defined in: [types/core/utils.ts:15](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/utils.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ms` | `number` |

#### Returns

`Promise`\<`void`\>
