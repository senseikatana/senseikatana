[katanakit-js](../index.md) / onGetYoutubeConfig

# Function: onGetYoutubeConfig()

```ts
function onGetYoutubeConfig(): {
  apiKey: string;
  channelId: string;
};
```

Defined in: [core/services/youtube.service.ts:498](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/youtube.service.ts#L498)

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

[YoutubeService.onGetYoutubeConfig](../classes/YoutubeService.md#ongetyoutubeconfig)
