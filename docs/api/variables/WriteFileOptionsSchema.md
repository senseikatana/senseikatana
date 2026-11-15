[katanakit-js](../index.md) / WriteFileOptionsSchema

# Variable: WriteFileOptionsSchema

```ts
const WriteFileOptionsSchema: ZodObject<{
  encoding: ZodOptional<ZodEnum<{
     ascii: "ascii";
     base64: "base64";
     base64url: "base64url";
     binary: "binary";
     hex: "hex";
     latin1: "latin1";
     "ucs-2": "ucs-2";
     ucs2: "ucs2";
     "utf-16le": "utf-16le";
     "utf-8": "utf-8";
     utf16le: "utf16le";
     utf8: "utf8";
  }>>;
  flag: ZodOptional<ZodString>;
  mode: ZodOptional<ZodNumber>;
}, $strip>;
```

Defined in: [schemas/filesystem.schema.ts:58](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/filesystem.schema.ts#L58)

Options for writing or appending files.
