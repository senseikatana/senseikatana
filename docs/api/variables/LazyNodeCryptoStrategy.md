[katanakit-js](../index.md) / LazyNodeCryptoStrategy

# Variable: LazyNodeCryptoStrategy

```ts
const LazyNodeCryptoStrategy: ICryptoStrategy;
```

Defined in: [core/services/generator.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/generator.service.ts#L230)

Lazy Node.js `crypto` strategy for PBKDF2 hashing — thin adapter over
[GeneratorService.useHash](../classes/GeneratorService.md#usehash) satisfying [ICryptoStrategy](../interfaces/ICryptoStrategy.md).

**NOTE:** this is a one-way hash, not encryption. Do not rely on the fixed
default salt for real password hashing; prefer scrypt/argon2id instead.

## See

[GeneratorService.useHash](../classes/GeneratorService.md#usehash)
