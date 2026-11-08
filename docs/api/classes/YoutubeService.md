[katanakit-js](../index.md) / YoutubeService

# Class: YoutubeService

Defined in: [core/services/youtube.service.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L46)

YoutubeService — Singleton facade over the YouTube Data API v3 and the
keyless channel RSS feed.

Applies the **Singleton** pattern (one shared instance via
[YoutubeService.getInstance](#getinstance), so the registered API config and the
default channel are shared process-wide) and the **Facade** pattern: each
public method hides registry keys, HTTP calls, schema validation and video
normalization behind one call returning a Safe Result.

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useGetChannelVideos, useInitYoutube } from "katanakit-js";

useInitYoutube({ apiKey: process.env.YOUTUBE_API_KEY!, channelId: "UC…" });
const page = await useGetChannelVideos({ maxResults: 6 });
```

## Methods

### useBuildYoutubeRssUrl()

```ts
useBuildYoutubeRssUrl(channelId): string;
```

Defined in: [core/services/youtube.service.ts:177](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L177)

Builds the public channel RSS feed URL. Needs no API key and
costs zero quota — ideal for "latest videos" widgets.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channelId` | `string` | Channel id (`UC…`). |

#### Returns

`string`

Feed URL.

***

### useGetChannelVideos()

```ts
useGetChannelVideos(params?): Promise<FetchResult<{
  nextPageToken?: string;
  prevPageToken?: string;
  totalResults?: number;
  videos: {
     channelTitle?: string;
     description: string;
     durationSeconds?: number;
     embedUrl: string;
     id: string;
     publishedAt: string;
     thumbnail: string;
     thumbnails: {
        default: string;
        high: string;
        medium: string;
     };
     title: string;
     url: string;
     viewCount?: number;
  }[];
}>>;
```

Defined in: [core/services/youtube.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L280)

Lists channel videos via the quota-cheap path
(`channels` → `playlistItems`, never `search.list` which costs 100 units).
Call server/build-time and cache the response (1h) to share quota
across every repo using the same GCP project.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `channelId?`: `string`; `maxResults?`: `number`; `pageToken?`: `string`; `playlistId?`: `string`; \} | Channel/playlist, page size (1–50) and page token. |
| `params.channelId?` | `string` | Channel id (defaults to the one from `useInitYoutube`). |
| `params.maxResults?` | `number` | Items per page (1–50, defaults to `12`). |
| `params.pageToken?` | `string` | Opaque page token from a previous response. |
| `params.playlistId?` | `string` | Skip the channels lookup when the uploads playlist id is known. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `nextPageToken?`: `string`;
  `prevPageToken?`: `string`;
  `totalResults?`: `number`;
  `videos`: \{
     `channelTitle?`: `string`;
     `description`: `string`;
     `durationSeconds?`: `number`;
     `embedUrl`: `string`;
     `id`: `string`;
     `publishedAt`: `string`;
     `thumbnail`: `string`;
     `thumbnails`: \{
        `default`: `string`;
        `high`: `string`;
        `medium`: `string`;
     \};
     `title`: `string`;
     `url`: `string`;
     `viewCount?`: `number`;
  \}[];
\}\>\>

Safe Result with normalized videos + pagination.

***

### useGetChannelVideosRss()

```ts
useGetChannelVideosRss(channelId?): Promise<FetchResult<{
  channelTitle?: string;
  description: string;
  durationSeconds?: number;
  embedUrl: string;
  id: string;
  publishedAt: string;
  thumbnail: string;
  thumbnails: {
     default: string;
     high: string;
     medium: string;
  };
  title: string;
  url: string;
  viewCount?: number;
}[]>>;
```

Defined in: [core/services/youtube.service.ts:458](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L458)

