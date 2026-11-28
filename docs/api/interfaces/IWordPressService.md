[katanakit-js](../index.md) / IWordPressService

# Interface: IWordPressService

Defined in: [types/wordpress/types.ts:192](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L192)

Contract of the WordPress adapter facade.

## Methods

### onWpAssignRole()

```ts
onWpAssignRole(userId, role): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:236](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L236)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `userId` | `number` |
| `role` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpAsSubject()

```ts
onWpAsSubject(user): {
[key: string]: unknown;
  id: string | number;
  roles: string[];
};
```

Defined in: [types/wordpress/types.ts:235](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L235)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `user` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `avatar_urls`: `Record`\<`string`, `string`\>; `capabilities`: `Record`\<`string`, `boolean`\>; `description`: `string`; `email`: `string`; `extra_capabilities`: `Record`\<`string`, `boolean`\>; `first_name`: `string`; `id`: `number`; `last_name`: `string`; `link`: `string`; `locale`: `string`; `meta`: `Record`\<`string`, `unknown`\>; `name`: `string`; `nickname`: `string`; `registered_date`: `string`; `roles`: `string`[]; `slug`: `string`; `url`: `string`; `username`: `string`; \} |
| `user.acf?` | `Record`\<`string`, `unknown`\> |
| `user.avatar_urls?` | `Record`\<`string`, `string`\> |
| `user.capabilities?` | `Record`\<`string`, `boolean`\> |
| `user.description?` | `string` |
| `user.email?` | `string` |
| `user.extra_capabilities?` | `Record`\<`string`, `boolean`\> |
| `user.first_name?` | `string` |
| `user.id?` | `number` |
| `user.last_name?` | `string` |
| `user.link?` | `string` |
| `user.locale?` | `string` |
| `user.meta?` | `Record`\<`string`, `unknown`\> |
| `user.name?` | `string` |
| `user.nickname?` | `string` |
| `user.registered_date?` | `string` |
| `user.roles?` | `string`[] |
| `user.slug?` | `string` |
| `user.url?` | `string` |
| `user.username?` | `string` |

#### Returns

```ts
{
[key: string]: unknown;
  id: string | number;
  roles: string[];
}
```

##### id

```ts
id: string | number;
```

##### roles

```ts
roles: string[];
```

***

### onWpAuditRole()

```ts
onWpAuditRole(slug, maxHolders?): Promise<FetchResult<{
  declared: string[];
  granted: string[];
  holders: number;
  missing: string[];
  slug: string;
  status: "verified" | "partial" | "unverifiable";
  undeclared: string[];
}>>;
```

Defined in: [types/wordpress/types.ts:239](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L239)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `slug` | `string` |
| `maxHolders?` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `declared`: `string`[];
  `granted`: `string`[];
  `holders`: `number`;
  `missing`: `string`[];
  `slug`: `string`;
  `status`: `"verified"` \| `"partial"` \| `"unverifiable"`;
  `undeclared`: `string`[];
\}\>\>

***

### onWpBatch()

```ts
onWpBatch(operations): Promise<FetchResult<{
[key: string]: unknown;
  responses: {
   [key: string]: unknown;
     body: unknown;
     headers: Record<string, string>;
     status: number;
  }[];
}>>;
```

Defined in: [types/wordpress/types.ts:260](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L260)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `operations` | \{ `body?`: `unknown`; `headers?`: `Record`\<`string`, `string`\>; `method`: `string`; `path`: `string`; \}[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `responses`: \{
   \[`key`: `string`\]: `unknown`;
     `body`: `unknown`;
     `headers`: `Record`\<`string`, `string`\>;
     `status`: `number`;
  \}[];
\}\>\>

***

### onWpCreateCategory()

```ts
onWpCreateCategory(data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:210](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L210)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name`: `string`; `parent?`: `number`; `slug`: `string`; `taxonomy`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name?` | `string` |
| `data.parent?` | `number` |
| `data.slug?` | `string` |
| `data.taxonomy?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `parent`: `number`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpCreateComment()

```ts
onWpCreateComment(data): Promise<FetchResult<{
[key: string]: unknown;
  author: number;
  author_avatar_urls: Record<string, string>;
  author_email: string;
  author_name: string;
  author_url: string;
  content: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  parent: number;
  post: number;
  status: string;
  type: string;
}>>;
```

Defined in: [types/wordpress/types.ts:220](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L220)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `author`: `number`; `author_email?`: `string`; `author_name?`: `string`; `author_url?`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `parent?`: `number`; `post`: `number`; \} |
| `data.author?` | `number` |
| `data.author_email?` | `string` |
| `data.author_name?` | `string` |
| `data.author_url?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.content.rendered?` | `string` |
| `data.parent?` | `number` |
| `data.post?` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `author`: `number`;
  `author_avatar_urls`: `Record`\<`string`, `string`\>;
  `author_email`: `string`;
  `author_name`: `string`;
  `author_url`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `parent`: `number`;
  `post`: `number`;
  `status`: `string`;
  `type`: `string`;
\}\>\>

***

### onWpCreateCustomPost()

```ts
onWpCreateCustomPost(postType, data): Promise<FetchResult<unknown>>;
```

Defined in: [types/wordpress/types.ts:246](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L246)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `data` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### onWpCreatePage()

```ts
onWpCreatePage(data): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:200](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L200)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author`: `number`; `comment_status`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media`: `number`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `menu_order?`: `number`; `meta?`: `Record`\<`string`, `unknown`\>; `parent?`: `number`; `ping_status`: `string`; `slug?`: `string`; `status?`: `string`; `template?`: `string`; `title`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author?` | `number` |
| `data.comment_status?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected?` | `boolean` |
| `data.content.rendered?` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected?` | `boolean` |
| `data.excerpt.rendered?` | `string` |
| `data.featured_media?` | `number` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered?` | `string` |
| `data.menu_order?` | `number` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.parent?` | `number` |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered?` | `string` |
| `data.type?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `menu_order`: `number`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `parent`: `number`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpCreatePost()

