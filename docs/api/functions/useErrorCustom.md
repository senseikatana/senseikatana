[katanakit-js](../index.md) / useErrorCustom

# Function: useErrorCustom()

```ts
function useErrorCustom(msg, code): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:143](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/error.service.ts#L143)

Creates a custom error object. See [ErrorService.useErrorCustom](../classes/ErrorService.md#useerrorcustom).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `msg` | `string` |
| `code` | `number` |

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
