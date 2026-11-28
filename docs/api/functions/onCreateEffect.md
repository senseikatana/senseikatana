[katanakit-js](../index.md) / onCreateEffect

# Function: onCreateEffect()

```ts
function onCreateEffect(callback, signals?): () => void;
```

Defined in: [core/services/reactive.service.ts:390](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/reactive.service.ts#L390)

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `callback` | () => `void` \| (() => `void`) | `undefined` |
| `signals?` | [`Subscribable`](../interfaces/Subscribable.md)\<`unknown`\>[] | `[]` |

## Returns

() => `void`
