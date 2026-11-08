[katanakit-js](../index.md) / ICryptoStrategy

# Interface: ICryptoStrategy

Defined in: [types/core/generator.ts:2](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/generator.ts#L2)

Contract for a crypto strategy.

## Methods

### useHash()

```ts
useHash(plainText, salt?): Promise<string>;
```

Defined in: [types/core/generator.ts:3](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/generator.ts#L3)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `plainText` | `string` |
| `salt?` | `string` |

#### Returns

`Promise`\<`string`\>
