[katanakit-js](../index.md) / IAccessService

# Interface: IAccessService

Defined in: [types/core/access.ts:53](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L53)

Contract of the access-control facade. Pure, no I/O.

## Methods

### onCan()

```ts
onCan(subject, capability): boolean;
```

Defined in: [types/core/access.ts:54](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L54)

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

### onCapabilitiesFor()

```ts
onCapabilitiesFor(role): string[];
```

Defined in: [types/core/access.ts:56](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L56)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`string`[]

***

### onHasRole()

```ts
onHasRole(subject, role): boolean;
```

Defined in: [types/core/access.ts:55](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L55)

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

### onRegisterRole()

```ts
onRegisterRole(definition): void;
```

Defined in: [types/core/access.ts:57](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L57)

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

### onRoles()

```ts
onRoles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
}[];
```

Defined in: [types/core/access.ts:58](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/access.ts#L58)

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
\}[]
