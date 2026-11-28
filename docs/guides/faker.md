---
title: Faker (seed data)
description: Reproducible fake data for tests, fixtures and database seeds with an optional @faker-js/faker peer.
---

# Faker (seed data)

`@faker-js/faker` is an **optional peer dependency**: these helpers load it
through dynamic `import()` on first call, so install it only if you use them:

```bash
bun add @faker-js/faker
# or
npm install @faker-js/faker
```

## Helpers

| Group             | Helpers                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| People / internet | `onFakeFullName`, `onFakeFirstName`, `onFakeLastName`, `onFakeEmail`, `onFakePhone`, `onFakeCompanyName`, `onFakeUrl`    |
| Values            | `onFakeUuid`, `onFakeText`, `onFakeNumber`, `onFakeBoolean`, `onFakeDate`, `onFakeVehicle`                                |
| Collections       | `onFakeList(factory, count)` — the factory receives the zero-based index                                                       |
| Reproducibility   | `onFakeSeed(seed?)`, `onFakeSetDefaultRefDate(refDate?)`                                                                      |

## Reproducible seeds

`onFakeSeed(42)` sets the seed **and returns it**. Call it with no arguments to
roll a fresh random seed (also returned) — log it in CI and pass it back later
to replay the exact run. `onFakeSetDefaultRefDate("2026-01-01")` pins the
reference date used by date helpers. Same seed + same reference date + same
call order + same faker major = identical output.

```ts
import { onFakeSeed, onFakeSetDefaultRefDate, onFakeUuid } from "katanakit-js";

const seed = await onFakeSeed(); // e.g. 1696121567592875 — log it in CI
await onFakeSetDefaultRefDate("2026-01-01");

await onFakeSeed(seed); // replay the exact same sequence
const id = await onFakeUuid();
```

::: warning Determinism is not security

A seeded UUID is predictable. For real identifiers use `GeneratorService.getInstance().uuid()`
(`crypto.randomUUID`), never `onFakeUuid()` with a fixed seed.

:::

## Seed data (users, products, orders)

Compose the helpers with `onFakeList` to build realistic fixtures, then write
them anywhere with the [filesystem helpers](filesystem.md):

```ts
import {
  onEnsureDir,
  onFakeDate,
  onFakeEmail,
  onFakeFullName,
  onFakeList,
  onFakeNumber,
  onFakeSeed,
  onFakeSetDefaultRefDate,
  onFakeText,
  onFakeUuid,
  onWriteJsonFile,
} from "katanakit-js";

await onFakeSeed(42);
await onFakeSetDefaultRefDate("2026-01-01");

const users = await onFakeList(
  async () => ({
    id: await onFakeUuid(),
    fullName: await onFakeFullName(),
    email: await onFakeEmail(),
    createdAt: (await onFakeDate("2024-01-01")).toISOString(),
  }),
  5,
);

const products = await onFakeList(
  async () => ({
    id: await onFakeUuid(),
    name: await onFakeText(3),
    price: await onFakeNumber(5, 250),
    stock: await onFakeNumber(0, 120),
  }),
  8,
);

// Relations: the factory receives the index
const orders = await onFakeList(
  async (index) => ({
    id: await onFakeUuid(),
    userId: users[index % users.length].id,
    productId: products[index % products.length].id,
    quantity: await onFakeNumber(1, 6),
    placedAt: (await onFakeDate("2025-01-01")).toISOString(),
  }),
  12,
);

await onEnsureDir("data/seed");
await onWriteJsonFile("data/seed/users.json", users);
// feed the arrays to your seeder: prisma.user.createMany({ data: users }), ...
```

A runnable version (users, products and orders with relations, written as JSON)
lives in [`examples/seed/`](https://github.com/senseikatana/katanakit-js/tree/dev/examples/seed).

## Gotchas

- **Order matters.** The seed drives a stream: inserting a new call changes every
  value generated afterwards.
- **Version matters.** Datasets change between faker majors, so the same seed can
  yield different values after an upgrade. Seed for structural stability, not for
  eternal snapshots.
- **One shared instance.** `onFakeSeed` affects every `onFake*` call in the
  process. In tests, seed in `beforeEach`; in parallel workers, isolate with your
  own `Faker` instance if needed.
