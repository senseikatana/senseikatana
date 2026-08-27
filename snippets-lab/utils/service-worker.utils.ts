import type { WorkerFunc, WorkerPoolEntry } from "../types";
import LOGGER from "./logger.utils";

export default class WORKER {
	private static instance: WORKER;
	private pools: Map<string, WorkerPoolEntry> = new Map();

	private constructor() {
		// Constructor privado para forzar Singleton
	}

	static getInstance(): WORKER {
		if (!WORKER.instance) {
			WORKER.instance = new WORKER();
		}
		return WORKER.instance;
	}

	static IS_SUPPORTED(): boolean {
		return typeof window !== "undefined" && "Worker" in window;
	}

	/**
	 * Ejecuta una función pura en un Worker one-shot.
	 * Crea el worker, ejecuta, y lo destruye automáticamente.
	 */
	async RUN<TInput, TOutput>(
		workerFunc: WorkerFunc<TInput, TOutput>,
		data: TInput,
	): Promise<TOutput> {
		if (!WORKER.IS_SUPPORTED()) {
			// Fallback SSR/Node: ejecutar en hilo principal
			return Promise.resolve(workerFunc(data));
		}

		return new Promise((resolve, reject) => {
			try {
				const funcString = workerFunc.toString();
				const blob = new Blob(
					[`self.onmessage = (e) => self.postMessage((${funcString})(e.data))`],
					{ type: "application/javascript" },
				);
				const workerUrl = URL.createObjectURL(blob);
				const worker = new Worker(workerUrl);

				worker.onmessage = (event) => {
					resolve(event.data);
					worker.terminate();
					URL.revokeObjectURL(workerUrl);
				};

				worker.onerror = (error) => {
					reject(new Error(`Worker error: ${error.message}`));
					worker.terminate();
					URL.revokeObjectURL(workerUrl);
				};

				worker.postMessage(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * Crea un Worker reutilizable bajo una key única.
	 * Ideal para cálculos secuenciales sin overhead de creación/destrucción.
	 */
	CREATE_POOL<TInput, TOutput>(
		key: string,
		workerFunc: WorkerFunc<TInput, TOutput>,
	): this {
		if (!WORKER.IS_SUPPORTED()) return this;

		if (this.pools.has(key)) {
			this.TERMINATE(key);
		}

		const funcString = workerFunc.toString();
		const blob = new Blob(
			[`self.onmessage = (e) => self.postMessage((${funcString})(e.data))`],
			{ type: "application/javascript" },
		);
		const workerUrl = URL.createObjectURL(blob);
		const worker = new Worker(workerUrl);

		this.pools.set(key, { worker, workerUrl, func: workerFunc });
		return this;
	}

	/**
	 * Ejecuta una tarea en un pool existente.
	 */
	RUN_POOL<TInput, TOutput>(key: string, data: TInput): Promise<TOutput> {
		const entry = this.pools.get(key) as
			| WorkerPoolEntry<TInput, TOutput>
			| undefined;

		if (!entry) {
			return Promise.reject(new Error(`Worker pool "${key}" not found`));
		}

		if (!WORKER.IS_SUPPORTED()) {
			return Promise.resolve(entry.func(data));
		}

		return new Promise((resolve, reject) => {
			entry.worker.onmessage = (event) => resolve(event.data);
			entry.worker.onerror = (error) =>
				reject(new Error(`Worker error: ${error.message}`));
			entry.worker.postMessage(data);
		});
	}

	/**
	 * Termina un pool específico.
	 */
	TERMINATE(key: string): this {
		const entry = this.pools.get(key);
		if (!entry) return this;

		entry.worker.terminate();
		URL.revokeObjectURL(entry.workerUrl);
		this.pools.delete(key);
		return this;
	}

	/**
	 * Termina todos los pools activos.
	 */
	TERMINATE_ALL(): this {
		this.pools.forEach((_, key) => this.TERMINATE(key));
		return this;
	}

	/**
	 * Verifica si un pool existe.
	 */
	HASWORKER(key: string): boolean {
		return this.pools.has(key);
	}

	/**
	 * Lista todas las keys de pools activos.
	 */
	KEYS(): string[] {
		return Array.from(this.pools.keys());
	}
}

// ============================================================
// TODO: Usage and demo:
// ============================================================

const { CREATE_POOL, RUN, RUN_POOL, TERMINATE, TERMINATE_ALL, KEYS }: WORKER =
	WORKER.getInstance();

// 1. Ejecución one-shot (crea y destruye automáticamente)
const result = await RUN(
	(numbers: number[]) => numbers.reduce((a, b) => a + b, 0),
	[1, 2, 3, 4, 5],
);

LOGGER("Suma:", result);

// 2. Crear pool persistente para cálculos secuenciales
CREATE_POOL("stats", (data: number[]) => {
	const sum = data.reduce((a, b) => a + b, 0);
	const avg = sum / data.length;
	return { sum, avg, count: data.length };
});

// Ejecutar múltiples tareas en el mismo worker
const stats1: number[] = await RUN_POOL("stats", [10, 20, 30]);
const stats2: number[] = await RUN_POOL("stats", [100, 200, 300]);
LOGGER("Stats 1:", stats1);
LOGGER("Stats 2:", stats2);

// 3. Crear otro pool diferente
CREATE_POOL("crypto", (text: string) => {
	// Simulación de hash pesado
	let hash = 0;
	for (let i = 0; i < 1000000; i++) {
		hash = (hash << 5) - hash + text.charCodeAt(i % text.length);
	}
	return hash;
});

const hash: string = await RUN_POOL("crypto", "");
LOGGER("Hash:", hash);

// 4. Cleanup selectivo
TERMINATE("crypto");

// 5. Verificar pools activos
LOGGER("Pools activos:", KEYS()); // ['stats']

// 6. Cleanup total (al desmontar app o cambiar de ruta)
TERMINATE_ALL();
