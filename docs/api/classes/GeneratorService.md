[katanakit-js](../index.md) / GeneratorService

# Class: GeneratorService

Defined in: [core/services/generator.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L27)

GeneratorService — Singleton facade for numeric ids, UUIDs, slugs, tokens
and PBKDF2 hashing.

Applies the **Singleton** pattern (one shared instance via
[GeneratorService.getInstance](#getinstance)), the **Facade** pattern (one call per
generation concern, hiding `node:crypto` and `globalThis.crypto` details)
and the **Strategy** pattern: the exported [LazyNodeCryptoStrategy](../variables/LazyNodeCryptoStrategy.md)
and [NativeUuidStrategy](../variables/NativeUuidStrategy.md) are thin adapters that satisfy
[ICryptoStrategy](../interfaces/ICryptoStrategy.md) / [IUuidStrategy](../interfaces/IUuidStrategy.md) while the implementation
stays in this class.

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.
The auto-incrementing id counter is instance state, never a static.

## Example

```ts
import { uuid } from "katanakit-js";

const id = uuid();
// => "3b241101-e2bb-4d7a-8615-..."
```

## Methods

### hash()

```ts
hash(plainText, salt?): Promise<string>;
```

Defined in: [core/services/generator.service.ts:181](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L181)

Derives a PBKDF2-SHA512 hash of `plainText`.
Returns `"salt:hashHex"`. Prefer a unique salt per secret.

Implemented with a dynamic `import("node:crypto")` so it works in both
CJS and pure ESM environments without a top-level `require`.

**NOTE:** this is a one-way hash, not encryption. Do not rely on the fixed
default salt for real password hashing; prefer scrypt/argon2id instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `plainText` | `string` | The text to hash. |
| `salt?` | `string` | Optional hex salt. When omitted a random 16-byte salt is generated. |

#### Returns

`Promise`\<`string`\>

`"salt:hashHex"` — the salt and the 128-char hex digest joined by a colon.

#### Examples

```ts
import { hash } from "katanakit-js";

const digest = await hash("secret", "optional-salt");
// => "optional-salt:<128 hex chars>"
```

```ts
import { LazyNodeCryptoStrategy } from "katanakit-js";

const digest = await LazyNodeCryptoStrategy.hash("secret");
// => "<32-char salt>:<128-char hex>"
```

***

### numericId()

```ts
numericId(): number;
```

Defined in: [core/services/generator.service.ts:57](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L57)

Returns the next auto-incrementing numeric id.

#### Returns

`number`

A monotonically increasing integer starting from `1`.

#### Example

```ts
import { numericId } from "katanakit-js";

numericId(); // 1
numericId(); // 2
```

***

### pbkdf2Hash()

```ts
pbkdf2Hash(plainText, salt?): Promise<string>;
```

Defined in: [core/services/generator.service.ts:216](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L216)

Alias for [GeneratorService.hash](#hash).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `plainText` | `string` | The text to hash. |
| `salt?` | `string` | Optional hex salt. When omitted a random 16-byte salt is generated. |

#### Returns

`Promise`\<`string`\>

`"salt:hashHex"`.

#### Example

```ts
import { pbkdf2Hash } from "katanakit-js";

const digest = await pbkdf2Hash("secret");
// => "<32-char salt>:<128-char hex>"
```

***

### slugify()

```ts
slugify(text): string;
```

Defined in: [core/services/generator.service.ts:114](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L114)

Converts a text string into a URL-friendly slug.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to slugify. Must not be empty. |

#### Returns

`string`

A lower-case, hyphen-separated slug with diacritics removed.

#### Throws

If `text` is empty or falsy.

#### Example

```ts
import { slugify } from "katanakit-js";

slugify("Hello World!");      // "hello-world"
slugify("  Café au Lait  ");  // "cafe-au-lait"
```

***

### token()

```ts
token(): number;
```

Defined in: [core/services/generator.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L142)

Returns a cryptographically strong 6-digit numeric token (100000–999999).

#### Returns

`number`

A random 6-digit integer.

#### Example

```ts
import { token } from "katanakit-js";

const code = token(); // e.g. 482916
```

***

### uuid()

```ts
uuid(): string;
```

Defined in: [core/services/generator.service.ts:85](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L85)

Generates a RFC 4122 v4 UUID string.

Uses `globalThis.crypto.randomUUID` when available and falls back to a
`Math.random`-based v4 template otherwise.

#### Returns

`string`

A RFC 4122 v4 UUID string.

#### Examples

```ts
import { uuid } from "katanakit-js";

const id = uuid();
// => "3b241101-e2bb-4d7a-8615-..."
```

```ts
import { NativeUuidStrategy } from "katanakit-js";

const id = NativeUuidStrategy.generate();
// => "3b241101-e2bb-4d7a-8615-..."
```

***

### getInstance()

```ts
static getInstance(): GeneratorService;
```

Defined in: [core/services/generator.service.ts:37](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L37)

Returns the shared instance (Singleton).

#### Returns

`GeneratorService`
