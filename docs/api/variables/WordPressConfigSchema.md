[katanakit-js](../index.md) / WordPressConfigSchema

# Variable: WordPressConfigSchema

```ts
const WordPressConfigSchema: ZodObject<{
  apiNamespace: ZodOptional<ZodString>;
  auth: ZodOptional<ZodDiscriminatedUnion<[ZodObject<{
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
  }, $strip>], "type">>;
  baseUrl: ZodString;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L29)

Configuration for the WordPress REST API integration.
