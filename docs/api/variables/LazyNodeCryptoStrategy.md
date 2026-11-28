[katanakit-js](../index.md) / LazyNodeCryptoStrategy

# Variable: LazyNodeCryptoStrategy

```ts
const LazyNodeCryptoStrategy: ICryptoStrategy;
```

Defined in: [core/services/generator.service.ts:230](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L230)

Lazy Node.js `crypto` strategy for PBKDF2 hashing — thin adapter over
[GeneratorService.hash](../classes/GeneratorService.md#hash) satisfying [ICryptoStrategy](../interfaces/ICryptoStrategy.md).

**NOTE:** this is a one-way hash, not encryption. Do not rely on the fixed
default salt for real password hashing; prefer scrypt/argon2id instead.

## See

[GeneratorService.hash](../classes/GeneratorService.md#hash)
