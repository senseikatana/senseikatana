import { LOGGER } from "./logger";

export function CAPITALIZE(text: string = ''): string {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function SLUGIFY(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function TRIM(text: string): string {
  return text.trim();
}

export function IS_VALID_EMAIL(email: string): boolean {
  // Fix: El punto ahora está escapado (\.) para validar correctamente el dominio
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

LOGGER(SLUGIFY('Articulo del blog'))