```ts
onWpCreatePost(data): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:195](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L195)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author`: `number`; `categories?`: `number`[]; `comment_status`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media`: `number`; `format?`: `string`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `meta?`: `Record`\<`string`, `unknown`\>; `ping_status`: `string`; `slug?`: `string`; `status?`: `string`; `sticky`: `boolean`; `tags?`: `number`[]; `template?`: `string`; `title`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author?` | `number` |
| `data.categories?` | `number`[] |
| `data.comment_status?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected?` | `boolean` |
| `data.content.rendered?` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected?` | `boolean` |
| `data.excerpt.rendered?` | `string` |
| `data.featured_media?` | `number` |
| `data.format?` | `string` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered?` | `string` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.sticky?` | `boolean` |
| `data.tags?` | `number`[] |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered?` | `string` |
| `data.type?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpCreateTag()

```ts
onWpCreateTag(data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:215](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L215)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name`: `string`; `slug`: `string`; `taxonomy`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name?` | `string` |
| `data.slug?` | `string` |
| `data.taxonomy?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpCreateUser()

```ts
onWpCreateUser(data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:226](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L226)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `email`: `string`; `first_name?`: `string`; `last_name?`: `string`; `locale?`: `string`; `name`: `string`; `nickname?`: `string`; `roles?`: `string`[]; `slug`: `string`; `url`: `string`; `username`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.email?` | `string` |
| `data.first_name?` | `string` |
| `data.last_name?` | `string` |
| `data.locale?` | `string` |
| `data.name?` | `string` |
| `data.nickname?` | `string` |
| `data.roles?` | `string`[] |
| `data.slug?` | `string` |
| `data.url?` | `string` |
| `data.username?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpDefineRoles()

```ts
onWpDefineRoles(definitions): void;
```

Defined in: [types/wordpress/types.ts:229](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L229)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definitions` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; `wpCapabilities`: `string`[]; \}[] |

#### Returns

`void`

***

### onWpDeleteCategory()

```ts
onWpDeleteCategory(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:212](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L212)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `parent`: `number`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpDeleteComment()

```ts
onWpDeleteComment(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  author: number;
  author_avatar_urls: Record<string, string>;
  author_email: string;
  author_name: string;
  author_url: string;
  content: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  parent: number;
  post: number;
  status: string;
  type: string;
}>>;
```

Defined in: [types/wordpress/types.ts:222](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L222)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `author`: `number`;
  `author_avatar_urls`: `Record`\<`string`, `string`\>;
  `author_email`: `string`;
  `author_name`: `string`;
  `author_url`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `parent`: `number`;
  `post`: `number`;
  `status`: `string`;
  `type`: `string`;
\}\>\>

***

### onWpDeleteCustomPost()

```ts
onWpDeleteCustomPost(
   postType, 
   id, 
   force?
): Promise<FetchResult<unknown>>;
```

Defined in: [types/wordpress/types.ts:255](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L255)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### onWpDeleteMedia()

