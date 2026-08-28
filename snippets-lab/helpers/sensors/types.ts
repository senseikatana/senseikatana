/**
 * Represents a geographic position with latitude, longitude, and accuracy.
 */
export interface GeoPosition {
	lat: number | string      | Record<number | string, string>;
	lng: number | string      | Record<number | string, string>;
	accuracy: number | string | Record<number | string, string>;
}
// Type for Battery API (experimental)
export interface BatteryManager extends EventTarget {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
}