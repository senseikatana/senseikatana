[katanakit-js](../index.md) / AccessService

# Class: AccessService

Defined in: [core/services/access.service.ts:272](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L272)

AccessService - Singleton facade con Strategy Pattern.

Centraliza el control de acceso (roles y capacidades) delegando el
algoritmo concreto en una [IAccessStrategy](../interfaces/IAccessStrategy.md) intercambiable.
Por defecto usa [HierarchicalAccessStrategy](HierarchicalAccessStrategy.md).

## Example

```ts
// Uso con la estrategia por defecto (jerárquica)
AccessService.getInstance().can({ id: 1, roles: ["admin"] }, "members:manage");

// Cambiar a estrategia plana en runtime
AccessService.getInstance().setStrategy(new FlatAccessStrategy());
```

## Methods

### can()

```ts
can(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:352](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L352)

Whether the subject may perform a capability (delegado a la estrategia activa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id?` | `string` \| `number` |
| `subject.roles?` | `string`[] |
| `capability` | `string` |

#### Returns

`boolean`

***

### capabilitiesFor()

```ts
capabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:327](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L327)

Effective capabilities of a role (delegado a la estrategia activa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

***

### getStrategy()

```ts
getStrategy(): IAccessStrategy;
```

Defined in: [core/services/access.service.ts:322](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L322)

Returns the currently active strategy.

#### Returns

[`IAccessStrategy`](../interfaces/IAccessStrategy.md)

***

### hasRole()

```ts
hasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:347](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L347)

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

***

### registerRole()

```ts
registerRole(definition): void;
```

Defined in: [core/services/access.service.ts:332](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L332)

Registers (or replaces) a role definition (delegado a la estrategia activa).

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

***

### resetRoles()

```ts
resetRoles(): void;
```

Defined in: [core/services/access.service.ts:337](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L337)

Restores the built-in role registry (delegado a la estrategia activa).

#### Returns

`void`

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

Defined in: [core/services/access.service.ts:342](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L342)

Lists every registered role definition (delegado a la estrategia activa).

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]

***

### setStrategy()

```ts
setStrategy(strategy): void;
```

Defined in: [core/services/access.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L317)

Intercambia la estrategia de acceso en runtime (Strategy Pattern).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `strategy` | [`IAccessStrategy`](../interfaces/IAccessStrategy.md) | La nueva estrategia a utilizar. |

#### Returns

`void`

***

### create()

```ts
static create(strategy?): AccessService;
```

Defined in: [core/services/access.service.ts:308](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L308)

Crea una instancia NO-singleton con una estrategia específica.
Útil para tests o para aislar varios contextos de acceso.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `strategy?` | [`IAccessStrategy`](../interfaces/IAccessStrategy.md) | Estrategia a inyectar. |

#### Returns

`AccessService`

Una nueva instancia de AccessService.

#### Example

```ts
const flatAccess = AccessService.create(new FlatAccessStrategy());
```

***

### getInstance()

```ts
static getInstance(): AccessService;
```

Defined in: [core/services/access.service.ts:289](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L289)

Obtiene la instancia única del AccessService (Singleton).

#### Returns

`AccessService`

La instancia única de AccessService.