```ts
onWpDeleteMedia(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  alt_text: string;
  author: number;
  caption: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  description: {
   [key: string]: unknown;
     rendered: string;
  };
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  media_details: {
   [key: string]: unknown;
     file?: string;
     filesize?: number;
     height?: number;
     image_meta?: {
      [key: string]: unknown;
        aperture?: string;
        camera?: string;
        caption?: string;
        copyright?: string;
        created_timestamp?: string;
        credit?: string;
        focal_length?: string;
        iso?: string;
        orientation?: string;
        shutter_speed?: string;
        title?: string;
     };
     sizes?: Record<string, {
      [key: string]: unknown;
        file: string;
        filesize?: number;
        height: number;
        mime_type: string;
        source_url: string;
        width: number;
     }>;
     width?: number;
  };
  media_type: string;
  meta: Record<string, unknown>;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  post: number | null;
  slug: string;
  source_url: string;
  status: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:207](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L207)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `alt_text`: `string`;
  `author`: `number`;
  `caption`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `media_details`: \{
   \[`key`: `string`\]: `unknown`;
     `file?`: `string`;
     `filesize?`: `number`;
     `height?`: `number`;
     `image_meta?`: \{
      \[`key`: `string`\]: `unknown`;
        `aperture?`: `string`;
        `camera?`: `string`;
        `caption?`: `string`;
        `copyright?`: `string`;
        `created_timestamp?`: `string`;
        `credit?`: `string`;
        `focal_length?`: `string`;
        `iso?`: `string`;
        `orientation?`: `string`;
        `shutter_speed?`: `string`;
        `title?`: `string`;
     \};
     `sizes?`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `file`: `string`;
        `filesize?`: `number`;
        `height`: `number`;
        `mime_type`: `string`;
        `source_url`: `string`;
        `width`: `number`;
     \}\>;
     `width?`: `number`;
  \};
  `media_type`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `mime_type`: `string`;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `post`: `number` \| `null`;
  `slug`: `string`;
  `source_url`: `string`;
  `status`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpDeletePage()

```ts
onWpDeletePage(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:202](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L202)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `menu_order`: `number`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `parent`: `number`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpDeletePost()

```ts
onWpDeletePost(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:197](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L197)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpDeleteTag()

```ts
onWpDeleteTag(id, force?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:217](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L217)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpDeleteUser()

```ts
onWpDeleteUser(id, reassign?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:228](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L228)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `reassign?` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpFindPostBySlug()

```ts
onWpFindPostBySlug(slug): Promise<FetchResult<
  | {
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}
| null>>;
```

Defined in: [types/wordpress/types.ts:263](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L263)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `slug` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<
  \| \{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}
  \| `null`\>\>

***

### onWpGetCategories()

```ts
onWpGetCategories(options?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:208](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L208)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `parent`: `number`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}[]\>\>

***

### onWpGetCategory()

```ts
onWpGetCategory(id): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:209](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L209)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `parent`: `number`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpGetComment()

```ts
onWpGetComment(id): Promise<FetchResult<{
[key: string]: unknown;
  author: number;
  author_avatar_urls: Record<string, string>;
  author_email: string;
  author_name: string;
  author_url: string;
  content: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  parent: number;
  post: number;
  status: string;
  type: string;
}>>;
```

Defined in: [types/wordpress/types.ts:219](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L219)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `author`: `number`;
  `author_avatar_urls`: `Record`\<`string`, `string`\>;
  `author_email`: `string`;
  `author_name`: `string`;
  `author_url`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `parent`: `number`;
  `post`: `number`;
  `status`: `string`;
  `type`: `string`;
\}\>\>

***

### onWpGetComments()

```ts
onWpGetComments(options?): Promise<FetchResult<{
[key: string]: unknown;
  author: number;
  author_avatar_urls: Record<string, string>;
  author_email: string;
  author_name: string;
  author_url: string;
  content: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  parent: number;
  post: number;
  status: string;
  type: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:218](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L218)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `author`: `number`;
  `author_avatar_urls`: `Record`\<`string`, `string`\>;
  `author_email`: `string`;
  `author_name`: `string`;
  `author_url`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `parent`: `number`;
  `post`: `number`;
  `status`: `string`;
  `type`: `string`;
\}[]\>\>

***

### onWpGetCurrentUser()

```ts
onWpGetCurrentUser(): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:225](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L225)

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpGetCustomPost()

```ts
onWpGetCustomPost(
   postType, 
   id, 
   options?
): Promise<FetchResult<unknown>>;
```

Defined in: [types/wordpress/types.ts:241](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L241)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `id` | `number` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### onWpGetCustomPosts()

```ts
onWpGetCustomPosts(postType, options?): Promise<FetchResult<unknown[]>>;
```

Defined in: [types/wordpress/types.ts:240](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L240)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`[]\>\>

***

### onWpGetMedia()

