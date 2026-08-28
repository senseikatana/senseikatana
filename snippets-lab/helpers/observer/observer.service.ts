// utils/observer.utils.ts
import { LOGGER } from "../services/logger.service";

/**
 * Represents a geographic position with latitude, longitude, and accuracy.
 * (Included here for compatibility, though typically lives in sensors.utils.ts)
 */
export interface GeoPosition {
	lat: number;
	lng: number;
	accuracy: number;
}

/**
 * Callback invoked when an observed element enters the viewport.
 */
export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

/**
 * Configuration for a registered IntersectionObserver.
 */
export interface ObserverConfig {
	callback: ObserverCallback;
	options: IntersectionObserverInit;
	autoUnobserve: boolean;
}

/**
 * Internal registry entry storing an observer instance and its tracked targets.
 */
export interface ObserverEntry {
	config: ObserverConfig;
	observer: IntersectionObserver | null;
	targets: Set<HTMLElement>;
}

/**
 * Target can be either an HTMLElement reference or a CSS selector string.
 */
export type ObserverTarget = HTMLElement | string;

/**
 * Internal registry entry for lazy loading configurations.
 */
export interface LazyLoaderEntry {
	selector: string;
	observerKey: string;
}

/**
 * Singleton wrapper around the native IntersectionObserver API.
 * Manages multiple named observers with automatic cleanup and target tracking.
 *
 * @example
 * ```typescript
 * const observer = ObserverService.getInstance();
 * observer.create('fade-in', (entry) => entry.target.classList.add('visible'));
 * observer.observeAll('fade-in', '.card');
 * ```
 */
export class ObserverService {
	private static instance: ObserverService;
	private registry: Map<string, ObserverEntry> = new Map();

	private constructor() {}

	static getInstance(): ObserverService {
		if (!ObserverService.instance) {
			ObserverService.instance = new ObserverService();
		}
		return ObserverService.instance;
	}

	/**
	 * Checks if IntersectionObserver is supported in the current environment.
	 */
	static isSupported(): boolean {
		return typeof window !== "undefined" && "IntersectionObserver" in window;
	}

	/**
	 * Creates and registers a new observer under a unique key.
	 * Disconnects any existing observer with the same key to prevent duplicates.
	 *
	 * @param key - Unique identifier for this observer
	 * @param callback - Function invoked when observed elements enter viewport
	 * @param options - Native IntersectionObserverInit options
	 * @param autoUnobserve - Automatically unobserve after first intersection
	 * @returns The service instance for method chaining
	 */
	create(
		key: string,
		callback: ObserverCallback,
		options: IntersectionObserverInit = { threshold: 0.1 },
		autoUnobserve: boolean = true,
	): this {
		if (!ObserverService.isSupported()) {
			LOGGER("[ObserverService] IntersectionObserver not supported.", "warn");
			return this;
		}

		if (this.registry.has(key)) {
			this.disconnect(key);
		}

		const config: ObserverConfig = { callback, options, autoUnobserve };

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					config.callback(entry);
					if (config.autoUnobserve) {
						this.unobserve(key, entry.target as HTMLElement);
					}
				}
			}
		}, config.options);

		this.registry.set(key, { config, observer, targets: new Set() });
		return this;
	}

	/**
	 * Resolves an ObserverTarget into an HTMLElement or null.
	 */
	private resolveTarget(element: ObserverTarget): HTMLElement | null {
		return typeof element === "string"
			? document.querySelector<HTMLElement>(element)
			: element;
	}

	/**
	 * Starts observing a specific element with the observer registered under the given key.
	 *
	 * @param key - Key of the observer to use
	 * @param element - Element or CSS selector to observe
	 * @returns The service instance for method chaining
	 */
	observe(key: string, element: ObserverTarget): this {
		const entry = this.registry.get(key);
		if (!entry || !entry.observer) return this;

		const target = this.resolveTarget(element);
		if (!target) {
			LOGGER(`[ObserverService] Target not found for key "${key}":`, element, "warn");
			return this;
		}

		entry.targets.add(target);
		entry.observer.observe(target);
		return this;
	}

	/**
	 * Observes all elements matching a CSS selector.
	 *
	 * @param key - Key of the observer to use
	 * @param selector - CSS selector to match elements
	 * @returns The service instance for method chaining
	 */
	observeAll(key: string, selector: string): this {
		if (!ObserverService.isSupported()) return this;
		document
			.querySelectorAll<HTMLElement>(selector)
			.forEach((el) => this.observe(key, el));
		return this;
	}

	/**
	 * Stops observing a specific element.
	 */
	unobserve(key: string, element: HTMLElement): this {
		const entry = this.registry.get(key);
		if (!entry || !entry.observer) return this;

		entry.observer.unobserve(element);
		entry.targets.delete(element);
		return this;
	}

	/**
	 * Disconnects and removes an observer by key.
	 */
	disconnect(key: string): this {
		const entry = this.registry.get(key);
		if (!entry) return this;

		entry.observer?.disconnect();
		entry.targets.clear();
		this.registry.delete(key);
		return this;
	}

	/**
	 * Disconnects all registered observers. Useful for cleanup on unmount.
	 */
	disconnectAll(): this {
		for (const key of this.registry.keys()) {
			this.disconnect(key);
		}
		return this;
	}

	/**
	 * Checks if an observer exists under the given key.
	 */
	has(key: string): boolean {
		return this.registry.has(key);
	}

	/**
	 * Returns all registered observer keys.
	 */
	keys(): string[] {
		return Array.from(this.registry.keys());
	}
}

