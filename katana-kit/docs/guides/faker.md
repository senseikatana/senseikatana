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
| People / internet | `useFakeFullName`, `useFakeFirstName`, `useFakeLastName`, `useFakeEmail`, `useFakePhone`, `useFakeCompanyName`, `useFakeUrl`    |
| Values            | `useFakeUuid`, `useFakeText`, `useFakeNumber`, `useFakeBoolean`, `useFakeDate`, `useFakeVehicle`                                |
| Collections       | `useFakeList(factory, count)` — the factory receives the zero-based index                                                       |
| Reproducibility   | `useFakeSeed(seed?)`, `useFakeSetDefaultRefDate(refDate?)`                                                                      |

## Reproducible seeds

`useFakeSeed(42)` sets the seed **and returns it**. Call it with no arguments to
roll a fresh random seed (also returned) — log it in CI and pass it back later
to replay the exact run. `useFakeSetDefaultRefDate("2026-01-01")` pins the
reference date used by date helpers. Same seed + same reference date + same
call order + same faker major = identical output.

```ts
import { useFakeSeed, useFakeSetDefaultRefDate, useFakeUuid } from "katanakit-js";

const seed = await useFakeSeed(); // e.g. 1696121567592875 — log it in CI
await useFakeSetDefaultRefDate("2026-01-01");

await useFakeSeed(seed); // replay the exact same sequence
const id = await useFakeUuid();
```

::: warning Determinism is not security

A seeded UUID is predictable. For real identifiers use `useUuid()`
(`crypto.randomUUID`), never `useFakeUuid()` with a fixed seed.

:::

## Seed data (users, products, orders)

Compose the helpers with `useFakeList` to build realistic fixtures, then write
them anywhere with the [filesystem helpers](filesystem.md):

```ts
import {
  useEnsureDir,
  useFakeDate,
  useFakeEmail,
  useFakeFullName,
  useFakeList,
  useFakeNumber,
  useFakeSeed,
  useFakeSetDefaultRefDate,
  useFakeText,
  useFakeUuid,
  useWriteJsonFile,
} from "katanakit-js";

await useFakeSeed(42);
await useFakeSetDefaultRefDate("2026-01-01");

const users = await useFakeList(
  async () => ({
    id: await useFakeUuid(),
    fullName: await useFakeFullName(),
    email: await useFakeEmail(),
    createdAt: (await useFakeDate("2024-01-01")).toISOString(),
  }),
  5,
);

const products = await useFakeList(
  async () => ({
    id: await useFakeUuid(),
    name: await useFakeText(3),
    price: await useFakeNumber(5, 250),
    stock: await useFakeNumber(0, 120),
  }),
  8,
);

// Relations: the factory receives the index
const orders = await useFakeList(
  async (index) => ({
    id: await useFakeUuid(),
    userId: users[index % users.length].id,
    productId: products[index % products.length].id,
    quantity: await useFakeNumber(1, 6),
    placedAt: (await useFakeDate("2025-01-01")).toISOString(),
  }),
  12,
);

await useEnsureDir("data/seed");
await useWriteJsonFile("data/seed/users.json", users);
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
- **One shared instance.** `useFakeSeed` affects every `useFake*` call in the
  process. In tests, seed in `beforeEach`; in parallel workers, isolate with your
  own `Faker` instance if needed.
