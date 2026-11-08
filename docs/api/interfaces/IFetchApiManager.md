[katanakit-js](../index.md) / IFetchApiManager

# Interface: IFetchApiManager

Defined in: [types/core/http.ts:93](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L93)

Contract of the fetch facade.

## Methods

### useAddRequestInterceptor()

```ts
useAddRequestInterceptor(interceptor): () => void;
```

Defined in: [types/core/http.ts:97](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L97)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `interceptor` | [`RequestInterceptor`](../type-aliases/RequestInterceptor.md) |

#### Returns

() => `void`

***

### useBuildUrl()

```ts
useBuildUrl(
   apiName, 
   endpointName, 
   options?
): string;
```

Defined in: [types/core/http.ts:96](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L96)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`string`

***

### useDelete()

```ts
useDelete<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:136](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L136)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### useFetch()

```ts
useFetch<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L98)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`FetchOptions`](FetchOptions.md)\<`T`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### useFetchApi()

```ts
useFetchApi<T>(
   apiName, 
   endpointName, 
   options?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:103](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L103)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `options?` | [`FetchOptions`](FetchOptions.md)\<`T`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### useGet()

```ts
useGet<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:108](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L108)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### useGetApi()

```ts
useGetApi<T>(
   apiName, 
   endpointName, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:113](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L113)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>

***

### useGetApis()

```ts
useGetApis(): ApisConfig;
```

Defined in: [types/core/http.ts:94](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L94)

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

***

### useGetApisConfig()

```ts
useGetApisConfig(): ApisConfig;
```

Defined in: [types/core/http.ts:95](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L95)

#### Returns

[`ApisConfig`](../type-aliases/ApisConfig.md)

***

### usePatch()

```ts
usePatch<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:130](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L130)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

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

### usePost()

```ts
usePost<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L118)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

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

### usePut()

```ts
usePut<T>(
   apiName, 
   endpointName, 
   body?, 
   urlOptions?
): Promise<FetchResult<T>>;
```

Defined in: [types/core/http.ts:124](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/http.ts#L124)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `apiName` | `string` |
| `endpointName` | `string` |
| `body?` | `unknown` |
| `urlOptions?` | [`UrlOptions`](UrlOptions.md) |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>\>
