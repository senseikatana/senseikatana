[katanakit-js](../index.md) / useLogger

# Function: useLogger()

```ts
function useLogger(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/logger.service.ts#L126)

Wrapper para LoggerService - mantiene backward compatibility

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `message` | `string` | `undefined` |
| `data?` | `unknown` | `undefined` |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` |

## Returns

`void`
