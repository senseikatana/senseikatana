import type {
	IReactiveService,
	SignalGetter,
	SignalListener,
	SignalSetter,
	Subscribable,
	ToggleSignalSetter,
} from "@/types/index.js";

import { useLogger } from "./logger.service.js";

/** Per-effect mutable state shared by the effect runner and the dispose closure. */
interface EffectState {
	cleanup: void | (() => void);
	disposed: boolean;
	subscriptions: Map<Subscribable<unknown>, () => void>;
	explicitDependencies: Set<Subscribable<unknown>>;
}

/**
 * ReactiveService — Singleton facade over fine-grained reactivity: signals,
 * effects, memos and batching.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link ReactiveService.getInstance}) and the **Facade** pattern: each public
 * method hides the subscription bookkeeping behind one call. The batching
 * state (`isBatching` and the deferred-notification queue) and the active
 * signal-read tracker used for dependency capture are private instance state —
 * never module-level mutable globals — so reactivity is safe to share across
 * environments (Node, Bun, browser, SSR).
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
 * level `use*` functions below are thin wrappers kept for call-site ergonomics.
 *
 * @example
 * ```ts
 * import { useCreateSignal } from "katanakit-js";
 *
 * const [count, setCount] = useCreateSignal(0);
 * count(); // 0
 * setCount(1);
 * count(); // 1
 * ```
 */
export class ReactiveService implements IReactiveService {
	private static instance: ReactiveService;