/**
 * Singleton service for lazy loading images and other elements using IntersectionObserver.
 * Built on top of ObserverService to share the same underlying observer infrastructure.
 *
 * @example
 * ```typescript
 * LazyLoaderService.getInstance().init('products', '.product-card img', '300px');
 * ```
 */
export class LazyLoaderService {
	private static instance: LazyLoaderService;
	private registry: Map<string, LazyLoaderEntry> = new Map();

	private constructor() {}

	static getInstance(): LazyLoaderService {
		if (!LazyLoaderService.instance) {
			LazyLoaderService.instance = new LazyLoaderService();
		}
		return LazyLoaderService.instance;
	}

	/**
	 * Registers and starts a lazy loader under a unique key.
	 *
	 * @param key - Unique identifier for this lazy loader
	 * @param selector - CSS selector for elements to lazy load
	 * @param rootMargin - Distance from viewport to trigger loading
	 * @returns The service instance for method chaining
	 */
	init(
		key: string = "default",
		selector: string = "img[data-src]",
		rootMargin: string = "200px",
	): this {
		if (!ObserverService.isSupported()) return this;

		if (this.registry.has(key)) {
			this.stop(key);
		}

		const observer = ObserverService.getInstance();
		const observerKey = `lazy_loader_${key}`;

		observer.create(
			observerKey,
			(entry) => {
				const img = entry.target as HTMLImageElement;
				const dataSrc = img.dataset.src;
				if (dataSrc) {
					img.src = dataSrc;
					img.removeAttribute("data-src");
				}
			},
			{ rootMargin },
			true,
		);

		observer.observeAll(observerKey, selector);
		this.registry.set(key, { selector, observerKey });
		return this;
	}

	/**
	 * Stops and removes a lazy loader by key.
	 */
	stop(key: string): this {
		const entry = this.registry.get(key);
		if (!entry) return this;

		ObserverService.getInstance().disconnect(entry.observerKey);
		this.registry.delete(key);
		return this;
	}

	/**
	 * Stops all registered lazy loaders.
	 */
	stopAll(): this {
		for (const key of this.registry.keys()) {
			this.stop(key);
		}
		return this;
	}

	/**
	 * Checks if a lazy loader exists under the given key.
	 */
	has(key: string): boolean {
		return this.registry.has(key);
	}
}

