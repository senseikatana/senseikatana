[katanakit-js](../index.md) / useLogger

# Function: useLogger()

```ts
function useLogger(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:126](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/logger.service.ts#L126)

Wrapper para LoggerService - mantiene backward compatibility

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `message` | `string` | `undefined` |
| `data?` | `unknown` | `undefined` |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` |

## Returns

`void`
