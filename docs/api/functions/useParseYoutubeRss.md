[katanakit-js](../index.md) / useParseYoutubeRss

# Function: useParseYoutubeRss()

```ts
function useParseYoutubeRss(xml): {
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

Defined in: [core/services/youtube.service.ts:534](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/youtube.service.ts#L534)

Parses a YouTube channel RSS feed into normalized videos.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `xml` | `string` |

## Returns

\{
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
\}[]

## See

[YoutubeService.useParseYoutubeRss](../classes/YoutubeService.md#useparseyoutuberss)
