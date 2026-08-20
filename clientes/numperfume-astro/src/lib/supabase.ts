import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

// We only initialize Supabase if the user has provided the keys.
// Otherwise, we export a mock client or null to avoid crashing the app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
