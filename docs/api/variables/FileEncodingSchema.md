[katanakit-js](../index.md) / FileEncodingSchema

# Variable: FileEncodingSchema

```ts
const FileEncodingSchema: ZodEnum<{
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
}>;
```

Defined in: [schemas/filesystem.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/filesystem.schema.ts#L4)

Text encodings accepted by the filesystem helpers.
