import {
  BYTES_TO_SIZE,
  CELSIUS_TO_FAHRENHEIT,
  CURRENCY_FORMAT,
  KG_TO_LBS,
  KM_TO_MILES,
} from "@/classes/convert";
import { LAMBDA } from "@/classes/lambda";
import { STRINGIFY_QUERY } from "@/http";
import { LOGGER } from "@/logger";
import { AVERAGE, RANDOM_INT, ROUND, SUM } from "@/math";
import {
  DEEP_MERGE,
  FROM_JSON,
  GROUP_BY,
  HAS_PROPERTIES,
  IS_OBJECT,
  TO_JSON,
} from "@/objects";
import { STORAGE_GET, STORAGE_REMOVE, STORAGE_SET } from "@/storage";
import { CAPITALIZE, IS_VALID_EMAIL, SLUGIFY } from "@/string";
import { DATE_DIFF, DATE_FORMAT, NOW } from "@/utils-class/lambda";

// --- POLYFILL TEMPORAL SOLO PARA DEMO EN TERMINAL (Borrar en navegador) ---
if (typeof globalThis.localStorage === "undefined") {
	const store: Record<string, string> = {};
	(globalThis as any).localStorage = {
		getItem: (k: string) => store[k] ?? null,
		setItem: (k: string, v: string) => {
			store[k] = v;
		},
		removeItem: (k: string) => {
			delete store[k];
		},
		clear: () => {
			for (const k in store) delete store[k];
		},
		length: 0,
		key: () => null,
	};
}

const { AVERAGE, SLUGIFY, STORAGE_GET, STORAGE_SET, STORAGE_REMOVE } = LAMBDA();

// Uso directo, sin instanciar
LOGGER("Lambda.average:", SLUGIFY("Test Path"));
LOGGER("Lambda.storageGet:", STORAGE_GET("my_key"));
LOGGER("Lambda.PI:", PI);

// ─── Storage API Tests ─────────────────────────────────────────────
LOGGER("--- STORAGE TESTS ---");

// 1. SET (Guardamos un objeto complejo, no solo strings)
const setUserPrefs = STORAGE_SET("user_prefs", {
	theme: "dark",
	notifications: true,
});

// 2. GET (Lo recuperamos ya parseado como objeto)
const getUserPrefs = STORAGE_GET<{ theme: string; notifications: boolean }>(
	"user_prefs",
);

// 3. REMOVE (Lo borramos)
STORAGE_REMOVE("user_prefs");
const prefsAfterRemove = STORAGE_GET("user_prefs");

// 4. Uso mediante la Clase LAMBDA
const lStorage = new LAMBDA(); // Asumiendo que ya importaste LAMBDA arriba
lStorage.STORAGE_SET("pokemon_fav", { id: 4, name: "charmander" });

// ─── Functional API ────────────────────────────────────────────────
LOGGER("storageSet success:", saved);
LOGGER("storageGet:", prefs);
LOGGER("storageGet after remove:", prefsAfterRemove); // Debería ser null
LOGGER("Lambda storageGet:", lStorage.STORAGE_GET("pokemon_fav"));
LOGGER("average:", AVERAGE([33, 66, 15, 29.9, 30.2]));
LOGGER("sum:", SUM([1, 2, 3]));
LOGGER("round:", ROUND(12.3456, 2));
LOGGER("randomInt:", RANDOM_INT(1, 10));
LOGGER("slugify:", SLUGIFY(" ¡Hola, Mundo! Cómo estás? "));
LOGGER("capitalize:", CAPITALIZE("hola mundo"));
LOGGER("isValidEmail:", IS_VALID_EMAIL("test@example.com"));
LOGGER("now:", NOW());
LOGGER("dateFormat:", DATE_FORMAT(NOW()));
LOGGER("dateDiff:", DATE_DIFF("1990-06-30", NOW()));
LOGGER("deepMerge:", DEEP_MERGE({ a: 1, b: { c: 2 } }, { b: { d: 3 } }));
LOGGER(
	"groupBy:",
	GROUP_BY(
		[
			{ name: "Alice", role: "admin" },
			{ name: "Bob", role: "user" },
		],
		"role",
	),
);
LOGGER(
	"hasProperties:",
	HAS_PROPERTIES({ id: 1, name: "Alice" }, "id", "name"),
);
LOGGER(
	"toJson/fromJson:",
	FROM_JSON<{ name: string }>(TO_JSON({ name: "Alice" })),
);
LOGGER("isObject:", IS_OBJECT({ a: 1 }), IS_OBJECT([1, 2]));
LOGGER("bytesToSize:", BYTES_TO_SIZE(4000000000000));
LOGGER("celsiusToFahrenheit:", CELSIUS_TO_FAHRENHEIT(40));
LOGGER("currencyFormat:", CURRENCY_FORMAT(3790.7, "en-US", "EUR"));
LOGGER("kgToLbs:", KG_TO_LBS(70));
LOGGER("kmToMiles:", KM_TO_MILES(100));
LOGGER(
	"stringifyQuery:",
	STRINGIFY_QUERY({ search: "clean code", page: 1, active: true }),
);

// ─── Class API ─────────────────────────────────────────────────────
const l = new LAMBDA();
LOGGER("Lambda.average:", l.AVERAGE([33, 66, 15, 29.9, 30.2]));
LOGGER("Lambda.slugify:", l.SLUGIFY("Test Path"));
LOGGER("Lambda.currencyFormat:", l.CURRENCY_FORMAT(1000, "es-MX", "MXN"));
LOGGER("Lambda.PI:", LAMBDA.PI);
