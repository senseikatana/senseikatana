[katanakit-js](../index.md) / useLogger

# Function: useLogger()

```ts
function useLogger(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/logger.service.ts#L126)

Wrapper para LoggerService - mantiene backward compatibility

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `message` | `string` | `undefined` |
| `data?` | `unknown` | `undefined` |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` |

## Returns

`void`
