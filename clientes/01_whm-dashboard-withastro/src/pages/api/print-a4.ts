// src/pages/api/print-a4.ts
import type { APIRoute } from 'astro';
import { a4LabelSchema } from '@/lib/validations';
import { generateA4PDFService } from '@/services/pdf-generator.service';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // 1. Validación con Zod
    const validation = a4LabelSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify({ 
        error: validation.error.flatten().fieldErrors 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 2. Generar el buffer del PDF usando el servicio aislado
    const pdfBuffer = await generateA4PDFService(validation.data);

    // 3. Devolver el archivo PDF con el Response nativo
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Etiqueta_${validation.data.nutCode}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generando A4:', error);
    return new Response(JSON.stringify({ error: 'Error interno al generar el A4' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};