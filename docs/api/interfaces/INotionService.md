[katanakit-js](../index.md) / INotionService

# Interface: INotionService

Defined in: [types/notion/types.ts:89](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L89)

Contract of the Notion adapter facade.

## Methods

### onNotionAppendBlocks()

```ts
onNotionAppendBlocks(blockId, children): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  created_time?: string;
  has_children?: boolean;
  id: string;
  last_edited_time?: string;
  object: "block";
  type: string;
}>>;
```

Defined in: [types/notion/types.ts:106](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L106)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |
| `children` | `unknown`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `created_time?`: `string`;
  `has_children?`: `boolean`;
  `id`: `string`;
  `last_edited_time?`: `string`;
  `object`: `"block"`;
  `type`: `string`;
\}\>\>

***

### onNotionArchivePage()

```ts
onNotionArchivePage(pageId): Promise<FetchResult<{
[key: string]: unknown;
  archived: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  created_time: string;
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  last_edited_time: string;
  object: "page";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     checkbox?: boolean;
     date?:   | {
      [key: string]: unknown;
        end?: string | null;
        start: string;
      }
        | null;
     email?: string | null;
     formula?: {
      [key: string]: unknown;
        boolean?: boolean;
        number?: number;
        string?: string;
        type: string;
     };
     id?: string;
     multi_select?: {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
     }[];
     number?: number;
     phone_number?: string | null;
     relation?: {
      [key: string]: unknown;
        id: string;
     }[];
     rich_text?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     rollup?: {
      [key: string]: unknown;
        number?: number;
        type: string;
     };
     select?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     status?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     title?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     type: string;
     url?: string | null;
  }>;
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:100](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L100)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pageId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `created_time`: `string`;
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `last_edited_time`: `string`;
  `object`: `"page"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `checkbox?`: `boolean`;
     `date?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `end?`: `string` \| `null`;
        `start`: `string`;
      \}
        \| `null`;
     `email?`: `string` \| `null`;
     `formula?`: \{
      \[`key`: `string`\]: `unknown`;
        `boolean?`: `boolean`;
        `number?`: `number`;
        `string?`: `string`;
        `type`: `string`;
     \};
     `id?`: `string`;
     `multi_select?`: \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
     \}[];
     `number?`: `number`;
     `phone_number?`: `string` \| `null`;
     `relation?`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
     \}[];
     `rich_text?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `rollup?`: \{
      \[`key`: `string`\]: `unknown`;
        `number?`: `number`;
        `type`: `string`;
     \};
     `select?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `status?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `title?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `type`: `string`;
     `url?`: `string` \| `null`;
  \}\>;
  `url`: `string`;
\}\>\>

***

### onNotionCreateDatabase()

```ts
onNotionCreateDatabase(
   parent, 
   title, 
   properties
): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_time: string;
  description: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_time: string;
  object: "database";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     id?: string;
     name?: string;
     type: string;
  }>;
  title: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:117](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L117)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parent` | \| \{ \[`key`: `string`\]: `unknown`; `database_id`: `string`; `type`: `"database_id"`; \} \| \{ \[`key`: `string`\]: `unknown`; `page_id`: `string`; `type`: `"page_id"`; \} \| \{ \[`key`: `string`\]: `unknown`; `type`: `"workspace"`; `workspace`: `true`; \} |
| `title` | \{ \[`key`: `string`\]: `unknown`; `annotations?`: \{ \[`key`: `string`\]: `unknown`; `bold?`: `boolean`; `code?`: `boolean`; `color?`: `string`; `italic?`: `boolean`; `strikethrough?`: `boolean`; `underline?`: `boolean`; \}; `href?`: `string` \| `null`; `plain_text?`: `string`; `text`: \{ \[`key`: `string`\]: `unknown`; `content`: `string`; `link?`: \| \{ \[`key`: `string`\]: `unknown`; `url`: `string`; \} \| `null`; \}; `type`: `"text"`; \}[] |
| `properties` | `Record`\<`string`, [`NotionPropertySchema`](../type-aliases/NotionPropertySchema.md)\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_time`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_time`: `string`;
  `object`: `"database"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `id?`: `string`;
     `name?`: `string`;
     `type`: `string`;
  \}\>;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `url`: `string`;
\}\>\>

***

### onNotionCreatePage()

