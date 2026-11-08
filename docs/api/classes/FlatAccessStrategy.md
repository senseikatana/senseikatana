[katanakit-js](../index.md) / FlatAccessStrategy

# Class: FlatAccessStrategy

Defined in: [core/services/access.service.ts:213](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L213)

Estrategia estricta: sólo verifica capacidades declaradas explícitamente
en el rol del sujeto, sin her jerarquía. Útil cuando cada rol debe
declarar todo lo que puede hacer.

## Example

```ts
const access = new AccessService(new FlatAccessStrategy());
// "editor" ya NO hereda las capacidades de "author"
access.useCan({ id: 1, roles: ["editor"] }, "content:create"); // false
```

## Implements

- [`IAccessStrategy`](../interfaces/IAccessStrategy.md)

## Constructors

### Constructor

```ts
new FlatAccessStrategy(): FlatAccessStrategy;
```

Defined in: [core/services/access.service.ts:216](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L216)

#### Returns

`FlatAccessStrategy`

## Methods

### useCan()

```ts
useCan(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L247)

Whether the subject may perform a capability.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id` | `string` \| `number` |
| `subject.roles` | `string`[] |
| `capability` | `string` |

#### Returns

`boolean`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useCan`](../interfaces/IAccessStrategy.md#usecan)

***

### useCapabilitiesFor()

```ts
useCapabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:222](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L222)

Effective capabilities of a role (own plus inherited).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useCapabilitiesFor`](../interfaces/IAccessStrategy.md#usecapabilitiesfor)

***

### useHasRole()

```ts
useHasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L243)

Exact role membership - no hierarchy involved.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id` | `string` \| `number` |
| `subject.roles` | `string`[] |
| `role` | `string` |

#### Returns

`boolean`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useHasRole`](../interfaces/IAccessStrategy.md#usehasrole)

***

### useRegisterRole()

```ts
useRegisterRole(definition): void;
```

Defined in: [core/services/access.service.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L227)

Registers (or replaces) a role definition.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; \} |
| `definition.capabilities` | `string`[] |
| `definition.label` | `string` |
| `definition.rank` | `number` |
| `definition.slug` | `string` |

#### Returns

`void`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useRegisterRole`](../interfaces/IAccessStrategy.md#useregisterrole)

***

### useResetRoles()

```ts
useResetRoles(): void;
```

Defined in: [core/services/access.service.ts:232](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L232)

Restores the built-in role registry.

#### Returns

`void`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useResetRoles`](../interfaces/IAccessStrategy.md#useresetroles)

***

### useRoles()

```ts
useRoles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
}[];
```

Defined in: [core/services/access.service.ts:239](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L239)

Lists every registered role definition.

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useRoles`](../interfaces/IAccessStrategy.md#useroles)
