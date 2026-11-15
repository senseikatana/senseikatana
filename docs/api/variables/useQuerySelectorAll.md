[katanakit-js](../index.md) / useQuerySelectorAll

# Variable: useQuerySelectorAll

```ts
const useQuerySelectorAll: {
  <K>(selector): HTMLElementTagNameMap[K][];
  <E>(selector): E[];
};
```

Defined in: [infrastructure/dom/dom.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L133)

Returns all elements matching a CSS selector.

## Call Signature

```ts
<K>(selector): HTMLElementTagNameMap[K][];
```

### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-__typek"></a> `K` *extends* keyof `HTMLElementTagNameMap` |

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
| <a id="type-parameter-__typee"></a> `E` *extends* `Element` | `HTMLElement` |

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
