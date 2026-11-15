[katanakit-js](../index.md) / useErrorSerialize

# Function: useErrorSerialize()

```ts
function useErrorSerialize(message?, code?): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:138](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/error.service.ts#L138)

Serializes an error into a plain object. See [ErrorService.useErrorSerialize](../classes/ErrorService.md#useerrorserialize).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `message?` | `string` | `""` |
| `code?` | `number` | `400` |

## Returns

```ts
{
  code: number;
  message: string;
}
```

### code

```ts
code: number;
```

### message

```ts
message: string;
```
