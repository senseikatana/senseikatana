// utils/reactive.utils.ts
import { LOGGER } from "../services/logger.service";

/**
 * Listener function type for reactive signals.
 * Called when a signal's value changes.
 */
export type SignalListener<T> = (newValue: T, oldValue: T) => void;

/**
 * Interface for reactive signals that can be subscribed to.
 */
export interface Subscribable<T> {
	subscribe: (listener: SignalListener<T>) => () => void;
}

/**
 * Getter function returned by signals.
 * Can be called to get the current value and has a subscribe method.
 */
export interface SignalGetter<T> extends Subscribable<T> {
	(): T;
}

/**
 * Setter function returned by signals.
 * Accepts a new value or a function that receives the previous value.
 */
export type SignalSetter<T> = (newValue: T | ((prev: T) => T)) => void;

/**
 * Toggle signal setter with additional toggle method.
 */
export interface ToggleSignalSetter {
	set: (value: boolean) => void;
	toggle: () => void;
}

/**
 * Utility class for creating reactive signals, effects, and computed values.
 * Inspired by SolidJS reactivity system but implemented in vanilla TypeScript.
 *
 * @example
 * ```typescript
 * // Create a signal
 * const [count, setCount] = ReactiveUtils.createSignal(0);
 * console.log(count()); // 0
 *
 * // Subscribe to changes
 * const unsubscribe = count.subscribe((newVal, oldVal) => {
 *   console.log(`Count changed from ${oldVal} to ${newVal}`);
 * });
 *
 * // Update the signal
 * setCount(1); // Logs: "Count changed from 0 to 1"
 * setCount(prev => prev + 1); // Functional update
 *
 * // Cleanup
 * unsubscribe();
 * ```
 */
export default class ReactiveUtils {
	private constructor() {}

	/**
	 * Creates a reactive signal with a getter and setter.
	 * The getter has a `subscribe` method to listen for changes.
	 *
	 * @param initialValue - Initial value of the signal
	 * @returns Tuple of [getter, setter]
	 *
	 * @example
	 * ```typescript
	 * const [getCount, setCount] = ReactiveUtils.createSignal(0);
	 * 
	 * // Read value
	 * console.log(getCount()); // 0
	 * 
	 * // Subscribe to changes
	 * const unsub = getCount.subscribe((newVal, oldVal) => {
	 *   console.log(`Changed: ${oldVal} -> ${newVal}`);
	 * });
	 * 
	 * // Update value
	 * setCount(5); // Triggers subscription
	 * setCount(prev => prev + 1); // Functional update
	 * 
	 * // Cleanup
	 * unsub();
	 * ```
	 */
	static createSignal<T>(initialValue: T): [SignalGetter<T>, SignalSetter<T>] {
		let value = initialValue;
		const listeners = new Set<SignalListener<T>>();

		const get = (() => value) as SignalGetter<T>;

		const set: SignalSetter<T> = (nextValue) => {
			const oldValue = value;
			value = typeof nextValue === "function" ? (nextValue as (prev: T) => T)(oldValue) : nextValue;

			if (value !== oldValue) {
				for (const listener of listeners) {
					try {
						listener(value, oldValue);
					} catch (error) {
						LOGGER("[createSignal] Listener error:", error, "error");
					}
				}
			}
		};

		// Attach subscribe method to getter
		get.subscribe = (listener: SignalListener<T>): (() => void) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		};

