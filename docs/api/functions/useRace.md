[katanakit-js](../index.md) / useRace

# Function: useRace()

```ts
function useRace<T>(
   promise, 
   timeoutMs, 
   errorMessage?
): Promise<T>;
```

Defined in: [core/services/timing.service.ts:507](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/timing.service.ts#L507)

Races a promise against a timeout. See [TimingService.useRace](../classes/TimingService.md#userace).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `promise` | `Promise`\<`T`\> | `undefined` |
| `timeoutMs` | `number` | `undefined` |
| `errorMessage` | `string` | `"Operation timed out"` |

## Returns

`Promise`\<`T`\>
