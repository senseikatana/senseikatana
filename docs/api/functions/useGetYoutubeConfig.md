[katanakit-js](../index.md) / useGetYoutubeConfig

# Function: useGetYoutubeConfig()

```ts
function useGetYoutubeConfig(): {
  apiKey: string;
  channelId: string;
};
```

Defined in: [core/services/youtube.service.ts:498](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/youtube.service.ts#L498)

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
