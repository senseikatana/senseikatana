export const PI = Math.PI;

export function ABS(value: number): number {
  return Math.abs(value);
}

export function AVERAGE(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}

export function CEIL(value: number): number {
  return Math.ceil(value);
}

export function FLOOR(value: number): number {
  return Math.floor(value);
}

export function MAX(numbers: number[]): number {
  return Math.max(...numbers);
}

export function MIN(numbers: number[]): number {
  return Math.min(...numbers);
}

export function POW(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

export function SQRT(value: number): number {
  return Math.sqrt(value);
}

export function SUM(values: number[]): number {
  return values.reduce((acc, n) => acc + n, 0);
}

export function SUM_PRODUCT(arr1: number[], arr2: number[]): number {
  if (arr1.length !== arr2.length) throw new Error('Arrays must have equal length');
  return arr1.reduce((acc, val, i) => acc + val * (arr2[i] ?? 0), 0);
}

export function RANDOM_INT(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function ROUND(value: string | number, decimals: number = 2): number {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}