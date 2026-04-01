'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Note: For full type safety, generate types using `supabase gen types typescript`
// and replace the generic type here with `createClient<Database>(...)`
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
