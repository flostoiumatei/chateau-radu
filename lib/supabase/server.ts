import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let _supabaseServer: SupabaseClient | null = null;

// Lazy initialization to avoid build errors with placeholder keys
export function getSupabaseServer(): SupabaseClient {
  if (!_supabaseServer) {
    if (!supabaseUrl || !supabaseServiceRoleKey || supabaseServiceRoleKey === 'placeholder-key') {
      throw new Error('Supabase environment variables are not configured');
    }
    _supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _supabaseServer;
}

// For backwards compatibility
export const supabaseServer = {
  from: (table: string) => getSupabaseServer().from(table),
};