```ts
onNotionCreatePage(
   parent, 
   properties, 
   children?
): Promise<FetchResult<{
[key: string]: unknown;
  archived: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  created_time: string;
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  last_edited_time: string;
  object: "page";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     checkbox?: boolean;
     date?:   | {
      [key: string]: unknown;
        end?: string | null;
        start: string;
      }
        | null;
     email?: string | null;
     formula?: {
      [key: string]: unknown;
        boolean?: boolean;
        number?: number;
        string?: string;
        type: string;
     };
     id?: string;
     multi_select?: {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
     }[];
     number?: number;
     phone_number?: string | null;
     relation?: {
      [key: string]: unknown;
        id: string;
     }[];
     rich_text?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     rollup?: {
      [key: string]: unknown;
        number?: number;
        type: string;
     };
     select?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     status?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     title?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     type: string;
     url?: string | null;
  }>;
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:91](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L91)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parent` | \| \{ \[`key`: `string`\]: `unknown`; `database_id`: `string`; `type`: `"database_id"`; \} \| \{ \[`key`: `string`\]: `unknown`; `page_id`: `string`; `type`: `"page_id"`; \} \| \{ \[`key`: `string`\]: `unknown`; `type`: `"workspace"`; `workspace`: `true`; \} |
| `properties` | `Record`\<`string`, `unknown`\> |
| `children?` | `unknown`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `created_time`: `string`;
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `last_edited_time`: `string`;
  `object`: `"page"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `checkbox?`: `boolean`;
     `date?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `end?`: `string` \| `null`;
        `start`: `string`;
      \}
        \| `null`;
     `email?`: `string` \| `null`;
     `formula?`: \{
      \[`key`: `string`\]: `unknown`;
        `boolean?`: `boolean`;
        `number?`: `number`;
        `string?`: `string`;
        `type`: `string`;
     \};
     `id?`: `string`;
     `multi_select?`: \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
     \}[];
     `number?`: `number`;
     `phone_number?`: `string` \| `null`;
     `relation?`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
     \}[];
     `rich_text?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `rollup?`: \{
      \[`key`: `string`\]: `unknown`;
        `number?`: `number`;
        `type`: `string`;
     \};
     `select?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `status?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `title?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `type`: `string`;
     `url?`: `string` \| `null`;
  \}\>;
  `url`: `string`;
\}\>\>

***

### onNotionDeleteBlock()

```ts
onNotionDeleteBlock(blockId): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  created_time?: string;
  has_children?: boolean;
  id: string;
  last_edited_time?: string;
  object: "block";
  type: string;
}>>;
```

Defined in: [types/notion/types.ts:111](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L111)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `created_time?`: `string`;
  `has_children?`: `boolean`;
  `id`: `string`;
  `last_edited_time?`: `string`;
  `object`: `"block"`;
  `type`: `string`;
\}\>\>

***

### onNotionGetBlock()

```ts
onNotionGetBlock(blockId): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  created_time?: string;
  has_children?: boolean;
  id: string;
  last_edited_time?: string;
  object: "block";
  type: string;
}>>;
```

Defined in: [types/notion/types.ts:101](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L101)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `created_time?`: `string`;
  `has_children?`: `boolean`;
  `id`: `string`;
  `last_edited_time?`: `string`;
  `object`: `"block"`;
  `type`: `string`;
\}\>\>

***

### onNotionGetBlockChildren()

```ts
onNotionGetBlockChildren(blockId, options?): Promise<FetchResult<{
[key: string]: unknown;
  block: Record<string, unknown>;
  has_more: boolean;
  next_cursor: string | null;
  object: "list";
  results: {
   [key: string]: unknown;
     archived?: boolean;
     created_time?: string;
     has_children?: boolean;
     id: string;
     last_edited_time?: string;
     object: "block";
     type: string;
  }[];
  type: "block";
}>>;
```

Defined in: [types/notion/types.ts:102](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L102)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |
| `options?` | \{ `page_size?`: `number`; `start_cursor?`: `string`; \} |
| `options.page_size?` | `number` |
| `options.start_cursor?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `block`: `Record`\<`string`, `unknown`\>;
  `has_more`: `boolean`;
  `next_cursor`: `string` \| `null`;
  `object`: `"list"`;
  `results`: \{
   \[`key`: `string`\]: `unknown`;
     `archived?`: `boolean`;
     `created_time?`: `string`;
     `has_children?`: `boolean`;
     `id`: `string`;
     `last_edited_time?`: `string`;
     `object`: `"block"`;
     `type`: `string`;
  \}[];
  `type`: `"block"`;
\}\>\>

***

### onNotionGetDatabase()

```ts
onNotionGetDatabase(databaseId): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_time: string;
  description: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_time: string;
  object: "database";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     id?: string;
     name?: string;
     type: string;
  }>;
  title: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:112](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L112)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `databaseId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_time`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_time`: `string`;
  `object`: `"database"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `id?`: `string`;
     `name?`: `string`;
     `type`: `string`;
  \}\>;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `url`: `string`;
\}\>\>

***

### onNotionGetPage()

