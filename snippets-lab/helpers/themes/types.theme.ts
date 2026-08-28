// services/theme.service.ts
import { LOGGER } from "./logger.service";

/**
 * Supported theme modes.
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Options for theme initialization.
 */
export interface ThemeOptions {
	/** Default theme mode. Default: 'system' */
	defaultMode?: ThemeMode;
	/** LocalStorage key. Default: 'theme' */
	storageKey?: string;
	/** HTML attribute to set theme on. Default: 'data-theme' */
	attribute?: string;
	/** Element to apply theme attribute to. Default: document.documentElement */
	target?: HTMLElement;
	/** Callback fired when theme changes */
	onChange?: (mode: ThemeMode, resolved: "light" | "dark") => void;
}