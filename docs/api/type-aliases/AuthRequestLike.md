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

Defined in: [core/services/auth.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/auth.service.ts#L30)

Anything that carries the headers of an inbound request.
