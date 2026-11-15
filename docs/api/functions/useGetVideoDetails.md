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

Defined in: [core/services/youtube.service.ts:527](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/youtube.service.ts#L527)

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
