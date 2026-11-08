[katanakit-js](../index.md) / useErrorNormalize

# Function: useErrorNormalize()

```ts
function useErrorNormalize(error, fallbackStatus?): {
  details?: unknown;
  message: string;
  status: number;
};
```

Defined in: [core/services/error.service.ts:148](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L148)

Normalizes any thrown value into an [ApiError](../type-aliases/ApiError.md). See [ErrorService.useErrorNormalize](../classes/ErrorService.md#useerrornormalize).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `error` | `unknown` | `undefined` |
| `fallbackStatus` | `number` | `0` |

## Returns

```ts
{
  details?: unknown;
  message: string;
  status: number;
}
```

### details?

```ts
optional details?: unknown;
```

### message

```ts
message: string;
```

### status

```ts
status: number;
```
