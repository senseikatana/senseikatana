import { createSignal, onCleanup, onMount } from "solid-js";

interface UseScrollProgressOptions {
  trackSelector?: string;
}

/**
 * Hook para calcular el progreso de scroll (0-1) basado en un elemento track.
 * Ideal para sincronizar animaciones con el scroll del usuario.
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { trackSelector = "#track" } = options;
  
  const [progress, setProgress] = createSignal(0);
  const [currentChapter, setCurrentChapter] = createSignal(0);
  const [isScrolling, setIsScrolling] = createSignal(false);
  
  let smooth = 0;
  let rafId: number | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout>;
  let observer: IntersectionObserver | null = null;

  function handleScroll() {
    const track = document.querySelector(trackSelector);
    if (!track) return;
    
    const vh = window.innerHeight;
    const trackH = Math.max((track as HTMLElement).offsetHeight - vh, 1);
    const target = Math.min(Math.max(window.scrollY / trackH, 0), 1);
    
    setProgress(target);
    setIsScrolling(true);
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    
    // Actualizar capítulo actual
    const panels = track.querySelectorAll(".panel");
    const y = window.scrollY + vh * 0.5;
    let idx = 0;
    for (let i = 0; i < panels.length; i++) {
      if ((panels[i] as HTMLElement).offsetTop <= y) idx = i;
    }
    setCurrentChapter(idx);
  }

  function loop() {
    const track = document.querySelector(trackSelector);
    if (!track) {
      rafId = requestAnimationFrame(loop);
      return;
    }
    
    const vh = window.innerHeight;
    const trackH = Math.max((track as HTMLElement).offsetHeight - vh, 1);
    const target = Math.min(Math.max(window.scrollY / trackH, 0), 1);
    
    smooth += (target - smooth) * 0.12;
    if (Math.abs(target - smooth) < 0.0004) smooth = target;
    
    setProgress(smooth);
    rafId = requestAnimationFrame(loop);
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger inicial
    rafId = requestAnimationFrame(loop);
    
    // Observar paneles para IntersectionObserver
    const track = document.querySelector(trackSelector);
    if (track) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("on");
            } else {
              entry.target.classList.remove("on");
            }
          });
        },
        { threshold: 0.28, rootMargin: "-6% 0px -6% 0px" }
      );
      
      track.querySelectorAll(".panel").forEach((panel) => {
        observer!.observe(panel);
      });
    }
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(scrollTimeout);
    if (rafId) cancelAnimationFrame(rafId);
    if (observer) observer.disconnect();
  });

  return {
    progress,
    currentChapter,
    isScrolling,
    smooth: () => smooth,
  };
}
