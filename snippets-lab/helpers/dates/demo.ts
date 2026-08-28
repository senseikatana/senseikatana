
// Exportación directa para uso sin instanciar
export const { diff, format, now, nowDateTime, addDays, subtractDays, isEqual, isBefore, isAfter, firstDayOfMonth, lastDayOfMonth } = DatesService;

// ============================================================
// TODO: Demo usage
// ============================================================

// Formatear fecha actual
const getToday: string = format(now(), "es-ES", { year: "numeric", month: "long", day: "numeric" });
LOGGER("Hoy:", getToday);

// Diferencia entre fechas
const startDate = "2020-01-01";
const endDate = now();
const difference = diff(startDate, endDate);
LOGGER("Diferencia:", difference);

// Agregar días
const tomorrow = addDays(now(), 1);
LOGGER("Mañana:", tomorrow);

// Comparar fechas
const isPast = isBefore("2020-01-01", now());
LOGGER("¿Es pasado?", isPast);