Fetches the keyless channel RSS feed and parses it. Zero quota,
limited to the latest ~15 videos with basic metadata.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channelId` | `string` | Channel id (defaults to the configured one). |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `channelTitle?`: `string`;
  `description`: `string`;
  `durationSeconds?`: `number`;
  `embedUrl`: `string`;
  `id`: `string`;
  `publishedAt`: `string`;
  `thumbnail`: `string`;
  `thumbnails`: \{
     `default`: `string`;
     `high`: `string`;
     `medium`: `string`;
  \};
  `title`: `string`;
  `url`: `string`;
  `viewCount?`: `number`;
\}[]\>\>

Safe Result with normalized videos.

***

### useGetUploadsPlaylistId()

```ts
useGetUploadsPlaylistId(channelId?): Promise<FetchResult<string>>;
```

Defined in: [core/services/youtube.service.ts:224](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L224)

Resolves a channel id to its `uploads` playlist id (quota cost: 1 unit).
Prefer passing `playlistId` to `useGetChannelVideos` to skip this call.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `channelId` | `string` | Channel id (defaults to the configured one). |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<`string`\>\>

Safe Result with the uploads playlist id.

***

### useGetVideoDetails()

```ts
useGetVideoDetails(ids): Promise<FetchResult<{
  channelTitle?: string;
  description: string;
  durationSeconds?: number;
  embedUrl: string;
  id: string;
  publishedAt: string;
  thumbnail: string;
  thumbnails: {
     default: string;
     high: string;
     medium: string;
  };
  title: string;
  url: string;
  viewCount?: number;
}[]>>;
```

Defined in: [core/services/youtube.service.ts:366](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L366)

Enriches videos with duration and view count (`videos.list`, 1 unit).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | Up to 50 video ids. |

#### Returns

`Promise`\<[`FetchResult`](../type-aliases/FetchResult.md)\<\{
  `channelTitle?`: `string`;
  `description`: `string`;
  `durationSeconds?`: `number`;
  `embedUrl`: `string`;
  `id`: `string`;
  `publishedAt`: `string`;
  `thumbnail`: `string`;
  `thumbnails`: \{
     `default`: `string`;
     `high`: `string`;
     `medium`: `string`;
  \};
  `title`: `string`;
  `url`: `string`;
  `viewCount?`: `number`;
\}[]\>\>

Safe Result with enriched videos.

***

### useGetYoutubeConfig()

```ts
useGetYoutubeConfig(): {
  apiKey: string;
  channelId: string;
};
```

Defined in: [core/services/youtube.service.ts:166](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L166)

Returns a shallow copy of the YouTube config (safe to mutate locally).

#### Returns

The current `{ apiKey, channelId }`.

##### apiKey

```ts
apiKey: string;
```

YouTube Data API v3 key (server/build-time only, never public).

##### channelId

```ts
channelId: string;
```

Default channel id (`UC…`). Per-call params can override it.

***

### useInitYoutube()

```ts
useInitYoutube(config): void;
```

Defined in: [core/services/youtube.service.ts:138](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L138)

Registers the YouTube APIs (`youtube` + keyless `youtubeFeed`) and
stores the default channel. Call once per app, server/build-time —
the API key must never ship to the browser.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \{ `apiKey`: `string`; `channelId`: `string`; \} | API key + default channel id. |
| `config.apiKey` | `string` | YouTube Data API v3 key (server/build-time only, never public). |
| `config.channelId` | `string` | Default channel id (`UC…`). Per-call params can override it. |

#### Returns

`void`

#### Example

```ts
useInitYoutube({ apiKey: process.env.YOUTUBE_API_KEY!, channelId: "UC…" });
const page = await useGetChannelVideos({ maxResults: 6 });
```

***

### useParseIso8601Duration()

```ts
useParseIso8601Duration(input): number;
```

Defined in: [core/services/youtube.service.ts:190](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L190)

Parses an ISO 8601 duration (`PT1H2M3S`) into seconds.
Pure and SSR-safe.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | Duration string from `contentDetails.duration`. |

#### Returns

`number`

Total seconds (`0` for invalid input).

***

### useParseYoutubeRss()

```ts
useParseYoutubeRss(xml): {
  channelTitle?: string;
  description: string;
  durationSeconds?: number;
  embedUrl: string;
  id: string;
  publishedAt: string;
  thumbnail: string;
  thumbnails: {
     default: string;
     high: string;
     medium: string;
  };
  title: string;
  url: string;
  viewCount?: number;
}[];
```

Defined in: [core/services/youtube.service.ts:426](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L426)

Parses a YouTube channel RSS feed (`feeds/videos.xml`) into normalized
videos. Pure and SSR-safe — no network, no DOM parser.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xml` | `string` | Raw feed XML. |

#### Returns

Normalized videos (newest first, as served by the feed).

***

### getInstance()

```ts
static getInstance(): YoutubeService;
```

Defined in: [core/services/youtube.service.ts:56](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L56)

Returns the shared instance (Singleton).

#### Returns

`YoutubeService`
