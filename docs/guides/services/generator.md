---
title: Generator
description: "RFC 4122 UUIDs, incremental IDs, 6-digit tokens, PBKDF2-SHA512 hashing and URL slugs — every helper and strategy explained."
---

# Generator

`generator.service.ts` hosts the Singleton facade `GeneratorService`, whose
methods are re-exported as thin `use*` wrappers, plus two exported strategy
objects. It has **zero runtime dependencies** and no instance to create. Two
design rules apply to every export:

1. **Strategy-driven crypto** — `useUuid()` delegates to `NativeUuidStrategy`
   and the hash helpers delegate to `LazyNodeCryptoStrategy`. Both satisfy the
   public `IUuidStrategy` / `ICryptoStrategy` types, so you can use the objects
   directly, swap them in tests, or compose them into your own services.
2. **Runtime-aware by default** — UUIDs and tokens prefer Web Crypto
   (`globalThis.crypto`) and degrade to `Math.random` only where it is missing.
   Hashing lazily imports `node:crypto` at call time, so importing this module
   is safely SSR-compatible; the hash functions themselves need a Node/Bun
   runtime.

Everything is synchronous except the hash helpers. The only state is the
numeric counter behind `useNumericId()`, owned by the singleton.

## Quick example

```ts
import {
  useUuid, useSlugify, useNumericId, useToken, usePbkdf2Hash,
} from "katanakit-js";

const post = {
  id: useUuid(),                                   // "3b241101-e2bb-4d7a-8615-..."
  slug: useSlugify("KatanaKit v6: Release Notes"), // "katanakit-v6-release-notes"
  position: useNumericId(),                        // 1
  inviteCode: useToken(),                          // e.g. 482916
  secretHash: await usePbkdf2Hash("s3cret"),       // "<32-char salt>:<128-char hex>"
};
```

The four synchronous helpers run in the browser, Node and Bun alike.
`usePbkdf2Hash()` (and every hash helper) requires a Node/Bun runtime because it
loads `node:crypto` on first call.

## IDs

### useUuid()

Generates a **RFC 4122 version 4 UUID** string. This is the default choice for
database keys, request ids and anything that must be unique across processes.

| | |
| --- | --- |
| Signature | `useUuid(): string` |
| Parameters | none |
| Returns | `"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"` |
| Strategy | `NativeUuidStrategy` |

Uniqueness and security notes:

- A v4 UUID carries 122 random bits, so collisions are negligible — no
  coordination or sequence is needed across workers.
- It is generated with `globalThis.crypto.randomUUID()` when available. The
  fallback (`Math.random`-based v4) exists only for exotic runtimes and must
  never be relied on for security; it is still a valid UUID shape.
- Treat it as an **identifier**, not a bearer secret: it is not designed for
  secrecy, and leaking one exposes a valid lookup key.

```ts
import { useUuid } from "katanakit-js";

const id = useUuid();
// => "3b241101-e2bb-4d7a-8615-9f2c1c0a7d10"
```

**Real use case** — database primary keys: let the application own the id so
you can build related rows before the insert round-trip, keep ids stable across
environments, and merge data imports without auto-increment clashes.

```ts
const userId = useUuid();
const projectId = useUuid();

await db.insert(projects).values({ id: projectId, ownerId: userId, name });
```

### NativeUuidStrategy

The strategy object behind `useUuid()`, implementing `IUuidStrategy`. Import it
when you need the strategy itself rather than the convenience function —
dependency injection, deterministic test doubles, or a custom generator that
delegates to it.

| | |
| --- | --- |
| Object | `NativeUuidStrategy: IUuidStrategy` |
| Method | `useGenerate(): string` |
| Returns | RFC 4122 v4 UUID string |

```ts
import { NativeUuidStrategy } from "katanakit-js";

const id = NativeUuidStrategy.useGenerate();

// Swap in a deterministic double while testing
const fixedStrategy = { useGenerate: () => "00000000-0000-4000-8000-000000000000" };
```

**Real use case** — tests and fixtures: inject a predictable strategy so
snapshots, seeded databases and golden files stay identical between runs while
production keeps using real randomness.

### useNumericId()

Returns the next value of a **module-level auto-incrementing counter**, starting
at `1`. Each call advances the counter and returns the new value.

| | |
| --- | --- |
| Signature | `useNumericId(): number` |
| Parameters | none |
| Returns | Monotonically increasing integer (`1`, `2`, `3`, …) |

Notes:

- The counter is **per module instance**: server restarts, separate worker
  threads, bundled copies and hot-reloads each get their own sequence.
