[katanakit-js](../index.md) / useFormat

# Function: useFormat()

```ts
function useFormat(
   dateInput, 
   locale?, 
   options?
): string;
```

Defined in: [core/services/dates.service.ts:590](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/dates.service.ts#L590)

Formats a date input into a localised string using `Intl.DateTimeFormat`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `dateInput` | [`TemporalInput`](../type-aliases/TemporalInput.md) | `undefined` | The value to format. |
| `locale` | `"en"` \| `"es"` \| `"fr"` \| `"de"` \| `"it"` \| `"pt"` \| `"ja"` \| `"zh"` | `"en"` | BCP 47 locale tag (defaults to `"en"`). |
| `options` | `DateTimeFormatOptions` | `{}` | `Intl.DateTimeFormatOptions` (defaults to `{}`). |

## Returns

`string`

The formatted date string.

## Example

```ts
useFormat("2024-06-15");
```
