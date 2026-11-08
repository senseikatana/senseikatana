[katanakit-js](../index.md) / IWordPressService

# Interface: IWordPressService

Defined in: [types/adapters/wordpress.ts:192](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L192)

Contract of the WordPress adapter facade.

## Methods

### useWpAssignRole()

```ts
useWpAssignRole(userId, role): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:236](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L236)

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

### useWpAsSubject()

```ts
useWpAsSubject(user): {
[key: string]: unknown;
  id: string | number;
  roles: string[];
};
```

Defined in: [types/adapters/wordpress.ts:235](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L235)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `user` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `avatar_urls`: `Record`\<`string`, `string`\>; `capabilities`: `Record`\<`string`, `boolean`\>; `description`: `string`; `email`: `string`; `extra_capabilities`: `Record`\<`string`, `boolean`\>; `first_name`: `string`; `id`: `number`; `last_name`: `string`; `link`: `string`; `locale`: `string`; `meta`: `Record`\<`string`, `unknown`\>; `name`: `string`; `nickname`: `string`; `registered_date`: `string`; `roles`: `string`[]; `slug`: `string`; `url`: `string`; `username`: `string`; \} |
| `user.acf?` | `Record`\<`string`, `unknown`\> |
| `user.avatar_urls` | `Record`\<`string`, `string`\> |
| `user.capabilities` | `Record`\<`string`, `boolean`\> |
| `user.description` | `string` |
| `user.email` | `string` |
| `user.extra_capabilities` | `Record`\<`string`, `boolean`\> |
| `user.first_name` | `string` |
| `user.id` | `number` |
| `user.last_name` | `string` |
| `user.link` | `string` |
| `user.locale` | `string` |
| `user.meta` | `Record`\<`string`, `unknown`\> |
| `user.name` | `string` |
| `user.nickname` | `string` |
| `user.registered_date` | `string` |
| `user.roles` | `string`[] |
| `user.slug` | `string` |
| `user.url` | `string` |
| `user.username` | `string` |

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

### useWpAuditRole()

```ts
useWpAuditRole(slug, maxHolders?): Promise<FetchResult<{
  declared: string[];
  granted: string[];
  holders: number;
  missing: string[];
  slug: string;
  status: "verified" | "partial" | "unverifiable";
  undeclared: string[];
}>>;
```

Defined in: [types/adapters/wordpress.ts:239](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L239)

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

### useWpBatch()

```ts
useWpBatch(operations): Promise<FetchResult<{
[key: string]: unknown;
  responses: {
   [key: string]: unknown;
     body: unknown;
     headers: Record<string, string>;
     status: number;
  }[];
}>>;
```

Defined in: [types/adapters/wordpress.ts:260](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L260)

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

### useWpCreateCategory()

```ts
useWpCreateCategory(data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:210](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L210)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name`: `string`; `parent?`: `number`; `slug`: `string`; `taxonomy`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name` | `string` |
| `data.parent?` | `number` |
| `data.slug` | `string` |
| `data.taxonomy` | `string` |

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

### useWpCreateComment()

```ts
useWpCreateComment(data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:220](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L220)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `author`: `number`; `author_email?`: `string`; `author_name?`: `string`; `author_url?`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `parent?`: `number`; `post`: `number`; \} |
| `data.author` | `number` |
| `data.author_email?` | `string` |
| `data.author_name?` | `string` |
| `data.author_url?` | `string` |
| `data.content` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.content.rendered` | `string` |
| `data.parent?` | `number` |
| `data.post` | `number` |

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

### useWpCreateCustomPost()

```ts
useWpCreateCustomPost(postType, data): Promise<FetchResult<unknown>>;
```

Defined in: [types/adapters/wordpress.ts:246](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L246)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `data` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### useWpCreatePage()

```ts
useWpCreatePage(data): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:200](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L200)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author`: `number`; `comment_status`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media`: `number`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `menu_order?`: `number`; `meta?`: `Record`\<`string`, `unknown`\>; `parent?`: `number`; `ping_status`: `string`; `slug?`: `string`; `status?`: `string`; `template?`: `string`; `title`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author` | `number` |
| `data.comment_status` | `string` |
| `data.content` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected` | `boolean` |
| `data.content.rendered` | `string` |
| `data.excerpt` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected` | `boolean` |
| `data.excerpt.rendered` | `string` |
| `data.featured_media` | `number` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered` | `string` |
| `data.menu_order?` | `number` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.parent?` | `number` |
| `data.ping_status` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.template?` | `string` |
| `data.title` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered` | `string` |
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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpCreatePost()

