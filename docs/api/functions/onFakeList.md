[katanakit-js](../index.md) / onFakeList

# Function: onFakeList()

```ts
function onFakeList<T>(factory, count): Promise<T[]>;
```

Defined in: [core/services/faker.service.ts:371](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/faker.service.ts#L371)

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
