[katanakit-js](../index.md) / useNowDateTime

# Function: useNowDateTime()

```ts
function useNowDateTime(): string;
```

Defined in: [core/services/dates.service.ts:622](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/dates.service.ts#L622)

Returns the current date and time as an ISO string (no timezone offset).

## Returns

`string`

The current date-time in `YYYY-MM-DDTHH:MM:SS` format.

## Example

```ts
useNowDateTime(); // "2024-06-15T14:30:00"
```