```ts
onWpGetMedia(options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  alt_text: string;
  author: number;
  caption: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  description: {
   [key: string]: unknown;
     rendered: string;
  };
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  media_details: {
   [key: string]: unknown;
     file?: string;
     filesize?: number;
     height?: number;
     image_meta?: {
      [key: string]: unknown;
        aperture?: string;
        camera?: string;
        caption?: string;
        copyright?: string;
        created_timestamp?: string;
        credit?: string;
        focal_length?: string;
        iso?: string;
        orientation?: string;
        shutter_speed?: string;
        title?: string;
     };
     sizes?: Record<string, {
      [key: string]: unknown;
        file: string;
        filesize?: number;
        height: number;
        mime_type: string;
        source_url: string;
        width: number;
     }>;
     width?: number;
  };
  media_type: string;
  meta: Record<string, unknown>;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  post: number | null;
  slug: string;
  source_url: string;
  status: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:203](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L203)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `alt_text`: `string`;
  `author`: `number`;
  `caption`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `media_details`: \{
   \[`key`: `string`\]: `unknown`;
     `file?`: `string`;
     `filesize?`: `number`;
     `height?`: `number`;
     `image_meta?`: \{
      \[`key`: `string`\]: `unknown`;
        `aperture?`: `string`;
        `camera?`: `string`;
        `caption?`: `string`;
        `copyright?`: `string`;
        `created_timestamp?`: `string`;
        `credit?`: `string`;
        `focal_length?`: `string`;
        `iso?`: `string`;
        `orientation?`: `string`;
        `shutter_speed?`: `string`;
        `title?`: `string`;
     \};
     `sizes?`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `file`: `string`;
        `filesize?`: `number`;
        `height`: `number`;
        `mime_type`: `string`;
        `source_url`: `string`;
        `width`: `number`;
     \}\>;
     `width?`: `number`;
  \};
  `media_type`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `mime_type`: `string`;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `post`: `number` \| `null`;
  `slug`: `string`;
  `source_url`: `string`;
  `status`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}[]\>\>

***

### onWpGetMediaItem()

```ts
onWpGetMediaItem(id): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  alt_text: string;
  author: number;
  caption: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  description: {
   [key: string]: unknown;
     rendered: string;
  };
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  media_details: {
   [key: string]: unknown;
     file?: string;
     filesize?: number;
     height?: number;
     image_meta?: {
      [key: string]: unknown;
        aperture?: string;
        camera?: string;
        caption?: string;
        copyright?: string;
        created_timestamp?: string;
        credit?: string;
        focal_length?: string;
        iso?: string;
        orientation?: string;
        shutter_speed?: string;
        title?: string;
     };
     sizes?: Record<string, {
      [key: string]: unknown;
        file: string;
        filesize?: number;
        height: number;
        mime_type: string;
        source_url: string;
        width: number;
     }>;
     width?: number;
  };
  media_type: string;
  meta: Record<string, unknown>;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  post: number | null;
  slug: string;
  source_url: string;
  status: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:204](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L204)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `alt_text`: `string`;
  `author`: `number`;
  `caption`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `media_details`: \{
   \[`key`: `string`\]: `unknown`;
     `file?`: `string`;
     `filesize?`: `number`;
     `height?`: `number`;
     `image_meta?`: \{
      \[`key`: `string`\]: `unknown`;
        `aperture?`: `string`;
        `camera?`: `string`;
        `caption?`: `string`;
        `copyright?`: `string`;
        `created_timestamp?`: `string`;
        `credit?`: `string`;
        `focal_length?`: `string`;
        `iso?`: `string`;
        `orientation?`: `string`;
        `shutter_speed?`: `string`;
        `title?`: `string`;
     \};
     `sizes?`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `file`: `string`;
        `filesize?`: `number`;
        `height`: `number`;
        `mime_type`: `string`;
        `source_url`: `string`;
        `width`: `number`;
     \}\>;
     `width?`: `number`;
  \};
  `media_type`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `mime_type`: `string`;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `post`: `number` \| `null`;
  `slug`: `string`;
  `source_url`: `string`;
  `status`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpGetPage()

```ts
onWpGetPage(id, options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:199](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L199)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `menu_order`: `number`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `parent`: `number`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpGetPages()

```ts
onWpGetPages(options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:198](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L198)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `menu_order`: `number`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `parent`: `number`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}[]\>\>

***

### onWpGetPost()

```ts
onWpGetPost(id, options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:194](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L194)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpGetPosts()

```ts
onWpGetPosts(options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:193](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L193)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}[]\>\>

***

### onWpGetRole()

```ts
onWpGetRole(slug): 
  | {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
  wpCapabilities: string[];
}
  | undefined;
```

Defined in: [types/wordpress/types.ts:232](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L232)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `slug` | `string` |

