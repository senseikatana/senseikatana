type StorageType = 'local' | 'session';

/**
 * Obtiene el objeto Storage nativo según el tipo solicitado.
 */
function GET_STORAGE_API(type: StorageType): Storage {
  return type === 'local' ? localStorage : sessionStorage;
}

/**
 * SET: Guarda un valor en el storage.
 * Serializa automáticamente a JSON. Retorna true si tuvo éxito, false si falló.
 */
export function STORAGE_SET<T>(key: string, value: T, type: StorageType = 'local'): boolean {
  try {
    GET_STORAGE_API(type).setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[STORAGE_SET] Error al guardar "${key}":`, error);
    return false;
  }
}

/**
 * GET: Obtiene un valor del storage.
 * Deserializa automáticamente desde JSON. Retorna null si no existe o hay error.
 */
export function STORAGE_GET<T>(key: string, type: StorageType = 'local'): T | null {
  try {
    const item = GET_STORAGE_API(type).getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`[STORAGE_GET] Error al leer "${key}":`, error);
    return null;
  }
}

/**
 * REMOVE: Elimina una clave específica del storage.
 */
export function STORAGE_REMOVE(key: string, type: StorageType = 'local'): void {
  try {
    GET_STORAGE_API(type).removeItem(key);
  } catch (error) {
    console.error(`[STORAGE_REMOVE] Error al eliminar "${key}":`, error);
  }
}

/**
 * CLEAR: (Extra útil) Limpia todo el storage.
 */
export function STORAGE_CLEAR(type: StorageType = 'local'): void {
  try {
    GET_STORAGE_API(type).clear();
  } catch (error) {
    console.error(`[STORAGE_CLEAR] Error al limpiar el storage:`, error);
  }
}