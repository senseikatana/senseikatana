function IS_BROWSER(): boolean {
  return typeof window !== 'undefined' && 'Worker' in window;
}

/**
 * RUN_IN_WORKER: Ejecuta una función pura en un hilo separado (Web Worker).
 * Evita congelar la UI durante cálculos pesados.
 * NOTA: La función NO puede acceder a variables externas (closure) ni al DOM.
 * Debe ser una función pura que reciba datos y retorne datos.
 */
export async function RUN_IN_WORKER<TInput, TOutput>(
  workerFunc: (data: TInput) => TOutput,
  data: TInput
): Promise<TOutput> {
  if (!IS_BROWSER()) {
    // Fallback para SSR/Node: ejecutar en el hilo principal
    return Promise.resolve(workerFunc(data));
  }

  return new Promise((resolve, reject) => {
    try {
      // Convertimos la función a string y creamos un Blob para ejecutarla en memoria
      const funcString = workerFunc.toString();
      const blob = new Blob([`self.onmessage = (e) => self.postMessage((${funcString})(e.data))`], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      
      const worker = new Worker(workerUrl);

      worker.onmessage = (event) => {
        resolve(event.data);
        worker.terminate(); // Limpiamos el worker inmediatamente
        URL.revokeObjectURL(workerUrl); // Liberamos memoria
      };

      worker.onerror = (error) => {
        reject(new Error(`Worker error: ${error.message}`));
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };

      worker.postMessage(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * CREATE_POOL: Crea un Worker reutilizable para múltiples tareas secuenciales.
 * Útil si vas a hacer muchos cálculos seguidos y no quieres el overhead de crear/destruir workers.
 */
export function CREATE_POOL<TInput, TOutput>(workerFunc: (data: TInput) => TOutput): { run: (data: TInput) => Promise<TOutput>; terminate: () => void } {
  let worker: Worker | null = null;
  let workerUrl: string | null = null;

  const init = () => {
    if (!IS_BROWSER() || worker) return;
    const funcString = workerFunc.toString();
    const blob = new Blob([`self.onmessage = (e) => self.postMessage((${funcString})(e.data))`], { type: 'application/javascript' });
    workerUrl = URL.createObjectURL(blob);
    worker = new Worker(workerUrl);
  };

  const run = (data: TInput): Promise<TOutput> => {
    if (!IS_BROWSER()) return Promise.resolve(workerFunc(data));
    init();
    
    return new Promise((resolve, reject) => {
      if (!worker) return reject(new Error('Worker failed to initialize'));
      
      worker.onmessage = (event) => resolve(event.data);
      worker.onerror = (error) => reject(new Error(`Worker error: ${error.message}`));
      worker.postMessage(data);
    });
  };

  const terminate = () => {
    if (worker) {
      worker.terminate();
      worker = null;
    }
    if (workerUrl) {
      URL.revokeObjectURL(workerUrl);
      workerUrl = null;
    }
  };

  return { run, terminate };
}