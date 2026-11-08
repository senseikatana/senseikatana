[katanakit-js](../index.md) / FakerService

# Class: FakerService

Defined in: [core/services/faker.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L36)

FakerService — generic fake data for tests, seeds and forms.

Applies the **Singleton** pattern (one shared instance via
[FakerService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the lazy `@faker-js/faker` load behind one call. The optional
peer dependency is imported through dynamic `import()` on first use, so it
never enters the initial bundle and consumers who don't use it don't
install it.

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the
module level `useFake*` functions below are thin wrappers kept for
call-site ergonomics.

## Example

```ts
import { useFakeSeed, useFakeUuid } from "katanakit-js";

const seed = await useFakeSeed(); // random, but loggable/replayable
await useFakeSeed(seed);          // replays the same sequence
await useFakeUuid();
```

## Methods

### useFakeBoolean()

```ts
useFakeBoolean(): Promise<boolean>;
```

Defined in: [core/services/faker.service.ts:234](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L234)

Generates a random boolean.

#### Returns

`Promise`\<`boolean`\>

`true` or `false`.

***

### useFakeCompanyName()

```ts
useFakeCompanyName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:186](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L186)

Generates a fake company name.

#### Returns

`Promise`\<`string`\>

A company name.

***

### useFakeDate()

```ts
useFakeDate(from?, to?): Promise<Date>;
```

Defined in: [core/services/faker.service.ts:252](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L252)

Generates a random date within an optional range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `from?` | `string` \| `number` \| `Date` | Lower bound (default: `1970-01-01`). |
| `to?` | `string` \| `number` \| `Date` | Upper bound (default: faker's reference date, see [useFakeSetDefaultRefDate](../functions/useFakeSetDefaultRefDate.md) — the current time when unset). |

#### Returns

`Promise`\<`Date`\>

A `Date` instance.

#### Example

```ts
const hiredAt = await useFakeDate(new Date("2020-01-01"), new Date("2025-12-31"));
```

***

### useFakeEmail()

```ts
useFakeEmail(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:136](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L136)

Generates a fake email address.

#### Returns

`Promise`\<`string`\>

An email address.

***

### useFakeFirstName()

```ts
useFakeFirstName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L156)

Generates a fake first name.

#### Returns

`Promise`\<`string`\>

A first name.

***

### useFakeFullName()

```ts
useFakeFullName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L146)

Generates a fake full name.

#### Returns

`Promise`\<`string`\>

A full name, e.g. `"Ada Lovelace"`.

***

### useFakeLastName()

```ts
useFakeLastName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:166](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L166)

Generates a fake last name.

#### Returns

`Promise`\<`string`\>

A last name.

***

### useFakeList()

```ts
useFakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:298](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L298)

Builds an array of fake items from a factory (sync or async).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Item type produced by the factory. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `factory` | (`index`) => `T` \| `Promise`\<`T`\> | Called once per item; receives the zero-based index. |
| `count` | `number` | Number of items to generate (non-negative integer). |

#### Returns

`Promise`\<`T`[]\>

A promise resolving to the generated array.

#### Example

```ts
const vehicles = await useFakeList(() => useFakeVehicle(), 5);
const relations = await useFakeList((index) => ({ user: users[index % users.length] }), 10);
```

***

### useFakeNumber()

```ts
useFakeNumber(min?, max?): Promise<number>;
```

Defined in: [core/services/faker.service.ts:224](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L224)

Generates an integer within an inclusive range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `min` | `number` | `0` | Lower bound (default: `0`). |
| `max` | `number` | `100` | Upper bound (default: `100`). |

#### Returns

`Promise`\<`number`\>

A random integer between `min` and `max`.

#### Example

```ts
const age = await useFakeNumber(18, 65);
```

***

### useFakePhone()

```ts
useFakePhone(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:176](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L176)

Generates a fake phone number.

#### Returns

`Promise`\<`string`\>

A phone number string.

***

### useFakeSeed()

```ts
useFakeSeed(seed?): Promise<number>;
```

Defined in: [core/services/faker.service.ts:88](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L88)

Seeds the faker instance for reproducible output, or rolls a new random seed.

The sequence depends on the seed, the number of calls made since it was set
and the faker major version — keep the call order stable for stable output.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed?` | `number` | Optional numeric seed. Omit it to generate a fresh random seed (log the returned value and pass it back later to replay the exact run). |

#### Returns

`Promise`\<`number`\>

The seed that was set.

#### Example

```ts
import { useFakeSeed, useFakeUuid } from "katanakit-js";

const seed = await useFakeSeed(); // random, but loggable/replayable
await useFakeSeed(seed);          // replays the same sequence
await useFakeUuid();
```

***

### useFakeSetDefaultRefDate()

```ts
useFakeSetDefaultRefDate(refDate?): Promise<Date>;
```

Defined in: [core/services/faker.service.ts:110](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L110)

Pins the reference date faker uses for relative date helpers, so
date-dependent output stays reproducible next to [useFakeSeed](../functions/useFakeSeed.md).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `refDate?` | `string` \| `number` \| `Date` \| (() => `Date`) | Static date (`Date`, ISO string or epoch ms) or a factory returning a fresh `Date` on every call. Omit it to reset to the current time. |

#### Returns

`Promise`\<`Date`\>

The reference date now in effect.

#### Example

```ts
import { useFakeSeed, useFakeSetDefaultRefDate, useFakeDate } from "katanakit-js";

await useFakeSeed(42);
await useFakeSetDefaultRefDate("2026-01-01");
await useFakeDate(); // reproducible between 1970-01-01 and 2026-01-01
```

***

### useFakeText()

```ts
useFakeText(words?): Promise<string>;
```

Defined in: [core/services/faker.service.ts:207](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L207)

Generates lorem-ipsum text.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `words` | `number` | `12` | Number of words (default: `12`). |

#### Returns

`Promise`\<`string`\>

A space-separated string of words.

***

### useFakeUrl()

```ts
useFakeUrl(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:196](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L196)

Generates a fake URL.

#### Returns

`Promise`\<`string`\>

An absolute URL.

***

### useFakeUuid()

```ts
useFakeUuid(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L126)

Generates a v4 UUID.

#### Returns

`Promise`\<`string`\>

A random UUID string.

#### Example

```ts
const id = await useFakeUuid();
```

***

### useFakeVehicle()

```ts
useFakeVehicle(): Promise<{
  brand: string;
  color: string;
  fuel: string;
  model: string;
  plate: string;
  type: string;
  vin: string;
}>;
```

Defined in: [core/services/faker.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L271)

Generates a generic fake vehicle (brand, model, type, fuel, color, vin, plate).

#### Returns

`Promise`\<\{
  `brand`: `string`;
  `color`: `string`;
  `fuel`: `string`;
  `model`: `string`;
  `plate`: `string`;
  `type`: `string`;
  `vin`: `string`;
\}\>

A [FakeVehicle](../type-aliases/FakeVehicle.md) object.

#### Example

```ts
const vehicle = await useFakeVehicle();
// { brand: "Jeep", model: "Wrangler", plate: "HJ47FNP", ... }
```

***

### getInstance()

```ts
static getInstance(): FakerService;
```

Defined in: [core/services/faker.service.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L46)

Returns the shared instance (Singleton).

#### Returns

`FakerService`
