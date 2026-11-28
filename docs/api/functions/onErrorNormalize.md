[katanakit-js](../index.md) / onErrorNormalize

# Function: onErrorNormalize()

```ts
function onErrorNormalize(error, fallbackStatus?): {
  details?: unknown;
  message: string;
  status: number;
};
```

Defined in: [core/services/error.service.ts:145](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/error.service.ts#L145)

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `error` | `unknown` | `undefined` |
| `fallbackStatus?` | `number` | `0` |

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
details?: unknown;
```

### message

```ts
message: string;
```

### status

```ts
status: number;
```
