// Tipos para APIs experimentales
interface NetworkInformation {
	effectiveType: "slow-2g" | "2g" | "3g" | "4g";
	downlink: number;
	rtt: number;
	saveData: boolean;
}

interface BatteryManager extends EventTarget {
	charging: boolean;
	chargingTime: number;
	dischargingTime: number;
	level: number;
}