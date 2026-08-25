type Listener<T> = (newValue: T, oldValue: T) => void;

/**
 * SIGNAL: Crea un estado reactivo genérico (Estilo Solid/Vanilla).
 * Retorna un getter (para leer) y un setter (para actualizar y notificar).
 */
export function CREATE_SIGNAL<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
  let value = initialValue;
  const listeners = new Set<Listener<T>>();

  const get = (): T => value;

  const set = (nextValue: T | ((prev: T) => T)): void => {
    const oldValue = value;
    // Soporta actualización funcional: setCount(prev => prev + 1)
    value = typeof nextValue === 'function' 
      ? (nextValue as (prev: T) => T)(oldValue) 
      : nextValue;

    if (value !== oldValue) {
      listeners.forEach(listener => listener(value, oldValue));
    }
  };

  // Adjuntamos el método subscribe al getter para poder escuchar cambios
  (get as any).subscribe = (listener: Listener<T>): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener); // Función de limpieza (unsubscribe)
  };

  return [get, set];
}

/**
 * EFFECT: Ejecuta una función cada vez que las señales que lee cambian.
 * NOTA: Esta es una implementación simplificada. En Solid real, el tracking es automático vía Proxy.
 * Aquí requerimos pasar las señales explícitamente para mantenerlo genérico y sin magia negra.
 */
export function CREATE_EFFECT(
  callback: () => void | (() => void),
  signals: Array<{ subscribe?: (fn: Listener<any>) => () => void }>
): () => void {
  let cleanup: void | (() => void);

  const execute = () => {
    if (typeof cleanup === 'function') cleanup(); // Limpiamos el efecto anterior
    cleanup = callback() as void | (() => void);
  };

  const unsubscribes = signals.map(signal => {
    if (signal && typeof signal.subscribe === 'function') {
      return signal.subscribe(execute);
    }
    return () => {};
  });

  execute(); // Ejecución inicial

  // Retornamos función para destruir el efecto y todos sus listeners
  return () => {
    if (typeof cleanup === 'function') cleanup();
    unsubscribes.forEach(unsub => unsub());
  };
}

/**
 * MEMO: Crea una señal derivada (computada) que solo se actualiza si sus dependencias cambian.
 */
export function CREATE_MEMO<T>(
  computation: () => T,
  signals: Array<{ subscribe?: (fn: Listener<any>) => () => void }>
): () => T {
  const [get, set] = CREATE_SIGNAL<T>(computation());

  CREATE_EFFECT(() => {
    set(computation());
  }, signals);

  return get;
}

/**
 * TOGGLE: Un signal booleano con un método extra para alternar (true/false).
 * Muy útil para menús hamburguesa, modales, etc.
 */
export function CREATE_TOGGLE(initialValue: boolean = false): [() => boolean, { set: (v: boolean) => void; toggle: () => void }] {
  const [get, set] = CREATE_SIGNAL<boolean>(initialValue);
  
  const toggle = () => set(prev => !prev);

  return [get, { set, toggle }];
}

/**
 * STORAGE_SIGNAL: Un signal que se sincroniza automáticamente con localStorage.
 * ¡La combinación perfecta entre tus módulos de state y storage!
 */
export function CREATE_STORAGE_SIGNAL<T>(key: string, initialValue: T, type: 'local' | 'session' = 'local'): [() => T, (newValue: T | ((prev: T) => T)) => void] {
  // Intentamos leer del storage, si no existe, usamos el valor inicial
  let storedValue: T = initialValue;
  if (typeof window !== 'undefined') {
    try {
      const item = (type === 'local' ? localStorage : sessionStorage).getItem(key);
      if (item) storedValue = JSON.parse(item);
    } catch (e) {}
  }

  const [get, set] = CREATE_SIGNAL<T>(storedValue);

  // Sobrescribimos el set para que también guarde en storage
  const setWithStorage = (nextValue: T | ((prev: T) => T)): void => {
    set((prev) => {
      const newValue = typeof nextValue === 'function' ? (nextValue as (p: T) => T)(prev) : nextValue;
      
      if (typeof window !== 'undefined') {
        try {
          (type === 'local' ? localStorage : sessionStorage).setItem(key, JSON.stringify(newValue));
        } catch (e) {}
      }
      return newValue;
    });
  };

  return [get, setWithStorage];
}