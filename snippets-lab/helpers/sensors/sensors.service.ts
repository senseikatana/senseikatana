// utils/sensors.utils.ts
import { LOGGER } from "../services/logger.service";


/**
 * Utility class for device sensors and hardware APIs like camera, microphone,
 * geolocation, gyroscope, and vibration.
 */
export class SensorsUtils {
	private static instance: SensorsUtils;

	private constructor() {}

	/**
	 * Returns the singleton instance of SensorsUtils.
	 */
	static getInstance(): SensorsUtils {
		if (!SensorsUtils.instance) {
			SensorsUtils.instance = new SensorsUtils();
		}
		return SensorsUtils.instance;
	}

	/**
	 * Checks if we're running in a browser environment.
	 * Essential for avoiding crashes in SSR (Astro, Next.js) or Node/Bun.
	 */
	private isBrowser(): boolean {
		return typeof window !== "undefined" && typeof navigator !== "undefined";
	}

	// ─── Media Devices (Camera and Microphone) ────────────────────────────

	/**
	 * Requests permission and access to camera and/or microphone.
	 * Returns the native JS Stream or null if it fails or is denied.
	 *
	 * @param constraints - Media stream constraints. Default: { video: true, audio: true }
	 * @returns Promise resolving to MediaStream or null
	 *
	 * @example
	 * ```typescript
	 * const stream = await SensorsUtils.getMediaStream({ video: true, audio: false });
	 * if (stream) {
	 *   // Use the stream
	 *   videoElement.srcObject = stream;
	 * }
	 * ```
	 */
	async getMediaStream(
		constraints: MediaStreamConstraints = { video: true, audio: true },
	): Promise<MediaStream | null> {
		if (!this.isBrowser() || !navigator.mediaDevices?.getUserMedia) {
			LOGGER("[getMediaStream] API not supported in this environment.", "warn");
			return null;
		}

		try {
			return await navigator.mediaDevices.getUserMedia(constraints);
		} catch (error) {
			LOGGER("[getMediaStream] Permission denied or error:", error, "error");
			return null;
		}
	}

	/**
	 * Stops all tracks from a stream (turns off camera/microphone light).
	 * CRITICAL to call this when done using the camera to free memory.
	 *
	 * @param stream - The MediaStream to stop, or null
	 *
	 * @example
	 * ```typescript
	 * const stream = await SensorsUtils.getMediaStream();
	 * // ... use stream ...
	 * SensorsUtils.stopMediaStream(stream);
	 * ```
	 */
	stopMediaStream(stream: MediaStream | null): void {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
	}

	/**
	 * Gets the front-facing camera stream if available.
	 *
	 * @returns Promise resolving to MediaStream or null
	 */
	async getFrontCamera(): Promise<MediaStream | null> {
		return this.getMediaStream({
			video: { facingMode: "user" },
			audio: true,
		});
	}

	/**
	 * Gets the back-facing camera stream if available.
	 *
	 * @returns Promise resolving to MediaStream or null
	 */
	async getBackCamera(): Promise<MediaStream | null> {
		return this.getMediaStream({
			video: { facingMode: "environment" },
			audio: true,
		});
	}

	// ─── Geolocation API ───────────────────────────────────────────────