```ts
useWpCreatePost(data): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:195](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L195)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author`: `number`; `categories?`: `number`[]; `comment_status`: `string`; `content`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media`: `number`; `format?`: `string`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `meta?`: `Record`\<`string`, `unknown`\>; `ping_status`: `string`; `slug?`: `string`; `status?`: `string`; `sticky`: `boolean`; `tags?`: `number`[]; `template?`: `string`; `title`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author` | `number` |
| `data.categories?` | `number`[] |
| `data.comment_status` | `string` |
| `data.content` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected` | `boolean` |
| `data.content.rendered` | `string` |
| `data.excerpt` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected` | `boolean` |
| `data.excerpt.rendered` | `string` |
| `data.featured_media` | `number` |
| `data.format?` | `string` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered` | `string` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.ping_status` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.sticky` | `boolean` |
| `data.tags?` | `number`[] |
| `data.template?` | `string` |
| `data.title` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered` | `string` |
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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpCreateTag()

```ts
useWpCreateTag(data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:215](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L215)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `name`: `string`; `slug`: `string`; `taxonomy`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.name` | `string` |
| `data.slug` | `string` |
| `data.taxonomy` | `string` |

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

### useWpCreateUser()

```ts
useWpCreateUser(data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:226](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L226)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `description?`: `string`; `email`: `string`; `first_name?`: `string`; `last_name?`: `string`; `locale?`: `string`; `name`: `string`; `nickname?`: `string`; `roles?`: `string`[]; `slug`: `string`; `url`: `string`; `username`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.description?` | `string` |
| `data.email` | `string` |
| `data.first_name?` | `string` |
| `data.last_name?` | `string` |
| `data.locale?` | `string` |
| `data.name` | `string` |
| `data.nickname?` | `string` |
| `data.roles?` | `string`[] |
| `data.slug` | `string` |
| `data.url` | `string` |
| `data.username` | `string` |

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

### useWpDefineRoles()

```ts
useWpDefineRoles(definitions): void;
```

Defined in: [types/adapters/wordpress.ts:229](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L229)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definitions` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; `wpCapabilities`: `string`[]; \}[] |

#### Returns

`void`

***

### useWpDeleteCategory()

```ts
useWpDeleteCategory(id, force?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:212](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L212)

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

### useWpDeleteComment()

```ts
useWpDeleteComment(id, force?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:222](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L222)

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

### useWpDeleteCustomPost()

```ts
useWpDeleteCustomPost(
   postType, 
   id, 
   force?
): Promise<FetchResult<unknown>>;
```

Defined in: [types/adapters/wordpress.ts:255](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L255)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `id` | `number` |
| `force?` | `boolean` |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### useWpDeleteMedia()

```ts
useWpDeleteMedia(id, force?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:207](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L207)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpDeletePage()

```ts
useWpDeletePage(id, force?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:202](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L202)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpDeletePost()

```ts
useWpDeletePost(id, force?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:197](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L197)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpDeleteTag()

```ts
useWpDeleteTag(id, force?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:217](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L217)

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

### useWpDeleteUser()

```ts
useWpDeleteUser(id, reassign?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:228](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L228)

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

### useWpFindPostBySlug()

```ts
useWpFindPostBySlug(slug): Promise<FetchResult<
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:263](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L263)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetCategories()

```ts
useWpGetCategories(options?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:208](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L208)

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

### useWpGetCategory()

```ts
useWpGetCategory(id): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:209](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L209)

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

### useWpGetComment()

```ts
useWpGetComment(id): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:219](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L219)

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

### useWpGetComments()

```ts
useWpGetComments(options?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:218](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L218)

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

### useWpGetCurrentUser()

```ts
useWpGetCurrentUser(): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:225](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L225)

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

### useWpGetCustomPost()

```ts
useWpGetCustomPost(
   postType, 
   id, 
   options?
): Promise<FetchResult<unknown>>;
```

Defined in: [types/adapters/wordpress.ts:241](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L241)

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

### useWpGetCustomPosts()

```ts
useWpGetCustomPosts(postType, options?): Promise<FetchResult<unknown[]>>;
```

Defined in: [types/adapters/wordpress.ts:240](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L240)

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

### useWpGetMedia()

```ts
useWpGetMedia(options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:203](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L203)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetMediaItem()

```ts
useWpGetMediaItem(id): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:204](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L204)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetPage()

```ts
useWpGetPage(id, options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:199](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L199)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetPages()

```ts
useWpGetPages(options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:198](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L198)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetPost()

```ts
useWpGetPost(id, options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:194](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L194)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetPosts()

```ts
useWpGetPosts(options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:193](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L193)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpGetRole()

```ts
useWpGetRole(slug): 
  | {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
  wpCapabilities: string[];
}
  | undefined;
```

Defined in: [types/adapters/wordpress.ts:232](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L232)

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

### useWpGetTag()

```ts
useWpGetTag(id): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:214](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L214)

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

### useWpGetTags()

```ts
useWpGetTags(options?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:213](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L213)

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

### useWpGetUser()

```ts
useWpGetUser(id): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:224](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L224)

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

### useWpGetUsers()

```ts
useWpGetUsers(options?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:223](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L223)

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

### useWpGetUsersByRole()

```ts
useWpGetUsersByRole(role, options?): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:238](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L238)

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

### useWpListAllPosts()

```ts
useWpListAllPosts(options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:261](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L261)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpRegisterRole()

