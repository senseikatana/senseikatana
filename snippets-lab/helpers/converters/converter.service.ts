// services/ConverterService.ts
import { NumberFormatOptions } from "../../types";
import { FormatterService } from "./FormatterService";

export class ConverterService {
	private static instance: ConverterService;
	private formatter: FormatterService;

	private constructor() {
		this.formatter = FormatterService.getInstance();
	}

	static getInstance(): ConverterService {
		if (!ConverterService.instance) {
			ConverterService.instance = new ConverterService();
		}
		return ConverterService.instance;
	}

	// Temperatura
	toCelsius(fahrenheit: number, options?: NumberFormatOptions): string {
		const celsius = (fahrenheit - 32) / 1.8;
		return this.formatter.formatNumber(celsius, options);
	}

	toFahrenheit(celsius: number, options?: NumberFormatOptions): string {
		const fahrenheit = celsius * 1.8 + 32;
		return this.formatter.formatNumber(fahrenheit, options);
	}

	// Distancia
	toKilometers(miles: number, options?: NumberFormatOptions): string {
		const km = miles / 0.62137;
		return this.formatter.formatNumber(km, options);
	}

	toMiles(km: number, options?: NumberFormatOptions): string {
		const miles = km * 1.60934;
		return this.formatter.formatNumber(miles, options);
	}

	toInches(cm: number, options?: NumberFormatOptions): string {
		const inches = cm / 2.54;
		return this.formatter.formatNumber(inches, options);
	}

	toCm(inches: number, options?: NumberFormatOptions): string {
		const cm = inches * 2.54;
		return this.formatter.formatNumber(cm, options);
	}

	// Peso
	toKilos(pounds: number, options?: NumberFormatOptions): string {
		const kilos = pounds * 0.453592;
		return this.formatter.formatNumber(kilos, options);
	}

	toPounds(kilos: number, options?: NumberFormatOptions): string {
		const pounds = kilos / 0.453592;
		return this.formatter.formatNumber(pounds, options);
	}
}

const { toCelsius, toFahrenheit }: ConverterService = ConverterService.getInstance()


console.log(toFahrenheit(34.5, { digits: 2, locale: 'en'}))