[katanakit-js](../index.md) / WordPressAuthSchema

# Variable: WordPressAuthSchema

```ts
const WordPressAuthSchema: ZodDiscriminatedUnion<[ZodObject<{
  password: ZodString;
  type: ZodLiteral<"application-passwords">;
  username: ZodString;
}, $strip>, ZodObject<{
  token: ZodString;
  type: ZodLiteral<"jwt">;
}, $strip>, ZodObject<{
  password: ZodString;
  type: ZodLiteral<"basic">;
  username: ZodString;
}, $strip>, ZodObject<{
  cookie: ZodString;
  nonce: ZodString;
  type: ZodLiteral<"nonce">;
}, $strip>], "type">;
```

Defined in: [schemas/wordpress.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L6)

Authentication methods for WordPress.
