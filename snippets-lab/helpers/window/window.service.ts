// utils/viewport.utils.ts

/**
 * Represents viewport dimensions.
 */
export interface ViewportSize {
	width: number;
	height: number;
}

/**
 * Represents scroll position.
 */
export interface ScrollPosition {
	x: number;
	y: number;
}

/**
 * Options for scrolling operations.
 */
export interface ScrollOptions {
	behavior?: ScrollBehavior;
	block?: ScrollLogicalPosition;
	inline?: ScrollLogicalPosition;
}

/**
 * Utility class for viewport, scroll, and window-related operations.
 * All methods are SSR-safe and return fallback values in non-browser environments.
 *
 * @example
 * ```typescript
 * const size = ViewportUtils.getViewportSize();
 * console.log(`Window: ${size.width}x${size.height}`);
 *
 * ViewportUtils.scrollToTop();
 * ViewportUtils.scrollToElement('#section-2', { behavior: 'smooth' });
 * ```
 */
export class ViewportUtils {
	private constructor() {}

	/**
	 * Checks if running in a browser environment.
	 */
	private static isBrowser(): boolean {
		return typeof window !== "undefined" && typeof document !== "undefined";
	}

	// ─── Viewport Size ─────────────────────────────────────────────────

	/**
	 * Gets the current viewport dimensions.
	 *
	 * @returns Object with width and height. Returns {0, 0} in non-browser environments.
	 *
	 * @example
	 * ```typescript
	 * const { width, height } = ViewportUtils.getViewportSize();
	 * if (width < 768) console.log('Mobile viewport');
	 * ```
	 */
	static getViewportSize(): ViewportSize {
		if (!this.isBrowser()) return { width: 0, height: 0 };
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	/**
	 * Checks if the viewport matches a media query.
	 *
	 * @param query - CSS media query string
	 * @returns true if the query matches
	 *
	 * @example
	 * ```typescript
	 * if (ViewportUtils.matchesMedia('(min-width: 768px)')) {
	 *   console.log('Desktop or tablet');
	 * }
	 * ```
	 */
	static matchesMedia(query: string): boolean {
		if (!this.isBrowser() || !window.matchMedia) return false;
		return window.matchMedia(query).matches;
	}

	/**
	 * Checks if the user prefers reduced motion.
	 * Useful for accessibility - disable animations when true.
	 *
	 * @returns true if reduced motion is preferred
	 */
	static prefersReducedMotion(): boolean {
		return this.matchesMedia("(prefers-reduced-motion: reduce)");
	}

	/**
	 * Checks if the user prefers dark color scheme.
	 *
	 * @returns true if dark mode is preferred
	 */
	static prefersDarkMode(): boolean {
		return this.matchesMedia("(prefers-color-scheme: dark)");
	}

	// ─── Scroll Position ───────────────────────────────────────────────

	/**
	 * Gets the current vertical scroll position.
	 *
	 * @returns Scroll Y in pixels. Returns 0 in non-browser environments.
	 */
	static getScrollY(): number {
		return this.isBrowser() ? window.scrollY : 0;
	}

	/**
	 * Gets the current horizontal scroll position.
	 *
	 * @returns Scroll X in pixels. Returns 0 in non-browser environments.
	 */
	static getScrollX(): number {
		return this.isBrowser() ? window.scrollX : 0;
	}

	/**
	 * Gets both scroll positions.
	 */
	static getScrollPosition(): ScrollPosition {
		return {
			x: this.getScrollX(),
			y: this.getScrollY(),
		};
	}

	/**
	 * Gets the scroll progress as a percentage (0 to 1).
	 *
	 * @returns Number between 0 (top) and 1 (bottom)
	 *
	 * @example
	 * ```typescript
	 * const progress = ViewportUtils.getScrollProgress();
	 * console.log(`Scrolled: ${Math.round(progress * 100)}%`);
	 * ```
	 */
	static getScrollProgress(): number {
		if (!this.isBrowser()) return 0;
		const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		if (scrollHeight <= 0) return 0;
		return Math.min(1, Math.max(0, window.scrollY / scrollHeight));
	}

	/**
	 * Checks if user is at the top of the page.
	 *
	 * @param threshold - Pixels of tolerance. Default: 0
	 */
	static isAtTop(threshold: number = 0): boolean {
		return this.getScrollY() <= threshold;
	}

	/**
	 * Checks if user is at the bottom of the page.
	 *
	 * @param threshold - Pixels of tolerance. Default: 50
	 */
	static isAtBottom(threshold: number = 50): boolean {
		if (!this.isBrowser()) return false;
		const scrollHeight = document.documentElement.scrollHeight;
		return window.scrollY + window.innerHeight >= scrollHeight - threshold;
	}

	// ─── Scroll Actions ────────────────────────────────────────────────

	/**
	 * Scrolls to a specific position.
	 *
	 * @param x - Horizontal position
	 * @param y - Vertical position
	 * @param behavior - Scroll behavior: 'smooth' or 'auto'. Default: 'smooth'
	 */
	static scrollTo(x: number = 0, y: number = 0, behavior: ScrollBehavior = "smooth"): void {
		if (!this.isBrowser()) return;

		const finalBehavior = this.prefersReducedMotion() ? "auto" : behavior;
		window.scrollTo({ top: y, left: x, behavior: finalBehavior });
	}

	/**
	 * Scrolls to the top of the page.
	 *
	 * @param smooth - Use smooth scrolling. Default: true (respects reduced motion)
	 */
	static scrollToTop(smooth: boolean = true): void {
		if (!this.isBrowser()) return;

		const behavior: ScrollBehavior = smooth && !this.prefersReducedMotion() ? "smooth" : "auto";
		window.scrollTo({ top: 0, behavior });
	}

	/**
	 * Scrolls to the bottom of the page.
	 *
	 * @param smooth - Use smooth scrolling. Default: true
	 */
	static scrollToBottom(smooth: boolean = true): void {
		if (!this.isBrowser()) return;

		const behavior: ScrollBehavior = smooth && !this.prefersReducedMotion() ? "smooth" : "auto";
		const scrollHeight = document.documentElement.scrollHeight;
		window.scrollTo({ top: scrollHeight, behavior });
	}

	/**
	 * Scrolls to a specific element.
	 *
	 * @param target - Element or CSS selector
	 * @param options - Scroll options
	 * @returns true if the element was found and scrolled to
	 *
	 * @example
	 * ```typescript
	 * ViewportUtils.scrollToElement('#section-2', {
	 *   behavior: 'smooth',
	 *   block: 'start'
	 * });
	 * ```
	 */
	static scrollToElement(
		target: HTMLElement | string,
		options: ScrollOptions = {},
	): boolean {
		if (!this.isBrowser()) return false;

		const element =
			typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

		if (!element) return false;

		const behavior: ScrollBehavior = this.prefersReducedMotion()
			? "auto"
			: options.behavior ?? "smooth";

		element.scrollIntoView({
			behavior,
			block: options.block ?? "start",
			inline: options.inline ?? "nearest",
		});

		return true;
	}

	// ─── Print & Focus ─────────────────────────────────────────────────

	/**
	 * Triggers the browser's print dialog.
	 */
	static printPage(): void {
		if (this.isBrowser()) window.print();
	}

	/**
	 * Focuses an element by selector or reference.
	 *
	 * @param target - Element or CSS selector
	 * @returns true if the element was found and focused
	 */
	static focusElement(target: HTMLElement | string): boolean {
		if (!this.isBrowser()) return false;

		const element =
			typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

		if (!element) return false;

		element.focus();
		return true;
	}

	/**
	 * Blurs (removes focus from) the currently focused element.
	 */
	static blurActiveElement(): void {
		if (!this.isBrowser()) return;
		(document.activeElement as HTMLElement | null)?.blur();
	}

	/**
	 * Gets the currently focused element.
	 */
	static getActiveElement(): Element | null {
		return this.isBrowser() ? document.activeElement : null;
	}

	// ─── Fullscreen API ────────────────────────────────────────────────

	/**
	 * Requests fullscreen mode for an element or the document.
	 *
	 * @param target - Element to make fullscreen. Default: document.documentElement
	 * @returns Promise that resolves when fullscreen is entered
	 */
	static async requestFullscreen(target?: HTMLElement): Promise<void> {
		if (!this.isBrowser() || !document.fullscreenEnabled) {
			throw new Error("Fullscreen not supported");
		}

		const element = target ?? document.documentElement;
		await element.requestFullscreen();
	}

	/**
	 * Exits fullscreen mode.
	 */
	static async exitFullscreen(): Promise<void> {
		if (!this.isBrowser() || !document.fullscreenElement) return;
		await document.exitFullscreen();
	}

	/**
	 * Checks if the document is currently in fullscreen mode.
	 */
	static isFullscreen(): boolean {
		return this.isBrowser() && !!document.fullscreenElement;
	}

	// ─── Visibility API ────────────────────────────────────────────────

	/**
	 * Checks if the document is currently visible (tab is active).
	 */
	static isDocumentVisible(): boolean {
		if (!this.isBrowser()) return true;
		return document.visibilityState === "visible";
	}

	/**
	 * Subscribes to visibility changes.
	 * Returns a cleanup function.
	 *
	 * @param callback - Called with the new visibility state
	 *
	 * @example
	 * ```typescript
	 * const unsubscribe = ViewportUtils.onVisibilityChange((isVisible) => {
	 *   if (!isVisible) pauseVideo();
	 *   else resumeVideo();
	 * });
	 *
	 * // Later
	 * unsubscribe();
	 * ```
	 */
	static onVisibilityChange(callback: (isVisible: boolean) => void): () => void {
		if (!this.isBrowser()) return () => {};

		const handler = () => callback(this.isDocumentVisible());
		document.addEventListener("visibilitychange", handler);

		return () => document.removeEventListener("visibilitychange", handler);
	}

	// ─── Page Title ────────────────────────────────────────────────────

	/**
	 * Gets the current page title.
	 */
	static getTitle(): string {
		return this.isBrowser() ? document.title : "";
	}

	/**
	 * Sets the page title.
	 */
	static setTitle(title: string): void {
		if (this.isBrowser()) document.title = title;
	}

	/**
	 * Sets a temporary title (e.g., for notifications) and restores it later.
	 *
	 * @param tempTitle - Temporary title to show
	 * @param durationMs - Duration before restoring. Default: 3000
	 */
	static setTempTitle(tempTitle: string, durationMs: number = 3000): void {
		if (!this.isBrowser()) return;

		const original = document.title;
		document.title = tempTitle;

		setTimeout(() => {
			if (document.title === tempTitle) {
				document.title = original;
			}
		}, durationMs);
	}
}

// Export convenience aliases for most-used methods
export const {
	getViewportSize,
	getScrollY,
	getScrollX,
	getScrollProgress,
	scrollTo,
	scrollToTop,
	scrollToBottom,
	scrollToElement,
	focusElement,
	printPage,
	isAtTop,
	isAtBottom,
	prefersReducedMotion,
	prefersDarkMode,
	matchesMedia,
	onVisibilityChange,
	isDocumentVisible,
} = ViewportUtils;