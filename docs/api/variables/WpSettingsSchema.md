[katanakit-js](../index.md) / WpSettingsSchema

# Variable: WpSettingsSchema

```ts
const WpSettingsSchema: ZodObject<{
  date_format: ZodString;
  default_category: ZodNumber;
  default_comment_status: ZodString;
  default_ping_status: ZodString;
  default_post_format: ZodString;
  description: ZodString;
  email: ZodString;
  language: ZodString;
  posts_per_page: ZodNumber;
  start_of_week: ZodNumber;
  time_format: ZodString;
  timezone: ZodString;
  title: ZodString;
  url: ZodString;
  use_smilies: ZodBoolean;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:576](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L576)

A WordPress settings object.
