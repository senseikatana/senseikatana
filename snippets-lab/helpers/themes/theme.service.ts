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

/**
 * Singleton service for managing application theme (light/dark/system).
 * Persists user preference in localStorage and respects system preference.
 *
 * @example
 * ```typescript
 * const theme = ThemeService.getInstance();
 * theme.init({ defaultMode: 'system' });
 * theme.set('dark');
 * console.log(theme.get()); // 'dark'
 * console.log(theme.getResolved()); // 'dark'
 * ```
 */
export class ThemeService {
	private static instance: ThemeService;

	private mode: ThemeMode = "system";
	private storageKey = "theme";
	private attribute = "data-theme";
	private target: HTMLElement | null = null;
	private onChange?: (mode: ThemeMode, resolved: "light" | "dark") => void;
	private mediaQuery: MediaQueryList | null = null;
	private mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

	private constructor() {}

	static getInstance(): ThemeService {
		if (!ThemeService.instance) {
			ThemeService.instance = new ThemeService();
		}
		return ThemeService.instance;
	}

	/**
	 * Checks if running in a browser environment.
	 */
	private isBrowser(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	/**
	 * Initializes the theme service. Call once at app startup.
	 * Reads stored preference, applies it, and listens for system changes.
	 *
	 * @param options - Configuration options
	 */
	init(options: ThemeOptions = {}): void {
		if (!this.isBrowser()) return;

		this.storageKey = options.storageKey ?? "theme";
		this.attribute = options.attribute ?? "data-theme";
		this.target = options.target ?? document.documentElement;
		this.onChange = options.onChange;

		// Load stored preference or use default
		const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
		this.mode = stored ?? options.defaultMode ?? "system";

		// Apply initial theme
		this.apply();

		// Listen for system preference changes (only when mode is 'system')
		this.setupMediaQueryListener();
	}

	/**
	 * Sets the theme mode and persists it to localStorage.
	 *
	 * @param mode - Theme mode: 'light', 'dark', or 'system'
	 */
	set(mode: ThemeMode): void {
		if (!this.isBrowser()) return;

		this.mode = mode;
		localStorage.setItem(this.storageKey, mode);
		this.apply();
	}

	/**
	 * Gets the current theme mode (as stored, may be 'system').
	 */
	get(): ThemeMode {
		return this.mode;
	}

	/**
	 * Gets the resolved theme ('light' or 'dark'), taking system preference into account.
	 */
	getResolved(): "light" | "dark" {
		if (this.mode !== "system") return this.mode;
		return this.prefersDark() ? "dark" : "light";
	}

	/**
	 * Checks if the user/system prefers dark mode.
	 */
	prefersDark(): boolean {
		if (!this.isBrowser() || !window.matchMedia) return false;
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}

	/**
	 * Toggles between light and dark mode (ignores 'system' state).
	 */
	toggle(): void {
		const current = this.getResolved();
		this.set(current === "light" ? "dark" : "light");
	}

	/**
	 * Clears stored preference and reverts to system default.
	 */
	reset(): void {
		if (!this.isBrowser()) return;
		localStorage.removeItem(this.storageKey);
		this.mode = "system";
		this.apply();
	}

	/**
	 * Destroys the service, removing event listeners.
	 * Call on app teardown if needed.
	 */
	destroy(): void {
		if (this.mediaQuery && this.mediaQueryHandler) {
			this.mediaQuery.removeEventListener("change", this.mediaQueryHandler);
			this.mediaQueryHandler = null;
			this.mediaQuery = null;
		}
	}

	/**
	 * Applies the current theme to the target element.
	 */
	private apply(): void {
		if (!this.target) return;

		const resolved = this.getResolved();
		this.target.setAttribute(this.attribute, resolved);
		this.target.classList.remove("light", "dark");
		this.target.classList.add(resolved);

		this.onChange?.(this.mode, resolved);
	}

	/**
	 * Sets up listener for system color scheme changes.
	 */
	private setupMediaQueryListener(): void {
		if (!this.isBrowser() || !window.matchMedia) return;

		this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		this.mediaQueryHandler = (e: MediaQueryListEvent) => {
			if (this.mode === "system") {
				this.apply();
			}
		};

		this.mediaQuery.addEventListener("change", this.mediaQueryHandler);
	}
}

// Export singleton instance
export const themeService = ThemeService.getInstance();