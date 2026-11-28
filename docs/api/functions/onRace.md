[katanakit-js](../index.md) / onRace

# Function: onRace()

```ts
function onRace<T>(
   promise, 
   timeoutMs, 
   errorMessage?
): Promise<T>;
```

Defined in: [core/services/timing.service.ts:507](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L507)

Races a promise against a timeout. See [TimingService.onRace](../classes/TimingService.md#onrace).

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
