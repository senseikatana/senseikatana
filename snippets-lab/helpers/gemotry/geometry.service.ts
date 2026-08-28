/**
 * Options for number formatting in geometry calculations.
 */
export interface GeometryFormatOptions {
	locale?: string;
	digits?: number;
	unit?: string;
}

/**
 * Utility class for calculating areas of geometric shapes.
 * All methods return formatted strings with optional precision.
 *
 * @example
 * ```typescript
 * const area = GeometryUtils.area.rectangle(5, 10); // "50.00"
 * const circleArea = GeometryUtils.area.circle(3); // "28.27"
 * ```
 */
export class GeometryArea {
	private constructor() {}

	/**
	 * Formats a number with the specified precision.
	 */
	private static format(
		value: number,
		options: GeometryFormatOptions = {},
	): string {
		const { locale = "en", digits = 2, unit } = options;
		const formatted = new Intl.NumberFormat(locale, {
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
		}).format(value);

		return unit ? `${formatted} ${unit}` : formatted;
	}

	/**
	 * Rectangle area: A = width × height
	 */
	static rectangle(
		width: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(width * height, options);
	}

	/**
	 * Square area: A = side²
	 */
	static square(side: number, options?: GeometryFormatOptions): string {
		return this.format(side ** 2, options);
	}

	/**
	 * Triangle area: A = (base × height) / 2
	 */
	static triangle(
		base: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format((base * height) / 2, options);
	}

	/**
	 * Circle area: A = π × r²
	 */
	static circle(radius: number, options?: GeometryFormatOptions): string {
		return this.format(Math.PI * radius ** 2, options);
	}

	/**
	 * Trapezoid area: A = ((a + b) × height) / 2
	 */
	static trapezoid(
		parallelSide1: number,
		parallelSide2: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(
			((parallelSide1 + parallelSide2) * height) / 2,
			options,
		);
	}

	/**
	 * Regular hexagon area: A = (3√3 / 2) × side²
	 */
	static hexagon(side: number, options?: GeometryFormatOptions): string {
		return this.format(((3 * Math.sqrt(3)) / 2) * side ** 2, options);
	}

	/**
	 * Ellipse area: A = π × a × b (semi-major × semi-minor axes)
	 */
	static ellipse(
		semiMajor: number,
		semiMinor: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(Math.PI * semiMajor * semiMinor, options);
	}

	/**
	 * Parallelogram area: A = base × height
	 */
	static parallelogram(
		base: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(base * height, options);
	}
}

/**
 * Utility class for calculating perimeters of geometric shapes.
 *
 * @example
 * ```typescript
 * const perimeter = GeometryUtils.perimeter.rectangle(5, 10); // "30.00"
 * const circlePerimeter = GeometryUtils.perimeter.circle(3); // "18.85"
 * ```
 */
export class GeometryPerimeter {
	private constructor() {}

	private static format(
		value: number,
		options: GeometryFormatOptions = {},
	): string {
		const { locale = "en", digits = 2, unit } = options;
		const formatted = new Intl.NumberFormat(locale, {
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
		}).format(value);

		return unit ? `${formatted} ${unit}` : formatted;
	}

	/**
	 * Rectangle perimeter: P = 2 × (width + height)
	 */
	static rectangle(
		width: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(2 * (width + height), options);
	}

	/**
	 * Square perimeter: P = 4 × side
	 */
	static square(side: number, options?: GeometryFormatOptions): string {
		return this.format(4 * side, options);
	}

	/**
	 * Triangle perimeter: P = a + b + c
	 */
	static triangle(
		side1: number,
		side2: number,
		side3: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(side1 + side2 + side3, options);
	}

	/**
	 * Circle circumference: C = 2 × π × r
	 */
	static circle(radius: number, options?: GeometryFormatOptions): string {
		return this.format(2 * Math.PI * radius, options);
	}

	/**
	 * Regular hexagon perimeter: P = 6 × side
	 */
	static hexagon(side: number, options?: GeometryFormatOptions): string {
		return this.format(6 * side, options);
	}

	/**
	 * Trapezoid perimeter: P = a + b + c + d
	 */
	static trapezoid(
		side1: number,
		side2: number,
		side3: number,
		side4: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(side1 + side2 + side3 + side4, options);
	}

	/**
	 * Ellipse perimeter (approximation using Ramanujan's formula)
	 */
	static ellipse(
		semiMajor: number,
		semiMinor: number,
		options?: GeometryFormatOptions,
	): string {
		const a = semiMajor;
		const b = semiMinor;
		const h = ((a - b) ** 2) / ((a + b) ** 2);
		const perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
		return this.format(perimeter, options);
	}

	/**
	 * Parallelogram perimeter: P = 2 × (a + b)
	 */
	static parallelogram(
		side1: number,
		side2: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(2 * (side1 + side2), options);
	}
}

/**
 * Utility class for calculating volumes of 3D geometric shapes.
 *
 * @example
 * ```typescript
 * const volume = GeometryUtils.volume.sphere(3); // "113.10"
 * const cubeVol = GeometryUtils.volume.cube(5); // "125.00"
 * ```
 */
export class GeometryVolume {
	private constructor() {}

	private static format(
		value: number,
		options: GeometryFormatOptions = {},
	): string {
		const { locale = "en", digits = 2, unit } = options;
		const formatted = new Intl.NumberFormat(locale, {
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
		}).format(value);

		return unit ? `${formatted} ${unit}` : formatted;
	}

	/**
	 * Cube volume: V = side³
	 */
	static cube(side: number, options?: GeometryFormatOptions): string {
		return this.format(side ** 3, options);
	}

	/**
	 * Rectangular prism (box) volume: V = length × width × height
	 */
	static box(
		length: number,
		width: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(length * width * height, options);
	}

	/**
	 * Sphere volume: V = (4/3) × π × r³
	 */
	static sphere(radius: number, options?: GeometryFormatOptions): string {
		return this.format((4 / 3) * Math.PI * radius ** 3, options);
	}

	/**
	 * Cylinder volume: V = π × r² × height
	 */
	static cylinder(
		radius: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format(Math.PI * radius ** 2 * height, options);
	}

	/**
	 * Cone volume: V = (1/3) × π × r² × height
	 */
	static cone(
		radius: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format((1 / 3) * Math.PI * radius ** 2 * height, options);
	}

	/**
	 * Pyramid volume: V = (1/3) × baseArea × height
	 */
	static pyramid(
		baseArea: number,
		height: number,
		options?: GeometryFormatOptions,
	): string {
		return this.format((1 / 3) * baseArea * height, options);
	}
}


// const { }: GeometryArea = GeometryArea() as GeometryArea



/**
 * Consolidated geometry utilities namespace.
 * Groups area, perimeter, and volume calculations.
 */
export const GeometryUtils = {
	area: GeometryArea,
	perimeter: GeometryPerimeter,
	volume: GeometryVolume,
};