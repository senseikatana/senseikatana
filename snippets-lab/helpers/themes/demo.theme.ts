// Theme Service
import { themeService } from "./services/theme.service";

// Inicializar una sola vez al arrancar
themeService.init({
	defaultMode: "system",
	storageKey: "theme",
	onChange: (mode: string, resolved: string) => {
		console.log(`Theme: ${mode} → ${resolved}`);
	},
});

// Controles de UI
buttonLight.addEventListener("click", () => themeService.set("light"));
buttonDark.addEventListener("click", () => themeService.set("dark"));
buttonSystem.addEventListener("click", () => themeService.set("system"));
buttonToggle.addEventListener("click", () => themeService.toggle());

// Lectura
console.log(themeService.get()); // 'light' | 'dark' | 'system'
console.log(themeService.getResolved()); // 'light' | 'dark'