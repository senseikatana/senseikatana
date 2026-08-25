import { DEEP_CLONE } from '@/objects';

// ─── Arrays & Objects (Nativas ES2019+) ────────────────────────────
export function UNIQUE<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function FLATTEN<T>(array: T[][]): T[] {
  return array.flat(Infinity) as T[];
}

export function CHUNK<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function PICK<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

export function OMIT<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = DEEP_CLONE(obj);
  keys.forEach(key => delete result[key]);
  return result as Omit<T, K>;
}

// ─── Promises & Time (Nativas Web APIs) ────────────────────────────
export function SLEEP(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function RETRY<T>(
  fn: () => Promise<T>, 
  retries: number = 3, 
  delayMs: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await SLEEP(delayMs);
    return RETRY(fn, retries - 1, delayMs);
  }
}

// ─── Clipboard API ─────────────────────────────────────────────────
export async function COPY_TO_CLIPBOARD(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard error:', error);
    return false;
  }
}

// ─── URL API ───────────────────────────────────────────────────────
export function PARSE_URL(urlString: string): URL | null {
  try {
    return new URL(urlString);
  } catch {
    return null;
  }
}

export function GET_URL_PARAMS(urlString: string): Record<string, string> {
  const url = PARSE_URL(urlString);
  if (!url) return {};
  return Object.fromEntries(url.searchParams.entries());
}