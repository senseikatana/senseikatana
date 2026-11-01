# Seed data example

Deterministic **users, products and orders** generated with the Faker service
and written to JSON with the filesystem helpers — the two Node/Bun features
working together.

| Output               | What it shows                                                                |
| -------------------- | ---------------------------------------------------------------------------- |
| `out/users.json`     | `useFakeList` + `useFakeUuid` / `useFakeFullName` / `useFakeEmail` / `useFakeDate` |
| `out/products.json`  | composing helpers into a domain shape (name, description, price, stock)      |
| `out/orders.json`    | relations between generated entities (`userId`, `productId`)                  |

Run it (it imports the built package, so build once first):

```bash
bun run build
bun run examples/seed/seed-data.ts
# optional custom output directory:
bun run examples/seed/seed-data.ts /tmp/my-seed
```

The script is type-checked by the last step of `bun run build`, deliberately **outside**
`bun run check`.

## Determinism

```ts
await useFakeSeed(42);                        // sets (and returns) the seed
await useFakeSetDefaultRefDate("2026-01-01"); // pins relative dates
```

Same seed + same reference date + same call order + same faker major =
byte-identical files. `useFakeSeed()` with no arguments rolls a fresh random
seed and returns it — log it in CI and pass it back later to replay the run.

## Adapting it

- Swap the interfaces for your schema and the JSON writer for your DB seeder
  (`prisma.user.createMany({ data: users })`, Drizzle, raw SQL…).
- `useFakeList(factory, count)` passes the zero-based index, which is handy for
  relations (`users[index % users.length]`) or unique values.
- Keep generation in scripts/tests or server-side: faker is an optional peer
  (`bun add @faker-js/faker`) and never ships in your browser bundle.
- The filesystem helpers return Safe Results (`{ data, error, ok }`) with the
  native errno code — check `written.ok` before assuming the file exists.
