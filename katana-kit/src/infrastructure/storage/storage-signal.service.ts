import { useCreateSignal } from "@/core/services/reactive.service.js";
import type { SignalGetter, SignalSetter, StorageTarget } from "@/types/index.js";

import { useGetStorage, useSetStorage } from "./storage.service.js";

/**
 * Creates a signal that persists its value to a storage backend
 * (localStorage, sessionStorage, etc.). Reads the initial value from
 * storage on creation.
 *
 * This lives in the infrastructure layer, not in `core`, because it is the one
 * reactive helper that performs real I/O. Core stays free of runtime I/O; the
 * pure signal primitives (`useCreateSignal`, `useCreateEffect`,
 * `useCreateMemo`, …) remain in `core/services/reactive.service.ts`.
 *
 * @typeParam T - The signal value type.
 * @param key - Storage key.
 * @param fallbackValue - Value used when the key is not in storage.
 * @param target - Storage backend (defaults to `"localStorage"`).
 * @returns A tuple of `[getter, setter]`. The setter writes through to
 *   storage.
 *
 * @example
 * ```ts
 * import { useCreateStorageSignal } from "katanakit-js";
 *
 * const [theme, setTheme] = useCreateStorageSignal("theme", "dark");
 * theme(); // "dark" (or whatever was stored)
 * setTheme("light"); // persists to localStorage
 * ```
 */
export function useCreateStorageSignal<T>(
	key: string,
	fallbackValue: T,
	target: StorageTarget = "localStorage",
): [SignalGetter<T>, SignalSetter<T>] {
	let initial: T = fallbackValue;

	// StorageStrategy implementations never throw: unavailable backends return null.
	const stored = useGetStorage<T>(key, target);
	if (stored !== null && stored !== undefined) {
		initial = stored;
	}

	const [get, set] = useCreateSignal<T>(initial);

	const setWithStorage: SignalSetter<T> = (nextValue) => {
		set((prev) => {
			const newValue = typeof nextValue === "function" ? (nextValue as (p: T) => T)(prev) : nextValue;

			useSetStorage(key, newValue, target);

			return newValue;
		});
	};

	return [get, setWithStorage];
}
