import LOGGER from "./logger.utils";

export default class MATH {
	private static instance: MATH;

	private constructor() {
		// Constructor privado para forzar Singleton
	}

	static getInstance(): MATH {
		if (!MATH.instance) {
			MATH.instance = new MATH();
		}
		return MATH.instance;
	}

	// Constantes

	PI(): number {
		return Math.PI;
	}

	ABSOLUTE(value: number): number {
		return Math.abs(value);
	}

	AVERAGE(numbers: number[]): number {
		if (numbers.length === 0) return 0;
		return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
	}

	CEIL(value: number): number {
		return Math.ceil(value);
	}

	FLOOR(value: number): number {
		return Math.floor(value);
	}

	MAX(numbers: number[]): number {
		return Math.max(...numbers);
	}

	MIN(numbers: number[]): number {
		return Math.min(...numbers);
	}

	POW(base: number, exponent: number): number {
		return base ** exponent;
	}

	SQRT(value: number): number {
		return Math.sqrt(value);
	}

	SUM(values: number[]): number {
		return values.reduce((acc, n) => acc + n, 0);
	}

	SUM_PRODUCT(arr1: number[], arr2: number[]): number {
		if (arr1.length !== arr2.length) {
			throw new Error("Arrays must have equal length");
		}
		return arr1.reduce((acc, val, i) => acc + val * (arr2[i] ?? 0), 0);
	}

	RANDOM_INT(min: number, max: number): number {
		const minCeil = Math.ceil(min);
		const maxFloor = Math.floor(max);
		return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
	}

	ROUND(value: string | number, decimals: number = 2): number {
		const num = typeof value === "string" ? parseFloat(value) : value;
		if (Number.isNaN(num)) return 0;
		const factor: number = 10 ** decimals;
		return Math.round(num * factor) / factor;
	}
}

// ============================================================
// TODO: Usage and demo
// ============================================================
export const { AVERAGE, RANDOM_INT, PI }: MATH = MATH.getInstance();

LOGGER({
	average: AVERAGE([1, 2, 3, 4, 5]),
	random: RANDOM_INT(1, 1000),
	pinumber: PI,
});
