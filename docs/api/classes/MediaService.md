[katanakit-js](../index.md) / MediaService

# Class: MediaService

Defined in: [core/services/media.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L36)

MediaService — Singleton facade over media source parsing and embed
markup generation (YouTube, Vimeo and direct video files).

Applies the **Singleton** pattern (one shared instance via
[MediaService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the provider-specific parsing and HTML details behind one call.
Everything is pure string building — no DOM, no fetch — so the instance is
safe to share across environments (Node, Bun, browser, SSR).

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useBuildVideoEmbed } from "katanakit-js";

const { html } = useBuildVideoEmbed({ src: "https://youtu.be/…", title: "My talk" });
```

## Methods

### useBuildVideoEmbed()

```ts
useBuildVideoEmbed(options): {
  id: string;
  provider: "unknown" | "file" | "youtube" | "vimeo";
  raw: string;
} & {
  html: string;
};
```

Defined in: [core/services/media.service.ts:248](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L248)

Builds the semantically correct embed HTML for any supported source.

- Direct files (`.mp4`/`.webm`) → `<figure><video controls …>` (native).
- YouTube / Vimeo → `<figure><iframe …>` (embedded context), or a
  click-to-play facade (`<button>` + thumbnail) when `facade: true`
  so `.md/.mdx` posts never pay the iframe cost on load.

Pure string builder: SSR-safe, no DOM access. Escape is applied to
all interpolated attributes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `aspect?`: `string`; `caption?`: `string`; `className?`: `string`; `facade?`: `boolean`; `poster?`: `string`; `src`: `string`; `title`: `string`; `youtube?`: \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \}; \} | Source + a11y + presentation options. |
| `options.aspect?` | `string` | Aspect ratio box: `16/9` (default) or `4/3`, `1/1`, `9/16`. |
| `options.caption?` | `string` | Optional `<figcaption>` text. |
| `options.className?` | `string` | Extra CSS class on the `<figure>` wrapper. |
| `options.facade?` | `boolean` | Render the click-to-play facade for embeds (no heavy iframe on load). |
| `options.poster?` | `string` | Poster for native `<video>` or facade thumbnail override. |
| `options.src` | `string` | YouTube URL/id, Vimeo URL/id, or direct `.mp4`/`.webm` URL. |
| `options.title` | `string` | Accessible title. Used as `<iframe title>` / `<video aria-label>`. |
| `options.youtube?` | \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \} | YouTube player options (only for `youtube` provider). |
| `options.youtube.autoplay?` | `boolean` | Autoplay on iframe creation (facade clicks pass `1`). |
| `options.youtube.end?` | `number` | End time in seconds. |
| `options.youtube.params?` | `Record`\<`string`, `string` \| `number` \| `boolean`\> | Extra `playerVars` merged into the query string. |
| `options.youtube.start?` | `number` | Start time in seconds. |

#### Returns

`{ provider, id, html }` with the ready-to-inject markup.

#### Example

```ts
const { html } = useBuildVideoEmbed({ src: "https://youtu.be/…", title: "My talk" });
```

***

### useBuildVimeoEmbedUrl()

```ts
useBuildVimeoEmbedUrl(videoId): string;
```

Defined in: [core/services/media.service.ts:195](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L195)

Builds the Vimeo player embed URL with privacy defaults.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `videoId` | `string` | Numeric Vimeo video id. |

#### Returns

`string`

Player URL ready for `<iframe src>`.

***

### useBuildYoutubeEmbedUrl()

```ts
useBuildYoutubeEmbedUrl(videoId, options?): string;
```

Defined in: [core/services/media.service.ts:174](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L174)

Builds the privacy-enhanced YouTube embed URL (`youtube-nocookie`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `videoId` | `string` | 11-char YouTube video id. |
| `options` | \{ `autoplay?`: `boolean`; `end?`: `number`; `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>; `start?`: `number`; \} | Player options (start/end/autoplay/extra params). |
| `options.autoplay?` | `boolean` | Autoplay on iframe creation (facade clicks pass `1`). |
| `options.end?` | `number` | End time in seconds. |
| `options.params?` | `Record`\<`string`, `string` \| `number` \| `boolean`\> | Extra `playerVars` merged into the query string. |
| `options.start?` | `number` | Start time in seconds. |

