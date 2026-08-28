// utils/navigator.utils.ts
import { LOGGER } from "../services/logger.service";

export class NavigatorUtils {
	private constructor() {}

	/**
	 * Verifica si estamos en un entorno de navegador.
	 * Esencial para evitar crashes en SSR (Astro, Next.js) o Node/Bun.
	 */
	static isBrowser(): boolean {
		return typeof window !== "undefined" && typeof navigator !== "undefined";
	}

	// ─── Network & Connection ──────────────────────────────────────────

	static isOnline(): boolean {
		return this.isBrowser() ? navigator.onLine : true;
	}

	static getConnectionType(): string | null {
		if (!this.isBrowser()) return null;

		const nav = navigator as Navigator & {
			connection?: NetworkInformation;
			mozConnection?: NetworkInformation;
			webkitConnection?: NetworkInformation;
		};

		const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
		return connection?.effectiveType ?? null;
	}

	static getConnectionInfo(): NetworkInformation | null {
		if (!this.isBrowser()) return null;

		const nav = navigator as Navigator & {
			connection?: NetworkInformation;
			mozConnection?: NetworkInformation;
			webkitConnection?: NetworkInformation;
		};

		return nav.connection || nav.mozConnection || nav.webkitConnection || null;
	}

	// ─── Hardware & Device ─────────────────────────────────────────────

	static getLanguage(): string {
		return this.isBrowser() ? navigator.language : "en-US";
	}

	static getLanguages(): readonly string[] {
		return this.isBrowser() ? navigator.languages : ["en-US"];
	}

	static getCores(): number {
		return this.isBrowser() ? navigator.hardwareConcurrency : 1;
	}

	static getDeviceMemory(): number | null {
		if (!this.isBrowser()) return null;
		const nav = navigator as Navigator & { deviceMemory?: number };
		return nav.deviceMemory ?? null;
	}

	static isMobile(): boolean {
		if (!this.isBrowser()) return false;
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	}

	static isDesktop(): boolean {
		return !this.isMobile();
	}

	static getUserAgent(): string {
		return this.isBrowser() ? navigator.userAgent : "";
	}

	static getPlatform(): string {
		return this.isBrowser() ? navigator.platform : "unknown";
	}

	// ─── Permissions ───────────────────────────────────────────────────

	static async checkPermission(name: PermissionName): Promise<PermissionState | null> {
		if (!this.isBrowser() || !navigator.permissions) return null;

		try {
			const status = await navigator.permissions.query({ name });
			return status.state;
		} catch (error) {
			LOGGER("Error checking permission:", error, "error");
			return null;
		}
	}

	// ─── Vibration API ─────────────────────────────────────────────────

	static vibrate(pattern: number | number[]): boolean {
		if (this.isBrowser() && "vibrate" in navigator) {
			return navigator.vibrate(pattern);
		}
		return false;
	}

	static stopVibration(): boolean {
		return this.vibrate(0);
	}

	// ─── Share API (Nativo de móviles) ─────────────────────────────────

	static async nativeShare(data: ShareData): Promise<boolean> {
		if (!this.isBrowser() || !navigator.share) return false;

		try {
			await navigator.share(data);
			return true;
		} catch (error) {
			if (error instanceof Error && error.name !== "AbortError") {
				LOGGER("Share error:", error.message, "error");
			}
			return false;
		}
	}

	static canShare(data?: ShareData): boolean {
		if (!this.isBrowser() || !navigator.canShare) return false;
		return data ? navigator.canShare(data) : true;
	}

	// ─── Clipboard API ─────────────────────────────────────────────────

	static async copyToClipboard(text: string): Promise<boolean> {
		if (!this.isBrowser() || !navigator.clipboard) return false;

		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			LOGGER("Clipboard error:", error, "error");
			return false;
		}
	}

	static async readFromClipboard(): Promise<string | null> {
		if (!this.isBrowser() || !navigator.clipboard) return null;

		try {
			return await navigator.clipboard.readText();
		} catch (error) {
			LOGGER("Clipboard read error:", error, "error");
			return null;
		}
	}

	// ─── Media Devices ─────────────────────────────────────────────────

	static async getMediaDevices(): Promise<MediaDeviceInfo[] | null> {
		if (!this.isBrowser() || !navigator.mediaDevices) return null;

		try {
			return await navigator.mediaDevices.enumerateDevices();
		} catch (error) {
			LOGGER("Media devices error:", error, "error");
			return null;
		}
	}

	static async hasWebcam(): Promise<boolean> {
		const devices = await this.getMediaDevices();
		return devices?.some((device) => device.kind === "videoinput") ?? false;
	}

	static async hasMicrophone(): Promise<boolean> {
		const devices = await this.getMediaDevices();
		return devices?.some((device) => device.kind === "audioinput") ?? false;
	}

	// ─── Geolocation ───────────────────────────────────────────────────

	static async getCurrentPosition(): Promise<GeolocationPosition | null> {
		if (!this.isBrowser() || !navigator.geolocation) return null;

		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => {
					LOGGER("Geolocation error:", error.message, "error");
					resolve(null);
				},
			);
		});
	}

	// ─── Battery API ─────────────────────────────────────────────────

	static async getBattery(): Promise<BatteryManager | null> {
		if (!this.isBrowser()) return null;

		const nav = navigator as Navigator & {
			getBattery?: () => Promise<BatteryManager>;
		};

		if (!nav.getBattery) return null;

		try {
			return await nav.getBattery();
		} catch (error) {
			LOGGER("Battery API error:", error, "error");
			return null;
		}
	}
}

