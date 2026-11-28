[katanakit-js](../index.md) / IAccessStrategy

# Interface: IAccessStrategy

Defined in: [core/services/access.service.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L20)

Estrategia de verificación de acceso - Strategy Pattern.

Define el contrato que toda implementación de control de acceso debe
cumplir. El [AccessService](../classes/AccessService.md) delega en una estrategia concreta,
permitiendo intercambiar el algoritmo de autorización sin tocar al cliente.

## Methods

### can()

```ts
can(subject, capability): boolean;
```

Defined in: [core/services/access.service.ts:32](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L32)

Whether the subject may perform a capability.

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

Defined in: [core/services/access.service.ts:22](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L22)

Effective capabilities of a role (own plus inherited).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

***

### hasRole()

```ts
hasRole(subject, role): boolean;
```

Defined in: [core/services/access.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L30)

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

Defined in: [core/services/access.service.ts:24](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L24)

Registers (or replaces) a role definition.

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

Defined in: [core/services/access.service.ts:26](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L26)

Restores the built-in role registry.

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

Defined in: [core/services/access.service.ts:28](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/access.service.ts#L28)

Lists every registered role definition.

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]
