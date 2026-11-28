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

Defined in: [core/services/auth.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/auth.service.ts#L30)

Anything that carries the headers of an inbound request.
