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