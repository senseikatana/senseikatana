[katanakit-js](../index.md) / HierarchicalAccessStrategy

# Class: HierarchicalAccessStrategy

Defined in: [core/services/access.service.ts:113](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L113)

Estrategia por defecto: control de acceso jerárquico basado en roles
registrados. Es la estrategia estándar del servicio.

## Example

```ts
const strategy = new HierarchicalAccessStrategy();
strategy.can({ id: 1, roles: ["editor"] }, "content:create"); // true
```

## Implements

- [`IAccessStrategy`](../interfaces/IAccessStrategy.md)

## Constructors

### Constructor

```ts
new HierarchicalAccessStrategy(): HierarchicalAccessStrategy;
```

Defined in: [core/services/access.service.ts:117](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L117)

#### Returns

`HierarchicalAccessStrategy`

## Methods

### can()

```ts
can(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:196](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L196)

Whether the subject may perform a capability. Any of the subject's roles
granting the capability (directly or by inheritance) is enough.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id?` | `string` \| `number` |
| `subject.roles?` | `string`[] |
| `capability` | `string` |

#### Returns

`boolean`

#### Example

```ts
can({ id: 1, roles: ["author"] }, "content:publish"); // false
can({ id: 1, roles: ["author"] }, "content:create");  // true
can({ id: 2, roles: ["editor"] }, "content:create");  // true (inherits author)
can({ id: 3, roles: [] }, "conversations:use");       // false
```

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`can`](../interfaces/IAccessStrategy.md#can)

***

### capabilitiesFor()

```ts
capabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:140](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L140)

Effective capabilities of a role: its own plus every less-privileged role's.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

#### Example

```ts
capabilitiesFor("author"); // content:create, content:edit:own, ..., conversations:use
capabilitiesFor("guest");  // []
```

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`capabilitiesFor`](../interfaces/IAccessStrategy.md#capabilitiesfor)

***

### hasRole()

```ts
hasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:180](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L180)

Exact role membership - no hierarchy involved.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id?` | `string` \| `number` |
| `subject.roles?` | `string`[] |
| `role` | `string` |

#### Returns

`boolean`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`hasRole`](../interfaces/IAccessStrategy.md#hasrole)

***

### registerRole()

```ts
registerRole(definition): void;
```

Defined in: [core/services/access.service.ts:161](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L161)

Registers (or replaces) a role definition. Use it to extend a built-in
role's capabilities, e.g. grant `content:create` to `member`, or to add
a deployment-specific role that inherits from the built-ins by rank.
The definition is copied, so mutating the caller's object afterwards
has no effect.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; \} |
| `definition.capabilities?` | `string`[] |
| `definition.label?` | `string` |
| `definition.rank?` | `number` |
| `definition.slug?` | `string` |

#### Returns

`void`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`registerRole`](../interfaces/IAccessStrategy.md#registerrole)

***

### resetRoles()

```ts
resetRoles(): void;
```

Defined in: [core/services/access.service.ts:167](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L167)

Restores the built-in role registry (mainly for tests).

#### Returns

`void`

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`resetRoles`](../interfaces/IAccessStrategy.md#resetroles)

***

### roles()

```ts
roles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
}[];
```

Defined in: [core/services/access.service.ts:175](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L175)

Lists every registered role definition. Returns copies, not live state.

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]

#### Implementation of

[`IAccessStrategy`](../interfaces/IAccessStrategy.md).[`roles`](../interfaces/IAccessStrategy.md#roles)
