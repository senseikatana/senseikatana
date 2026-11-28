[katanakit-js](../index.md) / AuthRequestLike

# Type Alias: AuthRequestLike

```ts
type AuthRequestLike = 
  | Request
  | Headers
  | {
  headers: Headers;
};
```

Defined in: [core/services/auth.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/auth.service.ts#L30)

Anything that carries the headers of an inbound request.
