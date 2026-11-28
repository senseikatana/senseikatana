[katanakit-js](../index.md) / IDomService

# Interface: IDomService

Defined in: [types/core/dom.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L29)

Contract of the DOM facade.

## Methods

### onAddClass()

```ts
onAddClass(target, className): void;
```

Defined in: [types/core/dom.ts:43](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |

#### Returns

`void`

***

### onAppend()

```ts
onAppend(target, child): void;
```

Defined in: [types/core/dom.ts:64](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `child` | `string` \| `Element` |

#### Returns

`void`

***

### onCreateElement()

```ts
onCreateElement<T>(tagName, options?): HTMLElementTagNameMap[T];
```

Defined in: [types/core/dom.ts:58](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L58)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* keyof `HTMLElementTagNameMap` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tagName` | `T` |
| `options?` | `ElementCreationOptions` |

#### Returns

`HTMLElementTagNameMap`\[`T`\]

***

### onGetAttribute()

```ts
onGetAttribute(target, attr): string | null;
```

Defined in: [types/core/dom.ts:47](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |

#### Returns

`string` \| `null`

***

### onGetBody()

```ts
onGetBody(): HTMLBodyElement | null;
```

Defined in: [types/core/dom.ts:32](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L32)

#### Returns

`HTMLBodyElement` \| `null`

***

### onGetDataAttribute()

```ts
onGetDataAttribute(target, key): string | undefined;
```

Defined in: [types/core/dom.ts:50](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `HTMLElement` |
| `key` | `string` |

#### Returns

`string` \| `undefined`

***

### onGetElementByClass()

```ts
onGetElementByClass<T>(className): T | null;
```

Defined in: [types/core/dom.ts:34](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L34)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` *extends* `HTMLElement` | `HTMLElement` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `className` | `string` |

#### Returns

`T` \| `null`

***

### onGetElementById()

```ts
onGetElementById<T>(id): T | null;
```

Defined in: [types/core/dom.ts:33](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L33)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-2"></a> `T` *extends* `HTMLElement` | `HTMLElement` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`T` \| `null`

***

### onGetRoot()

```ts
onGetRoot(): HTMLElement | null;
```

Defined in: [types/core/dom.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L31)

#### Returns

`HTMLElement` \| `null`

***

### onHasClass()

```ts
onHasClass(target, className): boolean;
```

Defined in: [types/core/dom.ts:46](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L46)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |

#### Returns

`boolean`

***

### onIsBrowser()

```ts
onIsBrowser(): boolean;
```

Defined in: [types/core/dom.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L30)

#### Returns

`boolean`

***

### onOn()

```ts
onOn<K>(
   target, 
   event, 
   callback, 
   options?
): (() => void) | null;
```

Defined in: [types/core/dom.ts:52](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L52)

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-k"></a> `K` *extends* keyof `HTMLElementEventMap` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `EventTarget` |
| `event` | `K` |
| `callback` | (`event`) => `void` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

(() => `void`) \| `null`

***

### onQuerySelector()

#### Call Signature

```ts
onQuerySelector<K>(selector): HTMLElementTagNameMap[K] | null;
```

Defined in: [types/core/dom.ts:35](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L35)

##### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-k-1"></a> `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

#### Call Signature

```ts
onQuerySelector<E>(selector): E | null;
```

Defined in: [types/core/dom.ts:38](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L38)

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-e"></a> `E` *extends* `Element` | `HTMLElement` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `string` |

##### Returns

`E` \| `null`

***

### onQuerySelectorAll()

#### Call Signature

```ts
onQuerySelectorAll<K>(selector): HTMLElementTagNameMap[K][];
```

Defined in: [types/core/dom.ts:39](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L39)

##### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-k-2"></a> `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\][]

#### Call Signature

```ts
onQuerySelectorAll<E>(selector): E[];
```

Defined in: [types/core/dom.ts:42](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L42)

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-e-1"></a> `E` *extends* `Element` | `HTMLElement` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `string` |

##### Returns

`E`[]

***

### onRemove()

```ts
onRemove(target): void;
```

Defined in: [types/core/dom.ts:65](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L65)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |

#### Returns

`void`

***

### onRemoveAttribute()

```ts
onRemoveAttribute(target, attr): void;
```

Defined in: [types/core/dom.ts:49](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |

#### Returns

`void`

***

### onRemoveClass()

```ts
onRemoveClass(target, className): void;
```

Defined in: [types/core/dom.ts:44](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L44)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` \| `string`[] |

#### Returns

`void`

***

### onSetAttribute()

```ts
onSetAttribute(
   target, 
   attr, 
   value
): void;
```

Defined in: [types/core/dom.ts:48](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |
| `value` | `string` |

#### Returns

`void`

***

### onSetDataAttribute()

```ts
onSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [types/core/dom.ts:51](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `HTMLElement` |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

***

### onSetHtml()

```ts
onSetHtml(target, html): void;
```

Defined in: [types/core/dom.ts:62](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `html` | `string` |

#### Returns

`void`

***

### onSetText()

```ts
onSetText(target, text): void;
```

Defined in: [types/core/dom.ts:63](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L63)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `text` | `string` |

#### Returns

`void`

***

### onToggleClass()

```ts
onToggleClass(
   target, 
   className, 
   force?
): boolean | undefined;
```

Defined in: [types/core/dom.ts:45](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/dom.ts#L45)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |
| `force?` | `boolean` |

#### Returns

`boolean` \| `undefined`
