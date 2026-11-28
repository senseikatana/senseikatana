[katanakit-js](../index.md) / useGetVideoDetails

# Function: useGetVideoDetails()

```ts
function useGetVideoDetails(ids): Promise<FetchResult<{
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

Defined in: [core/services/youtube.service.ts:527](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/youtube.service.ts#L527)

Enriches videos with duration and view count.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ids` | `string`[] |

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

[YoutubeService.useGetVideoDetails](../classes/YoutubeService.md#usegetvideodetails)
