// utils/timing.utils.ts

/**
 * Cross-environment timer ID type.
 * Works in both browser (number) and Node/Bun (NodeJS.Timeout).
 */
type TimerId = ReturnType<typeof setTimeout>;

/**
 * Control object returned by timeout operations.
 */
export interface TimeoutControl<T> {
	promise: Promise<T>;
	cancel: () => void;
}

/**
 * Control object returned by interval operations.
 */
export interface IntervalControl {
	pause: () => void;
	resume: () => void;
	stop: () => void;
	isRunning: () => boolean;
}