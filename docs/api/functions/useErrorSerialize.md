[katanakit-js](../index.md) / useErrorSerialize

# Function: useErrorSerialize()

```ts
function useErrorSerialize(message?, code?): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:138](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/error.service.ts#L138)

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
