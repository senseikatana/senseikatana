[katanakit-js](../index.md) / IDomService

# Interface: IDomService

Defined in: [types/core/dom.ts:29](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L29)

Contract of the DOM facade.

## Methods

### useAddClass()

```ts
useAddClass(target, className): void;
```

Defined in: [types/core/dom.ts:43](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |

#### Returns

`void`

***

### useAppend()

```ts
useAppend(target, child): void;
```

Defined in: [types/core/dom.ts:64](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `child` | `string` \| `Element` |

#### Returns

`void`

***

### useCreateElement()

```ts
useCreateElement<T>(tagName, options?): HTMLElementTagNameMap[T];
```

Defined in: [types/core/dom.ts:58](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L58)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* keyof `HTMLElementTagNameMap` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tagName` | `T` |
| `options?` | `ElementCreationOptions` |

#### Returns

`HTMLElementTagNameMap`\[`T`\]

***

### useGetAttribute()

```ts
useGetAttribute(target, attr): string | null;
```

Defined in: [types/core/dom.ts:47](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |

#### Returns

`string` \| `null`

***

### useGetBody()

```ts
useGetBody(): HTMLBodyElement | null;
```

Defined in: [types/core/dom.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L32)

#### Returns

`HTMLBodyElement` \| `null`

***

### useGetDataAttribute()

```ts
useGetDataAttribute(target, key): string | undefined;
```

Defined in: [types/core/dom.ts:50](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `HTMLElement` |
| `key` | `string` |

#### Returns

`string` \| `undefined`

***

### useGetElementByClass()

```ts
useGetElementByClass<T>(className): T | null;
```

Defined in: [types/core/dom.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L34)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `HTMLElement` | `HTMLElement` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `className` | `string` |

#### Returns

`T` \| `null`

***

### useGetElementById()

```ts
useGetElementById<T>(id): T | null;
```

Defined in: [types/core/dom.ts:33](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L33)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `HTMLElement` | `HTMLElement` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`T` \| `null`

***

### useGetRoot()

```ts
useGetRoot(): HTMLElement | null;
```

Defined in: [types/core/dom.ts:31](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L31)

#### Returns

`HTMLElement` \| `null`

***

### useHasClass()

```ts
useHasClass(target, className): boolean;
```

Defined in: [types/core/dom.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L46)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |

#### Returns

`boolean`

***

### useIsBrowser()

```ts
useIsBrowser(): boolean;
```

Defined in: [types/core/dom.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L30)

#### Returns

`boolean`

***

### useOn()

```ts
useOn<K>(
   target, 
   event, 
   callback, 
   options?
): (() => void) | null;
```

Defined in: [types/core/dom.ts:52](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L52)

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementEventMap` |

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

### useQuerySelector()

#### Call Signature

```ts
useQuerySelector<K>(selector): HTMLElementTagNameMap[K] | null;
```

Defined in: [types/core/dom.ts:35](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L35)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

#### Call Signature

```ts
useQuerySelector<E>(selector): E | null;
```

Defined in: [types/core/dom.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L38)

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `HTMLElement` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `string` |

##### Returns

`E` \| `null`

***

### useQuerySelectorAll()

#### Call Signature

```ts
useQuerySelectorAll<K>(selector): HTMLElementTagNameMap[K][];
```

Defined in: [types/core/dom.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L39)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\][]

#### Call Signature

```ts
useQuerySelectorAll<E>(selector): E[];
```

Defined in: [types/core/dom.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L42)

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `HTMLElement` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `string` |

##### Returns

`E`[]

***

### useRemove()

```ts
useRemove(target): void;
```

Defined in: [types/core/dom.ts:65](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L65)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |

#### Returns

`void`

***

### useRemoveAttribute()

```ts
useRemoveAttribute(target, attr): void;
```

Defined in: [types/core/dom.ts:49](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |

#### Returns

`void`

***

### useRemoveClass()

```ts
useRemoveClass(target, className): void;
```

Defined in: [types/core/dom.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L44)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` \| `string`[] |

#### Returns

`void`

***

### useSetAttribute()

```ts
useSetAttribute(
   target, 
   attr, 
   value
): void;
```

Defined in: [types/core/dom.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `attr` | `string` |
| `value` | `string` |

#### Returns

`void`

***

### useSetDataAttribute()

```ts
useSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [types/core/dom.ts:51](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L51)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `HTMLElement` |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

***

### useSetHtml()

```ts
useSetHtml(target, html): void;
```

Defined in: [types/core/dom.ts:62](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `html` | `string` |

#### Returns

`void`

***

### useSetText()

```ts
useSetText(target, text): void;
```

Defined in: [types/core/dom.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L63)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `text` | `string` |

#### Returns

`void`

***

### useToggleClass()

```ts
useToggleClass(
   target, 
   className, 
   force?
): boolean | undefined;
```

Defined in: [types/core/dom.ts:45](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/dom.ts#L45)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| `Element` |
| `className` | `string` |
| `force?` | `boolean` |

#### Returns

`boolean` \| `undefined`
