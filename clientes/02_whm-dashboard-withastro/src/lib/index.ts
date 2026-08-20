import 'dotenv/config';
import type { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import { createClient, } from '@supabase/supabase-js';

const SUPABASE_URL: string | undefined = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SECRET_KEY: string | undefined = process.env.SUPABASE_SECRET_KEY;

export const SUPABASE = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '', {
    auth: {
        persistSession: true, autoRefreshToken: true, detectSessionInUrl: true
    }
}) as SupabaseClient;



