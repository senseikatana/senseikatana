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

Defined in: [schemas/wordpress.schema.ts:576](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L576)

A WordPress settings object.
