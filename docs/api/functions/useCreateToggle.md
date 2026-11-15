[katanakit-js](../index.md) / useCreateToggle

# Function: useCreateToggle()

```ts
function useCreateToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [core/services/reactive.service.ts:408](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/reactive.service.ts#L408)

Creates a boolean toggle signal. See [ReactiveService.useCreateToggle](../classes/ReactiveService.md#usecreatetoggle).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `initialValue?` | `boolean` | `false` |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](../interfaces/ToggleSignalSetter.md)\]
