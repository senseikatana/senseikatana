import LOGGER from "./logger.utils";
import type {
	LazyLoaderEntry,
	ObserverCallback,
	ObserverConfig,
	ObserverEntry,
	ObserverTarget,
} from "./types";

export class OBSERVER {
	private static instance: OBSERVER;
	private registry: Map<string, ObserverEntry> = new Map();

	private constructor() {
		// Constructor privado para forzar el Singleton
	}

	static getInstance(): OBSERVER {
		if (!OBSERVER.instance) {
			OBSERVER.instance = new OBSERVER();
		}
		return OBSERVER.instance;
	}

	static IS_SUPPORTED(): boolean {
		return typeof window !== "undefined" && "IntersectionObserver" in window;
	}

	// Crea y registra un nuevo observer bajo una key única
	CREATE(
		key: string,
		callback: ObserverCallback,
		options: IntersectionObserverInit = { threshold: 0.1 },
		autoUnobserve: boolean = true,
	): this {
		if (!OBSERVER.IS_SUPPORTED()) {
			console.warn(
				"[OBSERVER] IntersectionObserver no soportado en este entorno.",
			);
			return this;
		}

		if (this.registry.has(key)) {
			this.DISCONNECT(key); // Evita duplicados
		}

		const config: ObserverConfig = { callback, options, autoUnobserve };

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					config.callback(entry);
					if (config.autoUnobserve) {
						this.UNOBSERVE(key, entry.target as HTMLElement);
					}
				}
			});
		}, config.options);

		this.registry.set(key, { config, observer, targets: new Set() });
		return this;
	}

	private RESOLVE_TARGET(element: ObserverTarget): HTMLElement | null {
		return typeof element === "string"
			? document.querySelector<HTMLElement>(element)
			: element;
	}

	OBSERVE(key: string, element: ObserverTarget): this {
		const entry = this.registry.get(key);
		if (!entry || !entry.observer) return this;

		const target = this.RESOLVE_TARGET(element);
		if (!target) {
			console.warn(
				`[OBSERVER] Target no encontrado para key "${key}":`,
				element,
			);
			return this;
		}

		entry.targets.add(target);
		entry.observer.observe(target);
		return this;
	}

	OBSERVE_ALL(key: string, selector: string): this {
		if (!OBSERVER.IS_SUPPORTED()) return this;
		document
			.querySelectorAll<HTMLElement>(selector)
			.forEach((el) => this.OBSERVE(key, el));
		return this;
	}

	UNOBSERVE(key: string, element: HTMLElement): this {
		const entry = this.registry.get(key);
		if (!entry || !entry.observer) return this;

		entry.observer.unobserve(element);
		entry.targets.delete(element);
		return this;
	}

	DISCONNECT(key: string): this {
		const entry = this.registry.get(key);
		if (!entry) return this;

		entry.observer?.disconnect();
		entry.targets.clear();
		this.registry.delete(key);
		return this;
	}

	DISCONNECT_ALL(): this {
		this.registry.forEach((_, key) => this.DISCONNECT(key));
		return this;
	}

	HAS(key: string): boolean {
		return this.registry.has(key);
	}

	KEYS(): string[] {
		return Array.from(this.registry.keys());
	}
}

export class LAZY_LOADER {
	private static instance: LAZY_LOADER;
	private registry: Map<string, LazyLoaderEntry> = new Map();

	private constructor() {
		// Constructor privado
	}

	static getInstance(): LAZY_LOADER {
		if (!LAZY_LOADER.instance) {
			LAZY_LOADER.instance = new LAZY_LOADER();
		}
		return LAZY_LOADER.instance;
	}

	// Registra e inicia un lazy loader bajo una key única
	INIT(
		key: string = "default",
		selector: string = "img[data-src]",
		rootMargin: string = "200px",
	): this {
		if (!OBSERVER.IS_SUPPORTED()) return this;

		if (this.registry.has(key)) {
			this.STOP(key);
		}

		const observerKey = `lazy_loader_${key}`;

		OBSERVER.getInstance().CREATE(
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

		OBSERVER.getInstance().OBSERVE_ALL(observerKey, selector);

		this.registry.set(key, { selector, observerKey });
		return this;
	}

	STOP(key: string): this {
		const entry = this.registry.get(key);
		if (!entry) return this;

		OBSERVER.getInstance().DISCONNECT(entry.observerKey);
		this.registry.delete(key);
		return this;
	}

	STOP_ALL(): this {
		this.registry.forEach((_, key) => this.STOP(key));
		return this;
	}

	HASLAZY(key: string): boolean {
		return this.registry.has(key);
	}
}

// ============================================================
// TODO: Usage and demos:
// ============================================================

// Obtener las instancias únicas
export const {
	CREATE,
	DISCONNECT,
	DISCONNECT_ALL,
	OBSERVE,
	OBSERVE_ALL,
	HAS,
	KEYS,
	UNOBSERVE,
}: OBSERVER = OBSERVER.getInstance();
export const { INIT, HASLAZY, STOP, STOP_ALL }: LAZY_LOADER =
	LAZY_LOADER.getInstance();

// Crear un observer personalizado para animaciones
CREATE(
	"fade-in",
	(entry) => {
		entry.target.classList.toggle("visible");
	},
	{ threshold: 0.2 },
);

OBSERVE("fade-in", "#hero");
OBSERVE("fade-in", "#about");
OBSERVE_ALL("fade-in", ".card");

// Crear otro observer distinto para tracking de analíticas
CREATE("track-view", (entry) => {
	LOGGER("Vist: ", entry.target.id);
});

OBSERVE("track-view", "#promo-banner");

// Lazy loader para imágenes (con key única por sección)
INIT("pokemon-list", ".pokemon-card img", "300px");
INIT("blog-posts", ".post-cover img");

// Cleanup selectivo
DISCONNECT("track-view");
STOP("pokemon-list");

// Cleanup total
DISCONNECT_ALL();
STOP_ALL();