- It is not durable and not collision-free across processes — never use it as a
  database primary key or a distributed identifier.
- It is not secure and not random.
- Avoid calling it during SSR render for ids that must match on hydration;
  generate those once per element or derive them from data.

```ts
import { useNumericId } from "katanakit-js";

useNumericId(); // 1
useNumericId(); // 2
```

**Real use case** — transient local identifiers: numbering rows while seeding
or mocking a list, or labelling repeated blocks in generated output where a
simple readable sequence is enough.

```ts
const rows = ["alpha", "beta", "gamma"].map((name) => ({
  key: useNumericId(),
  label: name,
}));
```

## Tokens & hashing

### useToken()

Returns a **cryptographically strong 6-digit numeric token** between `100000`
and `999999` (inclusive), suitable for short user-facing codes.

| | |
| --- | --- |
| Signature | `useToken(): number` |
| Parameters | none |
| Returns | Integer in `[100000, 999999]` |
| Source | `crypto.getRandomValues(new Uint32Array(1))`, with a `Math.random` fallback |

Security notes:

- The space is only 900,000 values (~20 bits). Online guessing is cheap unless
  the flow is **rate-limited, expiring and single-use** — always add those
  controls.
- Store a **hash** of the code server-side, never the code in plain text, so a
  database leak does not hand over live codes.
- Where Web Crypto is unavailable the helper falls back to `Math.random`;
  prefer a runtime with `globalThis.crypto` for anything security-related.
- Duplicates are possible. Uniqueness is not guaranteed — treat the token as a
  code to validate, not as a primary key.

```ts
import { useToken } from "katanakit-js";

const code = useToken(); // e.g. 482916
```

**Real use case** — email verification: issue a code, store its PBKDF2 hash
with an expiry, and let the user confirm it once.

```ts
import { useToken, usePbkdf2Hash } from "katanakit-js";

const code = useToken();

await db.insert(verificationCodes).values({
  email,
  codeHash: await usePbkdf2Hash(String(code)),
  expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  usedAt: null,
});
```

### useHash(plainText, salt?)

Derives a **PBKDF2-SHA512** digest of `plainText` and returns
`"salt:hashHex"` in a single string. The function is one-way: there is no
decrypt counterpart.

| | |
| --- | --- |
| Signature | `useHash(plainText: string, salt?: string): Promise<string>` |
| Parameters | `plainText` — text to hash; `salt` — optional salt, stored verbatim in the result |
| Returns | `"<salt>:<128-char hex digest>"` |
| Algorithm | PBKDF2, SHA-512, 100,000 iterations, 64-byte derived key |
| Default salt | random 16 bytes rendered as 32 hex characters |

Security notes:

- **This is hashing, not encryption.** Never expect to recover `plainText`.
- When `salt` is omitted, a random salt is generated per call, so hashing the
  same input twice yields different digests. Pass the same salt explicitly only
  for deterministic derivation, and prefer a unique salt per secret.
- The returned string already includes the salt, so verification does not need
  a second column: split on `:`, re-derive with the stored salt, and compare.
- PBKDF2-SHA512 is a solid general-purpose KDF. For password storage the source
  recommends `scrypt`/`argon2id` instead; if you stay on PBKDF2, keep the
  iteration count high and consistent with your threat model.
- The helper lazy-loads `node:crypto`; it runs in Node/Bun, not in browsers.

```ts
import { useHash } from "katanakit-js";

const digest = await useHash("secret");
// => "<32-char salt>:<128 hex chars>"

const deterministic = await useHash("secret", "my-fixed-salt");
// => "my-fixed-salt:<128 hex chars>"
```

**Real use case** — password storage and verification without a second salt
column:

```ts
import { useHash } from "katanakit-js";

const stored = await useHash("correct horse battery staple");

async function verify(input: string, persisted: string): Promise<boolean> {
  const [salt, digest] = persisted.split(":");
  const [, candidate] = (await useHash(input, salt)).split(":");
  // Compare with a constant-time function in production
  return candidate === digest;
}
```

### usePbkdf2Hash(plainText, salt?)

An **alias of `useHash()`** with the same implementation and defaults. Prefer
this name in authentication code: it makes the algorithm explicit at the call
site and leaves room for a dedicated password-hashing helper later.

| | |
| --- | --- |
| Signature | `usePbkdf2Hash(plainText: string, salt?: string): Promise<string>` |
| Parameters | same as `useHash()` |
| Returns | `"<salt>:<128-char hex digest>"` |
| Algorithm | PBKDF2, SHA-512, 100,000 iterations, 64-byte derived key |

