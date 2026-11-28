[katanakit-js](../index.md) / PathsOptions

# Interface: PathsOptions\<T, TParam, TProps\>

Defined in: [types/astro/types.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/astro/types.ts#L16)

Options for building Astro paths from a collection.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | - |
| <a id="type-parameter-tparam"></a> `TParam` *extends* `string` | `string` |
| <a id="type-parameter-tprops"></a> `TProps` | `T` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="param"></a> `param?` | `TParam` | [types/astro/types.ts:17](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/astro/types.ts#L17) |
| <a id="paramsfrom"></a> `paramsFrom?` | (`item`) => `Record`\<`string`, `string`\> | [types/astro/types.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/astro/types.ts#L20) |
| <a id="propsfrom"></a> `propsFrom?` | (`item`) => `TProps` | [types/astro/types.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/astro/types.ts#L19) |
| <a id="valuefrom"></a> `valueFrom?` | (`item`) => `string` \| `number` | [types/astro/types.ts:18](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/astro/types.ts#L18) |
