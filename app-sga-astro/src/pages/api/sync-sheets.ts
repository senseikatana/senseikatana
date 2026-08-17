// src/pages/api/sync-sheets.ts
import type { APIRoute } from 'astro';
import { importProductsFromSheet } from '@/services/sheet-sync.service';

export const POST: APIRoute = async () => {
  try {
    const result = await importProductsFromSheet();
    
    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      lastCode: result.lastCodeGenerated 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error sincronizando la hoja' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};