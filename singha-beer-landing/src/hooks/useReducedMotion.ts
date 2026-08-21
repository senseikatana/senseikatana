import { createSignal, onCleanup, onMount } from "solid-js";

/**
 * Hook para detectar prefers-reduced-motion del usuario.
 * Respeta las configuraciones de accesibilidad del sistema.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = createSignal(false);

  onMount(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };
    
    query.addEventListener("change", handler);
    onCleanup(() => query.removeEventListener("change", handler));
  });

  return reduced;
}
