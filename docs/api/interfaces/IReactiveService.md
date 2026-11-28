[katanakit-js](../index.md) / IReactiveService

# Interface: IReactiveService

Defined in: [types/core/reactive.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L19)

Contract of the reactive facade.

## Methods

### createBatch()

```ts
createBatch(): (callback) => void;
```

Defined in: [types/core/reactive.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L31)

#### Returns

(`callback`) => `void`

***

### createDebouncedSignal()

```ts
createDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  onCancel: () => void;
}];
```

Defined in: [types/core/reactive.ts:27](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L27)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |
| `delayMs?` | `number` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\> & \{
  `onCancel`: () => `void`;
\}\]

***

### createEffect()

```ts
createEffect(callback, signals?): () => void;
```

Defined in: [types/core/reactive.ts:21](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` \| (() => `void`) |
| `signals?` | [`Subscribable`](Subscribable.md)\<`unknown`\>[] |

#### Returns

() => `void`

***

### createMemo()

```ts
createMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [types/core/reactive.ts:25](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L25)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `computation` | () => `T` |
| `signals?` | [`Subscribable`](Subscribable.md)\<`unknown`\>[] |

#### Returns

[`SignalGetter`](SignalGetter.md)\<`T`\>

***

### createSignal()

```ts
createSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [types/core/reactive.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L20)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-2"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]

***

### createToggle()

```ts
createToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [types/core/reactive.ts:26](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/reactive.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue?` | `boolean` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](ToggleSignalSetter.md)\]
