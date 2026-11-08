[katanakit-js](../index.md) / HierarchicalAccessStrategy

# Class: HierarchicalAccessStrategy

Defined in: [core/services/access.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L113)

Estrategia por defecto: control de acceso jerárquico basado en roles
registrados. Es la estrategia estándar del servicio.

## Example

```ts
const strategy = new HierarchicalAccessStrategy();
strategy.useCan({ id: 1, roles: ["editor"] }, "content:create"); // true
```

## Implements

- [`IAccessStrategy`](../interfaces/IAccessStrategy.md)

## Constructors

### Constructor

```ts
new HierarchicalAccessStrategy(): HierarchicalAccessStrategy;
```

Defined in: [core/services/access.service.ts:117](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L117)

#### Returns

`HierarchicalAccessStrategy`

## Methods

### useCan()

```ts
useCan(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:196](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L196)

Whether the subject may perform a capability. Any of the subject's roles
granting the capability (directly or by inheritance) is enough.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id` | `string` \| `number` |
| `subject.roles` | `string`[] |
| `capability` | `string` |

#### Returns

`boolean`

#### Example

```ts
useCan({ id: 1, roles: ["author"] }, "content:publish"); // false
useCan({ id: 1, roles: ["author"] }, "content:create");  // true
useCan({ id: 2, roles: ["editor"] }, "content:create");  // true (inherits author)
useCan({ id: 3, roles: [] }, "conversations:use");       // false
```

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useCan`](../interfaces/IAccessStrategy.md#usecan)

***

### useCapabilitiesFor()

```ts
useCapabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:140](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L140)

Effective capabilities of a role: its own plus every less-privileged role's.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

#### Example

```ts
useCapabilitiesFor("author"); // content:create, content:edit:own, ..., conversations:use
useCapabilitiesFor("guest");  // []
```

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useCapabilitiesFor`](../interfaces/IAccessStrategy.md#usecapabilitiesfor)

***

### useHasRole()

```ts
useHasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:180](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L180)

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

Defined in: [core/services/access.service.ts:161](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L161)

Registers (or replaces) a role definition. Use it to extend a built-in
role's capabilities, e.g. grant `content:create` to `member`, or to add
a deployment-specific role that inherits from the built-ins by rank.
The definition is copied, so mutating the caller's object afterwards
has no effect.

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

Defined in: [core/services/access.service.ts:167](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L167)

Restores the built-in role registry (mainly for tests).

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

Defined in: [core/services/access.service.ts:175](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L175)

Lists every registered role definition. Returns copies, not live state.

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`useRoles`](../interfaces/IAccessStrategy.md#useroles)