```ts
onNotionGetPage(pageId): Promise<FetchResult<{
[key: string]: unknown;
  archived: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  created_time: string;
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  last_edited_time: string;
  object: "page";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     checkbox?: boolean;
     date?:   | {
      [key: string]: unknown;
        end?: string | null;
        start: string;
      }
        | null;
     email?: string | null;
     formula?: {
      [key: string]: unknown;
        boolean?: boolean;
        number?: number;
        string?: string;
        type: string;
     };
     id?: string;
     multi_select?: {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
     }[];
     number?: number;
     phone_number?: string | null;
     relation?: {
      [key: string]: unknown;
        id: string;
     }[];
     rich_text?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     rollup?: {
      [key: string]: unknown;
        number?: number;
        type: string;
     };
     select?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     status?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     title?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     type: string;
     url?: string | null;
  }>;
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:90](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L90)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pageId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `created_time`: `string`;
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `last_edited_time`: `string`;
  `object`: `"page"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `checkbox?`: `boolean`;
     `date?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `end?`: `string` \| `null`;
        `start`: `string`;
      \}
        \| `null`;
     `email?`: `string` \| `null`;
     `formula?`: \{
      \[`key`: `string`\]: `unknown`;
        `boolean?`: `boolean`;
        `number?`: `number`;
        `string?`: `string`;
        `type`: `string`;
     \};
     `id?`: `string`;
     `multi_select?`: \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
     \}[];
     `number?`: `number`;
     `phone_number?`: `string` \| `null`;
     `relation?`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
     \}[];
     `rich_text?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `rollup?`: \{
      \[`key`: `string`\]: `unknown`;
        `number?`: `number`;
        `type`: `string`;
     \};
     `select?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `status?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `title?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `type`: `string`;
     `url?`: `string` \| `null`;
  \}\>;
  `url`: `string`;
\}\>\>

***

### onNotionGetUser()

```ts
onNotionGetUser(userId): Promise<FetchResult<{
[key: string]: unknown;
  avatar_url?: string;
  bot?: {
   [key: string]: unknown;
     owner: {
      [key: string]: unknown;
        type: string;
     };
  };
  id: string;
  name?: string;
  object: "user";
  person?: {
   [key: string]: unknown;
     email?: string;
  };
  type: "person" | "bot";
}>>;
```

Defined in: [types/notion/types.ts:127](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L127)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `userId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `avatar_url?`: `string`;
  `bot?`: \{
   \[`key`: `string`\]: `unknown`;
     `owner`: \{
      \[`key`: `string`\]: `unknown`;
        `type`: `string`;
     \};
  \};
  `id`: `string`;
  `name?`: `string`;
  `object`: `"user"`;
  `person?`: \{
   \[`key`: `string`\]: `unknown`;
     `email?`: `string`;
  \};
  `type`: `"person"` \| `"bot"`;
\}\>\>

***

### onNotionListAllBlockChildren()

```ts
onNotionListAllBlockChildren(blockId): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  created_time?: string;
  has_children?: boolean;
  id: string;
  last_edited_time?: string;
  object: "block";
  type: string;
}[]>>;
```

Defined in: [types/notion/types.ts:133](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L133)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `created_time?`: `string`;
  `has_children?`: `boolean`;
  `id`: `string`;
  `last_edited_time?`: `string`;
  `object`: `"block"`;
  `type`: `string`;
\}[]\>\>

***

### onNotionListAllDatabasePages()

```ts
onNotionListAllDatabasePages(
   databaseId, 
   filter?, 
   sorts?
): Promise<FetchResult<{
[key: string]: unknown;
  archived: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  created_time: string;
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  last_edited_time: string;
  object: "page";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     checkbox?: boolean;
     date?:   | {
      [key: string]: unknown;
        end?: string | null;
        start: string;
      }
        | null;
     email?: string | null;
     formula?: {
      [key: string]: unknown;
        boolean?: boolean;
        number?: number;
        string?: string;
        type: string;
     };
     id?: string;
     multi_select?: {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
     }[];
     number?: number;
     phone_number?: string | null;
     relation?: {
      [key: string]: unknown;
        id: string;
     }[];
     rich_text?: {
      [key: string]: unknown;
        annotations?: {
         [key: ...]: ...;
           bold?: ...;
           code?: ...;
           color?: ...;
           italic?: ...;
           strikethrough?: ...;
           underline?: ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?: ... | ... | ...;
        };
        type: "text";
     }[];
     rollup?: {
      [key: string]: unknown;
        number?: number;
        type: string;
     };
     select?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     status?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     title?: {
      [key: string]: unknown;
        annotations?: {
         [key: ...]: ...;
           bold?: ...;
           code?: ...;
           color?: ...;
           italic?: ...;
           strikethrough?: ...;
           underline?: ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?: ... | ... | ...;
        };
        type: "text";
     }[];
     type: string;
     url?: string | null;
  }>;
  url: string;
}[]>>;
```

