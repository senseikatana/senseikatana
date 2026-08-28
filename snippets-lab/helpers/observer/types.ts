// utils/observer.utils.ts

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
