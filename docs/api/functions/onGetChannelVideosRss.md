[katanakit-js](../index.md) / onGetChannelVideosRss

# Function: onGetChannelVideosRss()

```ts
function onGetChannelVideosRss(channelId?): Promise<FetchResult<{
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

Defined in: [core/services/youtube.service.ts:539](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/youtube.service.ts#L539)

Fetches and parses the keyless channel RSS feed.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `channelId?` | `string` |

## Returns

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

## See

[YoutubeService.onGetChannelVideosRss](../classes/YoutubeService.md#ongetchannelvideosrss)
