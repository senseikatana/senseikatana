function IS_BROWSER(): boolean {
  return typeof window !== 'undefined';
}

// Usamos ReturnType para que funcione tanto en navegador (number) como en Node/Bun (Object)
type TimerId = ReturnType<typeof setTimeout>;

/**
 * DELAY: Versión promisificada de setTimeout.
 * Útil para hacer pausas limpias con async/await.
 * Ej: await LAMBDA.DELAY(2000);
 */
export function DELAY(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * TIMEOUT: Ejecuta una función después de X milisegundos.
 * Retorna un objeto con la promesa del resultado y una función para CANCELAR el timeout.
 */
export function TIMEOUT<T>(callback: () => T | Promise<T>, ms: number): { promise: Promise<T>; cancel: () => void } {
  let timerId: TimerId;
  
  const promise = new Promise<T>((resolve, reject) => {
    timerId = setTimeout(async () => {
      try {
        const result = await callback();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, ms);
  });

  const cancel = () => {
    clearTimeout(timerId);
  };

  return { promise, cancel };
}

/**
 * INTERVAL: Versión mejorada y controlable de setInterval.
 * Soporta callbacks asíncronos (async/await) sin solapar ejecuciones.
 * Retorna un objeto de control para pausar, reanudar y detener.
 */
export function INTERVAL(
  callback: () => void | Promise<void>, 
  ms: number, 
  immediate: boolean = false
): { pause: () => void; resume: () => void; stop: () => void } {
  let timerId: TimerId | null = null;
  let isPaused = false;
  let isStopped = false;

  const execute = async () => {
    if (isPaused || isStopped) return;
    
    // Evitamos que la siguiente ejecución empiece si la anterior (asíncrona) aún no termina
    isPaused = true; 
    try {
      await callback();
    } catch (error) {
      console.error('[INTERVAL] Error en callback:', error);
    } finally {
      if (!isStopped) isPaused = false;
    }
  };

  const loop = () => {
    if (isStopped) return;
    execute();
    timerId = setTimeout(loop, ms);
  };

  const stop = () => {
    isStopped = true;
    if (timerId) clearTimeout(timerId);
  };

  const pause = () => {
    isPaused = true;
    if (timerId) clearTimeout(timerId);
  };

  const resume = () => {
    if (isStopped) return;
    isPaused = false;
    loop();
  };

  // Iniciar
  if (immediate) {
    execute();
  }
  timerId = setTimeout(loop, ms);

  return { pause, resume, stop };
}

/**
 * DEBOUNCE: Retrasa la ejecución hasta que hayan pasado X ms sin nuevas llamadas.
 * Esencial para inputs de búsqueda o resize de window.
 */
export function DEBOUNCE<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: TimerId;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * THROTTLE: Limita la ejecución a una vez cada X ms.
 * Esencial para eventos de scroll o mousemove.
 */
export function THROTTLE<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}