#### Returns

  \| \{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
  `wpCapabilities`: `string`[];
\}
  \| `undefined`

***

### onWpGetTag()

```ts
onWpGetTag(id): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:214](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L214)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpGetTags()

```ts
onWpGetTags(options?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  slug: string;
  taxonomy: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:213](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L213)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}[]\>\>

***

### onWpGetUser()

```ts
onWpGetUser(id): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:224](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L224)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpGetUsers()

```ts
onWpGetUsers(options?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:223](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L223)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}[]\>\>

***

### onWpGetUsersByRole()

```ts
onWpGetUsersByRole(role, options?): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:238](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L238)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}[]\>\>

***

### onWpListAllPosts()

```ts
onWpListAllPosts(options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:261](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L261)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}[]\>\>

***

### onWpRegisterRole()

```ts
onWpRegisterRole(definition): void;
```

Defined in: [types/wordpress/types.ts:230](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L230)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; `wpCapabilities`: `string`[]; \} |
| `definition.capabilities?` | `string`[] |
| `definition.label?` | `string` |
| `definition.rank?` | `number` |
| `definition.slug?` | `string` |
| `definition.wpCapabilities?` | `string`[] |

#### Returns

`void`

***

### onWpResetRoles()

```ts
onWpResetRoles(): void;
```

Defined in: [types/wordpress/types.ts:233](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L233)

#### Returns

`void`

***

### onWpRoles()

```ts
onWpRoles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
  wpCapabilities: string[];
}[];
```

Defined in: [types/wordpress/types.ts:231](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L231)

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
  `wpCapabilities`: `string`[];
\}[]

***

### onWpSearchAllPosts()

```ts
onWpSearchAllPosts(query, options?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: ...]: ...;
           rendered: ...;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: ...]: ...;
           rendered: ...;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: ... | ...;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}[]>>;
```

Defined in: [types/wordpress/types.ts:262](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L262)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | `string` |
| `options?` | \{ \[`key`: `string`\]: `unknown`; `_embed?`: `string` \| `boolean`; `_fields?`: `string`; `author?`: `number` \| `number`[]; `categories?`: `number` \| `number`[]; `exclude?`: `number`[]; `include?`: `number`[]; `offset?`: `number`; `order?`: `"desc"` \| `"asc"`; `orderby?`: `string`; `page?`: `number`; `per_page?`: `number`; `search?`: `string`; `slug?`: `string`; `status?`: `string` \| `string`[]; `tags?`: `number` \| `number`[]; \} |
| `options._embed?` | `string` \| `boolean` |
| `options._fields?` | `string` |
| `options.author?` | `number` \| `number`[] |
| `options.categories?` | `number` \| `number`[] |
| `options.exclude?` | `number`[] |
| `options.include?` | `number`[] |
| `options.offset?` | `number` |
| `options.order?` | `"desc"` \| `"asc"` |
| `options.orderby?` | `string` |
| `options.page?` | `number` |
| `options.per_page?` | `number` |
| `options.search?` | `string` |
| `options.slug?` | `string` |
| `options.status?` | `string` \| `string`[] |
| `options.tags?` | `number` \| `number`[] |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: ...\]: ...;
           `rendered`: ...;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: ... \| ...;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}[]\>\>

***

### onWpSyncRoles()

```ts
onWpSyncRoles(): void;
```

Defined in: [types/wordpress/types.ts:234](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L234)

#### Returns

`void`

***

### onWpUnassignRole()

```ts
onWpUnassignRole(userId, role): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:237](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L237)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `userId` | `number` |
| `role` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpUpdateCategory()

```ts
onWpUpdateCategory(id, data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:211](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L211)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name?`: `string`; `parent?`: `number`; `slug?`: `string`; `taxonomy?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name?` | `string` |
| `data.parent?` | `number` |
| `data.slug?` | `string` |
| `data.taxonomy?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `parent`: `number`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpUpdateComment()

```ts
onWpUpdateComment(id, data): Promise<FetchResult<{
[key: string]: unknown;
  author: number;
  author_avatar_urls: Record<string, string>;
  author_email: string;
  author_name: string;
  author_url: string;
  content: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  parent: number;
  post: number;
  status: string;
  type: string;
}>>;
```

Defined in: [types/wordpress/types.ts:221](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L221)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `author?`: `number`; `author_email?`: `string`; `author_name?`: `string`; `author_url?`: `string`; `content?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `parent?`: `number`; `status?`: `string`; \} |
| `data.author?` | `number` |
| `data.author_email?` | `string` |
| `data.author_name?` | `string` |
| `data.author_url?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.content.rendered?` | `string` |
| `data.parent?` | `number` |
| `data.status?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `author`: `number`;
  `author_avatar_urls`: `Record`\<`string`, `string`\>;
  `author_email`: `string`;
  `author_name`: `string`;
  `author_url`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `parent`: `number`;
  `post`: `number`;
  `status`: `string`;
  `type`: `string`;
