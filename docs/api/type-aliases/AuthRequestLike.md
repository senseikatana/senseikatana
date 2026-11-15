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

Defined in: [core/services/auth.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/auth.service.ts#L30)

Anything that carries the headers of an inbound request.
