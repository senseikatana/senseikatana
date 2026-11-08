[katanakit-js](../index.md) / useHash

# Function: useHash()

```ts
function useHash(plainText, salt?): Promise<string>;
```

Defined in: [core/services/generator.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L271)

Derives a PBKDF2-SHA512 hash of `plainText`. See [GeneratorService.useHash](../classes/GeneratorService.md#usehash).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `plainText` | `string` |
| `salt?` | `string` |

## Returns

`Promise`\<`string`\>
