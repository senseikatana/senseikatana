[katanakit-js](../index.md) / useGetChannelVideosRss

# Function: useGetChannelVideosRss()

```ts
function useGetChannelVideosRss(channelId?): Promise<FetchResult<{
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

Defined in: [core/services/youtube.service.ts:539](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/youtube.service.ts#L539)

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

[YoutubeService.useGetChannelVideosRss](../classes/YoutubeService.md#usegetchannelvideosrss)
