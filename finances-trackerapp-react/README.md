# Finanzas App — Control de Finanzas Personales

> **Ubicación:** `08-Lecturas/Apps/finanzas-app/`

App web progresiva (PWA) para gestionar finanzas personales. Sin login, sin backend — **todo en localStorage**.

## Funcionalidades

| Vista | Descripción |
|-------|-------------|
| **📊 Dashboard** | Panel de control con ingresos, gastos, ahorro, tasa de ahorro, suscripciones activas y progreso de metas |
| **💰 Ingresos** | Registro de ingresos (nómina, freelance, inversiones...) |
| **📋 Gastos Fijos** | Gastos mensuales recurrentes con control de pagado |
| **🛒 Gastos Variables** | Gastos del día a día con filtro necesario/capricho |
| **🔄 Suscripciones** | Gestión de suscripciones mensuales y **anuales** (Google One, Proton, Internxt...) |
| **📝 Registro Diario** | Anotación rápida de gastos con clasificación Fijo/Variable/Extraordinario |
| **🎯 Presupuesto** | Presupuesto mensual vs real con indicadores ✅⚠️❌ |
| **🏦 Metas Ahorro** | Seguimiento de objetivos de ahorro con progreso visual |
| **💳 Deudas** | Control de préstamos y pagos pendientes |

## Para suscripciones anuales

El módulo de Suscripciones soporta ciclos **mensuales** y **anuales**. Las suscripciones anuales (Proton Unlimited, Internxt Drive, etc.) se convierten automáticamente a coste mensual equivalente en el Dashboard.

## Gastos Fijos vs. Gastos Variables

Para llevar una buena salud financiera, es crucial diferenciar entre estos dos tipos de gastos:

* **Gastos Fijos (Obligatorios y Predecibles):**
  * **¿Qué son?:** Gastos recurrentes que se repiten con frecuencia (normalmente cada mes) y cuyo importe es predecible. Suelen ser esenciales para el día a día.
  * **Ejemplos:** Alquiler o hipoteca, facturas de servicios públicos (agua, luz, internet), seguros, préstamos y suscripciones activas.
  * **En la app:** Se gestionan en una lista mensual donde puedes marcar cuáles ya has "Pagado" para evitar olvidos.

* **Gastos Variables (Flexibles y Discrecionales):**
  * **¿Qué son?:** Gastos del día a día que fluctúan según tus actividades, hábitos y decisiones diarias. Son más fáciles de recortar en caso de que necesites ahorrar.
  * **Ejemplos:** Alimentación/supermercado, comer fuera, transporte, ropa, ocio, regalos y viajes.
  * **En la app:** Se anotan en el **Registro Diario** o en **Gastos Variables**, pudiendo indicar si fueron un gasto "Necesario" o un "Capricho".

> **Consejo financiero:** Si consideras que registrar cada gasto cotidiano (variables) es tedioso para tus finanzas diarias, puedes enfocarte solo en tus **Gastos Fijos**. Controlar tus gastos fijos y tus ingresos representa el 80% de la estabilidad de un presupuesto.

## Cómo ejecutar

```bash
cd "08-Lecturas/Apps/finanzas-app"
npx vite
```

O abre directamente `dist/index.html` en tu navegador (versión compilada).

## Construir para producción

```bash
npx vite build
```

Los archivos estáticos se generan en `dist/`. Puedes subirlos a cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Estructura de datos

Todos los datos se guardan en `localStorage` bajo la clave `finanzas-app-data-v2`. No hay servidor, no hay registro, no hay cookies.
