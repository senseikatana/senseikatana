[katanakit-js](../index.md) / useQuerySelectorAll

# Variable: useQuerySelectorAll

```ts
const useQuerySelectorAll: {
<K>  (selector): HTMLElementTagNameMap[K][];
<E>  (selector): E[];
};
```

Defined in: [infrastructure/dom/dom.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L133)

Returns all elements matching a CSS selector.

## Call Signature

```ts
<K>(selector): HTMLElementTagNameMap[K][];
```

### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

### Returns

`HTMLElementTagNameMap`\[`K`\][]

## Call Signature

```ts
<E>(selector): E[];
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `HTMLElement` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `string` |

### Returns

`E`[]

## Type Param

**E**

The expected Element subtype.

## Param

**selector**

A CSS selector string.

## Returns

An array of matching elements.

## Example

```ts
const items = useQuerySelectorAll<HTMLLIElement>("li.item");
items.forEach(el => console.log(el.textContent));
```
