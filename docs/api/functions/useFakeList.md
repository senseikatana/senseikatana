[katanakit-js](../index.md) / useFakeList

# Function: useFakeList()

```ts
function useFakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:387](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/faker.service.ts#L387)

Builds an array of fake items from a factory. See [FakerService.useFakeList](../classes/FakerService.md#usefakelist).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `factory` | (`index`) => `T` \| `Promise`\<`T`\> |
| `count` | `number` |

## Returns

`Promise`\<`T`[]\>
