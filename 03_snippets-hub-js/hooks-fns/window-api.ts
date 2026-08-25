function IS_BROWSER(): boolean {
  return typeof window !== 'undefined';
}

// ─── Screen & Viewport ─────────────────────────────────────────────
export function GET_SCROLL_Y(): number {
  return IS_BROWSER() ? window.scrollY : 0;
}

export function SCROLL_TO_TOP(smooth: boolean = true): void {
  if (IS_BROWSER()) {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }
}

export function GET_VIEWPORT_SIZE(): { width: number; height: number } {
  if (!IS_BROWSER()) return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// ─── Timers (Promisificados) ───────────────────────────────────────
// Ya tienes SLEEP en native.ts, pero DEBOUNCE y THROTTLE son esenciales para window events (resize, scroll)

export function DEBOUNCE<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function THROTTLE<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ─── Print & Focus ─────────────────────────────────────────────────
export function PRINT_PAGE(): void {
  if (IS_BROWSER()) window.print();
}

export function FOCUS_ELEMENT(selector: string): boolean {
  if (!IS_BROWSER()) return false;
  const el = document.querySelector<HTMLElement>(selector);
  if (el) {
    el.focus();
    return true;
  }
  return false;
}