\}\>\>

***

### onWpUpdateCustomPost()

```ts
onWpUpdateCustomPost(
   postType, 
   id, 
   data
): Promise<FetchResult<unknown>>;
```

Defined in: [types/wordpress/types.ts:250](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L250)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `id` | `number` |
| `data` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### onWpUpdateMedia()

```ts
onWpUpdateMedia(id, data): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  alt_text: string;
  author: number;
  caption: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  description: {
   [key: string]: unknown;
     rendered: string;
  };
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  media_details: {
   [key: string]: unknown;
     file?: string;
     filesize?: number;
     height?: number;
     image_meta?: {
      [key: string]: unknown;
        aperture?: string;
        camera?: string;
        caption?: string;
        copyright?: string;
        created_timestamp?: string;
        credit?: string;
        focal_length?: string;
        iso?: string;
        orientation?: string;
        shutter_speed?: string;
        title?: string;
     };
     sizes?: Record<string, {
      [key: string]: unknown;
        file: string;
        filesize?: number;
        height: number;
        mime_type: string;
        source_url: string;
        width: number;
     }>;
     width?: number;
  };
  media_type: string;
  meta: Record<string, unknown>;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  post: number | null;
  slug: string;
  source_url: string;
  status: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:206](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L206)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ `alt_text?`: `string`; `caption?`: `string`; `description?`: `string`; `post?`: `number`; `slug?`: `string`; `status?`: `string`; `title?`: `string`; \} |
| `data.alt_text?` | `string` |
| `data.caption?` | `string` |
| `data.description?` | `string` |
| `data.post?` | `number` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.title?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `alt_text`: `string`;
  `author`: `number`;
  `caption`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `media_details`: \{
   \[`key`: `string`\]: `unknown`;
     `file?`: `string`;
     `filesize?`: `number`;
     `height?`: `number`;
     `image_meta?`: \{
      \[`key`: `string`\]: `unknown`;
        `aperture?`: `string`;
        `camera?`: `string`;
        `caption?`: `string`;
        `copyright?`: `string`;
        `created_timestamp?`: `string`;
        `credit?`: `string`;
        `focal_length?`: `string`;
        `iso?`: `string`;
        `orientation?`: `string`;
        `shutter_speed?`: `string`;
        `title?`: `string`;
     \};
     `sizes?`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `file`: `string`;
        `filesize?`: `number`;
        `height`: `number`;
        `mime_type`: `string`;
        `source_url`: `string`;
        `width`: `number`;
     \}\>;
     `width?`: `number`;
  \};
  `media_type`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `mime_type`: `string`;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `post`: `number` \| `null`;
  `slug`: `string`;
  `source_url`: `string`;
  `status`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpUpdatePage()

```ts
onWpUpdatePage(id, data): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  menu_order: number;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  parent: number;
  ping_status: string;
  slug: string;
  status: string;
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:201](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L201)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author?`: `number`; `comment_status?`: `string`; `content?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media?`: `number`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `menu_order?`: `number`; `meta?`: `Record`\<`string`, `unknown`\>; `parent?`: `number`; `ping_status?`: `string`; `slug?`: `string`; `status?`: `string`; `template?`: `string`; `title?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author?` | `number` |
| `data.comment_status?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected?` | `boolean` |
| `data.content.rendered?` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected?` | `boolean` |
| `data.excerpt.rendered?` | `string` |
| `data.featured_media?` | `number` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered?` | `string` |
| `data.menu_order?` | `number` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.parent?` | `number` |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered?` | `string` |
| `data.type?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `menu_order`: `number`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `parent`: `number`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpUpdatePost()

