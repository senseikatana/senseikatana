[katanakit-js](../index.md) / onParseYoutubeRss

# Function: onParseYoutubeRss()

```ts
function onParseYoutubeRss(xml): {
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

Defined in: [core/services/youtube.service.ts:534](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/youtube.service.ts#L534)

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

[YoutubeService.onParseYoutubeRss](../classes/YoutubeService.md#onparseyoutuberss)
