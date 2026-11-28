[katanakit-js](../index.md) / useCreateEffect

# Function: useCreateEffect()

```ts
function useCreateEffect(callback, signals?): () => void;
```

Defined in: [core/services/reactive.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/reactive.service.ts#L392)

Creates a tracked side effect. See [ReactiveService.useCreateEffect](../classes/ReactiveService.md#usecreateeffect).

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | () => `void` \| (() => `void`) | `undefined` |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` |

## Returns

() => `void`
