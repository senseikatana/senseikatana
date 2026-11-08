[katanakit-js](../index.md) / GeneratorService

# Class: GeneratorService

Defined in: [core/services/generator.service.ts:27](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L27)

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
import { useUuid } from "katanakit-js";

const id = useUuid();
// => "3b241101-e2bb-4d7a-8615-..."
```

## Methods

### useHash()

```ts
useHash(plainText, salt?): Promise<string>;
```

Defined in: [core/services/generator.service.ts:181](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L181)

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
import { useHash } from "katanakit-js";

const digest = await useHash("secret", "optional-salt");
// => "optional-salt:<128 hex chars>"
```

```ts
import { LazyNodeCryptoStrategy } from "katanakit-js";

const digest = await LazyNodeCryptoStrategy.useHash("secret");
// => "<32-char salt>:<128-char hex>"
```

***

### useNumericId()

```ts
useNumericId(): number;
```

Defined in: [core/services/generator.service.ts:57](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L57)

Returns the next auto-incrementing numeric id.

#### Returns

`number`

A monotonically increasing integer starting from `1`.

#### Example

```ts
import { useNumericId } from "katanakit-js";

useNumericId(); // 1
useNumericId(); // 2
```

***

### usePbkdf2Hash()

```ts
usePbkdf2Hash(plainText, salt?): Promise<string>;
```

Defined in: [core/services/generator.service.ts:216](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L216)

Alias for [GeneratorService.useHash](#usehash).

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
import { usePbkdf2Hash } from "katanakit-js";

const digest = await usePbkdf2Hash("secret");
// => "<32-char salt>:<128-char hex>"
```

***

### useSlugify()

```ts
useSlugify(text): string;
```

Defined in: [core/services/generator.service.ts:114](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L114)

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
import { useSlugify } from "katanakit-js";

useSlugify("Hello World!");      // "hello-world"
useSlugify("  Café au Lait  ");  // "cafe-au-lait"
```

***

### useToken()

```ts
useToken(): number;
```

Defined in: [core/services/generator.service.ts:142](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L142)

Returns a cryptographically strong 6-digit numeric token (100000–999999).

#### Returns

`number`

A random 6-digit integer.

#### Example

```ts
import { useToken } from "katanakit-js";

const code = useToken(); // e.g. 482916
```

***

### useUuid()

```ts
useUuid(): string;
```

Defined in: [core/services/generator.service.ts:85](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L85)

Generates a RFC 4122 v4 UUID string.

Uses `globalThis.crypto.randomUUID` when available and falls back to a
`Math.random`-based v4 template otherwise.

#### Returns

`string`

A RFC 4122 v4 UUID string.

#### Examples

```ts
import { useUuid } from "katanakit-js";

const id = useUuid();
// => "3b241101-e2bb-4d7a-8615-..."
```

```ts
import { NativeUuidStrategy } from "katanakit-js";

const id = NativeUuidStrategy.useGenerate();
// => "3b241101-e2bb-4d7a-8615-..."
```

***

### getInstance()

```ts
static getInstance(): GeneratorService;
```

Defined in: [core/services/generator.service.ts:37](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L37)

Returns the shared instance (Singleton).

#### Returns

`GeneratorService`