```ts
onWpUpdatePost(id, data): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  author: number;
  categories: number[];
  comment_status: string;
  content: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
   [key: string]: unknown;
     protected: boolean;
     rendered: string;
  };
  featured_media: number;
  format: string;
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  meta: Record<string, unknown>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:196](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L196)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author?`: `number`; `categories?`: `number`[]; `comment_status?`: `string`; `content?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media?`: `number`; `format?`: `string`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `meta?`: `Record`\<`string`, `unknown`\>; `ping_status?`: `string`; `slug?`: `string`; `status?`: `string`; `sticky?`: `boolean`; `tags?`: `number`[]; `template?`: `string`; `title?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author?` | `number` |
| `data.categories?` | `number`[] |
| `data.comment_status?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected?` | `boolean` |
| `data.content.rendered?` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected?` | `boolean` |
| `data.excerpt.rendered?` | `string` |
| `data.featured_media?` | `number` |
| `data.format?` | `string` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered?` | `string` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.sticky?` | `boolean` |
| `data.tags?` | `number`[] |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered?` | `string` |
| `data.type?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `author`: `number`;
  `categories`: `number`[];
  `comment_status`: `string`;
  `content`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `excerpt`: \{
   \[`key`: `string`\]: `unknown`;
     `protected`: `boolean`;
     `rendered`: `string`;
  \};
  `featured_media`: `number`;
  `format`: `string`;
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `ping_status`: `string`;
  `slug`: `string`;
  `status`: `string`;
  `sticky`: `boolean`;
  `tags`: `number`[];
  `template`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>

***

### onWpUpdateTag()

```ts
onWpUpdateTag(id, data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Record<string, unknown>;
  name: string;
  slug: string;
  taxonomy: string;
}>>;
```

Defined in: [types/wordpress/types.ts:216](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L216)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name?`: `string`; `slug?`: `string`; `taxonomy?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name?` | `string` |
| `data.slug?` | `string` |
| `data.taxonomy?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `count`: `number`;
  `description`: `string`;
  `id`: `number`;
  `link`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `slug`: `string`;
  `taxonomy`: `string`;
\}\>\>

***

### onWpUpdateUser()

```ts
onWpUpdateUser(id, data): Promise<FetchResult<{
[key: string]: unknown;
  acf?: Record<string, unknown>;
  avatar_urls: Record<string, string>;
  capabilities: Record<string, boolean>;
  description: string;
  email: string;
  extra_capabilities: Record<string, boolean>;
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Record<string, unknown>;
  name: string;
  nickname: string;
  registered_date: string;
  roles: string[];
  slug: string;
  url: string;
  username: string;
}>>;
```

Defined in: [types/wordpress/types.ts:227](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L227)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `email?`: `string`; `first_name?`: `string`; `last_name?`: `string`; `locale?`: `string`; `name?`: `string`; `nickname?`: `string`; `password?`: `string`; `roles?`: `string`[]; `slug?`: `string`; `url?`: `string`; `username?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.email?` | `string` |
| `data.first_name?` | `string` |
| `data.last_name?` | `string` |
| `data.locale?` | `string` |
| `data.name?` | `string` |
| `data.nickname?` | `string` |
| `data.password?` | `string` |
| `data.roles?` | `string`[] |
| `data.slug?` | `string` |
| `data.url?` | `string` |
| `data.username?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `acf?`: `Record`\<`string`, `unknown`\>;
  `avatar_urls`: `Record`\<`string`, `string`\>;
  `capabilities`: `Record`\<`string`, `boolean`\>;
  `description`: `string`;
  `email`: `string`;
  `extra_capabilities`: `Record`\<`string`, `boolean`\>;
  `first_name`: `string`;
  `id`: `number`;
  `last_name`: `string`;
  `link`: `string`;
  `locale`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `name`: `string`;
  `nickname`: `string`;
  `registered_date`: `string`;
  `roles`: `string`[];
  `slug`: `string`;
  `url`: `string`;
  `username`: `string`;
\}\>\>

***

### onWpUploadMedia()

```ts
onWpUploadMedia(file, meta?): Promise<FetchResult<{
[key: string]: unknown;
  _embedded?: {
   [key: string]: unknown;
     author?: {
      [key: string]: unknown;
        acf?: Record<string, unknown>;
        avatar_urls: Record<string, string>;
        description: string;
        id: number;
        link: string;
        name: string;
        slug: string;
        url: string;
     }[];
     "wp:comment"?: {
      [key: string]: unknown;
        author: number;
        author_name: string;
        content: {
         [key: string]: unknown;
           rendered: string;
        };
        date: string;
        id: number;
        parent: number;
     }[][];
     "wp:featuredmedia"?: {
      [key: string]: unknown;
        alt_text: string;
        date: string;
        date_gmt: string;
        guid?: {
         [key: string]: unknown;
           rendered: string;
        };
        id: number;
        link: string;
        modified: string;
        modified_gmt: string;
        slug: string;
        source_url: string;
        status: string;
        title: {
         [key: string]: unknown;
           rendered: string;
        };
        type?: string;
     }[];
     "wp:term"?: {
      [key: string]: unknown;
        acf?: Record<..., ...>;
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
     }[][];
  };
  acf?: Record<string, unknown>;
  alt_text: string;
  author: number;
  caption: {
   [key: string]: unknown;
     rendered: string;
  };
  date: string;
  date_gmt: string;
  description: {
   [key: string]: unknown;
     rendered: string;
  };
  guid?: {
   [key: string]: unknown;
     rendered: string;
  };
  id: number;
  link: string;
  media_details: {
   [key: string]: unknown;
     file?: string;
     filesize?: number;
     height?: number;
     image_meta?: {
      [key: string]: unknown;
        aperture?: string;
        camera?: string;
        caption?: string;
        copyright?: string;
        created_timestamp?: string;
        credit?: string;
        focal_length?: string;
        iso?: string;
        orientation?: string;
        shutter_speed?: string;
        title?: string;
     };
     sizes?: Record<string, {
      [key: string]: unknown;
        file: string;
        filesize?: number;
        height: number;
        mime_type: string;
        source_url: string;
        width: number;
     }>;
     width?: number;
  };
  media_type: string;
  meta: Record<string, unknown>;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  post: number | null;
  slug: string;
  source_url: string;
  status: string;
  title: {
   [key: string]: unknown;
     rendered: string;
  };
  type?: string;
}>>;
```

