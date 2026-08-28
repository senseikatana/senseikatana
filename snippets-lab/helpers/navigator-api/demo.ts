import { NavigatorUtils } from "./utils";

// Verificar entorno
if (NavigatorUtils.isBrowser()) {
	console.log("Estamos en el navegador");
}

// Network
const isOnline = NavigatorUtils.isOnline();
const connectionType = NavigatorUtils.getConnectionType(); // '4g', '3g', etc.

// Device info
const language = NavigatorUtils.getLanguage();
const cores = NavigatorUtils.getCores();
const memory = NavigatorUtils.getDeviceMemory();
const isMobile = NavigatorUtils.isMobile();

// Share API
const canShare = NavigatorUtils.canShare({ url: "https://example.com" });
if (canShare) {
	await NavigatorUtils.nativeShare({
		title: "Check this out",
		text: "Amazing content",
		url: "https://example.com",
	});
}

// Vibration
NavigatorUtils.vibrate(200);
NavigatorUtils.vibrate([100, 50, 100]);

// Clipboard
await NavigatorUtils.copyToClipboard("Hello World");
const clipboardText = await NavigatorUtils.readFromClipboard();

// Media devices
const hasWebcam = await NavigatorUtils.hasWebcam();
const hasMicrophone = await NavigatorUtils.hasMicrophone();

// Geolocation
const position = await NavigatorUtils.getCurrentPosition();
if (position) {
	console.log(position.coords.latitude, position.coords.longitude);
}

// Battery
const battery = await NavigatorUtils.getBattery();
if (battery) {
	console.log(`Battery: ${battery.level * 100}%`);
}

// Permissions
const cameraPermission = await NavigatorUtils.checkPermission("camera");