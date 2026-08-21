import { json } from "@solidjs/start/server";
import { db } from "~/lib/db";
import { contacts } from "~/lib/db/schema";

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  ageVerified: boolean;
  website?: string; // honeypot
}

/**
 * API route para procesar el formulario de contacto.
 * Valida los datos, verifica honeypot e inserta en la base de datos.
 */
export async function POST({ request }: { request: Request }) {
  try {
    const body: ContactRequest = await request.json();

    // Verificar honeypot (anti-spam)
    if (body.website) {
      // Es un bot, retornar éxito silencioso
      return json({ success: true });
    }

    // Validar campos requeridos
    if (!body.name || body.name.trim().length < 2) {
      return json({ error: "Nombre inválido" }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return json({ error: "Email inválido" }, { status: 400 });
    }
    if (!body.subject) {
      return json({ error: "Asunto requerido" }, { status: 400 });
    }
    if (!body.message || body.message.trim().length < 10) {
      return json({ error: "Mensaje muy corto" }, { status: 400 });
    }
    if (!body.ageVerified) {
      return json({ error: "Debes confirmar que eres mayor de 18 años" }, { status: 400 });
    }

    // Insertar en base de datos
    const result = await db
      .insert(contacts)
      .values({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        subject: body.subject,
        message: body.message.trim(),
        ageVerified: body.ageVerified,
      })
      .returning({ id: contacts.id });

    return json({
      success: true,
      id: result[0].id,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
