[katanakit-js](../index.md) / useGetChannelVideos

# Function: useGetChannelVideos()

```ts
function useGetChannelVideos(params?): Promise<FetchResult<{
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

Defined in: [core/services/youtube.service.ts:520](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/youtube.service.ts#L520)

Lists channel videos via the quota-cheap path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `channelId?`: `string`; `maxResults?`: `number`; `pageToken?`: `string`; `playlistId?`: `string`; \} | - |
| `params.channelId?` | `string` | Channel id (defaults to the one from `useInitYoutube`). |
| `params.maxResults?` | `number` | Items per page (1–50, defaults to `12`). |
| `params.pageToken?` | `string` | Opaque page token from a previous response. |
| `params.playlistId?` | `string` | Skip the channels lookup when the uploads playlist id is known. |

## Returns

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

## See

[YoutubeService.useGetChannelVideos](../classes/YoutubeService.md#usegetchannelvideos)
