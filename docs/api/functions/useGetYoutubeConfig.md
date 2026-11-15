[katanakit-js](../index.md) / useGetYoutubeConfig

# Function: useGetYoutubeConfig()

```ts
function useGetYoutubeConfig(): {
  apiKey: string;
  channelId: string;
};
```

Defined in: [core/services/youtube.service.ts:498](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/youtube.service.ts#L498)

Returns a shallow copy of the YouTube config.

## Returns

### apiKey

```ts
apiKey: string;
```

YouTube Data API v3 key (server/build-time only, never public).

### channelId

```ts
channelId: string;
```

Default channel id (`UC…`). Per-call params can override it.

## See

[YoutubeService.useGetYoutubeConfig](../classes/YoutubeService.md#usegetyoutubeconfig)