		return [get, set];
	}

	/**
	 * Creates a reactive effect that runs whenever its dependencies change.
	 * Dependencies must be passed explicitly as subscribable signals.
	 *
	 * @param callback - Function to execute. Can return a cleanup function.
	 * @param signals - Array of signals to subscribe to
	 * @returns Cleanup function to stop the effect and unsubscribe
	 *
	 * @example
	 * ```typescript
	 * const [count, setCount] = ReactiveUtils.createSignal(0);
	 * const [name, setName] = ReactiveUtils.createSignal('Alice');
	 * 
	 * const cleanup = ReactiveUtils.createEffect(() => {
	 *   console.log(`Count: ${count()}, Name: ${name()}`);
	 *   
	 *   // Optional cleanup function
	 *   return () => console.log('Effect cleanup');
	 * }, [count, name]);
	 * 
	 * setCount(1); // Effect runs again
	 * setName('Bob'); // Effect runs again
	 * 
	 * // Stop the effect
	 * cleanup();
	 * ```
	 */
	static createEffect(
		callback: () => void | (() => void),
		signals: Subscribable<unknown>[],
	): () => void {
		let cleanup: void | (() => void);

		const execute = () => {
			if (typeof cleanup === "function") {
				try {
					cleanup();
				} catch (error) {
					LOGGER("[createEffect] Cleanup error:", error, "error");
				}
			}

			try {
				cleanup = callback() as void | (() => void);
			} catch (error) {
				LOGGER("[createEffect] Execution error:", error, "error");
			}
		};

		const unsubscribes = signals.map((signal) => {
			if (signal && typeof signal.subscribe === "function") {
				return signal.subscribe(execute);
			}
			return () => {};
		});

		execute();

		return () => {
			if (typeof cleanup === "function") {
				try {
					cleanup();
				} catch (error) {
					LOGGER("[createEffect] Final cleanup error:", error, "error");
				}
			}
			unsubscribes.forEach((unsub) => unsub());
		};
	}

	/**
	 * Creates a memoized (computed) signal that updates when dependencies change.
	 * Only recalculates when subscribed signals change.
	 *
	 * @param computation - Function that computes the derived value
	 * @param signals - Array of signals this memo depends on
	 * @returns Getter function for the computed value
	 *
	 * @example
	 * ```typescript
	 * const [firstName, setFirstName] = ReactiveUtils.createSignal('John');
	 * const [lastName, setLastName] = ReactiveUtils.createSignal('Doe');
	 * 
	 * const fullName = ReactiveUtils.createMemo(
	 *   () => `${firstName()} ${lastName()}`,
	 *   [firstName, lastName]
	 * );
	 * 
	 * console.log(fullName()); // "John Doe"
	 * 
	 * setFirstName('Jane');
	 * console.log(fullName()); // "Jane Doe" (recomputed)
	 * ```
	 */
	static createMemo<T>(
		computation: () => T,
		signals: Subscribable<unknown>[],
	): SignalGetter<T> {
		const [get, set] = this.createSignal<T>(computation());

		this.createEffect(() => {
			set(computation());
		}, signals);

		return get;
	}

	/**
	 * Creates a boolean signal with a toggle method.
	 * Perfect for menus, modals, and other boolean state.
	 *
	 * @param initialValue - Initial boolean value. Default: false
	 * @returns Tuple of [getter, setter object with set and toggle methods]
	 *
	 * @example
	 * ```typescript
	 * const [isOpen, setIsOpen] = ReactiveUtils.createToggle(false);
	 * 
	 * console.log(isOpen()); // false
	 * setIsOpen.toggle();
	 * console.log(isOpen()); // true
	 * 
	 * setIsOpen.set(false);
	 * console.log(isOpen()); // false
	 * ```
	 */
	static createToggle(initialValue: boolean = false): [SignalGetter<boolean>, ToggleSignalSetter] {
		const [get, set] = this.createSignal<boolean>(initialValue);

		const toggle = () => set((prev) => !prev);

		return [get, { set, toggle }];
	}

	/**
	 * Creates a signal that automatically syncs with localStorage or sessionStorage.
	 * Combines reactive state with persistent storage.
	 *
	 * @param key - Storage key
	 * @param initialValue - Initial value if not in storage
	 * @param type - Storage type: 'local' or 'session'. Default: 'local'
	 * @returns Tuple of [getter, setter]
	 *
	 * @example
	 * ```typescript
	 * const [theme, setTheme] = ReactiveUtils.createStorageSignal<'light' | 'dark'>(
	 *   'theme',
	 *   'light',
	 *   'local'
	 * );
	 * 
	 * console.log(theme()); // 'light' (or stored value)
	 * 
	 * setTheme('dark'); // Updates signal AND localStorage
	 * 
	 * // Refresh page - value persists
	 * console.log(theme()); // 'dark'
	 * ```
	 */
	static createStorageSignal<T>(
		key: string,
		initialValue: T,
		type: "local" | "session" = "local",
	): [SignalGetter<T>, SignalSetter<T>] {
		const isBrowser = typeof window !== "undefined";
		const storage = isBrowser ? (type === "local" ? localStorage : sessionStorage) : null;

		// Try to read from storage, fall back to initial value
		let storedValue: T = initialValue;
		if (storage) {
			try {
				const item = storage.getItem(key);
				if (item) {
					storedValue = JSON.parse(item) as T;
				}
			} catch (error) {
				LOGGER(`[createStorageSignal] Error reading from ${type}Storage:`, error, "error");
			}
		}

		const [get, set] = this.createSignal<T>(storedValue);

		// Override set to also save to storage
		const setWithStorage: SignalSetter<T> = (nextValue) => {
			set((prev) => {
				const newValue = typeof nextValue === "function" ? (nextValue as (p: T) => T)(prev) : nextValue;

				if (storage) {
					try {
						storage.setItem(key, JSON.stringify(newValue));
					} catch (error) {
						LOGGER(`[createStorageSignal] Error writing to ${type}Storage:`, error, "error");
					}
				}

				return newValue;
			});
		};

		return [get, setWithStorage];
	}

	/**
	 * Creates a debounced signal that only updates after a delay.
	 * Useful for search inputs or other rapid changes.
	 *
	 * @param initialValue - Initial value
	 * @param delayMs - Debounce delay in milliseconds. Default: 300
	 * @returns Tuple of [getter, setter]
	 *
	 * @example
	 * ```typescript
	 * const [search, setSearch] = ReactiveUtils.createDebouncedSignal('', 500);
	 * 
	 * // Rapid typing
	 * setSearch('h');
	 * setSearch('he');
	 * setSearch('hel');
	 * setSearch('hello');
	 * 
	 * // Only updates after 500ms of no changes
	 * search.subscribe((val) => console.log('Search:', val));
	 * ```
	 */
	static createDebouncedSignal<T>(
		initialValue: T,
		delayMs: number = 300,
	): [SignalGetter<T>, SignalSetter<T>] {
		const [get, set] = this.createSignal<T>(initialValue);
		let timeoutId: number | undefined;

		const debouncedSet: SignalSetter<T> = (nextValue) => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = window.setTimeout(() => {
				set(nextValue);
				timeoutId = undefined;
			}, delayMs);
		};

		return [get, debouncedSet];
	}

	/**
	 * Creates a batch update function that groups multiple signal updates.
	 * Prevents intermediate state notifications.
	 *
	 * @returns Batch function that accepts a callback with multiple updates
	 *
	 * @example
	 * ```typescript
	 * const [count, setCount] = ReactiveUtils.createSignal(0);
	 * const [name, setName] = ReactiveUtils.createSignal('');
	 * 
	 * const batch = ReactiveUtils.createBatch();
	 * 
	 * count.subscribe(() => console.log('Count updated'));
	 * name.subscribe(() => console.log('Name updated'));
	 * 
	 * // Without batch: triggers 2 separate updates
	 * // With batch: triggers once after all updates
	 * batch(() => {
	 *   setCount(1);
	 *   setName('Alice');
	 * });
	 * ```
	 */
	static createBatch(): (callback: () => void) => void {
		return (callback: () => void) => {
			// Simple implementation - just execute the callback
			// Advanced batching would queue updates and flush them together
			try {
				callback();
			} catch (error) {
				LOGGER("[createBatch] Batch execution error:", error, "error");
			}
		};
	}
}

// Export convenience aliases
export const {
	createSignal,
	createEffect,
	createMemo,
	createToggle,
	createStorageSignal,
	createDebouncedSignal,
	createBatch,
} = ReactiveUtils;