#### Returns

`string`

Embed URL ready for `<iframe src>`.

***

### useBuildYoutubeThumbnail()

```ts
useBuildYoutubeThumbnail(videoId, quality?): string;
```

Defined in: [core/services/media.service.ts:208](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L208)

Builds the public YouTube thumbnail URL (no API key needed).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `videoId` | `string` | `undefined` | 11-char YouTube video id. |
| `quality` | `"default"` \| `"mqdefault"` \| `"hqdefault"` \| `"sddefault"` \| `"maxresdefault"` | `"hqdefault"` | Thumbnail quality (defaults to `hqdefault`). |

#### Returns

`string`

Thumbnail image URL.

***

### useGetVimeoVideoId()

```ts
useGetVimeoVideoId(input): string | null;
```

Defined in: [core/services/media.service.ts:129](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L129)

Extracts a Vimeo video id from a URL or bare numeric id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | URL or bare numeric id. |

#### Returns

`string` \| `null`

The numeric id or `null`.

***

### useGetYoutubeVideoId()

```ts
useGetYoutubeVideoId(input): string | null;
```

Defined in: [core/services/media.service.ts:89](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L89)

Extracts a YouTube video id from a watch / shorts / live / embed /
`youtu.be` URL or a bare 11-char id. Returns `null` when not matched.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | URL or bare video id. |

#### Returns

`string` \| `null`

The 11-char video id or `null`.

#### Example

```ts
useGetYoutubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // "dQw4w9WgXcQ"
useGetYoutubeVideoId("https://youtu.be/dQw4w9WgXcQ"); // "dQw4w9WgXcQ"
useGetYoutubeVideoId("dQw4w9WgXcQ"); // "dQw4w9WgXcQ"
```

***

### useParseMediaSource()

```ts
useParseMediaSource(input): {
  id: string;
  provider: "unknown" | "file" | "youtube" | "vimeo";
  raw: string;
};
```

Defined in: [core/services/media.service.ts:156](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L156)

Normalizes any supported input into a [MediaSource](../type-aliases/MediaSource.md).
Pure and SSR-safe: no DOM, no fetch.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | YouTube/Vimeo URL or id, or direct video file URL. |

#### Returns

Normalized `{ provider, id, raw }`.

##### id

```ts
id: string;
```

Video id for youtube/vimeo, full URL for `file`.

##### provider

```ts
provider: "unknown" | "file" | "youtube" | "vimeo" = MediaProviderSchema;
```

##### raw

```ts
raw: string;
```

Original input (URL or bare id).

#### Example

```ts
useParseMediaSource("https://youtu.be/dQw4w9WgXcQ");
// { provider: "youtube", id: "dQw4w9WgXcQ", raw: "…" }
```

***

### useParseSmartVideoOptions()

```ts
useParseSmartVideoOptions(input): FetchResult<{
  aspect?: string;
  caption?: string;
  className?: string;
  facade?: boolean;
  poster?: string;
  src: string;
  title: string;
  youtube?: {
     autoplay?: boolean;
     end?: number;
     params?: Record<string, string | number | boolean>;
     start?: number;
  };
}>;
```

Defined in: [core/services/media.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L225)

Validates unknown input (parsed JSON, frontmatter, CMS payloads) against
the `SmartVideoOptions` schema. Returns a Safe Result instead of throwing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `unknown` | Unknown value to validate. |

#### Returns

[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `aspect?`: `string`;
  `caption?`: `string`;
  `className?`: `string`;
  `facade?`: `boolean`;
  `poster?`: `string`;
  `src`: `string`;
  `title`: `string`;
  `youtube?`: \{
     `autoplay?`: `boolean`;
     `end?`: `number`;
     `params?`: `Record`\<`string`, `string` \| `number` \| `boolean`\>;
     `start?`: `number`;
  \};
\}\>

`FetchResult<SmartVideoOptions>` with typed options or a `Validation Error`.

#### Example

```ts
const result = useParseSmartVideoOptions(JSON.parse(raw));
if (result.ok) useBuildVideoEmbed(result.data);
```

***

### getInstance()

```ts
static getInstance(): MediaService;
```

Defined in: [core/services/media.service.ts:43](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/media.service.ts#L43)

Returns the shared instance (Singleton).

#### Returns

`MediaService`