Defined in: [types/notion/types.ts:134](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L134)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `databaseId` | `string` |
| `filter?` | [`NotionFilter`](NotionFilter.md) |
| `sorts?` | \{ `direction`: `"ascending"` \| `"descending"`; `property?`: `string`; `timestamp?`: `"created_time"` \| `"last_edited_time"`; \}[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `created_time`: `string`;
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `last_edited_time`: `string`;
  `object`: `"page"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `checkbox?`: `boolean`;
     `date?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `end?`: `string` \| `null`;
        `start`: `string`;
      \}
        \| `null`;
     `email?`: `string` \| `null`;
     `formula?`: \{
      \[`key`: `string`\]: `unknown`;
        `boolean?`: `boolean`;
        `number?`: `number`;
        `string?`: `string`;
        `type`: `string`;
     \};
     `id?`: `string`;
     `multi_select?`: \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
     \}[];
     `number?`: `number`;
     `phone_number?`: `string` \| `null`;
     `relation?`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
     \}[];
     `rich_text?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: ...\]: ...;
           `bold?`: ...;
           `code?`: ...;
           `color?`: ...;
           `italic?`: ...;
           `strikethrough?`: ...;
           `underline?`: ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`: ... \| ... \| ...;
        \};
        `type`: `"text"`;
     \}[];
     `rollup?`: \{
      \[`key`: `string`\]: `unknown`;
        `number?`: `number`;
        `type`: `string`;
     \};
     `select?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `status?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `title?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: ...\]: ...;
           `bold?`: ...;
           `code?`: ...;
           `color?`: ...;
           `italic?`: ...;
           `strikethrough?`: ...;
           `underline?`: ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`: ... \| ... \| ...;
        \};
        `type`: `"text"`;
     \}[];
     `type`: `string`;
     `url?`: `string` \| `null`;
  \}\>;
  `url`: `string`;
\}[]\>\>

***

### onNotionListUsers()

```ts
onNotionListUsers(options?): Promise<FetchResult<{
[key: string]: unknown;
  has_more: boolean;
  next_cursor: string | null;
  object: "list";
  results: {
   [key: string]: unknown;
     avatar_url?: string;
     bot?: {
      [key: string]: unknown;
        owner: {
         [key: string]: unknown;
           type: string;
        };
     };
     id: string;
     name?: string;
     object: "user";
     person?: {
      [key: string]: unknown;
        email?: string;
     };
     type: "person" | "bot";
  }[];
}>>;
```