	/** Whether a batch block is currently deferring notifications. */
	private isBatching = false;
	/** Notifications deferred while batching is active. */
	private readonly batchQueue = new Set<() => void>();
	/** Active read tracker installed by a running effect (dependency capture). */
	private trackSignalRead: ((signal: Subscribable<unknown>) => void) | undefined;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): ReactiveService {
		if (!ReactiveService.instance) {
			ReactiveService.instance = new ReactiveService();
		}
		return ReactiveService.instance;
	}

	/**
	 * Internal: schedules a notification function. If batching is active the
	 * notification is queued; otherwise it executes immediately.
	 *
	 * @param notifyFn - The callback to schedule.
	 */
	private notify(notifyFn: () => void): void {
		if (this.isBatching) {
			this.batchQueue.add(notifyFn);
		} else {
			notifyFn();
		}
	}

	/**
	 * Creates a reactive signal with a getter and setter.
	 *
	 * The getter is callable and also exposes a `useSubscribe` method for
	 * listening to value changes. The setter accepts either a direct value or
	 * an updater function.
	 *
	 * @typeParam T - The signal value type.
	 * @param initialValue - The initial value of the signal.
	 * @returns A tuple of `[getter, setter]`.
	 *
	 * @example
	 * ```ts
	 * const [count, setCount] = useCreateSignal(0);
	 * count(); // 0
	 * setCount(1);
	 * count(); // 1
	 * setCount(prev => prev + 1);
	 * count(); // 2
	 *
	 * const unsub = count.useSubscribe((newVal, oldVal) => {
	 *   console.log(`${oldVal} -> ${newVal}`);
	 * });
	 * ```
	 */
	useCreateSignal<T>(initialValue: T): [SignalGetter<T>, SignalSetter<T>] {
		let value = initialValue;
		const listeners = new Set<SignalListener<T>>();
		const track = (signal: SignalGetter<T>): void => {
			this.trackSignalRead?.(signal);
		};

		const get = function signalGetter() {
			track(signalGetter as SignalGetter<T>);
			return value;
		} as SignalGetter<T>;

		const set: SignalSetter<T> = (nextValue) => {
			const oldValue = value;
			value = typeof nextValue === "function" ? (nextValue as (prev: T) => T)(oldValue) : nextValue;

			if (value !== oldValue) {
				this.notify(() => {
					for (const listener of listeners) {
						try {
							listener(value, oldValue);
						} catch (error) {
							useLogger("[createSignal] Listener error:", error, "error");
						}
					}
				});
			}
		};

		get.useSubscribe = (listener: SignalListener<T>): (() => void) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		};

		return [get, set];
	}

	/**
	 * Runs one effect pass: tears down the previous cleanup, captures the
	 * signal reads performed by `callback`, then resubscribes only to the
	 * signals still in use (plus the explicit dependencies).
	 */
	private runEffect(state: EffectState, callback: () => void | (() => void)): void {
		if (state.disposed) return;

		const previousCleanup = state.cleanup;
		state.cleanup = undefined;
		if (typeof previousCleanup === "function") {
			try {
				previousCleanup();
			} catch (error) {
				useLogger("[createEffect] Previous cleanup error:", error, "error");
			}
		}

		const dependencies = new Set<Subscribable<unknown>>();
		const previousTracker = this.trackSignalRead;
		this.trackSignalRead = (signal) => dependencies.add(signal);
		try {
			state.cleanup = callback() as void | (() => void);
		} catch (error) {
			useLogger("[createEffect] Effect execution error:", error, "error");
		} finally {
			this.trackSignalRead = previousTracker;
		}

		for (const [signal, unsubscribe] of state.subscriptions) {
			if (!dependencies.has(signal) && !state.explicitDependencies.has(signal)) {
				unsubscribe();
				state.subscriptions.delete(signal);
			}
		}

		if (state.disposed) return;
		for (const signal of [...state.explicitDependencies, ...dependencies]) {
			if (!state.subscriptions.has(signal) && signal && typeof signal.useSubscribe === "function") {
				state.subscriptions.set(
					signal,
					signal.useSubscribe(() => this.runEffect(state, callback)),
				);
			}
		}
	}

	/**
	 * Creates a side effect that re-runs whenever a signal read by the callback
	 * changes. Explicit dependencies can also be provided for compatibility.
	 * An optional cleanup function returned from the callback is invoked before
	 * each re-run and on disposal.
	 *
	 * @param callback - Effect body. May return a cleanup function.
	 * @param signals - Optional explicit dependencies, in addition to tracked reads.
	 * @returns A dispose function that tears down all subscriptions and runs
	 *   the final cleanup.
	 *
	 * @example
	 * ```ts
	 * const [name, setName] = useCreateSignal("world");
	 * const dispose = useCreateEffect(() => {
	 *   console.log(`Hello, ${name()}!`);
	 *   return () => console.log("cleaning up");
	 * });
	 *
	 * setName("Katana"); // logs "Hello, Katana!"
	 * dispose();         // logs "cleaning up"
	 * ```
	 */
	useCreateEffect(
		callback: () => void | (() => void),
		signals: Subscribable<unknown>[] = [],
	): () => void {
		const state: EffectState = {
			cleanup: undefined,
			disposed: false,
			subscriptions: new Map<Subscribable<unknown>, () => void>(),
			explicitDependencies: new Set(signals),
		};

		this.runEffect(state, callback);

		return () => {
			if (!state.disposed) {
				state.disposed = true;
				for (const unsubscribe of state.subscriptions.values()) {
					unsubscribe();
				}
				state.subscriptions.clear();
			}

			if (typeof state.cleanup === "function") {
				try {
					state.cleanup();
				} catch (error) {
					useLogger("[createEffect] Final cleanup error:", error, "error");
				}
			}
		};
	}

	/**
	 * Creates a memoised signal whose value is derived from a computation.
	 * The computation re-runs whenever a signal it reads changes. Explicit
	 * dependencies can also be provided for compatibility.
	 *
	 * @typeParam T - The computed value type.
	 * @param computation - Pure function that derives the value.
	 * @param signals - Optional explicit dependencies, in addition to tracked reads.
	 * @returns A read-only getter for the memoised value.
	 *
	 * @example
	 * ```ts
	 * const [a, setA] = useCreateSignal(2);
	 * const [b, setB] = useCreateSignal(3);
	 * const sum = useCreateMemo(() => a() + b());
	 * sum(); // 5
	 * setA(10);
	 * sum(); // 13
	 * ```
	 */
	useCreateMemo<T>(computation: () => T, signals: Subscribable<unknown>[] = []): SignalGetter<T> {
		const [get, set] = this.useCreateSignal<T>(computation());

		this.useCreateEffect(() => {
			set(computation());
		}, signals);

		return get;
	}

	/**
	 * Creates a boolean toggle signal.
	 *
	 * @param initialValue - Starting value (defaults to `false`).
	 * @returns A tuple of `[getter, { useSet, useToggle }]`.
	 *
	 * @example
	 * ```ts
	 * const [isOpen, { useSet, useToggle }] = useCreateToggle();
	 * isOpen();    // false
	 * useToggle();
	 * isOpen();    // true
	 * useSet(false);
	 * isOpen();    // false
	 * ```
	 */
	useCreateToggle(initialValue = false): [SignalGetter<boolean>, ToggleSignalSetter] {
		const [get, set] = this.useCreateSignal<boolean>(initialValue);
		const toggle = () => set((prev) => !prev);

		return [get, { useSet: set, useToggle: toggle }];
	}

	/**
	 * Creates a signal whose setter debounces writes by `delayMs` milliseconds.
	 * Useful for search inputs or any value that triggers expensive work.
	 *
	 * @typeParam T - The signal value type.
	 * @param initialValue - The initial value.
	 * @param delayMs - Debounce delay in milliseconds (defaults to `300`).
	 * @returns A tuple of `[getter, debouncedSetter]`. The setter exposes a
	 *   `useCancel()` method to abort a pending write.
	 *
	 * @example
	 * ```ts
	 * const [query, setQuery] = useCreateDebouncedSignal("", 250);
	 * setQuery("hello"); // won't update until 250ms of quiet
	 * setQuery.useCancel(); // abort pending write
	 * ```
	 */
	useCreateDebouncedSignal<T>(
		initialValue: T,
		delayMs = 300,
	): [SignalGetter<T>, SignalSetter<T> & { useCancel: () => void }] {
		const [get, set] = this.useCreateSignal<T>(initialValue);
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		const debouncedSet: SignalSetter<T> & { useCancel: () => void } = ((nextValue) => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				set(nextValue);
				timeoutId = undefined;
			}, delayMs);
		}) as SignalSetter<T> & { useCancel: () => void };

		debouncedSet.useCancel = () => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
				timeoutId = undefined;
			}
		};

		return [get, debouncedSet];
	}

	/**
	 * Returns a batch function that defers signal notifications until the
	 * callback completes. Nested calls are supported -- only the outermost
	 * batch flushes the queue.
	 *
	 * @returns A `batch(callback)` function.
	 *
	 * @example
	 * ```ts
	 * const batch = useCreateBatch();
	 * const [a, setA] = useCreateSignal(0);
	 * const [b, setB] = useCreateSignal(0);
	 *
	 * batch(() => {
	 *   setA(1);
	 *   setB(2);
	 *   // listeners fire only once here, not twice
	 * });
	 * ```
	 */
	useCreateBatch(): (callback: () => void) => void {
		return (callback: () => void) => {
			const wasBatching = this.isBatching;
			this.isBatching = true;
			try {
				callback();
			} catch (error) {
				useLogger("[createBatch] Batch block error:", error, "error");
			} finally {
				if (!wasBatching) {
					this.isBatching = false;
					const queue = Array.from(this.batchQueue);
					this.batchQueue.clear();
					for (const notifyFn of queue) {
						notifyFn();
					}
				}
			}
		};
	}
}

