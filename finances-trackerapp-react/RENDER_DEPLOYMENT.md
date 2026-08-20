# Guía de Despliegue en Render (Vite + React)

Esta guía te guiará paso a paso para desplegar tu aplicación de Finanzas Personales en **Render** como un sitio estático gratuito.

---

## 🛠️ Requisitos Previos

1. Una cuenta gratuita en [GitHub](https://github.com) (o GitLab).
2. Una cuenta gratuita en [Render](https://render.com).
3. [Git](https://git-scm.com/) instalado en tu equipo local.

---

## 💾 Paso 1: Subir el proyecto a GitHub

Dado que Render se conecta a tus repositorios de GitHub para realizar despliegues automáticos (Continuous Deployment), primero debes subir tu código local:

1. **Asegúrate de que estás en la raíz de tu proyecto en la terminal:**
   ```bash
   cd /home/senseikatana/Proyectos/15_finanzas-app
   ```

2. **Inicializar Git (si no está inicializado) y confirmar los cambios locales:**
   ```bash
   git init
   git add .
   git commit -m "prepara configuraciones y .env para despliegue en Render"
   ```

3. **Crear un nuevo repositorio en GitHub:**
   - Ve a [GitHub - New Repository](https://github.com/new).
   - Asígnale un nombre (ej: `15_finanzas-app`).
   - Elige si quieres que sea **Público** o **Privado** (Render soporta ambos).
   - **No** añadas README, .gitignore ni licencia (ya los tienes en tu proyecto local).
   - Haz clic en **Create repository**.

4. **Vincular y subir tu código local:**
   Copia las instrucciones de GitHub para subir un repositorio existente. Deberían ser similares a:
   ```bash
   git branch -M main
   git remote add origin https://github.com/tu-usuario/nombre-del-repositorio.git
   git push -u origin main
   ```
   *(Reemplaza la URL de GitHub con la tuya propia)*.

---

## 🚀 Paso 2: Crear el sitio estático en Render

1. Ve a tu **[Panel de Render (Dashboard)](https://dashboard.render.com)** e inicia sesión.
2. Haz clic en el botón **New +** (arriba a la derecha) y selecciona **Static Site**.
3. **Conecta tu cuenta de GitHub/GitLab** si aún no lo has hecho.
4. En el buscador de repositorios, selecciona tu repositorio `15_finanzas-app` y haz clic en **Connect**.

---

## ⚙️ Paso 3: Configurar el despliegue

Rellena el formulario de configuración en Render con los siguientes valores:

* **Name:** `finanzas-personales` (o el nombre que prefieras para tu subdominio de Render: `nombre.onrender.com`).
* **Branch:** `main` (o la rama que hayas subido).
* **Build Command:** `npm run build`
  *(Nota: Aunque tengas un archivo `bun.lock`, Render detectará automáticamente el gestor de paquetes de Node e instalará las dependencias de forma estándar ejecutando `npm run build`)*.
* **Publish Directory:** `dist`
  *(Este es el directorio donde Vite genera los archivos listos para producción tras el build)*.

Haz clic en **Create Static Site** en la parte inferior.

---

## 🔑 Paso 4: Configurar Variables de Entorno (Opcional)

Si en el futuro añades variables de entorno al archivo `.env` que necesiten estar presentes en producción:

1. En el panel de control de tu servicio en Render, ve a la pestaña **Environment**.
2. Haz clic en **Add Environment Variable**.
3. Añade los pares de clave-valor que correspondan (por ejemplo: `VITE_API_URL` con tu url de producción).
4. Guarda los cambios. Render reiniciará el despliegue para aplicar los cambios automáticamente.

---

## ⚡ Paso 5: ¡Listo! Despliegues Automáticos

* Render tardará alrededor de 1-2 minutos en compilar e implementar el sitio.
* Una vez completado, verás el estado en verde **"Live"** y un enlace en la parte superior (ej: `https://finanzas-personales.onrender.com`).
* **Despliegue Continuo (CD):** Cada vez que hagas un nuevo commit y ejecutes `git push origin main`, Render detectará el cambio automáticamente, compilará la aplicación y actualizará el sitio web sin que tengas que hacer nada manualmente.
