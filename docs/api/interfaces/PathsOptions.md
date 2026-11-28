[katanakit-js](../index.md) / PathsOptions

# Interface: PathsOptions\<T, TParam, TProps\>

Defined in: [types/adapters/astro.ts:15](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/astro.ts#L15)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | - |
| <a id="type-parameter-tparam"></a> `TParam` *extends* `string` | `string` |
| <a id="type-parameter-tprops"></a> `TProps` | `T` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="param"></a> `param?` | `TParam` | [types/adapters/astro.ts:16](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/astro.ts#L16) |
| <a id="paramsfrom"></a> `paramsFrom?` | (`item`) => `Record`\<`string`, `string`\> | [types/adapters/astro.ts:19](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/astro.ts#L19) |
| <a id="propsfrom"></a> `propsFrom?` | (`item`) => `TProps` | [types/adapters/astro.ts:18](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/astro.ts#L18) |
| <a id="valuefrom"></a> `valueFrom?` | (`item`) => `string` \| `number` | [types/adapters/astro.ts:17](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/astro.ts#L17) |
