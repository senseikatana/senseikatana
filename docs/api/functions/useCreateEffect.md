[katanakit-js](../index.md) / useCreateEffect

# Function: useCreateEffect()

```ts
function useCreateEffect(callback, signals?): () => void;
```

Defined in: [core/services/reactive.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/reactive.service.ts#L392)

Creates a tracked side effect. See [ReactiveService.useCreateEffect](../classes/ReactiveService.md#usecreateeffect).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | () => `void` \| (() => `void`) | `undefined` |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` |

## Returns

() => `void`
