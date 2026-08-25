export function DEEP_CLONE<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

export function DEEP_MERGE<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>
): T {
  if (!target || !source) return { ...target };
  const output: Record<string, unknown> = { ...target };

  Object.keys(source).forEach((key) => {
    const targetVal = target[key];
    const sourceVal = source[key];

    if (
      typeof targetVal === 'object' && targetVal !== null &&
      typeof sourceVal === 'object' && sourceVal !== null &&
      !Array.isArray(sourceVal)
    ) {
      output[key] = DEEP_MERGE(targetVal as Record<string, unknown>, sourceVal as Record<string, unknown>);
    } else {
      output[key] = sourceVal;
    }
  });

  return output as T;
}

export function HAS_PROPERTIES<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): obj is T & Record<K, NonNullable<T[K]>> {
  return keys.every((key) => obj[key] !== undefined && obj[key] !== null);
}

export function IS_OBJECT(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

export function GROUP_BY<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    acc[groupKey] = acc[groupKey] ?? [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function TO_JSON(data: unknown, indent: number = 2): string {
  return JSON.stringify(data, null, indent);
}

export function FROM_JSON<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}