Defined in: [types/notion/types.ts:128](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L128)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ `page_size?`: `number`; `start_cursor?`: `string`; \} |
| `options.page_size?` | `number` |
| `options.start_cursor?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `has_more`: `boolean`;
  `next_cursor`: `string` \| `null`;
  `object`: `"list"`;
  `results`: \{
   \[`key`: `string`\]: `unknown`;
     `avatar_url?`: `string`;
     `bot?`: \{
      \[`key`: `string`\]: `unknown`;
        `owner`: \{
         \[`key`: `string`\]: `unknown`;
           `type`: `string`;
        \};
     \};
     `id`: `string`;
     `name?`: `string`;
     `object`: `"user"`;
     `person?`: \{
      \[`key`: `string`\]: `unknown`;
        `email?`: `string`;
     \};
     `type`: `"person"` \| `"bot"`;
  \}[];
\}\>\>

***

### onNotionQueryDatabase()

```ts
onNotionQueryDatabase(databaseId, query?): Promise<FetchResult<{
[key: string]: unknown;
  has_more: boolean;
  next_cursor: string | null;
  object: "list";
  page: Record<string, unknown>;
  results: {
   [key: string]: unknown;
     archived: boolean;
     cover?:   | {
      [key: string]: unknown;
        external: {
         [key: string]: unknown;
           url: string;
        };
        type: "external";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     created_by: {
      [key: string]: unknown;
        id: string;
        object: "user";
     };
     created_time: string;
     icon?:   | {
      [key: string]: unknown;
        emoji: string;
        type: "emoji";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     id: string;
     last_edited_by: {
      [key: string]: unknown;
        id: string;
        object: "user";
     };
     last_edited_time: string;
     object: "page";
     parent:   | {
      [key: string]: unknown;
        database_id: string;
        type: "database_id";
      }
        | {
      [key: string]: unknown;
        page_id: string;
        type: "page_id";
      }
        | {
      [key: string]: unknown;
        type: "workspace";
        workspace: true;
      };
     properties: Record<string, {
      [key: string]: unknown;
        checkbox?: boolean;
        date?:   | {
         [key: string]: unknown;
           end?: string | null;
           start: string;
         }
           | null;
        email?: string | null;
        formula?: {
         [key: string]: unknown;
           boolean?: boolean;
           number?: number;
           string?: string;
           type: string;
        };
        id?: string;
        multi_select?: {
         [key: string]: unknown;
           color?: ... | ...;
           id: string;
           name: string;
        }[];
        number?: number;
        phone_number?: string | null;
        relation?: {
         [key: string]: unknown;
           id: string;
        }[];
        rich_text?: {
         [key: string]: unknown;
           annotations?: ... | ...;
           href?: ... | ... | ...;
           plain_text?: ... | ...;
           text: {
            [key: ...]: ...;
              content: ...;
              link?: ...;
           };
           type: "text";
        }[];
        rollup?: {
         [key: string]: unknown;
           number?: number;
           type: string;
        };
        select?:   | {
         [key: string]: unknown;
           color?: string;
           id: string;
           name: string;
         }
           | null;
        status?:   | {
         [key: string]: unknown;
           color?: string;
           id: string;
           name: string;
         }
           | null;
        title?: {
         [key: string]: unknown;
           annotations?: ... | ...;
           href?: ... | ... | ...;
           plain_text?: ... | ...;
           text: {
            [key: ...]: ...;
              content: ...;
              link?: ...;
           };
           type: "text";
        }[];
        type: string;
        url?: string | null;
     }>;
     url: string;
  }[];
  type: "page";
}>>;
```

Defined in: [types/notion/types.ts:113](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L113)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `databaseId` | `string` |
| `query?` | \{ `filter?`: [`NotionFilter`](NotionFilter.md); `page_size?`: `number`; `sorts?`: \{ `direction`: `"ascending"` \| `"descending"`; `property?`: `string`; `timestamp?`: `"created_time"` \| `"last_edited_time"`; \}[]; `start_cursor?`: `string`; \} |
| `query.filter?` | [`NotionFilter`](NotionFilter.md) |
| `query.page_size?` | `number` |
| `query.sorts?` | \{ `direction`: `"ascending"` \| `"descending"`; `property?`: `string`; `timestamp?`: `"created_time"` \| `"last_edited_time"`; \}[] |
| `query.start_cursor?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `has_more`: `boolean`;
  `next_cursor`: `string` \| `null`;
  `object`: `"list"`;
  `page`: `Record`\<`string`, `unknown`\>;
  `results`: \{
   \[`key`: `string`\]: `unknown`;
     `archived`: `boolean`;
     `cover?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `external`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"external"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `created_by`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
        `object`: `"user"`;
     \};
     `created_time`: `string`;
     `icon?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `emoji`: `string`;
        `type`: `"emoji"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `id`: `string`;
     `last_edited_by`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
        `object`: `"user"`;
     \};
     `last_edited_time`: `string`;
     `object`: `"page"`;
     `parent`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `database_id`: `string`;
        `type`: `"database_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `page_id`: `string`;
        `type`: `"page_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `type`: `"workspace"`;
        `workspace`: `true`;
      \};
     `properties`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `checkbox?`: `boolean`;
        `date?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `end?`: `string` \| `null`;
           `start`: `string`;
         \}
           \| `null`;
        `email?`: `string` \| `null`;
        `formula?`: \{
         \[`key`: `string`\]: `unknown`;
           `boolean?`: `boolean`;
           `number?`: `number`;
           `string?`: `string`;
           `type`: `string`;
        \};
        `id?`: `string`;
        `multi_select?`: \{
         \[`key`: `string`\]: `unknown`;
           `color?`: ... \| ...;
           `id`: `string`;
           `name`: `string`;
        \}[];
        `number?`: `number`;
        `phone_number?`: `string` \| `null`;
        `relation?`: \{
         \[`key`: `string`\]: `unknown`;
           `id`: `string`;
        \}[];
        `rich_text?`: \{
         \[`key`: `string`\]: `unknown`;
           `annotations?`: ... \| ...;
           `href?`: ... \| ... \| ...;
           `plain_text?`: ... \| ...;
           `text`: \{
            \[`key`: ...\]: ...;
              `content`: ...;
              `link?`: ...;
           \};
           `type`: `"text"`;
        \}[];
        `rollup?`: \{
         \[`key`: `string`\]: `unknown`;
           `number?`: `number`;
           `type`: `string`;
        \};
        `select?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `color?`: `string`;
           `id`: `string`;
           `name`: `string`;
         \}
           \| `null`;
        `status?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `color?`: `string`;
           `id`: `string`;
           `name`: `string`;
         \}
           \| `null`;
        `title?`: \{
         \[`key`: `string`\]: `unknown`;
           `annotations?`: ... \| ...;
           `href?`: ... \| ... \| ...;
           `plain_text?`: ... \| ...;
           `text`: \{
            \[`key`: ...\]: ...;
              `content`: ...;
              `link?`: ...;
           \};
           `type`: `"text"`;
        \}[];
        `type`: `string`;
        `url?`: `string` \| `null`;
     \}\>;
     `url`: `string`;
  \}[];
  `type`: `"page"`;
\}\>\>

***

### onNotionSearchContent()

