// types/index.ts
export type LocaleTypes = "en" | "es" | "fr" | "de";
export type DateStyleTypes = "short" | "medium" | "long" | "full";
export interface DateFormatOptions {
	date?: Date;
	format?: DateStyleTypes;
	locale?: LocaleTypes;
}



