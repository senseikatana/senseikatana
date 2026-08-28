// main.ts - Uso
import {
	ConverterService,
	ErrorService,
	FormatterService,
	GeneratorService,
	LoggerService,
	StorageService,
} from "./services";

// Obtener instancias
const formatter = FormatterService.getInstance();
const converter = ConverterService.getInstance();
const generator = GeneratorService.getInstance();
const storage = StorageService.getInstance();
const logger = LoggerService.getInstance();

// Ejemplos de uso
logger.log("Iniciando aplicación...");

// Formateo
const precio = formatter.formatCurrency({ amount: 100, taxes: 21, currency: "EUR", locale: "es" });
logger.log("Precio:", precio);

const fecha = formatter.formatDate({ format: "long", locale: "es" });
logger.log("Fecha:", fecha);

const nombre = formatter.capitalize("juan pérez");
logger.log("Nombre:", nombre);

// Conversiones
const celsius = converter.toCelsius(100);
logger.log("100°F =", celsius, "°C");

const km = converter.toKilometers(10);
logger.log("10 millas =", km, "km");

// Generadores
const id = generator.numericId();
const uuid = generator.uuid();
const slug = generator.slugify("Hola Mundo desde TypeScript");
logger.log({ id, uuid, slug });

// Storage (solo en browser)
if (typeof window !== "undefined") {
	storage.setItem({ key: "user", value: "John", type: "localStorage" });
	const user = storage.getItem({ key: "user", type: "localStorage" });
	logger.log("Usuario:", user);
}

// Errores
try {
	throw ErrorService.notFound("Usuario no encontrado");
} catch (error) {
	if (error instanceof ErrorService) {
		logger.error(`Error ${error.code}: ${error.message}`);
	}
}


// utils/geometry.utils.ts

