import { onCleanup, onMount, Show } from "solid-js";
import { useVideoSync } from "~/hooks/useVideoSync";
import Bubbles from "~/shared/Bubbles";

interface VideoStageProps {
  videoSrc: string;
  posterSrc?: string;
  trackSelector?: string;
  onReady?: () => void;
  onProgress?: (progress: number) => void;
  onDurationChange?: (duration: number) => void;
}

/**
 * Componente de escenario de video con overlays.
 * Maneja la sincronización video-scroll y los estados de carga.
 */
export default function VideoStage(props: VideoStageProps) {
  const {
    setVideoRef,
    videoReady,
    videoDuration,
    isBuffering,
    loadProgress,
    loaded,
    failed,
    reduced,
    posterSrc,
  } = useVideoSync({
    videoSrc: props.videoSrc,
    posterSrc: props.posterSrc,
    trackSelector: props.trackSelector,
  });

  // Notificar al padre cuando el video está listo
  onMount(() => {
    if (videoReady()) {
      props.onReady?.();
    }

    // Observar cambios en duración
    const interval = setInterval(() => {
      if (videoDuration() > 0) {
        props.onDurationChange?.(videoDuration());
      }
    }, 500);

    onCleanup(() => clearInterval(interval));
  });

  // Actualizar progreso de carga
  onMount(() => {
    const interval = setInterval(() => {
      if (loadProgress() > 0) {
        props.onProgress?.(loadProgress());
      }
    }, 100);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="stage" aria-hidden="true">
      <Show
        when={!failed() && !reduced()}
        fallback={
          <img
            src={posterSrc || "/images/hero-poster.webp"}
            alt=""
            class="stage-fallback"
            loading="eager"
          />
        }
      >
        <video
          ref={setVideoRef}
          src={props.videoSrc}
          muted
          playsinline
          preload="metadata"
          disablepictureinpicture
          disableremoteplayback
          poster={posterSrc}
        />
      </Show>

      {/* Overlays */}
      <div class="stage-fallback" />
      <div class="shade" />
      <div class="tint" />
      <div class="vignette" />
      <div class="grain" />
      <Bubbles count={10} class="stage-bubbles" />
    </div>
  );
}
