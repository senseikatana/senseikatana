// utils/timing.utils.ts
import { LOGGER } from "../services/logger.service";

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

/**
 * Utility class for timing operations, delays, debouncing, and throttling.
 * All methods are static as they are pure factories with no shared state.
 *
 * @example
 * ```typescript
 * // Simple delay
 * await TimingUtils.delay(1000);
 *
 * // Debounced search
 * const search = TimingUtils.debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * search('h');
 * search('he');
 * search('hello'); // Only executes once after 300ms
 * ```
 */
export class TimingUtils {
	private constructor() {}

	/**
	 * Checks if running in a browser environment.
	 */
	private static isBrowser(): boolean {
		return typeof window !== "undefined";
	}

	/**
	 * Promisified version of setTimeout.
	 * Useful for clean pauses with async/await.
	 *
	 * @param ms - Delay in milliseconds
	 * @returns Promise that resolves after the delay
	 *
	 * @example
	 * ```typescript
	 * await TimingUtils.delay(2000); // Wait 2 seconds
	 * console.log('Done waiting');
	 * ```
	 */
	static delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Alias for delay - more semantic for sleep operations.
	 *
	 * @param ms - Sleep duration in milliseconds
	 */
	static sleep(ms: number): Promise<void> {
		return this.delay(ms);
	}

	/**
	 * Executes a function after X milliseconds.
	 * Returns an object with the result promise and a cancel function.
	 *
	 * @param callback - Function to execute after the delay
	 * @param ms - Delay in milliseconds
	 * @returns Control object with promise and cancel function
	 *
	 * @example
	 * ```typescript
	 * const { promise, cancel } = TimingUtils.timeout(async () => {
	 *   const data = await fetchData();
	 *   return data;
	 * }, 1000);
	 *
	 * // Can be cancelled before execution
	 * setTimeout(() => cancel(), 500);
	 *
	 * try {
	 *   const result = await promise;
	 *   console.log(result);
	 * } catch (error) {
	 *   console.error('Timeout failed:', error);
	 * }
	 * ```
	 */
	static timeout<T>(
		callback: () => T | Promise<T>,
		ms: number,
	): TimeoutControl<T> {
		let timerId: TimerId;
		let isCancelled = false;

		const promise = new Promise<T>((resolve, reject) => {
			timerId = setTimeout(async () => {
				if (isCancelled) return;

				try {
					const result = await callback();
					resolve(result);
				} catch (error) {
					reject(error);
				}
			}, ms);
		});

		const cancel = () => {
			isCancelled = true;
			clearTimeout(timerId);
		};

		return { promise, cancel };
	}

	/**
	 * Improved and controllable version of setInterval.
	 * Supports async callbacks without overlapping executions.
	 * Returns a control object to pause, resume, and stop.
	 *
	 * @param callback - Function to execute on each interval (sync or async)
	 * @param ms - Interval duration in milliseconds
	 * @param immediate - Execute immediately on start. Default: false
	 * @returns Control object with pause, resume, stop methods
	 *
	 * @example
	 * ```typescript
	 * const interval = TimingUtils.interval(async () => {
	 *   const data = await fetchData();
	 *   console.log('Fetched:', data);
	 * }, 5000, true); // Execute immediately, then every 5 seconds
	 *
	 * // Pause the interval
	 * interval.pause();
	 *
	 * // Resume later
	 * interval.resume();
	 *
	 * // Stop completely
	 * interval.stop();
	 * ```
	 */
	static interval(
		callback: () => void | Promise<void>,
		ms: number,
		immediate: boolean = false,
	): IntervalControl {
		let timerId: TimerId | null = null;
		let isPaused = false;
		let isStopped = false;
		let isExecuting = false;

		const execute = async () => {
			if (isPaused || isStopped || isExecuting) return;

			isExecuting = true;
			try {
				await callback();
			} catch (error) {
				LOGGER("[interval] Callback error:", error, "error");
			} finally {
				isExecuting = false;
			}
		};

		const scheduleNext = () => {
			if (isStopped || isPaused) return;
			timerId = setTimeout(async () => {
				await execute();
				scheduleNext();
			}, ms);
		};

		const stop = () => {
			isStopped = true;
			isPaused = false;
			if (timerId) {
				clearTimeout(timerId);
				timerId = null;
			}
		};

		const pause = () => {
			if (isStopped) return;
			isPaused = true;
			if (timerId) {
				clearTimeout(timerId);
				timerId = null;
			}
		};

		const resume = () => {
			if (isStopped || !isPaused) return;
			isPaused = false;
			scheduleNext();
		};

		const isRunning = () => !isStopped && !isPaused;

		// Start the interval
		if (immediate) {
			execute().then(() => scheduleNext());
		} else {
			scheduleNext();
		}

		return { pause, resume, stop, isRunning };
	}