```ts
onNotionSearchContent(query): Promise<FetchResult<{
[key: string]: unknown;
  has_more: boolean;
  next_cursor: string | null;
  object: "list";
  results: (
     | {
   [key: string]: unknown;
     archived: boolean;
     cover?:   | {
      [key: string]: unknown;
        external: {
         [key: string]: unknown;
           url: string;
        };
        type: "external";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     created_by: {
      [key: string]: unknown;
        id: string;
        object: "user";
     };
     created_time: string;
     icon?:   | {
      [key: string]: unknown;
        emoji: string;
        type: "emoji";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     id: string;
     last_edited_by: {
      [key: string]: unknown;
        id: string;
        object: "user";
     };
     last_edited_time: string;
     object: "page";
     parent:   | {
      [key: string]: unknown;
        database_id: string;
        type: "database_id";
      }
        | {
      [key: string]: unknown;
        page_id: string;
        type: "page_id";
      }
        | {
      [key: string]: unknown;
        type: "workspace";
        workspace: true;
      };
     properties: Record<string, {
      [key: string]: unknown;
        checkbox?: boolean;
        date?:   | {
         [key: string]: unknown;
           end?: ... | ... | ...;
           start: string;
         }
           | null;
        email?: string | null;
        formula?: {
         [key: string]: unknown;
           boolean?: ... | ... | ...;
           number?: ... | ...;
           string?: ... | ...;
           type: string;
        };
        id?: string;
        multi_select?: {
         [key: ...]: ...;
           color?: ...;
           id: ...;
           name: ...;
        }[];
        number?: number;
        phone_number?: string | null;
        relation?: {
         [key: ...]: ...;
           id: ...;
        }[];
        rich_text?: {
         [key: ...]: ...;
           annotations?: ...;
           href?: ...;
           plain_text?: ...;
           text: ...;
           type: ...;
        }[];
        rollup?: {
         [key: string]: unknown;
           number?: ... | ...;
           type: string;
        };
        select?:   | {
         [key: string]: unknown;
           color?: ... | ...;
           id: string;
           name: string;
         }
           | null;
        status?:   | {
         [key: string]: unknown;
           color?: ... | ...;
           id: string;
           name: string;
         }
           | null;
        title?: {
         [key: ...]: ...;
           annotations?: ...;
           href?: ...;
           plain_text?: ...;
           text: ...;
           type: ...;
        }[];
        type: string;
        url?: string | null;
     }>;
     url: string;
   }
     | {
   [key: string]: unknown;
     archived?: boolean;
     cover?:   | {
      [key: string]: unknown;
        external: {
         [key: string]: unknown;
           url: string;
        };
        type: "external";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     created_time: string;
     description: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     icon?:   | {
      [key: string]: unknown;
        emoji: string;
        type: "emoji";
      }
        | {
      [key: string]: unknown;
        file: {
         [key: string]: unknown;
           url: string;
        };
        type: "file";
      }
        | null;
     id: string;
     last_edited_time: string;
     object: "database";
     parent:   | {
      [key: string]: unknown;
        database_id: string;
        type: "database_id";
      }
        | {
      [key: string]: unknown;
        page_id: string;
        type: "page_id";
      }
        | {
      [key: string]: unknown;
        type: "workspace";
        workspace: true;
      };
     properties: Record<string, {
      [key: string]: unknown;
        id?: string;
        name?: string;
        type: string;
     }>;
     title: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     url: string;
  })[];
}>>;
```

Defined in: [types/notion/types.ts:132](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L132)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | \{ `filter?`: \{ `property`: `"object"`; `value`: `"page"` \| `"database"`; \}; `page_size?`: `number`; `query?`: `string`; `sort?`: \{ `direction`: `"ascending"` \| `"descending"`; `timestamp`: `"last_edited_time"`; \}; `start_cursor?`: `string`; \} |
| `query.filter?` | \{ `property`: `"object"`; `value`: `"page"` \| `"database"`; \} |
| `query.filter.property?` | `"object"` |
| `query.filter.value?` | `"page"` \| `"database"` |
| `query.page_size?` | `number` |
| `query.query?` | `string` |
| `query.sort?` | \{ `direction`: `"ascending"` \| `"descending"`; `timestamp`: `"last_edited_time"`; \} |
| `query.sort.direction?` | `"ascending"` \| `"descending"` |
| `query.sort.timestamp?` | `"last_edited_time"` |
| `query.start_cursor?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `has_more`: `boolean`;
  `next_cursor`: `string` \| `null`;
  `object`: `"list"`;
  `results`: (
     \| \{
   \[`key`: `string`\]: `unknown`;
     `archived`: `boolean`;
     `cover?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `external`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"external"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `created_by`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
        `object`: `"user"`;
     \};
     `created_time`: `string`;
     `icon?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `emoji`: `string`;
        `type`: `"emoji"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `id`: `string`;
     `last_edited_by`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
        `object`: `"user"`;
     \};
     `last_edited_time`: `string`;
     `object`: `"page"`;
     `parent`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `database_id`: `string`;
        `type`: `"database_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `page_id`: `string`;
        `type`: `"page_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `type`: `"workspace"`;
        `workspace`: `true`;
      \};
     `properties`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `checkbox?`: `boolean`;
        `date?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `end?`: ... \| ... \| ...;
           `start`: `string`;
         \}
           \| `null`;
        `email?`: `string` \| `null`;
        `formula?`: \{
         \[`key`: `string`\]: `unknown`;
           `boolean?`: ... \| ... \| ...;
           `number?`: ... \| ...;
           `string?`: ... \| ...;
           `type`: `string`;
        \};
        `id?`: `string`;
        `multi_select?`: \{
         \[`key`: ...\]: ...;
           `color?`: ...;
           `id`: ...;
           `name`: ...;
        \}[];
        `number?`: `number`;
        `phone_number?`: `string` \| `null`;
        `relation?`: \{
         \[`key`: ...\]: ...;
           `id`: ...;
        \}[];
        `rich_text?`: \{
         \[`key`: ...\]: ...;
           `annotations?`: ...;
           `href?`: ...;
           `plain_text?`: ...;
           `text`: ...;
           `type`: ...;
        \}[];
        `rollup?`: \{
         \[`key`: `string`\]: `unknown`;
           `number?`: ... \| ...;
           `type`: `string`;
        \};
        `select?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `color?`: ... \| ...;
           `id`: `string`;
           `name`: `string`;
         \}
           \| `null`;
        `status?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `color?`: ... \| ...;
           `id`: `string`;
           `name`: `string`;
         \}
           \| `null`;
        `title?`: \{
         \[`key`: ...\]: ...;
           `annotations?`: ...;
           `href?`: ...;
           `plain_text?`: ...;
           `text`: ...;
           `type`: ...;
        \}[];
        `type`: `string`;
        `url?`: `string` \| `null`;
     \}\>;
     `url`: `string`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `archived?`: `boolean`;
     `cover?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `external`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"external"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `created_time`: `string`;
     `description`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `icon?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `emoji`: `string`;
        `type`: `"emoji"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `file`: \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
        \};
        `type`: `"file"`;
      \}
        \| `null`;
     `id`: `string`;
     `last_edited_time`: `string`;
     `object`: `"database"`;
     `parent`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `database_id`: `string`;
        `type`: `"database_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `page_id`: `string`;
        `type`: `"page_id"`;
      \}
        \| \{
      \[`key`: `string`\]: `unknown`;
        `type`: `"workspace"`;
        `workspace`: `true`;
      \};
     `properties`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `id?`: `string`;
        `name?`: `string`;
        `type`: `string`;
     \}\>;
     `title`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `url`: `string`;
  \})[];
\}\>\>

***

### onNotionUpdateBlock()

```ts
onNotionUpdateBlock(blockId, content): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  created_time?: string;
  has_children?: boolean;
  id: string;
  last_edited_time?: string;
  object: "block";
  type: string;
}>>;
```

Defined in: [types/notion/types.ts:107](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L107)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockId` | `string` |
| `content` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `created_time?`: `string`;
  `has_children?`: `boolean`;
  `id`: `string`;
  `last_edited_time?`: `string`;
  `object`: `"block"`;
  `type`: `string`;
