/**
 * Domain value objects — validated, immutable identifiers of the warehouse.
 */

const NUTCODE_PATTERN = /^NUT\d{7}$/;

export class NUTCode {
  private constructor(public readonly value: string) {}

  static parse(input: string): NUTCode {
    if (!NUTCODE_PATTERN.test(input)) {
      throw new Error(`Código NUT inválido: "${input}" (formato NUT seguido de 7 dígitos)`);
    }
    return new NUTCode(input);
  }
}

/** Rack code: letter - rack (2 dígitos) - level (0..6), e.g. A-01-03 */
const RACK_PATTERN = /^([A-Z])-(\d{2})-(\d)$/;
export const MAX_RACK_LEVEL = 6;

export interface RackParts {
  aisle: string;
  rackNumber: number;
  level: number;
}

export class RackCode {
  private constructor(public readonly value: string, public readonly parts: RackParts) {}

  static parse(input: string): RackCode {
    const match = RACK_PATTERN.exec(input);
    if (!match) {
      throw new Error(`Ubicación inválida: "${input}" (formato A-01-03)`);
    }
    const level = Number(match[3]);
    if (level < 0 || level > MAX_RACK_LEVEL) {
      throw new Error(`Nivel de estantería fuera de rango (0-${MAX_RACK_LEVEL}): "${input}"`);
    }
    return new RackCode(input, {
      aisle: match[1],
      rackNumber: Number(match[2]),
      level,
    });
  }
}
