// ---------------------------
// 1. Función auxiliar externa
// ---------------------------
/**
 * Extrae el número ID de un código NUT o devuelve el número directamente.
 */
function extractNumericValue(code: number | string): number {
  if (typeof code === 'number') {
    return code;
  }
  // Extraemos los dígitos (ej: "NUT004" extrae 4)
  const match = String(code).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * Función helper: Recorre el array y construye el Set de números ya usados.
 * @param existingCodes - Array de códigos existentes.
 * @param startFrom - Límite inferior para considerar un código como válido.
 */
function getUsedNumbersSet(
  existingCodes: (number | string)[],
  startFrom: number
): Set<number> {
  const usedNumbers = new Set<number>();
  
  // NOTA: En TypeScript/JS para arrays se recomienda usar for...of o forEach.
  // Si prefieres estrictamente "for...in" (que itera sobre índices), se haría así:
  // for (const index in existingCodes) { const code = existingCodes[index]; ... }
  for (const code of existingCodes) {
    const numericValue = extractNumericValue(code);
    if (numericValue >= startFrom) {
      usedNumbers.add(numericValue);
    }
  }
  return usedNumbers;
}


// ---------------------------
// 2. Función principal reducida
// ---------------------------
/**
 * Genera un código NUT único para el SGA de Esinsa.
 * Busca el primer número libre disponible.
 */
export function generateUniqueNutCode(
  existingCodes: (number | string)[] = [],
  padding: number = 3,
  startFrom: number = 0
): string {
  // Obtenemos los números ya usados gracias a la función helper
  const usedNumbers = getUsedNumbersSet(existingCodes, startFrom);

  // Buscamos el primer número libre (rellenando huecos)
  let candidate = startFrom;
  while (usedNumbers.has(candidate)) {
    candidate++;
  }

  // Devolvemos con el padding aplicado (ej: 4 -> "004")
  return `NUT${String(candidate).padStart(padding, '0')}`;
}