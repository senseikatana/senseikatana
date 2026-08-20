import type { APIRoute } from 'astro';
import { assignProductToLocation } from '@/services/location.service';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await assignProductToLocation(body);
    return new Response(JSON.stringify(result), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};