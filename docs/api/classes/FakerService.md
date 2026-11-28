[katanakit-js](../index.md) / FakerService

# Class: FakerService

Defined in: [core/services/faker.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L36)

FakerService — generic fake data for tests, seeds and forms.

Applies the **Singleton** pattern (one shared instance via
[FakerService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the lazy `@faker-js/faker` load behind one call. The optional
peer dependency is imported through dynamic `import()` on first use, so it
never enters the initial bundle and consumers who don't use it don't
install it.

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the
module level `onFake*` functions below are thin wrappers kept for
call-site ergonomics.

## Example

```ts
import { fakeSeed, fakeUuid } from "katanakit-js";

const seed = await fakeSeed(); // random, but loggable/replayable
await fakeSeed(seed);          // replays the same sequence
await fakeUuid();
```

## Methods

### fakeBoolean()

```ts
fakeBoolean(): Promise<boolean>;
```

Defined in: [core/services/faker.service.ts:234](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L234)

Generates a random boolean.

#### Returns

`Promise`\<`boolean`\>

`true` or `false`.

***

### fakeCompanyName()

```ts
fakeCompanyName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:186](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L186)

Generates a fake company name.

#### Returns

`Promise`\<`string`\>

A company name.

***

### fakeDate()

```ts
fakeDate(from?, to?): Promise<Date>;
```

Defined in: [core/services/faker.service.ts:252](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L252)

Generates a random date within an optional range.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `from?` | `string` \| `number` \| `Date` | Lower bound (default: `1970-01-01`). |
| `to?` | `string` \| `number` \| `Date` | Upper bound (default: faker's reference date, see [fakeSetDefaultRefDate](#fakesetdefaultrefdate) — the current time when unset). |

#### Returns

`Promise`\<`Date`\>

A `Date` instance.

#### Example

```ts
const hiredAt = await fakeDate(new Date("2020-01-01"), new Date("2025-12-31"));
```

***

### fakeEmail()

```ts
fakeEmail(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:136](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L136)

Generates a fake email address.

#### Returns

`Promise`\<`string`\>

An email address.

***

### fakeFirstName()

```ts
fakeFirstName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L156)

Generates a fake first name.

#### Returns

`Promise`\<`string`\>

A first name.

***

### fakeFullName()

```ts
fakeFullName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:146](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L146)

Generates a fake full name.

#### Returns

`Promise`\<`string`\>

A full name, e.g. `"Ada Lovelace"`.

***

### fakeLastName()

```ts
fakeLastName(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:166](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L166)

Generates a fake last name.

#### Returns

`Promise`\<`string`\>

A last name.

***

### fakeList()

```ts
fakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:298](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L298)

Builds an array of fake items from a factory (sync or async).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Item type produced by the factory. |

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
const vehicles = await fakeList(() => fakeVehicle(), 5);
const relations = await fakeList((index) => ({ user: users[index % users.length] }), 10);
```

***

### fakeNumber()

```ts
fakeNumber(min?, max?): Promise<number>;
```

Defined in: [core/services/faker.service.ts:224](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L224)

Generates an integer within an inclusive range.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `min?` | `number` | `0` | Lower bound (default: `0`). |
| `max?` | `number` | `100` | Upper bound (default: `100`). |

#### Returns

`Promise`\<`number`\>

A random integer between `min` and `max`.

#### Example

```ts
const age = await fakeNumber(18, 65);
```

***

### fakePhone()

```ts
fakePhone(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:176](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L176)

Generates a fake phone number.

#### Returns

`Promise`\<`string`\>

A phone number string.

***

### fakeSeed()

```ts
fakeSeed(seed?): Promise<number>;
```

Defined in: [core/services/faker.service.ts:88](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L88)

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
import { fakeSeed, fakeUuid } from "katanakit-js";

const seed = await fakeSeed(); // random, but loggable/replayable
await fakeSeed(seed);          // replays the same sequence
await fakeUuid();
```

***

### fakeSetDefaultRefDate()

```ts
fakeSetDefaultRefDate(refDate?): Promise<Date>;
```

Defined in: [core/services/faker.service.ts:110](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L110)

Pins the reference date faker uses for relative date helpers, so
date-dependent output stays reproducible next to [fakeSeed](#fakeseed).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `refDate?` | `string` \| `number` \| `Date` \| (() => `Date`) | Static date (`Date`, ISO string or epoch ms) or a factory returning a fresh `Date` on every call. Omit it to reset to the current time. |

#### Returns

`Promise`\<`Date`\>

The reference date now in effect.

#### Example

```ts
import { fakeSeed, fakeSetDefaultRefDate, fakeDate } from "katanakit-js";

await fakeSeed(42);
await fakeSetDefaultRefDate("2026-01-01");
await fakeDate(); // reproducible between 1970-01-01 and 2026-01-01
```

***

### fakeText()

```ts
fakeText(words?): Promise<string>;
```

Defined in: [core/services/faker.service.ts:207](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L207)

Generates lorem-ipsum text.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `words?` | `number` | `12` | Number of words (default: `12`). |

#### Returns

`Promise`\<`string`\>

A space-separated string of words.

***

### fakeUrl()

```ts
fakeUrl(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:196](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L196)

Generates a fake URL.

#### Returns

`Promise`\<`string`\>

An absolute URL.

***

### fakeUuid()

```ts
fakeUuid(): Promise<string>;
```

Defined in: [core/services/faker.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L126)

Generates a v4 UUID.

#### Returns

`Promise`\<`string`\>

A random UUID string.

#### Example

```ts
const id = await fakeUuid();
```

***

### fakeVehicle()

```ts
fakeVehicle(): Promise<{
  brand: string;
  color: string;
  fuel: string;
  model: string;
  plate: string;
  type: string;
  vin: string;
}>;
```

Defined in: [core/services/faker.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L271)

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
const vehicle = await fakeVehicle();
// { brand: "Jeep", model: "Wrangler", plate: "HJ47FNP", ... }
```

***

### getInstance()

```ts
static getInstance(): FakerService;
```

Defined in: [core/services/faker.service.ts:46](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L46)

Returns the shared instance (Singleton).

#### Returns

`FakerService`
