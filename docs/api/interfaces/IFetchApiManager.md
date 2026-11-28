[katanakit-js](../index.md) / IFetchApiManager

# Interface: IFetchApiManager

Defined in: [types/core/http.ts:90](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L90)

Contract of the fetch facade.

## Methods

### onAddRequestInterceptor()

```ts
onAddRequestInterceptor(interceptor): () => void;
```

Defined in: [types/core/http.ts:94](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L94)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) |

#### Returns

() => `void`

***

### onBuildUrl()

```ts
onBuildUrl(
   apiName, 
   endpointName, 
   options?
): string;
```

Defined in: [types/core/http.ts:93](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`string`

***

### onDelete()

```ts
onDelete<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:133](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L133)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onFetch()

```ts
onFetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:95](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L95)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`FetchOptions`](FetchOptions.md)\<`T`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onFetchApi()

```ts
onFetchApi<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:100](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L100)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-2"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`FetchOptions`](FetchOptions.md)\<`T`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onGet()

```ts
onGet<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:105](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L105)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-3"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onGetApi()

```ts
onGetApi<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:110](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L110)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-4"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onGetApis()

```ts
onGetApis(): ApisConfig;
```

Defined in: [types/core/http.ts:91](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L91)

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

***

### onGetApisConfig()

```ts
onGetApisConfig(): ApisConfig;
```

Defined in: [types/core/http.ts:92](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L92)

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

***

### onPatch()

```ts
onPatch<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:127](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L127)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-5"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `body?` | `unknown` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onPost()

```ts
onPost<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:115](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L115)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-6"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `body?` | `unknown` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### onPut()

```ts
onPut<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:121](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/http.ts#L121)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-t-7"></a> `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `body?` | `unknown` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>