	/**
	 * Delays execution until X ms have passed without new calls (trailing edge).
	 * Essential for search inputs or window resize events.
	 *
	 * @param func - Function to debounce
	 * @param delayMs - Delay in milliseconds
	 * @returns Debounced function
	 *
	 * @example
	 * ```typescript
	 * const search = TimingUtils.debounce((query: string) => {
	 *   console.log('Searching:', query);
	 *   fetchResults(query);
	 * }, 300);
	 *
	 * // Rapid calls
	 * search('h');
	 * search('he');
	 * search('hel');
	 * search('hello');
	 * // Only 'hello' executes after 300ms of no calls
	 * ```
	 */
	static debounce<T extends (...args: any[]) => any>(
		func: T,
		delayMs: number,
	): (...args: Parameters<T>) => void {
		let timeoutId: TimerId | undefined;

		return (...args: Parameters<T>) => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				try {
					func(...args);
				} catch (error) {
					LOGGER("[debounce] Callback error:", error, "error");
				}
				timeoutId = undefined;
			}, delayMs);
		};
	}

	/**
	 * Debounce with leading edge execution (immediate + trailing).
	 * Executes immediately on first call, then debounces subsequent calls.
	 *
	 * @param func - Function to debounce
	 * @param delayMs - Delay in milliseconds
	 * @returns Debounced function with leading edge
	 *
	 * @example
	 * ```typescript
	 * const save = TimingUtils.debounceImmediate(() => {
	 *   console.log('Saving...');
	 * }, 1000);
	 *
	 * save(); // Executes immediately
	 * save(); // Debounced
	 * save(); // Debounced
	 * // After 1000ms, executes once more
	 * ```
	 */
	static debounceImmediate<T extends (...args: any[]) => any>(
		func: T,
		delayMs: number,
	): (...args: Parameters<T>) => void {
		let timeoutId: TimerId | undefined;
		let lastCallTime: number | undefined;

		return (...args: Parameters<T>) => {
			const now = Date.now();
			const isFirstCall = lastCallTime === undefined;

			lastCallTime = now;

			if (isFirstCall) {
				try {
					func(...args);
				} catch (error) {
					LOGGER("[debounceImmediate] Callback error:", error, "error");
				}
			}

			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				if (Date.now() - lastCallTime! >= delayMs) {
					try {
						func(...args);
					} catch (error) {
						LOGGER("[debounceImmediate] Callback error:", error, "error");
					}
				}
				timeoutId = undefined;
				lastCallTime = undefined;
			}, delayMs);
		};
	}

	/**
	 * Limits execution to once every X ms (throttling).
	 * Essential for scroll or mousemove events.
	 *
	 * @param func - Function to throttle
	 * @param limitMs - Minimum time between executions in milliseconds
	 * @returns Throttled function
	 *
	 * @example
	 * ```typescript
	 * const onScroll = TimingUtils.throttle(() => {
	 *   console.log('Scroll position:', window.scrollY);
	 * }, 100);
	 *
	 * window.addEventListener('scroll', onScroll);
	 * // Executes at most once every 100ms
	 * ```
	 */
	static throttle<T extends (...args: any[]) => any>(
		func: T,
		limitMs: number,
	): (...args: Parameters<T>) => void {
		let inThrottle = false;

		return (...args: Parameters<T>) => {
			if (!inThrottle) {
				try {
					func(...args);
				} catch (error) {
					LOGGER("[throttle] Callback error:", error, "error");
				}
				inThrottle = true;
				setTimeout(() => {
					inThrottle = false;
				}, limitMs);
			}
		};
	}

	/**
	 * Throttle with trailing edge execution.
	 * Executes at start and end of throttle period.
	 *
	 * @param func - Function to throttle
	 * @param limitMs - Minimum time between executions in milliseconds
	 * @returns Throttled function with trailing edge
	 *
	 * @example
	 * ```typescript
	 * const onMouseMove = TimingUtils.throttleTrailing((e: MouseEvent) => {
	 *   console.log('Mouse at:', e.clientX, e.clientY);
	 * }, 100);
	 *
	 * window.addEventListener('mousemove', onMouseMove);
	 * // Executes immediately, then once more after throttle period
	 * ```
	 */
	static throttleTrailing<T extends (...args: any[]) => any>(
		func: T,
		limitMs: number,
	): (...args: Parameters<T>) => void {
		let inThrottle = false;
		let lastArgs: Parameters<T> | null = null;

		return (...args: Parameters<T>) => {
			if (!inThrottle) {
				try {
					func(...args);
				} catch (error) {
					LOGGER("[throttleTrailing] Callback error:", error, "error");
				}
				inThrottle = true;
				lastArgs = null;

				setTimeout(() => {
					inThrottle = false;
					if (lastArgs) {
						try {
							func(...lastArgs);
						} catch (error) {
							LOGGER("[throttleTrailing] Callback error:", error, "error");
						}
					}
				}, limitMs);
			} else {
				lastArgs = args;
			}
		};
	}

	/**
	 * Executes a function repeatedly with a delay between executions.
	 * Returns a promise that resolves when all iterations complete.
	 *
	 * @param callback - Function to execute on each iteration
	 * @param iterations - Number of times to execute
	 * @param delayMs - Delay between executions in milliseconds
	 *
	 * @example
	 * ```typescript
	 * await TimingUtils.repeat(async (i) => {
	 *   console.log(`Iteration ${i}`);
	 *   await fetchData(i);
	 * }, 5, 1000);
	 * // Executes 5 times with 1 second delay between each
	 * ```
	 */
	static async repeat(
		callback: (iteration: number) => void | Promise<void>,
		iterations: number,
		delayMs: number = 0,
	): Promise<void> {
		for (let i = 0; i < iterations; i++) {
			try {
				await callback(i);
			} catch (error) {
				LOGGER("[repeat] Callback error:", error, "error");
			}

			if (i < iterations - 1 && delayMs > 0) {
				await this.delay(delayMs);
			}
		}
	}

	/**
	 * Races a promise against a timeout.
	 * Rejects if the promise doesn't resolve within the timeout.
	 *
	 * @param promise - Promise to race
	 * @param timeoutMs - Timeout in milliseconds
	 * @param errorMessage - Custom error message for timeout
	 * @returns Promise that resolves with the result or rejects on timeout
	 *
	 * @example
	 * ```typescript
	 * try {
	 *   const data = await TimingUtils.race(
	 *     fetch('/api/data'),
	 *     5000,
	 *     'Request timed out'
	 *   );
	 *   console.log(data);
	 * } catch (error) {
	 *   console.error('Failed:', error.message);
	 * }
	 * ```
	 */
	static async race<T>(
		promise: Promise<T>,
		timeoutMs: number,
		errorMessage: string = "Operation timed out",
	): Promise<T> {
		const timeoutPromise = new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
		});

		return Promise.race([promise, timeoutPromise]);
	}
}

// Export convenience aliases
export const {
	delay,
	sleep,
	timeout,
	interval,
	debounce,
	debounceImmediate,
	throttle,
	throttleTrailing,
	repeat,
	race,
} = TimingUtils;