\}\>\>

***

### onNotionUpdateDatabase()

```ts
onNotionUpdateDatabase(
   databaseId, 
   title, 
   properties?
): Promise<FetchResult<{
[key: string]: unknown;
  archived?: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_time: string;
  description: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_time: string;
  object: "database";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     id?: string;
     name?: string;
     type: string;
  }>;
  title: {
   [key: string]: unknown;
     annotations?: {
      [key: string]: unknown;
        bold?: boolean;
        code?: boolean;
        color?: string;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
     };
     href?: string | null;
     plain_text?: string;
     text: {
      [key: string]: unknown;
        content: string;
        link?:   | {
         [key: string]: unknown;
           url: string;
         }
           | null;
     };
     type: "text";
  }[];
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:122](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L122)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `databaseId` | `string` |
| `title` | \{ \[`key`: `string`\]: `unknown`; `annotations?`: \{ \[`key`: `string`\]: `unknown`; `bold?`: `boolean`; `code?`: `boolean`; `color?`: `string`; `italic?`: `boolean`; `strikethrough?`: `boolean`; `underline?`: `boolean`; \}; `href?`: `string` \| `null`; `plain_text?`: `string`; `text`: \{ \[`key`: `string`\]: `unknown`; `content`: `string`; `link?`: \| \{ \[`key`: `string`\]: `unknown`; `url`: `string`; \} \| `null`; \}; `type`: `"text"`; \}[] |
| `properties?` | `Record`\<`string`, \{ \[`key`: `string`\]: `unknown`; `id?`: `string`; `name?`: `string`; `type`: `string`; \}\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived?`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_time`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_time`: `string`;
  `object`: `"database"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `id?`: `string`;
     `name?`: `string`;
     `type`: `string`;
  \}\>;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `annotations?`: \{
      \[`key`: `string`\]: `unknown`;
        `bold?`: `boolean`;
        `code?`: `boolean`;
        `color?`: `string`;
        `italic?`: `boolean`;
        `strikethrough?`: `boolean`;
        `underline?`: `boolean`;
     \};
     `href?`: `string` \| `null`;
     `plain_text?`: `string`;
     `text`: \{
      \[`key`: `string`\]: `unknown`;
        `content`: `string`;
        `link?`:   \| \{
         \[`key`: `string`\]: `unknown`;
           `url`: `string`;
         \}
           \| `null`;
     \};
     `type`: `"text"`;
  \}[];
  `url`: `string`;
\}\>\>

***

### onNotionUpdatePage()

```ts
onNotionUpdatePage(pageId, properties): Promise<FetchResult<{
[key: string]: unknown;
  archived: boolean;
  cover?:   | {
   [key: string]: unknown;
     external: {
      [key: string]: unknown;
        url: string;
     };
     type: "external";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  created_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  created_time: string;
  icon?:   | {
   [key: string]: unknown;
     emoji: string;
     type: "emoji";
   }
     | {
   [key: string]: unknown;
     file: {
      [key: string]: unknown;
        url: string;
     };
     type: "file";
   }
     | null;
  id: string;
  last_edited_by: {
   [key: string]: unknown;
     id: string;
     object: "user";
  };
  last_edited_time: string;
  object: "page";
  parent:   | {
   [key: string]: unknown;
     database_id: string;
     type: "database_id";
   }
     | {
   [key: string]: unknown;
     page_id: string;
     type: "page_id";
   }
     | {
   [key: string]: unknown;
     type: "workspace";
     workspace: true;
   };
  properties: Record<string, {
   [key: string]: unknown;
     checkbox?: boolean;
     date?:   | {
      [key: string]: unknown;
        end?: string | null;
        start: string;
      }
        | null;
     email?: string | null;
     formula?: {
      [key: string]: unknown;
        boolean?: boolean;
        number?: number;
        string?: string;
        type: string;
     };
     id?: string;
     multi_select?: {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
     }[];
     number?: number;
     phone_number?: string | null;
     relation?: {
      [key: string]: unknown;
        id: string;
     }[];
     rich_text?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     rollup?: {
      [key: string]: unknown;
        number?: number;
        type: string;
     };
     select?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     status?:   | {
      [key: string]: unknown;
        color?: string;
        id: string;
        name: string;
      }
        | null;
     title?: {
      [key: string]: unknown;
        annotations?: {
         [key: string]: unknown;
           bold?: ... | ... | ...;
           code?: ... | ... | ...;
           color?: ... | ...;
           italic?: ... | ... | ...;
           strikethrough?: ... | ... | ...;
           underline?: ... | ... | ...;
        };
        href?: string | null;
        plain_text?: string;
        text: {
         [key: string]: unknown;
           content: string;
           link?:   | {
            [key: ...]: ...;
              url: ...;
            }
              | null;
        };
        type: "text";
     }[];
     type: string;
     url?: string | null;
  }>;
  url: string;
}>>;
```

Defined in: [types/notion/types.ts:96](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/notion/types.ts#L96)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pageId` | `string` |
| `properties` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `archived`: `boolean`;
  `cover?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `external`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"external"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `created_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `created_time`: `string`;
  `icon?`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `emoji`: `string`;
     `type`: `"emoji"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `file`: \{
      \[`key`: `string`\]: `unknown`;
        `url`: `string`;
     \};
     `type`: `"file"`;
   \}
     \| `null`;
  `id`: `string`;
  `last_edited_by`: \{
   \[`key`: `string`\]: `unknown`;
     `id`: `string`;
     `object`: `"user"`;
  \};
  `last_edited_time`: `string`;
  `object`: `"page"`;
  `parent`:   \| \{
   \[`key`: `string`\]: `unknown`;
     `database_id`: `string`;
     `type`: `"database_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `page_id`: `string`;
     `type`: `"page_id"`;
   \}
     \| \{
   \[`key`: `string`\]: `unknown`;
     `type`: `"workspace"`;
     `workspace`: `true`;
   \};
  `properties`: `Record`\<`string`, \{
   \[`key`: `string`\]: `unknown`;
     `checkbox?`: `boolean`;
     `date?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `end?`: `string` \| `null`;
        `start`: `string`;
      \}
        \| `null`;
     `email?`: `string` \| `null`;
     `formula?`: \{
      \[`key`: `string`\]: `unknown`;
        `boolean?`: `boolean`;
        `number?`: `number`;
        `string?`: `string`;
        `type`: `string`;
     \};
     `id?`: `string`;
     `multi_select?`: \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
     \}[];
     `number?`: `number`;
     `phone_number?`: `string` \| `null`;
     `relation?`: \{
      \[`key`: `string`\]: `unknown`;
        `id`: `string`;
     \}[];
     `rich_text?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `rollup?`: \{
      \[`key`: `string`\]: `unknown`;
        `number?`: `number`;
        `type`: `string`;
     \};
     `select?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `status?`:   \| \{
      \[`key`: `string`\]: `unknown`;
        `color?`: `string`;
        `id`: `string`;
        `name`: `string`;
      \}
        \| `null`;
     `title?`: \{
      \[`key`: `string`\]: `unknown`;
        `annotations?`: \{
         \[`key`: `string`\]: `unknown`;
           `bold?`: ... \| ... \| ...;
           `code?`: ... \| ... \| ...;
           `color?`: ... \| ...;
           `italic?`: ... \| ... \| ...;
           `strikethrough?`: ... \| ... \| ...;
           `underline?`: ... \| ... \| ...;
        \};
        `href?`: `string` \| `null`;
        `plain_text?`: `string`;
        `text`: \{
         \[`key`: `string`\]: `unknown`;
           `content`: `string`;
           `link?`:   \| \{
            \[`key`: ...\]: ...;
              `url`: ...;
            \}
              \| `null`;
        \};
        `type`: `"text"`;
     \}[];
     `type`: `string`;
     `url?`: `string` \| `null`;
  \}\>;
  `url`: `string`;
\}\>\>
