// Env Utils
import { EnvUtils, isDev, vite, node, require as envRequire } from "./utils/env.utils";

// Verificaciones
if (isDev()) {
	console.log("Running in development");
}

// Vite
const apiUrl = vite("VITE_API_URL", "http://localhost:3000");
const appTitle = vite("VITE_APP_TITLE", "My App");

// Node
const port = node("PORT", "3000");
const dbUrl = node("DATABASE_URL");

// Auto (busca en ambos)
const anyVar = EnvUtils.get("API_KEY", "default");

// Críticas (lanzan error si no existen)
try {
	const secretKey = envRequire("VITE_SECRET_KEY", "vite");
	const dbPassword = envRequire("DB_PASSWORD", "node");
} catch (error) {
	console.error(error.message);
}