[katanakit-js](../index.md) / ICryptoStrategy

# Interface: ICryptoStrategy

Defined in: [types/core/generator.ts:2](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/generator.ts#L2)

Contract for a crypto strategy.

## Methods

### useHash()

```ts
useHash(plainText, salt?): Promise<string>;
```

Defined in: [types/core/generator.ts:3](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/generator.ts#L3)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `plainText` | `string` |
| `salt?` | `string` |

#### Returns

`Promise`\<`string`\>
