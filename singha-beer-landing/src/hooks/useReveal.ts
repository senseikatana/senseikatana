import { createSignal, onCleanup, onMount } from "solid-js";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook que observa múltiples elementos con clsase "reveal" y les agrega
 * la clase "on" cuando entran en el viewport.
 * 
 * Usa un solo IntersectionObserver compartido para eficiencia.
 */
export function useReveal(options: UseRevealOptions = {}) {
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px" } = options;
  
  let observer: IntersectionObserver | undefined;
  const revealed = new Set<Element>();

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealed.has(entry.target)) {
            entry.target.classList.add("on");
            revealed.add(entry.target);
            
            // Activar contadores dentro del elemento
            const counters = entry.target.querySelectorAll("[data-count]");
            counters.forEach((el) => {
              if (!el.hasAttribute("data-animated")) {
                el.setAttribute("data-animated", "true");
                animateCounter(el as HTMLElement);
              }
            });
          }
        });
      },
      { threshold, rootMargin }
    );
  });

  /**
   * Registra un elemento para observación
   */
  function observe(el: Element) {
    if (observer) {
      observer.observe(el);
    }
  }

  /**
   * Limpia el observer
   */
  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = undefined;
      revealed.clear();
    }
  }

  onCleanup(cleanup);

  return { observe, cleanup };
}

/**
 * Anima un contador desde 0 hasta su valor final
 */
function animateCounter(el: HTMLElement) {
  const end = parseFloat(el.dataset.count || "0");
  const dec = parseInt(el.dataset.dec || "0", 10);
  const sep = el.dataset.sep === "true";
  const duration = 1400;
  const startTime = performance.now();

  function update(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = (end * ease).toFixed(dec);
    el.textContent = sep ? value.replace(".", ",") : value;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalValue = end.toFixed(dec);
      el.textContent = sep ? finalValue.replace(".", ",") : finalValue;
    }
  }

  requestAnimationFrame(update);
}
