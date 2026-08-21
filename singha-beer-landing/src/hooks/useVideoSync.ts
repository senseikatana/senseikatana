import { createSignal, onCleanup, onMount } from "solid-js";
import { useReducedMotion } from "./useReducedMotion";

interface UseVideoSyncOptions {
  videoSrc: string;
  posterSrc?: string;
  trackSelector?: string;
  disabled?: boolean;
}

/**
 * Hook principal para sincronizar un video con el scroll del usuario.
 * El video avanza/retrocede según el progreso de scroll.
 * 
 * Optimizaciones:
 * - Pausa cuando el tab no está visible
 * - Respeta prefers-reduced-motion
 * - Usa fastSeek para saltos grandes
 * - Pipeline de seeks para evitar bloqueos
 */
export function useVideoSync(options: UseVideoSyncOptions) {
  const { videoSrc, posterSrc, trackSelector = "#track", disabled = false } = options;
  const reduced = useReducedMotion();
  
  const [videoReady, setVideoReady] = createSignal(false);
  const [videoDuration, setVideoDuration] = createSignal(30);
  const [isBuffering, setIsBuffering] = createSignal(false);
  const [loadProgress, setLoadProgress] = createSignal(0);
  const [loaded, setLoaded] = createSignal(false);
  const [failed, setFailed] = createSignal(false);
  
  let videoRef: HTMLVideoElement | undefined;
  let smooth = 0;
  let rafId: number | null = null;
  let guardTimeout: ReturnType<typeof setTimeout>;
  let seeking = false;
  let pendingSeek: number | null = null;
  const K = reduced() ? 1 : 0.12;
  const MAX_RATE = 8;

  function setVideoRef(el: HTMLVideoElement) {
    videoRef = el;
    setupVideoListeners();
  }

  function clampT(t: number) {
    return Math.min(Math.max(t, 0), Math.max(videoDuration() - 0.05, 0));
  }

  function flushSeek() {
    seeking = false;
    if (pendingSeek !== null) {
      const t = pendingSeek;
      pendingSeek = null;
      applySeek(t);
    }
  }

  function applySeek(t: number) {
    if (!videoRef) return;
    t = clampT(t);
    
    if (seeking) {
      pendingSeek = t;
      return;
    }
    
    if (Math.abs(t - videoRef.currentTime) < 0.02) return;
    
    seeking = true;
    clearTimeout(guardTimeout);
    guardTimeout = setTimeout(flushSeek, 320);
    
    if (Math.abs(t - videoRef.currentTime) > 1.2 && "fastSeek" in videoRef) {
      try {
        videoRef.fastSeek(t);
        return;
      } catch {}
    }
    
    videoRef.currentTime = t;
  }

  function updateVideo(t: number) {
    if (!videoRef || !videoReady() || failed()) return;
    
    const diff = t - videoRef.currentTime;
    const ad = Math.abs(diff);
    
    if (ad < 0.02) {
      if (!videoRef.paused) videoRef.pause();
      return;
    }
    
    if (ad > 1.6) {
      if (!videoRef.paused) videoRef.pause();
      applySeek(t);
      return;
    }
    
    if (diff > 0 && ad > 0.12) {
      const rate = Math.min(Math.max(ad * 5, 0.6), MAX_RATE);
      if (videoRef.paused) videoRef.play().catch(() => {});
      if (Math.abs(videoRef.playbackRate - rate) > 0.04) {
        try { videoRef.playbackRate = rate; } catch {}
      }
      return;
    }
    
    if (!videoRef.paused) videoRef.pause();
    if (ad > 0.035) applySeek(t);
  }

  function setupVideoListeners() {
    if (!videoRef) return;
    
    function handleMetadata() {
      setVideoDuration(videoRef!.duration || 30);
      videoRef!.pause();
      setVideoReady(videoRef!.readyState >= 2);
      
      // Intentar reproducir rápidamente para obtener buffered
      try {
        videoRef!.playbackRate = 16;
        videoRef!.playbackRate = 1;
      } catch {}
      
      maybeReady();
    }
    
    function handleProgress() {
      maybeReady();
    }
    
    function handleCanPlayThrough() {
      maybeReady();
    }
    
    function handleError() {
      setFailed(true);
      document.body.classList.add("no-video");
      setLoaded(true);
    }
    
    function handleWaiting() {
      setIsBuffering(true);
    }
    
    function handlePlaying() {
      setIsBuffering(false);
    }
    
    function maybeReady() {
      if (loaded() || !videoDuration()) return;
      
      let pct = 0;
      try {
        const b = videoRef!.buffered;
        if (b.length) pct = (b.end(b.length - 1) / videoDuration()) * 100;
      } catch {}
      
      setLoadProgress(Math.min(100, pct));
      
      if (pct >= 55 || videoRef!.readyState >= 4) {
        setVideoReady(true);
        setLoaded(true);
      }
    }
    
    videoRef.addEventListener("loadedmetadata", handleMetadata);
    videoRef.addEventListener("progress", handleProgress);
    videoRef.addEventListener("canplaythrough", handleCanPlayThrough);
    videoRef.addEventListener("error", handleError);
    videoRef.addEventListener("waiting", handleWaiting);
    videoRef.addEventListener("playing", handlePlaying);
    videoRef.addEventListener("seeked", handlePlaying);
    videoRef.addEventListener("pause", handlePlaying);
    
    // Timeout de seguridad
    setTimeout(() => {
      if (!loaded()) {
        if (videoRef!.readyState >= 2) {
          setVideoReady(true);
          setLoaded(true);
        } else {
          setFailed(true);
          document.body.classList.add("no-video");
          setLoaded(true);
        }
      }
    }, 10000);
  }

  function loop() {
    if (disabled) {
      rafId = requestAnimationFrame(loop);
      return;
    }
    
    const track = document.querySelector(trackSelector);
    if (!track) {
      rafId = requestAnimationFrame(loop);
      return;
    }
    
    const vh = window.innerHeight;
    const trackH = Math.max(track.offsetHeight - vh, 1);
    const target = Math.min(Math.max(window.scrollY / trackH, 0), 1);
    
    smooth += (target - smooth) * K;
    if (Math.abs(target - smooth) < 0.0004) smooth = target;
    
    // Actualizar CSS custom property para fallback
    document.documentElement.style.setProperty("--p", smooth.toFixed(4));
    
    // Calcular tiempo del video
    const t = smooth * Math.max(videoDuration() - 0.06, 0);
    updateVideo(t);
    
    rafId = requestAnimationFrame(loop);
  }

  // Pausar loop cuando tab no está visible
  function handleVisibility() {
    if (document.hidden) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else {
      if (!rafId) {
        rafId = requestAnimationFrame(loop);
      }
    }
  }

  onMount(() => {
    if (disabled) return;
    
    document.addEventListener("visibilitychange", handleVisibility);
    rafId = requestAnimationFrame(loop);
  });

  onCleanup(() => {
    document.removeEventListener("visibilitychange", handleVisibility);
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(guardTimeout);
  });

  return {
    setVideoRef,
    videoReady,
    videoDuration,
    isBuffering,
    loadProgress,
    loaded,
    failed,
    reduced,
    posterSrc,
  };
}