	/**
	 * Gets the current device location (GPS).
	 *
	 * @param options - Position options for geolocation
	 * @returns Promise resolving to GeoPosition or null
	 *
	 * @example
	 * ```typescript
	 * const position = await SensorsUtils.getGeolocation();
	 * if (position) {
	 *   console.log(`Lat: ${position.lat}, Lng: ${position.lng}`);
	 * }
	 * ```
	 */
	async getGeolocation(options?: PositionOptions): Promise<GeoPosition | null> {
		if (!this.isBrowser() || !navigator.geolocation) return null;

		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						accuracy: position.coords.accuracy,
					});
				},
				(error) => {
					LOGGER("[getGeolocation] Error:", error.message, "error");
					resolve(null);
				},
				{ enableHighAccuracy: true, timeout: 10000, ...options },
			);
		});
	}

	/**
	 * Watches the device location continuously.
	 * Returns a cleanup function to stop watching.
	 *
	 * @param callback - Function called with each position update
	 * @param options - Position options for geolocation
	 * @returns Cleanup function to stop watching, or null
	 *
	 * @example
	 * ```typescript
	 * const stopWatching = SensorsUtils.watchGeolocation((position) => {
	 *   console.log('New position:', position);
	 * });
	 * // Later...
	 * stopWatching?.();
	 * ```
	 */
	watchGeolocation(
		callback: (position: GeoPosition) => void,
		options?: PositionOptions,
	): (() => void) | null {
		if (!this.isBrowser() || !navigator.geolocation) return null;

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				callback({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					accuracy: position.coords.accuracy,
				});
			},
			(error) => {
				LOGGER("[watchGeolocation] Error:", error.message, "error");
			},
			{ enableHighAccuracy: true, ...options },
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}

	// ─── Device Motion / Gyroscope API ─────────────────────────────────

	/**
	 * On iOS 13+, the gyroscope requires explicit permission from the user.
	 * This function handles that Apple requirement.
	 *
	 * @returns Promise resolving to true if permission granted, false otherwise
	 *
	 * @example
	 * ```typescript
	 * const hasPermission = await SensorsUtils.requestMotionPermission();
	 * if (hasPermission) {
	 *   // Start listening to gyroscope
	 * }
	 * ```
	 */
	async requestMotionPermission(): Promise<boolean> {
		if (!this.isBrowser()) return false;

		const DeviceOrientationEventExtended = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
			requestPermission?: () => Promise<string>;
		};

		if (
			typeof DeviceOrientationEventExtended !== "undefined" &&
			typeof DeviceOrientationEventExtended.requestPermission === "function"
		) {
			try {
				const response = await DeviceOrientationEventExtended.requestPermission();
				return response === "granted";
			} catch (error) {
				LOGGER("[requestMotionPermission] Error:", error, "error");
				return false;
			}
		}

		// Android and other browsers don't require this explicit step
		return true;
	}

	/**
	 * Listens to gyroscope/accelerometer events.
	 * Returns a function to STOP listening (cleanup).
	 *
	 * @param callback - Function called with each orientation event
	 * @returns Cleanup function to remove the event listener, or null
	 *
	 * @example
	 * ```typescript
	 * const hasPermission = await SensorsUtils.requestMotionPermission();
	 * if (hasPermission) {
	 *   const cleanup = SensorsUtils.onDeviceOrientation((event) => {
	 *     console.log('Alpha:', event.alpha, 'Beta:', event.beta);
	 *   });
	 *   // Later...
	 *   cleanup?.();
	 * }
	 * ```
	 */
	onDeviceOrientation(callback: (event: DeviceOrientationEvent) => void): (() => void) | null {
		if (!this.isBrowser()) return null;

		window.addEventListener("deviceorientation", callback);

		// Return cleanup function to remove the event listener when no longer needed
		return () => {
			window.removeEventListener("deviceorientation", callback);
		};
	}

	/**
	 * Listens to device motion events (acceleration).
	 * Returns a function to STOP listening (cleanup).
	 *
	 * @param callback - Function called with each motion event
	 * @returns Cleanup function to remove the event listener, or null
	 */
	onDeviceMotion(callback: (event: DeviceMotionEvent) => void): (() => void) | null {
		if (!this.isBrowser()) return null;

		window.addEventListener("devicemotion", callback);

		return () => {
			window.removeEventListener("devicemotion", callback);
		};
	}

	// ─── Vibration ───────────────────────────────────────────────────

	/**
	 * Vibrates the device with the specified pattern.
	 *
	 * @param pattern - Vibration pattern in milliseconds (single number or array)
	 * @returns true if vibration started, false if not supported
	 *
	 * @example
	 * ```typescript
	 * // Single vibration of 200ms
	 * SensorsUtils.vibrate(200);
	 *
	 * // Pattern: vibrate 100ms, pause 50ms, vibrate 100ms
	 * SensorsUtils.vibrate([100, 50, 100]);
	 * ```
	 */
	vibrate(pattern: number | number[]): boolean {
		if (this.isBrowser() && "vibrate" in navigator) {
			return navigator.vibrate(pattern);
		}
		return false;
	}

	/**
	 * Stops any ongoing vibration.
	 *
	 * @returns true if vibration stopped, false if not supported
	 */
	stopVibration(): boolean {
		return this.vibrate(0);
	}

	// ─── Battery API ─────────────────────────────────────────────────

	/**
	 * Gets battery information if available.
	 *
	 * @returns Promise resolving to battery info or null
	 *
	 * @example
	 * ```typescript
	 * const battery = await SensorsUtils.getBattery();
	 * if (battery) {
	 *   console.log(`Battery: ${battery.level * 100}%, Charging: ${battery.charging}`);
	 * }
	 * ```
	 */
	async getBattery(): Promise<BatteryManager | null> {
		if (!this.isBrowser()) return null;

		const nav = navigator as Navigator & {
			getBattery?: () => Promise<BatteryManager>;
		};

		if (!nav.getBattery) return null;

		try {
			return await nav.getBattery();
		} catch (error) {
			LOGGER("[getBattery] Error:", error, "error");
			return null;
		}
	}
}



// Export singleton instance for convenience
export const sensorsUtils = SensorsUtils.getInstance();