/** Creates a reactive signal. See {@link ReactiveService.useCreateSignal}. */
export function useCreateSignal<T>(initialValue: T): [SignalGetter<T>, SignalSetter<T>] {
	return ReactiveService.getInstance().useCreateSignal<T>(initialValue);
}

/** Creates a tracked side effect. See {@link ReactiveService.useCreateEffect}. */
export function useCreateEffect(
	callback: () => void | (() => void),
	signals: Subscribable<unknown>[] = [],
): () => void {
	return ReactiveService.getInstance().useCreateEffect(callback, signals);
}

/** Creates a memoised signal. See {@link ReactiveService.useCreateMemo}. */
export function useCreateMemo<T>(
	computation: () => T,
	signals: Subscribable<unknown>[] = [],
): SignalGetter<T> {
	return ReactiveService.getInstance().useCreateMemo<T>(computation, signals);
}

/** Creates a boolean toggle signal. See {@link ReactiveService.useCreateToggle}. */
export function useCreateToggle(initialValue = false): [SignalGetter<boolean>, ToggleSignalSetter] {
	return ReactiveService.getInstance().useCreateToggle(initialValue);
}

/** Creates a signal with a debounced setter. See {@link ReactiveService.useCreateDebouncedSignal}. */
export function useCreateDebouncedSignal<T>(
	initialValue: T,
	delayMs = 300,
): [SignalGetter<T>, SignalSetter<T> & { useCancel: () => void }] {
	return ReactiveService.getInstance().useCreateDebouncedSignal<T>(initialValue, delayMs);
}

/** Creates a batch function. See {@link ReactiveService.useCreateBatch}. */
export function useCreateBatch(): (callback: () => void) => void {
	return ReactiveService.getInstance().useCreateBatch();
}
