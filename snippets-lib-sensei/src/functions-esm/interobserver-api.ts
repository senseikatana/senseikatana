function IS_BROWSER(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * ON_VISIBLE: Ejecuta un callback cuando un elemento entra en el viewport.
 * Ideal para animaciones al hacer scroll o lazy loading.
 * Retorna una función para DEJAR de observar (cleanup).
 */
export function ON_VISIBLE(
  element: HTMLElement | string,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): (() => void) | null {
  if (!IS_BROWSER()) return null;

  const target = typeof element === 'string' ? document.querySelector<HTMLElement>(element) : element;
  if (!target) {
    console.warn('[ON_VISIBLE] Elemento no encontrado:', element);
    return null;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
        // Por defecto dejamos de observar una vez que ya apareció (útil para animaciones "one-shot")
        // Si quieres que se repita al subir y bajar, cambia esta línea.
        observer.unobserve(entry.target); 
      }
    });
  }, options);

  observer.observe(target);

  // Retornamos función de limpieza
  return () => observer.disconnect();
}

/**
 * LAZY_LOAD_IMAGES: Busca todas las imágenes con data-src y las carga cuando son visibles.
 * Súper útil para listados largos (como tu lista de Pokémons).
 */
export function LAZY_LOAD_IMAGES(selector: string = 'img[data-src]'): (() => void) | null {
  if (!IS_BROWSER()) return null;

  const images = document.querySelectorAll<HTMLImageElement>(selector);
  if (images.length === 0) return null;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' }); // Empieza a cargar 200px antes de que sea visible

  images.forEach(img => observer.observe(img));

  return () => observer.disconnect();
}