Defined in: [types/wordpress/types.ts:205](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L205)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | `File` \| `Blob` \| `Buffer`\<`ArrayBufferLike`\> |
| `meta?` | \{ `alt_text?`: `string`; `caption?`: `string`; `description?`: `string`; `post?`: `number`; `slug?`: `string`; `title?`: `string`; \} |
| `meta.alt_text?` | `string` |
| `meta.caption?` | `string` |
| `meta.description?` | `string` |
| `meta.post?` | `number` |
| `meta.slug?` | `string` |
| `meta.title?` | `string` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
\[`key`: `string`\]: `unknown`;
  `_embedded?`: \{
   \[`key`: `string`\]: `unknown`;
     `author?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<`string`, `unknown`\>;
        `avatar_urls`: `Record`\<`string`, `string`\>;
        `description`: `string`;
        `id`: `number`;
        `link`: `string`;
        `name`: `string`;
        `slug`: `string`;
        `url`: `string`;
     \}[];
     `"wp:comment"?`: \{
      \[`key`: `string`\]: `unknown`;
        `author`: `number`;
        `author_name`: `string`;
        `content`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `date`: `string`;
        `id`: `number`;
        `parent`: `number`;
     \}[][];
     `"wp:featuredmedia"?`: \{
      \[`key`: `string`\]: `unknown`;
        `alt_text`: `string`;
        `date`: `string`;
        `date_gmt`: `string`;
        `guid?`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `id`: `number`;
        `link`: `string`;
        `modified`: `string`;
        `modified_gmt`: `string`;
        `slug`: `string`;
        `source_url`: `string`;
        `status`: `string`;
        `title`: \{
         \[`key`: `string`\]: `unknown`;
           `rendered`: `string`;
        \};
        `type?`: `string`;
     \}[];
     `"wp:term"?`: \{
      \[`key`: `string`\]: `unknown`;
        `acf?`: `Record`\<..., ...\>;
        `id`: `number`;
        `name`: `string`;
        `slug`: `string`;
        `taxonomy`: `string`;
     \}[][];
  \};
  `acf?`: `Record`\<`string`, `unknown`\>;
  `alt_text`: `string`;
  `author`: `number`;
  `caption`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `date`: `string`;
  `date_gmt`: `string`;
  `description`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `guid?`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `id`: `number`;
  `link`: `string`;
  `media_details`: \{
   \[`key`: `string`\]: `unknown`;
     `file?`: `string`;
     `filesize?`: `number`;
     `height?`: `number`;
     `image_meta?`: \{
      \[`key`: `string`\]: `unknown`;
        `aperture?`: `string`;
        `camera?`: `string`;
        `caption?`: `string`;
        `copyright?`: `string`;
        `created_timestamp?`: `string`;
        `credit?`: `string`;
        `focal_length?`: `string`;
        `iso?`: `string`;
        `orientation?`: `string`;
        `shutter_speed?`: `string`;
        `title?`: `string`;
     \};
     `sizes?`: `Record`\<`string`, \{
      \[`key`: `string`\]: `unknown`;
        `file`: `string`;
        `filesize?`: `number`;
        `height`: `number`;
        `mime_type`: `string`;
        `source_url`: `string`;
        `width`: `number`;
     \}\>;
     `width?`: `number`;
  \};
  `media_type`: `string`;
  `meta`: `Record`\<`string`, `unknown`\>;
  `mime_type`: `string`;
  `modified`: `string`;
  `modified_gmt`: `string`;
  `post`: `number` \| `null`;
  `slug`: `string`;
  `source_url`: `string`;
  `status`: `string`;
  `title`: \{
   \[`key`: `string`\]: `unknown`;
     `rendered`: `string`;
  \};
  `type?`: `string`;
\}\>\>
