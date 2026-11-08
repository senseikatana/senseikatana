[katanakit-js](../index.md) / useErrorCustom

# Function: useErrorCustom()

```ts
function useErrorCustom(msg, code): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:143](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L143)

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
