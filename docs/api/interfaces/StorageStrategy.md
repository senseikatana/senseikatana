[katanakit-js](../index.md) / StorageStrategy

# Interface: StorageStrategy

Defined in: [types/core/storage.ts:8](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/storage.ts#L8)

Strategy contract: homogeneous storage without `any`.

## Methods

### onClear()

```ts
onClear(): void;
```

Defined in: [types/core/storage.ts:12](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/storage.ts#L12)

#### Returns

`void`

***

### onGetItem()

```ts
onGetItem<T>(key): T | null;
```

Defined in: [types/core/storage.ts:9](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/storage.ts#L9)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`T` \| `null`

***

### onRemoveItem()

```ts
onRemoveItem(key): void;
```

Defined in: [types/core/storage.ts:11](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/storage.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`void`

***

### onSetItem()

```ts
onSetItem(key, value): void;
```

Defined in: [types/core/storage.ts:10](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/storage.ts#L10)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`void`
