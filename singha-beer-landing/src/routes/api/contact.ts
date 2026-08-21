// import { json } from "@solidjs/start/server"; // Sometimes json is re-exported or we just use standard Response/NextResponse depending on framework setup.
import { json } from "@solidjs/router"; // Better: import json helper from solidjs/router if start re-exports it or use standard json()
// Wait, SolidStart provides json helper in @solidjs/start/server? Let me check.
// Actually standard solidjs/router api routes usually expect Request/Response.
// The error says: Module '"@solidjs/start/server"' has no exported member 'json'. 
// In SolidStart, we usually just use `new Response(JSON.stringify(...), { headers: { 'Content-Type': 'application/json' } })`
// OR `Response.json({...})` if available in Node version (it is in modern). 
// Let's use the native `Response.json`.

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

export async function POST({ request }: { request: Request }) {
  try {
    const body: ContactRequest = await request.json();

    // Verificar honeypot (anti-spam)
    if (body.website) {
      // Es un bot, retornar éxito silencioso
      return Response.json({ success: true });
    }

    // Validar campos requeridos
    if (!body.name || body.name.trim().length < 2) {
      return Response.json({ error: "Nombre inválido" }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return Response.json({ error: "Email inválido" }, { status: 400 });
    }
    if (!body.subject) {
      return Response.json({ error: "Asunto requerido" }, { status: 400 });
    }
    if (!body.message || body.message.trim().length < 10) {
      return Response.json({ error: "Mensaje muy corto" }, { status: 400 });
    }
    if (!body.ageVerified) {
      return Response.json({ error: "Debes confirmar que eres mayor de 18 años" }, { status: 400 });
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

    return Response.json({
      success: true,
      id: result[0].id,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
