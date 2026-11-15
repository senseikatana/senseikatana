[katanakit-js](../index.md) / useRace

# Function: useRace()

```ts
function useRace<T>(
   promise, 
   timeoutMs, 
   errorMessage?
): Promise<T>;
```

Defined in: [core/services/timing.service.ts:507](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/timing.service.ts#L507)

Races a promise against a timeout. See [TimingService.useRace](../classes/TimingService.md#userace).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `promise` | `Promise`\<`T`\> | `undefined` |
| `timeoutMs` | `number` | `undefined` |
| `errorMessage?` | `string` | `"Operation timed out"` |

## Returns

`Promise`\<`T`\>
