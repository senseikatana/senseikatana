[katanakit-js](../index.md) / useFakeList

# Function: useFakeList()

```ts
function useFakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:387](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/faker.service.ts#L387)

Builds an array of fake items from a factory. See [FakerService.useFakeList](../classes/FakerService.md#usefakelist).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `factory` | (`index`) => `T` \| `Promise`\<`T`\> |
| `count` | `number` |

## Returns

`Promise`\<`T`[]\>
