[katanakit-js](../index.md) / StorageStrategy

# Interface: StorageStrategy

Defined in: [types/core/storage.ts:8](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/storage.ts#L8)

Strategy contract: homogeneous storage without `any`.

## Methods

### useClear()

```ts
useClear(): void;
```

Defined in: [types/core/storage.ts:12](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/storage.ts#L12)

#### Returns

`void`

***

### useGetItem()

```ts
useGetItem<T>(key): T | null;
```

Defined in: [types/core/storage.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/storage.ts#L9)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`T` \| `null`

***

### useRemoveItem()

```ts
useRemoveItem(key): void;
```

Defined in: [types/core/storage.ts:11](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/storage.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`void`

***

### useSetItem()

```ts
useSetItem(key, value): void;
```

Defined in: [types/core/storage.ts:10](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/storage.ts#L10)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`void`
