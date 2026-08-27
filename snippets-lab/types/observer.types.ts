export type ObserverTarget = HTMLElement | string;
export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export interface ObserverConfig {
	callback: ObserverCallback;
	options: IntersectionObserverInit;
	autoUnobserve: boolean;
}

export interface ObserverEntry {
	config: ObserverConfig;
	observer: IntersectionObserver | null;
	targets: Set<HTMLElement>;
}

export interface LazyLoaderEntry {
  selector: string;
  observerKey: string;
}