```ts
useWpRegisterRole(definition): void;
```

Defined in: [types/adapters/wordpress.ts:230](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L230)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | \{ `capabilities`: `string`[]; `label`: `string`; `rank`: `number`; `slug`: `string`; `wpCapabilities`: `string`[]; \} |
| `definition.capabilities` | `string`[] |
| `definition.label` | `string` |
| `definition.rank` | `number` |
| `definition.slug` | `string` |
| `definition.wpCapabilities` | `string`[] |

#### Returns

`void`

***

### useWpResetRoles()

```ts
useWpResetRoles(): void;
```

Defined in: [types/adapters/wordpress.ts:233](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L233)

#### Returns

`void`

***

### useWpRoles()

```ts
useWpRoles(): {
  capabilities: string[];
  label: string;
  rank: number;
  slug: string;
  wpCapabilities: string[];
}[];
```

Defined in: [types/adapters/wordpress.ts:231](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L231)

#### Returns

\{
  `capabilities`: `string`[];
  `label`: `string`;
  `rank`: `number`;
  `slug`: `string`;
  `wpCapabilities`: `string`[];
\}[]

***

### useWpSearchAllPosts()

```ts
useWpSearchAllPosts(query, options?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:262](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L262)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpSyncRoles()

```ts
useWpSyncRoles(): void;
```

Defined in: [types/adapters/wordpress.ts:234](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L234)

#### Returns

`void`

***

### useWpUnassignRole()

```ts
useWpUnassignRole(userId, role): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:237](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L237)

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

### useWpUpdateCategory()

```ts
useWpUpdateCategory(id, data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:211](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L211)

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

### useWpUpdateComment()

```ts
useWpUpdateComment(id, data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:221](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L221)

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
| `data.content.rendered` | `string` |
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

### useWpUpdateCustomPost()

```ts
useWpUpdateCustomPost(
   postType, 
   id, 
   data
): Promise<FetchResult<unknown>>;
```

Defined in: [types/adapters/wordpress.ts:250](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L250)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `postType` | `string` |
| `id` | `number` |
| `data` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`unknown`\>\>

***

### useWpUpdateMedia()

```ts
useWpUpdateMedia(id, data): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:206](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L206)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpUpdatePage()

```ts
useWpUpdatePage(id, data): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:201](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L201)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `number` |
| `data` | \{ \[`key`: `string`\]: `unknown`; `acf?`: `Record`\<`string`, `unknown`\>; `author?`: `number`; `comment_status?`: `string`; `content?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `excerpt?`: \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \}; `featured_media?`: `number`; `guid?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `menu_order?`: `number`; `meta?`: `Record`\<`string`, `unknown`\>; `parent?`: `number`; `ping_status?`: `string`; `slug?`: `string`; `status?`: `string`; `template?`: `string`; `title?`: \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \}; `type?`: `string`; \} |
| `data.acf?` | `Record`\<`string`, `unknown`\> |
| `data.author?` | `number` |
| `data.comment_status?` | `string` |
| `data.content?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.content.protected` | `boolean` |
| `data.content.rendered` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected` | `boolean` |
| `data.excerpt.rendered` | `string` |
| `data.featured_media?` | `number` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered` | `string` |
| `data.menu_order?` | `number` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.parent?` | `number` |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered` | `string` |
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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpUpdatePost()

```ts
useWpUpdatePost(id, data): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:196](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L196)

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
| `data.content.protected` | `boolean` |
| `data.content.rendered` | `string` |
| `data.excerpt?` | \{ \[`key`: `string`\]: `unknown`; `protected`: `boolean`; `rendered`: `string`; \} |
| `data.excerpt.protected` | `boolean` |
| `data.excerpt.rendered` | `string` |
| `data.featured_media?` | `number` |
| `data.format?` | `string` |
| `data.guid?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.guid.rendered` | `string` |
| `data.meta?` | `Record`\<`string`, `unknown`\> |
| `data.ping_status?` | `string` |
| `data.slug?` | `string` |
| `data.status?` | `string` |
| `data.sticky?` | `boolean` |
| `data.tags?` | `number`[] |
| `data.template?` | `string` |
| `data.title?` | \{ \[`key`: `string`\]: `unknown`; `rendered`: `string`; \} |
| `data.title.rendered` | `string` |
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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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

### useWpUpdateTag()

```ts
useWpUpdateTag(id, data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:216](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L216)

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

### useWpUpdateUser()

```ts
useWpUpdateUser(id, data): Promise<FetchResult<{
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

Defined in: [types/adapters/wordpress.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L227)

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

### useWpUploadMedia()

```ts
useWpUploadMedia(file, meta?): Promise<FetchResult<{
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
     wp:comment?: {
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
     wp:featuredmedia?: {
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
     wp:term?: {
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

Defined in: [types/adapters/wordpress.ts:205](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L205)

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
     `wp:comment?`: \{
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
     `wp:featuredmedia?`: \{
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
     `wp:term?`: \{
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
