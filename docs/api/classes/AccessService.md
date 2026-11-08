[katanakit-js](../index.md) / AccessService

# Class: AccessService

Defined in: [core/services/access.service.ts:272](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L272)

AccessService - Singleton facade con Strategy Pattern.

Centraliza el control de acceso (roles y capacidades) delegando el
algoritmo concreto en una [IAccessStrategy](../interfaces/IAccessStrategy.md) intercambiable.
Por defecto usa [HierarchicalAccessStrategy](HierarchicalAccessStrategy.md).

## Example

```ts
// Uso con la estrategia por defecto (jerárquica)
AccessService.getInstance().useCan({ id: 1, roles: ["admin"] }, "members:manage");

// Cambiar a estrategia plana en runtime
AccessService.getInstance().useSetStrategy(new FlatAccessStrategy());
```

## Methods

### useCan()

```ts
useCan(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:358](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L358)

Whether the subject may perform a capability (delegado a la estrategia activa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} |
| `subject.id` | `string` \| `number` |
| `subject.roles` | `string`[] |
| `capability` | `string` |

#### Returns

`boolean`

***

### useCapabilitiesFor()

```ts
useCapabilitiesFor(role): string[];
```

Defined in: [core/services/access.service.ts:329](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L329)

Effective capabilities of a role (delegado a la estrategia activa).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

***

### useGetStrategy()

```ts
useGetStrategy(): IAccessStrategy;
```

Defined in: [core/services/access.service.ts:322](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L322)

Returns the currently active strategy.

#### Returns

[`IAccessStrategy`](../interfaces/IAccessStrategy.md)

***

### useHasRole()

```ts
useHasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:351](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L351)

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

***

### useRegisterRole()

```ts
useRegisterRole(definition): void;
```

Defined in: [core/services/access.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L336)

Registers (or replaces) a role definition (delegado a la estrategia activa).

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

***

### useResetRoles()

```ts
useResetRoles(): void;
```

Defined in: [core/services/access.service.ts:341](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L341)

Restores the built-in role registry (delegado a la estrategia activa).

#### Returns

`void`

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

Defined in: [core/services/access.service.ts:346](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L346)

Lists every registered role definition (delegado a la estrategia activa).

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]

***

### useSetStrategy()

```ts
useSetStrategy(strategy): void;
```

Defined in: [core/services/access.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L317)

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

Defined in: [core/services/access.service.ts:308](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L308)

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

Defined in: [core/services/access.service.ts:289](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/access.service.ts#L289)

Obtiene la instancia única del AccessService (Singleton).

#### Returns

`AccessService`

La instancia única de AccessService.
