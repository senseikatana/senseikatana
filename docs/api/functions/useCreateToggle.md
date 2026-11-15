[katanakit-js](../index.md) / useCreateToggle

# Function: useCreateToggle()

```ts
function useCreateToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [core/services/reactive.service.ts:408](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/reactive.service.ts#L408)

Creates a boolean toggle signal. See [ReactiveService.useCreateToggle](../classes/ReactiveService.md#usecreatetoggle).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `initialValue?` | `boolean` | `false` |

## Returns

\[[`SignalGetter`](../interfaces/SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](../interfaces/ToggleSignalSetter.md)\]
