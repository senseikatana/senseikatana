[katanakit-js](../index.md) / useErrorCustom

# Function: useErrorCustom()

```ts
function useErrorCustom(msg, code): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:143](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/error.service.ts#L143)

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
