[katanakit-js](../index.md) / IReactiveService

# Interface: IReactiveService

Defined in: [types/core/reactive.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L19)

Contract of the reactive facade.

## Methods

### useCreateBatch()

```ts
useCreateBatch(): (callback) => void;
```

Defined in: [types/core/reactive.ts:31](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L31)

#### Returns

(`callback`) => `void`

***

### useCreateDebouncedSignal()

```ts
useCreateDebouncedSignal<T>(initialValue, delayMs?): [SignalGetter<T>, SignalSetter<T> & {
  useCancel: () => void;
}];
```

Defined in: [types/core/reactive.ts:27](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L27)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |
| `delayMs?` | `number` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\> & \{
  `useCancel`: () => `void`;
\}\]

***

### useCreateEffect()

```ts
useCreateEffect(callback, signals?): () => void;
```

Defined in: [types/core/reactive.ts:21](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | () => `void` \| (() => `void`) |
| `signals?` | [`Subscribable`](Subscribable.md)\<`unknown`\>[] |

#### Returns

() => `void`

***

### useCreateMemo()

```ts
useCreateMemo<T>(computation, signals?): SignalGetter<T>;
```

Defined in: [types/core/reactive.ts:25](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L25)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `computation` | () => `T` |
| `signals?` | [`Subscribable`](Subscribable.md)\<`unknown`\>[] |

#### Returns

[`SignalGetter`](SignalGetter.md)\<`T`\>

***

### useCreateSignal()

```ts
useCreateSignal<T>(initialValue): [SignalGetter<T>, SignalSetter<T>];
```

Defined in: [types/core/reactive.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L20)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue` | `T` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`T`\>, [`SignalSetter`](../type-aliases/SignalSetter.md)\<`T`\>\]

***

### useCreateToggle()

```ts
useCreateToggle(initialValue?): [SignalGetter<boolean>, ToggleSignalSetter];
```

Defined in: [types/core/reactive.ts:26](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/reactive.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialValue?` | `boolean` |

#### Returns

\[[`SignalGetter`](SignalGetter.md)\<`boolean`\>, [`ToggleSignalSetter`](ToggleSignalSetter.md)\]
