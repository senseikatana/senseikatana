[katanakit-js](../index.md) / useQuerySelector

# Variable: useQuerySelector

```ts
const useQuerySelector: {
  <K>(selector): HTMLElementTagNameMap[K] | null;
  <E>(selector): E | null;
};
```

Defined in: [infrastructure/dom/dom.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L112)

Returns the first element matching a CSS selector.

## Call Signature

```ts
<K>(selector): HTMLElementTagNameMap[K] | null;
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

`HTMLElementTagNameMap`\[`K`\] \| `null`

## Call Signature

```ts
<E>(selector): E | null;
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

`E` \| `null`

## Type Param

**E**

The expected Element subtype.

## Param

**selector**

A CSS selector string.

## Returns

The matching element, or `null`.

## Example

```ts
const el = useQuerySelector<HTMLElement>(".my-class");
```
