[katanakit-js](../index.md) / useFakeList

# Function: useFakeList()

```ts
function useFakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:387](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/faker.service.ts#L387)

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