```ts
import { usePbkdf2Hash } from "katanakit-js";

const digest = await usePbkdf2Hash("secret");
// => "<32-char salt>:<128-char hex>"
```

**Real use case** — API key storage: issue a random key to the user, store only
`await usePbkdf2Hash(key)` in the database, and verify incoming requests by
re-hashing with the stored salt. A leaked table then contains no usable keys.

### LazyNodeCryptoStrategy

The strategy object behind every hash helper, implementing `ICryptoStrategy`.
It uses a **dynamic `import("node:crypto")`** inside each call, which is why it
works in both CJS and pure ESM builds without a top-level `require`, and why
the rest of the module stays importable in the browser.

| | |
| --- | --- |
| Object | `LazyNodeCryptoStrategy: ICryptoStrategy` |
| Methods | `useHash(plainText, salt?)`, deprecated `useEncrypt(plainText, salt?)` |
| Returns | `"<salt>:<128-char hex digest>"` |

```ts
import { LazyNodeCryptoStrategy } from "katanakit-js";

const digest = await LazyNodeCryptoStrategy.useHash("secret");
```

**Real use case** — composition and testing: accept an `ICryptoStrategy` in
your own service, default to `LazyNodeCryptoStrategy` in production, and inject
a synchronous fake in unit tests so no `node:crypto` call is required.

### useEncrypt(plainText, salt?) — deprecated

Legacy alias for `useHash()` kept for backwards compatibility. It performs the
exact same PBKDF2 hashing; the name is misleading and the function exists only
so older imports keep working.

```ts
import { useEncrypt } from "katanakit-js";

// Don't add new calls — migrate to useHash() or usePbkdf2Hash()
const digest = await useEncrypt("secret");
```

## Slugs

### useSlugify(text)

Converts text into a **URL-friendly slug**: lowercase, accent-free and
hyphen-separated.

| | |
| --- | --- |
| Signature | `useSlugify(text: string): string` |
| Parameters | `text` — required; empty or falsy input throws |
| Returns | Lowercase hyphen-separated slug (may be an empty string) |
| Throws | `Error("Text is required for slugify")` when `text` is empty or falsy |

The transformation pipeline, in order:

1. `trim()` and `toLowerCase()`.
2. Unicode NFD normalization, then removal of combining marks (`\p{M}`), so
   `"Café"` becomes `"cafe"`.
3. Whitespace runs become a single hyphen.
4. Characters outside `[A-Za-z0-9_-]` are removed — punctuation, emoji and,
   importantly, non-Latin scripts (Cyrillic, CJK, …), which means a non-Latin
   title can slugify to `""` even though the input was non-empty.
5. Duplicate hyphens are collapsed, and leading/trailing hyphens are trimmed.

Notes:

- Underscores are preserved because `\w` includes `_`; strip them yourself if
  your route pattern does not accept them.
- Slugs are **not unique**: `"Hello World"` and `"hello world!"` collide. Enforce
  uniqueness in the database and add a suffix when needed.
- No transliteration is performed. For scripts that do not survive step 4,
  transliterate first (for example with `Intl` transliteration or a dedicated
  library) and slugify the result.

```ts
import { useSlugify } from "katanakit-js";

useSlugify("Hello World!");               // "hello-world"
useSlugify("  Café au Lait  ");           // "cafe-au-lait"
useSlugify("KatanaKit v6: Release Notes"); // "katanakit-v6-release-notes"
useSlugify("Привет мир");                  // "" — validate before saving

// useSlugify(""); // throws Error("Text is required for slugify")
```

**Real use case** — content URLs with collision handling: derive the base slug
at write time, then append a short unique suffix when another row already uses
it.

```ts
import { useSlugify, useUuid } from "katanakit-js";

async function uniqueSlug(title: string): Promise<string> {
  const base = useSlugify(title);
  if (!base) throw new Error("Title cannot produce a slug");

  const taken = await db.findBySlug(base);
  return taken ? `${base}-${useUuid().slice(0, 8)}` : base;
}
```

## Related

- [Storage](/guides/services/storage) — persist generated ids, tokens and
  hashes behind an SSR-safe API.
- [Error Helpers](/guides/services/error-helpers) — wrap the async hash helpers
  in `useAttempt()` at application boundaries.
- [Formatter](/guides/services/formatter) — the other string-focused service,
  which links back to `useSlugify()`.
- [API Reference](/api/) — every export on this page, generated from source.
