[katanakit-js](../index.md) / useLogger

# Function: useLogger()

```ts
function useLogger(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L126)

Wrapper para LoggerService - mantiene backward compatibility

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `message` | `string` | `undefined` |
| `data?` | `unknown` | `undefined` |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` |

## Returns

`void`
